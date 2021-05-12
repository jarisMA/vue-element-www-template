<template>
  <div :class="['edit-plan-container', headerUnfold ? 'unfold' : '']">
    <i class="el-icon-loading" v-if="loading"></i>
    <div class="iframe-wrapper">
      <iframe
        ref="iframe"
        class="iframe"
        :src="url"
        width="100%"
        frameborder="0"
      >
      </iframe>
      <template v-if="!loading && showTool">
        <transition
          enter-active-class="animated slideInLeft"
          leave-active-class="animated slideOutLeft"
        >
          <plan-tool
            v-show="toolActive"
            class="plan-tool"
            :listingId="listingId"
            :rootCats="(cats[0] || {}).children || []"
            :listingBrief="listingBrief"
            :design="design"
            @addModel="addModel"
          />
        </transition>
        <!-- <div class="toolbar-mask"
             v-if="toolActive"></div> -->
        <div class="toolbar">
          <div
            :class="['tool-icon-wrapper', toolActive ? 'active' : '']"
            @click="toolActive = !toolActive"
          >
            <label class="tool-icon"></label>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import kujialeService from "service/kujiale";
import commodityService from "service/commodity";

import { goMy } from "utils/routes";
import { mapMutations, mapState } from "vuex";
import PlanTool from "./widgets/PlanTool";

export default {
  name: "EditPlan",
  components: {
    PlanTool
  },
  data() {
    return {
      url: "",
      cats: [],
      loading: true,
      listingId: null,
      showTool: false,
      design: {},
      listingBrief: {
        list: [],
        goods: [],
        skus: []
      },
      listingTimer: null,
      toolActive: false
    };
  },
  computed: {
    ...mapState(["headerUnfold"])
  },
  created() {
    if (this.$route.query.tool == "true" && this.$route.name === "EditPlan") {
      this.showTool = true;
    }
    this.getData();
  },
  beforeDestroy() {
    this.updateHeaderUnfold(false);
  },
  methods: {
    ...mapMutations(["updateHeaderUnfold"]),
    getData() {
      let promiseArr = [];
      const routeName = this.$route.name;
      if (routeName === "EditPlan") {
        promiseArr.push(
          kujialeService.iframe(1, {
            designid: this.$route.params.designId
          })
        );
        promiseArr.push(commodityService.cats());
        promiseArr.push(
          kujialeService.designBasic(this.$route.params.designId)
        );
      } else {
        promiseArr.push(kujialeService.iframe(4));
      }
      Promise.all(promiseArr).then(([res, cats, design]) => {
        this.url = res.url;
        this.listingId = res.listing_id;
        this.cats = cats || [];
        this.design = design || {};
        if (design && design.name) {
          document.querySelector("head title").innerHTML =
            design.name + " - 斗西家计划 - 可以自己设计装修的学习平台";
          document.getElementById("footer-plan-name").innerHTML = design.name;
        }
        this.listener();
        this.getListingBrief();
        // this.loading = false;
      });
    },
    listener() {
      if (window.postMessage) {
        const callback = ev => {
          if (
            ev.origin === "http://www.kujiale.com" ||
            ev.origin === "http://yun.kujiale.com" ||
            ev.origin === "https://www.kujiale.com" ||
            ev.origin === "https://yun.kujiale.com"
          ) {
            const data =
              (ev.data && typeof ev.data !== "object" && JSON.parse(ev.data)) ||
              null;
            if (data && data.action === "kjl_loaded") {
              // 监听是否加载完成
              this.loading = false;
            }
            if (data && data.action === "kjl_completed") {
              // 监听是否点击退出按钮
              this.exit();
            }
            if (
              data &&
              (data.action === "kjl_saved" ||
                data.action === "kjl_auto_saved") &&
              this.showTool
            ) {
              // 监听是否触发保存事件
              this.listingSync();
            }
            if (data && data.action === "kjl_toggle_leftSideNavigatorTab") {
              this.toolActive = false;
            }
          }
        };
        if ("addEventListener" in document) {
          window.addEventListener("message", callback, false);
        } else if ("attachEvent" in document) {
          window.attachEvent("onmessage", callback);
        }
      }
    },
    exit() {
      goMy();
    },
    addModel(goodId) {
      const iframe = this.$refs["iframe"];
      iframe.contentWindow.postMessage(
        {
          type: "third_add_model",
          data: {
            mode: "drag_add",
            list: [
              {
                obsBrandGoodId: goodId
              }
            ]
          }
        },
        "*"
      );
    },
    listingSync() {
      if (this.listingId) {
        kujialeService.listingSync(this.listingId).then(() => {
          if (this.listingTimer) {
            clearInterval(this.listingTimer);
            this.listingTimer = null;
          }
          this.listingTimer = setInterval(() => {
            this.getListingState();
          }, 1000);
        });
      }
    },
    getListingState() {
      if (this.listingId) {
        kujialeService.listingState(this.listingId).then(res => {
          if (res === 3) {
            this.getListingBrief();
            clearInterval(this.listingTimer);
            this.listingTimer = null;
          }
        });
      }
    },
    getListingBrief() {
      if (this.listingId) {
        kujialeService.listingBrief(this.listingId).then(res => {
          this.listingBrief = res;
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";
@oWidth: 44px;
.edit-plan-container {
  width: 100vw;
  margin-top: 14px !important;
  height: calc(100vh - 36px);
  transition: all 0.5s ease;
  &.unfold {
    margin-top: 52px !important;
    height: calc(100vh - 72px);
  }
}
.iframe-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  // background: #805d5d;
  z-index: 1;
  .plan-tool {
    position: absolute;
    top: 52px;
    left: 44px;
    height: calc(100% - 52px - 8px);
    z-index: 1;
  }
  .iframe {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .toolbar-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: @oWidth;
    height: 100%;
    background: #f7f8fa80;
  }
  .toolbar {
    position: absolute;
    top: calc((100% + 264px - 36px) / 2);
    left: 0;
    .tool-icon-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: @oWidth;
      height: @oWidth;
      transform: translateY(50%);
      cursor: pointer;
      .tool-icon {
        width: 24px;
        height: 24px;
        background-image: url("~images/commodity/tool.svg");
        background-repeat: no-repeat;
        background-size: cover;
        cursor: pointer;
        filter: grayscale(1);
      }
      &.active {
        background-color: rgba(57, 123, 243, 0.1);
        .tool-icon {
          filter: unset;
        }
      }
      &:hover {
        background-color: rgba(57, 123, 243, 0.1);
        .tool-icon {
          filter: unset;
        }
      }
    }
  }
}
.edit-plan-container {
  position: relative;
  .el-icon-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 42px;
    color: @primaryColor;
    transform: translate(-50%, -50%);
  }
}
</style>

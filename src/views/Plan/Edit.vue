<template>
  <div :class="['edit-plan-container', headerUnfold ? 'unfold' : '']">
    <i class="el-icon-loading"></i>
    <div class="iframe-wrapper">
      <!-- <iframe ref="iframe"
              class="iframe"
              :src="url"
              width="100%"
              frameborder="0">
      </iframe> -->
      <plan-tool
        v-if="!loading"
        class="plan-tool"
        :listingId="listingId"
        :rootCats="(cats[0] || {}).children || []"
        @addModel="addModel"
      />
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
      listingId: null
    };
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    this.updateHeaderUnfold(false);
  },
  computed: {
    ...mapState(["headerUnfold"])
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
      } else {
        promiseArr.push(kujialeService.iframe(4));
      }
      promiseArr.push(commodityService.cats());
      Promise.all(promiseArr).then(([res, cats]) => {
        this.url = res.url;
        this.listingId = res.listing_id;
        this.cats = cats;
        this.listener();
        this.loading = false;
      });
    },
    listener() {
      if (window.postMessage) {
        const callback = ev => {
          // console.log(ev);
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
    addModel(goodId = "3FO4KNKLFGEH") {
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";

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
  }
  .iframe {
    position: relative;
    width: 100%;
    height: 100%;
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

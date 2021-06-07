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
          <plane-tool
            v-if="toolIndex === 1"
            class="plane-tool"
            @addModel="addModel"
            @showFeedback="handleShowFeedback"
          />
          <plan-tool
            v-if="toolIndex === 2"
            class="plan-tool"
            :listingId="listingId"
            :rootCats="softCats"
            :listingBrief="listingBrief"
            :design="design"
            :refreshingBrief="refreshingBrief"
            @addModel="addModel"
            @showFeedback="handleShowFeedback"
            @refreshPrice="handleIframeSave"
          />
        </transition>
        <div class="toolbar">
          <div
            :class="['tool-icon-wrapper', toolIndex === 1 ? 'active' : '']"
            @click="handleSelectTool(1)"
          >
            <label class="plane-icon"></label>
          </div>
          <div
            :class="['tool-icon-wrapper', toolIndex === 2 ? 'active' : '']"
            @click="handleSelectTool(2)"
          >
            <label class="tool-icon"></label>
          </div>
        </div>
      </template>
    </div>
    <el-dialog
      :visible.sync="showFeedback"
      title="模型问题反馈"
      class="feedback-dialog"
      width="580px"
    >
      <el-form :model="feedbackForm" ref="feedbackForm" @submit.native.prevent>
        <el-form-item
          prop="content"
          :rules="[{ required: true, message: '描述不能为空' }]"
        >
          <el-input
            type="textarea"
            placeholder="请简单描述您遇到的问题"
            resize="none"
            v-model="feedbackForm.content"
          ></el-input>
        </el-form-item>
        <el-form-item class="feedback-submit">
          <el-button
            type="primary"
            class="feedback-submit-btn"
            :loading="feedbacking"
            @click="handleFeedbackSubmit"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import kujialeService from "service/kujiale";
import commodityService from "service/commodity";

import { goMyPlan } from "utils/routes";
import { mapMutations, mapState } from "vuex";
import PlaneTool from "./widgets/PlaneTool";
import PlanTool from "./widgets/PlanTool";

export default {
  name: "EditPlan",
  components: {
    PlaneTool,
    PlanTool
  },
  data() {
    return {
      url: "",
      softCats: [],
      loading: true,
      listingId: null,
      showTool: false,
      design: {},
      refreshingBrief: false,
      listingBrief: {
        list: [],
        goods: [],
        skus: []
      },
      listingTimer: null,
      toolIndex: 0, // 1平面布局 2软装
      feedbackSku: null,
      showFeedback: false,
      feedbackForm: {
        content: ""
      },
      feedbacking: false
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
        if (cats) {
          const softCats = cats.find(
            item => item.id === parseInt(process.env.VUE_APP_SOFT_CAT_ID)
          );
          this.softCats = (softCats && softCats.children) || [];
        }
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
              this.handleSelectTool(0);
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
    handleSelectTool(index) {
      this.toolIndex = this.toolIndex === index ? 0 : index;
    },
    exit() {
      goMyPlan();
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
    handleIframeSave() {
      const iframe = this.$refs["iframe"];
      iframe.contentWindow.postMessage("save_kjl", "*");
    },
    listingSync() {
      if (this.listingId) {
        this.refreshingBrief = true;
        kujialeService
          .listingSync(this.listingId)
          .then(() => {
            if (this.listingTimer) {
              clearInterval(this.listingTimer);
              this.listingTimer = null;
            }
            this.listingTimer = setInterval(() => {
              this.getListingState();
            }, 1000);
          })
          .catch(() => {
            this.refreshingBrief = false;
          });
      }
    },
    getListingState() {
      if (this.listingId) {
        kujialeService
          .listingState(this.listingId)
          .then(res => {
            if (res === 3) {
              this.getListingBrief();
              clearInterval(this.listingTimer);
              this.listingTimer = null;
            }
          })
          .catch(() => {
            this.refreshingBrief = false;
          });
      }
    },
    getListingBrief() {
      if (this.listingId) {
        kujialeService
          .listingBrief(this.listingId)
          .then(res => {
            this.listingBrief = res;
          })
          .finally(() => {
            this.refreshingBrief = false;
          });
      }
    },
    handleShowFeedback(sku) {
      this.feedbackSku = sku;
      this.showFeedback = true;
    },
    handleFeedbackSubmit() {
      this.$refs["feedbackForm"].validate(res => {
        if (res) {
          this.feedbacking = true;
          const { content } = this.feedbackForm;
          commodityService
            .skuFeedback(this.feedbackSku.id, {
              content
            })
            .then(() => {
              this.$refs["feedbackForm"].resetFields();
              this.showFeedback = false;
              this.$notice({
                type: "success",
                title: "反馈成功"
              });
            })
            .finally(() => {
              this.feedbacking = false;
            });
        }
      });
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
  /deep/ .feedback-dialog {
    .el-dialog {
      padding: 20px;
    }
    .el-dialog__header {
      padding: 0;
      margin-bottom: 16px;
      .el-dialog__title {
        display: inline-block;
        line-height: 28px;
        font-weight: 500;
        font-size: 16px;
        color: #111111;
      }
      .el-dialog__headerbtn {
        top: 25px;
      }
    }
    .el-dialog__body {
      padding: 0;
      .el-form-item {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-textarea__inner {
        height: 91px;
      }
      .feedback-submit {
        text-align: right;
        .feedback-submit-btn {
          padding: 8px 24px;
          line-height: 1;
          font-size: 14px;
        }
      }
    }
  }
}
.iframe-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  // background: #805d5d;
  z-index: 1;
  .plane-tool {
    position: absolute;
    top: 52px;
    left: 44px;
    height: calc(100% - 52px - 8px);
    cursor: default;
    z-index: 1;
  }
  .plan-tool {
    position: absolute;
    top: 52px;
    left: 44px;
    height: calc(100% - 52px - 8px);
    cursor: default;
    z-index: 1;
  }
  .iframe {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .toolbar {
    position: absolute;
    top: calc((100% + 264px - 36px) / 2);
    left: 0;
    .tool-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: @oWidth;
      height: @oWidth;
      transform: translateY(50%);
      cursor: pointer;
      .plane-icon,
      .tool-icon {
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: cover;
        cursor: pointer;
        filter: grayscale(1);
      }
      .plane-icon {
        background-image: url("~images/commodity/plane.svg");
      }
      .tool-icon {
        background-image: url("~images/commodity/tool.svg");
      }
      &.active {
        background-color: rgba(57, 123, 243, 0.1);
        .plane-icon,
        .tool-icon {
          filter: unset;
        }
      }
      &:hover {
        background-color: rgba(57, 123, 243, 0.1);
        .plane-icon,
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

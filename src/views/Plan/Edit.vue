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
      <template v-if="!loading && showPlane">
        <transition
          enter-active-class="animated slideInLeft"
          leave-active-class="animated slideOutLeft"
        >
          <plane-tool
            v-show="toolIndex === 1"
            class="plane-tool"
            @addModel="addModel"
            @showFeedback="handleShowFeedback"
          />
        </transition>
      </template>
      <template v-if="!loading && showTexture">
        <transition
          enter-active-class="animated slideInLeft"
          leave-active-class="animated slideOutLeft"
        >
          <texture-tool
            class="texture-tool"
            v-show="toolIndex === 2"
            @addModel="addModel"
            @showFeedback="handleShowFeedback"
          />
        </transition>
      </template>
      <template v-if="!loading && showSoftware">
        <transition
          enter-active-class="animated slideInLeft"
          leave-active-class="animated slideOutLeft"
        >
          <plan-tool
            v-show="toolIndex === 3"
            class="plan-tool"
            :listingId="listingId"
            :listingBrief="listingBrief"
            :design="design"
            :refreshingBrief="refreshingBrief"
            @addModel="addModel"
            @showFeedback="handleShowFeedback"
            @refreshPrice="handleIframeSave"
          />
        </transition>
      </template>
      <div class="toolbar">
        <div
          :class="['toolbar-item', toolIndex === 1 ? 'active' : '']"
          @click="handleSelectTool(1)"
          v-if="!loading && showPlane"
        >
          <div class="tool-icon-wrapper">
            <label class="plane-icon"></label>
          </div>
          <label class="tool-icon-label">布局</label>
        </div>
        <div
          :class="['toolbar-item', toolIndex === 2 ? 'active' : '']"
          @click="handleSelectTool(2)"
          v-if="!loading && showTexture"
        >
          <div class="tool-icon-wrapper">
            <label class="texture-icon"></label>
          </div>
          <label class="tool-icon-label">硬装</label>
        </div>
        <div
          :class="['toolbar-item', toolIndex === 3 ? 'active' : '']"
          @click="handleSelectTool(3)"
          v-if="!loading && showSoftware"
        >
          <div class="tool-icon-wrapper">
            <label class="tool-icon"></label>
          </div>
          <label class="tool-icon-label">软装</label>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="showFeedback"
      title="商品模型问题反馈"
      class="feedback-dialog"
      width="580px"
    >
      <el-form
        class="feedback-form"
        :model="feedbackForm"
        ref="feedbackForm"
        @submit.native.prevent
      >
        <el-form-item prop="id">
          <el-select
            :popper-append-to-body="false"
            v-model="feedbackForm.id"
            style="width:100%"
          >
            <el-option
              v-for="item in feedbackSku.skus"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              class="dropdown-item"
            >
              <div class="item-left">
                <the-loading-image
                  :url="item.img_id"
                  :width="40"
                  :height="40"
                  class="item-image"
                />
                <span class="item-text">{{ item.name }}</span>
              </div>
              <div class="item-right">{{ "模型编码" + item.id }}</div>
            </el-option>
          </el-select>
        </el-form-item>

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
import TextureTool from "./widgets/TextureTool";
import TheLoadingImage from "components/TheLoadingImage";

export default {
  name: "EditPlan",
  components: {
    PlaneTool,
    PlanTool,
    TextureTool,
    TheLoadingImage,
  },
  data() {
    return {
      url: "",
      loading: true,
      listingId: null,
      showPlane: true,
      showTexture: false,
      showSoftware: false,
      design: {},
      refreshingBrief: false,
      listingBrief: {
        list: [],
        goods: [],
        skus: [],
      },
      listingTimer: null,
      toolIndex: null, // 1平面布局 2材质 3软装
      feedbackSku: [],
      showFeedback: false,
      feedbackForm: {
        content: "",
        id: "",
      },
      feedbacking: false,
    };
  },
  computed: {
    ...mapState(["headerUnfold"]),
  },
  created() {
    if (this.$route.name === "EditPlan") {
      this.showSoftware = true;
      if (this.$route.query.tool == "true") {
        this.showTexture = true;
      }
      if (this.$route.query.texture == "true") {
        this.showTexture = true;
      }
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
            designid: this.$route.params.designId,
          })
        );
        promiseArr.push(
          kujialeService.designBasic(this.$route.params.designId)
        );
      } else {
        promiseArr.push(kujialeService.iframe(4));
      }
      Promise.all(promiseArr).then(([res, design]) => {
        this.url = res.url;
        this.listingId = res.listing_id;
        this.design = design || {};
        if (design && design.name) {
          document.querySelector("head title").innerHTML =
            design.name + " - 斗西家计划 - 可以自己设计装修的学习平台";
          document.getElementById("footer-plan-name").innerHTML = design.name;
        }
        this.listener();
        this.getListingBrief(false);
        // this.loading = false;
      });
    },
    listener() {
      if (window.postMessage) {
        const callback = (ev) => {
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
              this.showSoftware
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
                obsBrandGoodId: goodId,
              },
            ],
          },
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
          .then((res) => {
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
    getListingBrief(tips = true) {
      if (this.listingId) {
        kujialeService
          .listingBrief(this.listingId)
          .then((res) => {
            this.listingBrief = res;
            tips &&
              this.$notice({
                type: "success",
                title: "更新成功",
              });
          })
          .finally(() => {
            this.refreshingBrief = false;
          });
      }
    },
    handleShowFeedback(sku) {
      this.feedbackSku = sku;
      this.feedbackForm.id = this.feedbackSku.skus[0].id;
      this.showFeedback = true;
    },
    handleFeedbackSubmit() {
      this.$refs["feedbackForm"].validate((res) => {
        if (res) {
          this.feedbacking = true;
          const { id, content } = this.feedbackForm;
          commodityService
            .skuFeedback(id, {
              content: `商品ID：${this.feedbackSku.id}, 反馈：${content}`,
            })
            .then(() => {
              this.$refs["feedbackForm"].resetFields();
              this.showFeedback = false;
              this.$notice({
                type: "success",
                title: "反馈成功",
              });
            })
            .finally(() => {
              this.feedbacking = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";
@oWidth: 44px;
.edit-plan-container {
  position: relative;
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
        height: 90px;
        padding: 14px;
        line-height: 24px;
        font-size: 14px;
        border: 1px solid #efefef;
        &::placeholder {
          color: #999999;
        }
      }
      .feedback-submit {
        text-align: right;
        .feedback-submit-btn {
          padding: 7px 23px;
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
  .texture-tool {
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
    width: 44px;

    transform: translateY(22px);
    transition: width 0.1s;
    overflow: hidden;
    &:hover {
      background: #ffffff;
      width: 98px;
      box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05);
      border-radius: 0px 4px 4px 0px;
      z-index: 2;
    }
    .toolbar-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 98px;
      cursor: pointer;
      &.active {
        background-color: #e5f5ec;
        .tool-icon-wrapper {
          .plane-icon,
          .texture-icon,
          .tool-icon {
            filter: unset;
          }
        }
        .tool-icon-label {
          color: @primaryColor;
        }
      }
      &:hover {
        .tool-icon-wrapper {
          .plane-icon,
          .texture-icon,
          .tool-icon {
            filter: unset;
          }
        }
        .tool-icon-label {
          color: @primaryColor;
        }
      }
      .tool-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: @oWidth;
        height: @oWidth;
        cursor: pointer;

        .plane-icon,
        .texture-icon,
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
        .texture-icon {
          background-image: url("~images/commodity/texture.svg");
        }
        .tool-icon {
          background-image: url("~images/commodity/tool.svg");
        }
      }
      .tool-icon-label {
        line-height: 12px;
        font-size: 12px;
        color: #606c66;
        cursor: pointer;
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

/deep/ .el-select .el-input__inner {
  width: 540px;
  height: 64px;
  padding: 12px 40px 12px 20px;
  border: none;
  background: #fafafa;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: #f4f4f4;
  }
}
</style>

<style lang="less">
.feedback-form {
  .el-select-dropdown__list {
    padding: 0px;
  }
  .el-popper {
    margin: 0px !important;
  }

  .popper__arrow {
  display: none !important;
}

.el-select__caret{
  color:black !important;
}

  .dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 538px;
    height: 64px !important;
    padding: 12px 20px;
    border: none;
    background: white !important;

    &:hover {
      background: #f4f4f4 !important;
    }

    /deep/ .el-select-dropdown__list {
      padding: 0px;
    }

    .item-left {
      overflow: hidden;

      white-space: nowrap;
      height: 40px;

      .item-image {
        display: inline-block;
      }
      .item-text {
        display: inline-block;
        vertical-align: top;
        line-height: 40px;
        width: 330px;
        margin-left: 10px;
        color: #2c3330;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .item-right {
      display: flex;
      align-items: center;
      color: #81948b;
      font-size: 14px;
    }
  }
}


</style>

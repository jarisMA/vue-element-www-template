<template>
  <div class="tool-wrapper">
    <div class="tool-left"></div>
    <div class="tool-right">
      <div class="tool-main">
        <div class="tool-main-header">
          <el-input
            ref="nameSearch"
            class="name-search"
            type="text"
            :placeholder="`在「布平面」下搜索`"
            prefix-icon="search-icon bgImg"
            v-model="name"
            autofocus
            clearable
            @keyup.enter.native="handleNameInputConfirm"
          >
          </el-input>
        </div>
        <div class="tool-main-content">
          <div class="scroll-section">
            <ul class="tool-main-cat-list">
              <li class="tool-main-cat-item" v-for="item of 10" :key="item">
                <h4 class="tool-main-cat-title">
                  <span>单人沙发</span>
                </h4>
                <ul class="tool-main-commodity-list">
                  <li
                    class="tool-main-commodity-item"
                    v-for="item of 8"
                    :key="item"
                  >
                    <div class="commodity-top">
                      <the-loading-image
                        :width="94"
                        :height="94"
                        url="https://homeplan-public.oss-cn-shanghai.aliyuncs.com/admin/2021/0526/commodity-cat/vPDUtlArqxforbGwR7AP3AuBIUV8NLYlPQspNcN7.svg"
                      />
                      <label
                        class="bgImg feedback"
                        @click.stop="handleShowFeedback()"
                      >
                        <i class="feedback-icon"></i>
                      </label>
                    </div>
                    <div class="commodity-bottom">
                      单人沙发
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";

export default {
  name: "PlaneTool",
  components: {
    TheLoadingImage
  },
  data() {
    return {
      name: ""
    };
  },
  methods: {
    handleNameInputConfirm() {},
    handleShowFeedback() {}
  }
};
</script>

<style lang="less" scoped>
.tool-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  .tool-left {
    flex: none;
    width: 44px;
    max-height: 100%;
    overflow: auto;
  }
  .tool-right {
    flex: 1;
    width: 320px;
    height: 100%;
    background: #fff;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.05);
  }
  .tool-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    .tool-main-header {
      flex: none;
      width: 100%;
      padding: 8px 0;
      /deep/.name-search {
        .el-input__inner {
          line-height: 1;
          font-size: 12px;
          color: #999999;
          background: #fafafa;
          border: unset;
          border-radius: 2px;
          &::placeholder {
            color: #999999;
          }
        }
        .el-input__prefix {
          display: flex;
          align-items: center;
          .search-icon {
            width: 24px;
            height: 24px;
            background-image: url("~images/common/search.svg");
          }
        }
      }
    }
    .tool-main-content {
      flex: 1;
      width: 100%;
      height: 5px;
      overflow: hidden;
      .scroll-section {
        display: flex;
        justify-content: center;
        width: calc(100% + 15px);
        height: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 15px;
        }
        .tool-main-cat-list {
          padding-bottom: 10px;
          .tool-main-cat-item {
            margin-top: 20px;
            .tool-main-cat-title {
              position: relative;
              height: 20px;
              line-height: 20px;
              font-weight: 600;
              font-size: 14px;
              color: #2c3330;
              text-align: center;
              &::before {
                position: absolute;
                left: 0;
                top: calc(50% - 0.5px);
                width: 100%;
                border-top: 1px dashed #606c66;
                content: "";
              }
              span {
                position: relative;
                display: inline-block;
                padding: 0 20px;
                background: #fff;
                z-index: 1;
              }
            }
            .tool-main-commodity-list {
              display: flex;
              flex-wrap: wrap;
              .tool-main-commodity-item {
                margin-top: 10px;
                width: 94px;
                cursor: pointer;
                &:nth-child(3n - 1) {
                  margin-left: 9px;
                  margin-right: 9px;
                }
                &:hover {
                  .commodity-top {
                    .feedback {
                      display: flex;
                    }
                  }
                }
                .commodity-top {
                  position: relative;
                  .feedback {
                    position: absolute;
                    bottom: 4px;
                    left: 4px;
                    display: flex;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.8);
                    opacity: 0.8;
                    cursor: pointer;
                    &:hover {
                      opacity: 1;
                    }
                    .feedback-icon {
                      display: inline-block;
                      width: 16px;
                      height: 16px;
                      background-image: url("~images/commodity/feedback.svg");
                      cursor: pointer;
                    }
                  }
                }
                .commodity-bottom {
                  margin-top: 4px;
                  line-height: 16px;
                  font-size: 12px;
                  text-align: center;
                  color: #81948b;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

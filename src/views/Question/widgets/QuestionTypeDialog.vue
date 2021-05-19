<template>
  <el-dialog
    custom-class="dialog-wrapper"
    :show-close="false"
    :visible="visible"
    :before-close="handleClose"
    width="740px"
  >
    <div class="dialog">
      <div class="dialog-header">
        <h3 class="dialog-header-title">我要提问</h3>
      </div>
      <div class="dialog-content">
        <div class="dialog-content-list">
          <div
            :class="[
              'dialog-content-item',
              activeTypeValue === item.value ? 'active' : ''
            ]"
            v-for="item of types"
            :key="item.value"
            @click="activeTypeValue = item.value"
          >
            <h4 class="dialog-content-item_header">
              {{ item.title }}
            </h4>
            <div class="dialog-content-item_content">
              <div
                class="dialog-content-item_image"
                :style="{ backgroundImage: `url(${item.image})` }"
              ></div>
              <p class="dialog-content-item_desc">
                {{ item.desc }}
              </p>
            </div>
            <div class="dialog-content-item_footer">
              <span class="dialog-content-item_cost">-{{ item.cost }}</span>
              <i class="heart-icon"></i>
              <span class="dialog-content-item_tips">内测期间不消耗暖心</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <div
          :class="['dialog-footer-btn', !activeTypeValue ? 'disabled' : '']"
          @click="activeTypeValue ? handleSubmit() : null"
        >
          去求助<i class="arrow-icon"></i>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import questionTypeImg from "images/question/question_type_1.png";
import helpTypeImg from "images/question/question_type_2.png";
import voteTypeImg from "images/question/question_type_3.png";
import {
  QUESTION_TYPE_QUESTION,
  QUESTION_TYPE_HELP,
  QUESTION_TYPE_VOTE
} from "utils/const";

export default {
  name: "QuestionTypeDialog",
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      types: [
        {
          title: "标记式图文",
          image: helpTypeImg,
          desc:
            "标记式图文可“多求助点”表达，可标注朝向，最适合“有明确需求的户型求助”。",
          cost: 50,
          value: QUESTION_TYPE_HELP
        },
        {
          title: "普通图文",
          image: questionTypeImg,
          desc:
            "普通图文灵活开放，适合多种类型求助，效果图、搭配、布局、施工皆可。",
          cost: 30,
          value: QUESTION_TYPE_QUESTION
        },
        {
          title: "发布投票",
          image: voteTypeImg,
          desc: "适合“选哪个？”以及恋丑癖类型提问",
          cost: 20,
          value: QUESTION_TYPE_VOTE
        }
      ],
      activeTypeValue: null
    };
  },
  methods: {
    handleClose() {
      this.activeTypeValue = null;
      this.$emit("update:visible", false);
    },
    handleSubmit() {
      this.$emit("select", this.activeTypeValue);
      this.handleClose();
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

/deep/ .dialog-wrapper {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
  .dialog {
    width: 100%;
    padding: 40px 83px;
    background: #fafafa;
    .dialog-header {
      width: 100%;
      margin-bottom: 30px;
      .dialog-header-title {
        line-height: 34px;
        font-weight: 500;
        font-size: 24px;
        color: #2c3330;
        text-align: center;
      }
    }
    .dialog-content {
      width: 100%;
      .dialog-content-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .dialog-content-item {
          position: relative;
          width: 178px;
          padding: 11px 9px 41px;
          background: #ffffff;
          border: 1px solid #fff;
          cursor: pointer;
          &.active {
            background: linear-gradient(
                0deg,
                rgba(20, 175, 100, 0.07),
                rgba(20, 175, 100, 0.07)
              ),
              #ffffff;
            border-color: @primaryColor;
            &::after {
              position: absolute;
              bottom: 9px;
              right: 9px;
              width: 24px;
              height: 24px;
              content: "";
              background: url("~images/question/selected.svg") no-repeat;
            }
          }
          .dialog-content-item_header {
            margin-bottom: 12px;
            line-height: 25px;
            font-weight: 500;
            font-size: 18px;
            color: #2c3330;
            text-align: center;
          }
          .dialog-content-item_content {
            .dialog-content-item_image {
              width: 100%;
              height: 180px;
              background-size: cover;
              background-repeat: no-repeat;
            }
            .dialog-content-item_desc {
              height: 60px;
              margin-top: 17px;
              line-height: 20px;
              font-size: 12px;
              color: #81948b;
            }
          }
          .dialog-content-item_footer {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-top: 16px;
            .dialog-content-item_cost {
              line-height: 16px;
              font-size: 12px;
              color: #2c3330;
            }
            .heart-icon {
              margin: 0 4px;
              width: 16px;
              height: 16px;
            }
            .dialog-content-item_tips {
              line-height: 16px;
              font-size: 12px;
              color: #c8d0cc;
            }
          }
        }
      }
    }
    .dialog-footer {
      width: 100%;
      margin-top: 40px;
      text-align: right;
      .dialog-footer-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 124px;
        height: 40px;
        line-height: 1;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 1px;
        color: #ffffff;
        background: #14af64;
        box-shadow: 0px 2px 8px rgba(37, 44, 40, 0.15);
        border-radius: 20px;
        cursor: pointer;
        &.disabled {
          background: #e4e4e4;
          cursor: auto;
        }
        .arrow-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          mask-image: url("~images/my/arrow.svg");
          mask-size: cover;
          mask-repeat: no-repeat;
          background-color: #fff;
        }
      }
    }
  }
}
</style>

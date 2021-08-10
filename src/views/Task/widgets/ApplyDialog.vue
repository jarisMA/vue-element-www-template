<template>
  <el-dialog
    custom-class="widget-apply-dialog"
    :visible.sync="showDialog"
    :show-close="false"
  >
    <div class="apply-dialog-container" @click="handleCancle">
      <template v-if="userInfo && !userInfo.is_designer">
        <div class="container-content">
          <div class="content-header">
            加入斗西设计团
          </div>
          <div class="content-body">
            <div class="body__img-container">
              <img
                src="~/images/task/apply-dialog-join.png"
                alt=""
                class="body__img"
              />
            </div>
            <div class="body__description">
              OOPS～你还不是斗西设计团的成员哦，
              请先填写申请表单再查看任务：）<span
                class="body__description--green"
              ></span>
            </div>
            <div class="body__btn-container">
              <div class="body__btn body__btn--left" @click.stop="handleCancle">
                再看看
              </div>
              <div class="body__btn body__btn--right" @click.stop="goApply">
                去申请
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="userInfo && userInfo.is_designer">
        <div class="container-content">
          <div class="content-header">
            报名参与任务
          </div>
          <div class="content-body">
            <div class="body__img-container">
              <img src="" alt="" class="body__img" />
            </div>
            <div class="body__description">
              确认花费{{ task.heart_count }}暖心报名参加
              <span class="body__description--green">{{ task.name }} </span>吗？
            </div>
            <div class="body__btn-container">
              <div class="body__btn body__btn--left" @click.stop="handleCancle">
                再看看
              </div>
              <div
                class="body__btn body__btn--right"
                @click.stop="handleSignUp"
              >
                确认报名
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </el-dialog>
</template>
<script>
import { goTaskJoin } from "utils/routes";
import { mapState } from "vuex";
export default {
  name: "ApplyDialog",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ""
    },
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    goTaskJoin,
    handleSignUp() {
      this.$emit("signUp");
    },
    handleCancle() {
      this.$emit("update:showDialog", false);
    },
    goApply() {
      this.goTaskJoin();
      this.handleCancle();
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .widget-apply-dialog {
  margin: 0 !important;
  width: 100vw;
  height: 100vh;
  background: transparent;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .apply-dialog-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 46px 120px;

    .container-content {
      width: 672px;
      height: 500px;
      padding-bottom: 46px;
      max-height: 90vh;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      border-radius: 10px;
      overflow: hidden;
      overflow-y: auto;
      background-color: #fff;
      transition: all 0.3s;
      .content-header {
        height: 50px;
        background-color: #15af64;
        font-weight: 600;
        font-size: 24px;
        color: #fff;
        line-height: 50px;
        text-align: center;
      }
      .content-body {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 15px;
        background-color: #ffffff;
        .body__img-container {
          width: 210px;
          height: 210px;
          margin-bottom: 15px;
          .body__img {
            width: 100%;
            height: 100%;
          }
        }
        .body__description {
          height: 56px;
          margin-bottom: 54px;
          padding: 0 158px;
          font-size: 20px;
          line-height: 28px;
          text-align: center;
          .body__description--green {
            color: #14af64;
          }
        }
        .body__btn-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0 92px;
          .body__btn {
            width: 206px;
            height: 50px;
            line-height: 50px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            cursor: pointer;
            &.body__btn--left {
              background: url("~images/task/dialog-btn-white.svg") no-repeat;
              background-size: 206px 50px;
              color: #000000;
            }
            &.body__btn--right {
              background: url("~images/task/dialog-btn-green.svg") no-repeat;
              background-size: 206px 50px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>

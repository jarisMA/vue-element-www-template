<template>
  <div class="widget-dialog" v-if="showDialog">
    <div class="bounced-wrap">
      <template v-if="type == 'join'">
        <div class="bounced-content">
          <div class="content-header">
            加入斗西设计团
          </div>
          <div class="content-body">
            <div class="body__img-container">
              <img src="" alt="" class="body__img" />
            </div>
            <div class="body__description">
              OOPS～你还不是斗西设计团的成员哦，
              请先填写申请表单再查看任务：）<span
                class="body__description--green"
              ></span>
            </div>
            <div class="body__btn-container">
              <div class="body__btn body__btn--left">再看看</div>
              <div class="body__btn body__btn--right">去申请</div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="type == 'signup'">
        <div class="bounced-content">
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
              <div class="body__btn body__btn--left" @click="handleCancle">
                再看看
              </div>
              <div class="body__btn body__btn--right" @click="handleSignUp">
                确认报名
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConfirmDialog",
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
  methods: {
    handleSignUp() {
      this.$emit("signUp");
    },
    handleCancle() {
      this.$emit("update:showDialog", false);
    }
  }
};
</script>
<style lang="less" scoped>
.bounced-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(181, 181, 181, 0.5);
  z-index: 5002;
}
.bounced-content {
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
    padding-top: 35px;
    background-color: #ffffff;
    .body__img-container {
      width: 170px;
      height: 170px;
      margin-bottom: 35px;
      background-color: #c4c4c4;
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
</style>

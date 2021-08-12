<template>
  <el-dialog
    custom-class="widget-apply-dialog"
    :visible.sync="showDialog"
    :show-close="false"
  >
    <div class="apply-dialog-container">
      <template v-if="type == 'JOIN_DESIGNER'">
        <div class="container-content">
          <div class="content-header">
            加入斗西设计团
          </div>
          <div class="content-body">
            <div class="body__img-container">
              <img
                src="~/images/task/apply-dialog-join.svg"
                alt=""
                class="body__img"
              />
            </div>
            <div class="body__description">
              OOPS～你还不是斗西设计团的成员哦，<br />
              请先填写申请表单再查看任务：）
            </div>
            <div class="body__btn-container">
              <div class="body__btn body__btn--left" @click.stop="handleCancle">
                再看看
              </div>
              <div
                class="body__btn body__btn--right"
                @click.stop="goJoinDesigner"
              >
                去申请
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="type == 'APPLY_TASK'">
        <div class="container-content" v-loading="loading">
          <div class="content-header">
            报名参与任务
          </div>
          <div class="content-body">
            <div class="body__heart" v-if="is_enough_heart">
              -{{ task.heart_count }}
            </div>
            <div class="body__img-container">
              <img
                v-if="is_enough_heart"
                src="~/images/task/apply-dialog-heart.svg"
                alt=""
                class="body__img"
              />
              <img
                v-else
                src="~/images/task/apply-dialog-heart-disabeld.svg"
                alt=""
                class="body__img"
              />
            </div>
            <div class="body__description">
              <template v-if="is_enough_heart"
                >确认花费{{ task.heart_count }}暖心报名参加
                <span class="body__description--green">{{ task.name }} </span
                >吗？
              </template>
              <template v-else>
                暖心不足了 T T。<el-link class="body__description--green"
                  >去看看如何获取暖心</el-link
                >
              </template>
            </div>
            <div class="body__btn-container">
              <div class="body__btn body__btn--left" @click.stop="handleCancle">
                再看看
              </div>
              <div
                v-if="is_enough_heart"
                class="body__btn body__btn--right"
                @click.stop="getTaskIsFull"
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
import taskService from "@/global/service/task";
import submit_hw_img from "images/task/apply-dialog-join.svg";

export default {
  name: "ApplyDialog",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "JOIN_DESIGNER" || "APPLY_TASK"
    },
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    is_enough_heart() {
      return this.userInfo.mark_total > this.task.heart_count;
    }
  },
  methods: {
    goTaskJoin,
    getTaskIsFull() {
      taskService.taskIsFull(this.$route.params.id).then(res => {
        if (!res.is_full) {
          this.loading = true;
          return this.handleSignUp();
        }
        this.task.is_backdoor &&
          this.$msgBox
            .showMsgBox({
              img: submit_hw_img,
              theme: "img_w_220",
              content:
                "<p style='color:#14AF64FF;font-weight:400;font-size:24px;line-height:33px;'>任务已经满员，是否无赏参与</p>",
              showCloseBtn: false
            })
            .then(async () => {
              this.handleSignUp();
              this.loading = true;
            })
            .catch(() => {
              this.loading = false;
            });
      });
    },
    handleSignUp() {
      this.$emit("signUp");
    },
    handleCancle() {
      this.$emit("update:showDialog", false);
    },
    goJoinDesigner() {
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
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 50px;
        background-color: #ffffff;
        .body__heart {
          position: absolute;
          top: 50px;
          left: 404px;
          width: fit-content;
          height: 67px;
          font-weight: 600;
          font-size: 48px;
          line-height: 67px;
          text-align: center;
          color: #e95352;
        }
        .body__img-container {
          width: 150px;
          height: 150px;
          margin-bottom: 40px;
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
            position: relative;
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
              .body__btn-tips {
                position: absolute;
                top: -24px;
                left: 50%;
                transform: translateX(-50%);
                height: 24px;
                width: -webkit-fit-content;
                width: -moz-fit-content;
                width: fit-content;
                padding: 0 6px;
                margin: 0 auto;
                border: 2px solid #f0f0f0;
                border-bottom: none;
                color: #ff3738;
                font-weight: 600;
                font-size: 12px;
                line-height: 24px;
                -webkit-clip-path: polygon(
                  0 2px,
                  2px 2px,
                  2px 0,
                  calc(100% - 2px) 0,
                  calc(100% - 2px) 2px,
                  100% 2px,
                  100% 100%,
                  0 100%
                );
                clip-path: polygon(
                  0 2px,
                  2px 2px,
                  2px 0,
                  calc(100% - 2px) 0,
                  calc(100% - 2px) 2px,
                  100% 2px,
                  100% 100%,
                  0 100%
                );
              }
            }
          }
        }
      }
    }
  }
}
</style>

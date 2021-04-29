<template>
  <div class="feedback-container">
    <div class="feedback-btn" @click="handleToggleVisible">
      <i :class="['mail-icon', visible ? 'active' : '']"></i>
    </div>
    <div class="feedback-content" v-if="visible">
      <div class="step-comment step" v-if="step === 1">
        <div class="step-comment-header">
          <h3 class="step-comment-title">
            想对斗西和女团说的话 ❤️
          </h3>
          <p class="step-comment-desc">
            本次课程已经顺利结束啦，在跟斗西老师和女团们一块学习的这段日子，是否收获颇丰？
          </p>
          <p class="step-comment-desc">
            现在，你可以写下你想对斗西和女团说的话，他们每一条都会认真阅读哒
            ：）
          </p>
        </div>
        <div class="step-comment-content">
          <el-input
            class="step-comment-textarea"
            type="textarea"
            resize="none"
            placeholder="我想说..."
            v-model.trim="comment"
          ></el-input>
        </div>
        <div class="step-comment-footer">
          <div class="step-comment-footer_left">
            <i
              :class="['step-comment-avatar', `avatar-${index}`]"
              v-for="index of 6"
              :key="index"
            ></i>
          </div>
          <div class="step-comment-footer_right" @click="handleSendFeedback">
            <label>寄出</label>
            <i class="next-icon"></i>
          </div>
        </div>
      </div>
      <div class="step-like step" v-if="step === 2">
        <div class="step-like-header">
          <i class="step-like-envelope"></i>
          <p class="step-like-desc">
            信笺已收到
          </p>
          <h3 class="step-like-title">
            为课程打个分吧
          </h3>
        </div>
        <div class="step-like-content">
          <div class="step-like-wrapper">
            <el-rate
              v-model="score"
              :icon-classes="[
                'step-like-icon_hover',
                'step-like-icon_hover',
                'step-like-icon_active'
              ]"
              void-icon-class="step-like-icon"
            >
            </el-rate>
          </div>
          <p class="step-like-tips">
            {{ score > 0 ? tips[score] : "" }}
          </p>
        </div>
        <div class="step-like-footer">
          <div class="step-like-btn" @click="handleSendFeedback">
            提交
          </div>
        </div>
      </div>
      <div class="step-complete step" v-if="step === 3">
        <div class="step-complete-header">
          <div class="step-complete-avatar_wrapper">
            <i
              :class="['step-complete-avatar', `avatar-${index}`]"
              v-for="index of 3"
              :key="index"
            ></i>
          </div>
          <div class="step-complete-avatar_wrapper">
            <i
              :class="['step-complete-avatar', `avatar-${index + 3}`]"
              v-for="index of 3"
              :key="index"
            ></i>
          </div>
        </div>
        <div class="step-complete-content">
          <h3 class="step-complete-title">
            感谢反馈
          </h3>
          <p class="step-complete-desc">
            斗西和女团会继续加油的 😊
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import termService from "service/term";

export default {
  name: "TermFeedback",
  data() {
    return {
      visible: false,
      step: 1,
      comment: "",
      score: 0,
      sending: false,
      tips: {
        1: "还行，送出一朵花",
        2: "挺好，请喝杯咖啡",
        3: "不错，每人送一个包包",
        4: "真棒，疯狂打call！",
        5: "太厉害啦，请原地出道！"
      }
    };
  },
  methods: {
    handleToggleVisible() {
      this.visible = !this.visible;
      this.step = 1;
      this.comment = "";
      this.score = 0;
    },
    handleNext() {
      this.step < 3 && this.step++;
    },
    handleSendFeedback() {
      const { step, comment, score, sending } = this;
      if ((step === 1 && !comment) || (step === 2 && !score)) {
        return;
      }
      if (sending) {
        this.$notice({
          type: "warning",
          title: "请耐心等待"
        });
        return;
      }
      this.sending = true;
      console.log(this.$route.params.id);
      termService
        .termFeedback(this.$route.params.id, {
          comment: this.comment,
          score: this.score
        })
        .then(() => {
          this.handleNext();
        })
        .finally(() => {
          this.sending = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.feedback-container {
  position: fixed;
  right: calc(50vw - 600px - 10px - 64px);
  bottom: 120px;

  .feedback-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background: #111;
    border-radius: 50%;
    cursor: pointer;
    .mail-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-image: url("~images/term/mail.svg");
      background-size: cover;
      background-repeat: no-repeat;

      &.active {
        background-image: url("~images/term/mail_active.svg");
      }
    }
  }

  .feedback-content {
    position: absolute;
    right: 84px;
    bottom: 0;
    width: 364px;
    height: 435px;
    padding: 20px 20px 33px;
    background: #fafbfa;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    user-select: none;
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 8px;
      height: 14px;
      content: "";
      background: #fafbfa;
      z-index: 1;
    }

    &::after {
      position: absolute;
      left: 100%;
      bottom: 0;
      width: 0;
      height: 0;
      content: "";
      border-top: 7px solid transparent;
      border-bottom: 7px solid #fafbfa;
      border-left: 10px solid #fafbfa;
      border-right: 10px solid transparent;
      filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.1));
    }
    .step {
      width: 100%;
      height: 100%;
    }
    .step-comment {
      .step-comment-title {
        line-height: 34px;
        font-weight: 600;
        font-size: 24px;
        color: #2c3330;
      }
      .step-comment-desc {
        margin-top: 14px;
        line-height: 20px;
        font-size: 14px;
        color: #666666;
      }
      .step-comment-content {
        margin-top: 23px;
        width: 100%;
        height: 140px;
        /deep/ .step-comment-textarea {
          width: 100%;
          height: 100%;
          .el-textarea__inner {
            width: 100%;
            height: 100%;
            padding: 16px;
            line-height: 20px;
            font-weight: normal;
            font-size: 14px;
            color: #2c3330;
            background: #fff;
            border-color: #fff;
            &::placeholder {
              color: #c8d0cc;
            }
          }
        }
      }
      .step-comment-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 44px;
        .step-comment-footer_left {
          flex: 1;
          width: 240px;
        }
        .step-comment-avatar {
          display: inline-block;
          width: 40px;
          height: 40px;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .step-comment-footer_right {
          flex: none;
          display: flex;
          align-items: center;
          line-height: 24px;
          font-weight: 500;
          font-size: 16px;
          color: #2c3330;
          cursor: pointer;
          .next-icon {
            display: inline-block;
            margin-left: 4px;
            width: 24px;
            height: 24px;
            background: url("~images/term/next.svg") no-repeat;
          }
        }
      }
    }
    .step-like {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .step-like-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .step-like-envelope {
          display: inline-block;
          width: 42px;
          height: 32px;
          background-image: url("~images/term/envelope.svg");
          background-repeat: no-repeat;
          background-size: cover;
        }
        .step-like-desc {
          margin-top: 12px;
          line-height: 22px;
          font-size: 16px;
          color: #2c3330;
        }
        .step-like-title {
          margin-top: 16px;
          line-height: 34px;
          font-weight: 600;
          font-size: 24px;
          color: #2c3330;
        }
      }
      .step-like-content {
        margin-top: 24px;
        .step-like-wrapper {
          /deep/ .el-rate {
            height: 32px;
            .el-rate__icon {
              display: inline-block;
              width: 32px;
              height: 32px;
              mask-image: url("~images/term/like.svg");
              mask-repeat: no-repeat;
              mask-size: cover;
              background-color: #c8d0cc;
              cursor: pointer;
              &.step-like-icon {
              }
              & + .el-rate__icon {
                margin-left: 4px;
              }
              &.step-like-icon_active,
              &.step-like-icon_hover {
                background-color: @primaryColor;
              }
            }
          }
        }
        .step-like-tips {
          margin-top: 16px;
          min-height: 17px;
          line-height: 17px;
          font-size: 12px;
          color: #606c66;
          text-align: center;
        }
      }
      .step-like-footer {
        margin-top: 24px;
        .step-like-btn {
          width: 108px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          color: #fff;
          background: @primaryColor;
          cursor: pointer;
        }
      }
    }
    .step-complete {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .step-complete-header {
        .step-complete-avatar_wrapper {
          & + .step-complete-avatar_wrapper {
            margin-top: 8px;
          }
        }
        .step-complete-avatar {
          display: inline-block;
          width: 60px;
          height: 60px;
          background-size: cover;
          background-repeat: no-repeat;
          &:nth-child(2) {
            margin: 0 8px;
          }
        }
      }
      .step-complete-content {
        margin-top: 48px;
        text-align: center;
        .step-complete-title {
          line-height: 45px;
          font-weight: 600;
          font-size: 32px;
          color: #2c3330;
        }
        .step-complete-desc {
          margin-top: 11px;
          line-height: 22px;
          font-size: 16px;
          color: #606c66;
        }
      }
    }
  }
}
.avatar-1 {
  background-image: url("~images/term/avatar-1.png");
}
.avatar-2 {
  background-image: url("~images/term/avatar-2.png");
}
.avatar-3 {
  background-image: url("~images/term/avatar-3.png");
}
.avatar-4 {
  background-image: url("~images/term/avatar-4.png");
}
.avatar-5 {
  background-image: url("~images/term/avatar-5.png");
}
.avatar-6 {
  background-image: url("~images/term/avatar-6.png");
}
</style>

<template>
  <div class="feedback-container">
    <div class="feedback-btn" @click="handleToggleVisible">
      <i
        :class="[
          'mail-icon',
          visible ? 'active' : '',
          step === 3 ? 'completed' : ''
        ]"
      ></i>
    </div>
    <div
      class="feedback-dialog-mask"
      v-if="visible"
      @click="handleToggleVisible"
    >
      <div class="feedback-dialog">
        <div class="feedback-content" @click.stop="">
          <div class="step-comment step" v-if="step === 1">
            <div class="step-comment-left">
              <div class="step-comment-left_header">
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
              <div class="step-comment-left_footer">
                <i
                  :class="['step-comment-avatar', `avatar-${index}`]"
                  v-for="index of 6"
                  :key="index"
                ></i>
              </div>
            </div>
            <div class="step-comment-right">
              <div class="step-comment-right_content">
                <el-input
                  class="step-comment-textarea"
                  type="textarea"
                  resize="none"
                  placeholder="我想说..."
                  v-model="content"
                ></el-input>
                <div class="step-comment-images">
                  <div
                    class="step-comment-image_wrapper"
                    v-for="(image, index) of images"
                    :key="image"
                  >
                    <the-loading-image
                      class="step-comment-image"
                      :width="48"
                      :height="48"
                      :url="image"
                    />
                    <i
                      class="step-comment-image_delete"
                      @click="handleImageRemove(index)"
                    >
                    </i>
                  </div>
                  <div class="step-comment-image_wrapper">
                    <upload-image
                      v-if="images.length < 3"
                      class="step-comment-upload "
                      folder="feedback"
                      @added="handleAddImages"
                    />
                  </div>
                </div>
              </div>
              <div
                class="step-comment-right_footer"
                @click="handleSendFeedback"
              >
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
            <i class="step-complete-close" @click="visible = false"></i>
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
    </div>
  </div>
</template>

<script>
import UploadImage from "components/UploadImage";
import TheLoadingImage from "components/TheLoadingImage";
export default {
  components: { UploadImage, TheLoadingImage },
  name: "TermFeedback",
  props: {
    defaultComment: {
      type: String
    },
    defaultScore: {
      type: Number
    }
  },
  data() {
    return {
      visible: false,
      step: 1,
      content: "",
      images: [],
      score: this.defaultScore,
      tips: {
        1: "还行，送出一朵花",
        2: "挺好，请喝杯咖啡",
        3: "不错，每人送一个包包",
        4: "真棒，疯狂打call！",
        5: "太厉害啦，请原地出道！"
      }
    };
  },
  created() {
    this.init();
  },
  watch: {
    defaultComment(val) {
      if (val) {
        const comment = JSON.parse(val);
        this.content = comment.content;
        this.images = comment.images;
      }
      this.init();
    },
    defaultScore(val) {
      this.score = val;
      this.init();
    }
  },
  methods: {
    init() {
      if (this.defaultComment) {
        this.step = 2;
      }
      if (this.defaultComment && this.defaultScore > 0) {
        this.step = 3;
      }
    },
    handleToggleVisible() {
      this.visible = !this.visible;
    },
    handleAddImages(url) {
      this.images.push(url);
    },
    handleImageRemove(index) {
      this.images.splice(index, 1);
    },
    handleNext() {
      this.step < 3 && this.step++;
    },
    handleSendFeedback() {
      const { step, content, images, score } = this;
      if ((step === 1 && !content.trim()) || (step === 2 && !score)) {
        return;
      }
      this.$emit("feedback", {
        comment: JSON.stringify({
          content: content.trim(),
          images
        }),
        score: score
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.feedback-container {
  position: fixed;
  right: calc(50vw - 600px - 10px - 50px);
  bottom: 180px;
  z-index: 10;
  .feedback-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: #ff7940;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;

    &:hover {
      background: #f56122;
    }
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
      &.completed {
        background-image: url("~images/term/mail_completed.svg");
      }
    }
  }
  .feedback-dialog-mask {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    .feedback-dialog {
      position: relative;
      width: 770px;
      height: 376px;
      .feedback-content {
        width: 100%;
        height: 100%;
        padding: 40px 40px 32px;
        background: #fafbfa;
        user-select: none;
        .step {
          width: 100%;
          height: 100%;
        }
        .step-comment {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          .step-comment-left {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            width: 324px;
            height: 100%;
            .step-comment-left_header {
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
            }
            .step-comment-left_footer {
              .step-comment-avatar {
                display: inline-block;
                width: 40px;
                height: 40px;
                background-size: cover;
                background-repeat: no-repeat;
              }
            }
          }
          .step-comment-right {
            margin-left: 40px;
            width: 326px;
            .step-comment-right_content {
              width: 100%;
              height: 264px;
              padding: 16px;
              background: #fff;
              /deep/ .step-comment-textarea {
                width: 100%;
                height: 176px;
                .el-textarea__inner {
                  width: 100%;
                  height: 100%;
                  padding: 0;
                  line-height: 20px;
                  font-weight: normal;
                  font-size: 14px;
                  color: #2c3330;
                  background: transparent;
                  border-color: transparent;
                  &::placeholder {
                    color: #c8d0cc;
                  }
                }
              }
              .step-comment-images {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-top: 8px;
                width: 100%;
                height: 48px;
                .step-comment-image_wrapper {
                  position: relative;
                }
                .step-comment-image_wrapper + .step-comment-image_wrapper {
                  margin-left: 8px;
                }
                /deep/ .step-comment-upload {
                  .add-image {
                    width: 48px;
                    height: 48px;
                    background: #fff;
                    border: 1px dashed #c8d0cc;
                    img {
                      width: 16px;
                      height: 16px;
                    }
                  }
                }
                .step-comment-image_delete {
                  display: inline-block;
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 16px;
                  height: 16px;
                  background-image: url("~images/term/del.svg");
                  background-size: cover;
                  background-repeat: no-repeat;
                  cursor: pointer;
                }
              }
            }
            .step-comment-right_footer {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              margin-top: 16px;
              line-height: 24px;
              font-weight: 500;
              font-size: 16px;
              color: #2c3330;
              cursor: pointer;
              label {
                cursor: pointer;
              }
              .next-icon {
                display: inline-block;
                margin-left: 4px;
                width: 24px;
                height: 24px;
                background: url("~images/term/next.svg") no-repeat;
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
          .step-complete-close {
            display: inline-block;
            position: absolute;
            right: 16px;
            top: 16px;
            width: 16px;
            height: 16px;
            background-image: url("~images/term/close.svg");
            background-repeat: no-repeat;
            background-size: cover;
            cursor: pointer;
          }
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
            margin-top: 34px;
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

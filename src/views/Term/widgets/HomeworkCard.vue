<template>
  <div :class="['homework-card']">
    <div class="homework-info" @click="fold = !fold">
      <img
        class="score-icon"
        v-if="homework.user_homework && homework.user_homework.status === 2"
        :src="USER_HOMEWORK_SCORE[homework.user_homework.score]"
      />
      <div
        class="reject-tips"
        v-if="homework.user_homework && homework.user_homework.status === 3"
      >
        <div class="tips-wrapper">
          <img class="warning-icon" src="~images/danger-warning.png" />
          <label class="tips"> 作业被驳回了，请按照老师要求重新提交吧！</label>
        </div>
        <img src="~images/term/rejected.svg" />
      </div>
      <div class="expired-tips" v-if="!homework.user_homework && isExpired">
        <div class="tips-wrapper">
          <label class="tips"> 错过提交时间,下次早点来!</label>
        </div>
        <img src="~images/term/expired.svg" />
      </div>
      <div class="homework-name-wrapper">
        <h4 class="homework-name">
          {{ homework.name }}
        </h4>
        <label
          :class="{
            'homework-status': true,
            unsubmit: !homework.user_homework && !isExpired,
            expired: !homework.user_homework && isExpired,
            uncorrected:
              homework.user_homework &&
              (homework.user_homework.status === 0 ||
                homework.user_homework.status === 1),
            corrected:
              homework.user_homework && homework.user_homework.status === 2,
            rejected:
              homework.user_homework && homework.user_homework.status === 3
          }"
        >
          {{
            homework.user_homework
              ? HOMEWORK_STATUS[homework.user_homework.status]
              : isExpired
              ? "已截止"
              : "待提交"
          }}
        </label>
      </div>
      <div class="homework-time-wrapper">
        <span class="homework-start">
          <!-- <span @click.stop="showTips">
            <icon-svg svg-class="clock-icon"
                      svg-name="clock" />
          </span> -->
          最佳日期<span class="bold">{{
            formatDate(homework.best_at, "YYYY.MM.DD")
          }}</span>
        </span>
        <span class="homework-end"
          >截止日期
          <span class="bold">
            {{ formatDate(homework.end_at, "YYYY.MM.DD") }}
            <template v-if="formNowFormatDay(homework.end_at) > -1">
              剩余
              <span class="homework-rest">
                {{
                  formNowFormatDay(homework.end_at) > 0
                    ? formNowFormatDay(homework.end_at)
                    : countDownTime
                }}
                天
              </span>
            </template>
          </span>
        </span>
      </div>
    </div>
    <div class="fold-wrapper" v-show="fold">
      <div class="homework-desc-wrapper">
        <div class="homework-whole">
          <label class="homework-label">
            作业要求：
          </label>
          <el-button
            class="homework-submit-btn"
            type="primary"
            :disabled="
              (!homework.user_homework && isExpired) ||
                (homework.user_homework && homework.user_homework.status !== 3)
            "
            @click="handleSubmitClick"
          >
            {{
              homework.user_homework && homework.user_homework.status === 3
                ? "重新提交"
                : !homework.user_homework
                ? "上传作业"
                : "作业已提交"
            }}
          </el-button>
          <div class="homework-desc-content">
            <the-fold :isFold="fold">
              <slot>
                <div
                  class="homework-desc-content_info"
                  v-html="homework.description"
                ></div>
              </slot>
            </the-fold>
          </div>
        </div>
      </div>
      <div
        class="homework-desc-wrapper homework-submit-wrapper"
        v-if="homework.user_homework"
      >
        <div class="homework-desc">
          <label class="homework-label">
            设计方案与阐述：
          </label>
        </div>
        <div class="homework-plan-card">
          <div class="card-left">
            <the-loading-image
              :url="homework.user_homework.study_design_pic"
              :width="200"
              :height="200"
            />
          </div>
          <div class="card-right">
            <h4 class="card-name">
              {{ homework.user_homework.study_design_name }}
            </h4>
            <div class="card-desc">
              <div>
                <span class="card-type">
                  {{ parseInt(homework.user_homework.study_design_src_area) }}㎡
                </span>
                <span class="card-structure">
                  {{ homework.user_homework.study_design_spec_name }}
                </span>
              </div>
              <span class="card-address">
                <i class="el-icon-location-outline"></i>
                {{ homework.user_homework.study_design_city }}
                {{ homework.user_homework.study_design_comm_name }}
              </span>
            </div>
          </div>
        </div>
        <div class="homework-desc-content">
          <the-fold :maxHeight="224" :isFold="fold">
            <div class="homework-desc-content_info">
              <div class="homework-desc-info">
                <p v-for="(desc, key) of q_content.split('\n')" :key="key">
                  {{ desc }}
                </p>
              </div>
              <div class="homework-desc-image" v-if="q_images.length > 0">
                <the-preview-image :srcList="q_images" />
              </div>
            </div>
          </the-fold>
        </div>
      </div>
      <div
        class="homework-reply-wrapper"
        v-if="
          homework.user_homework &&
            (homework.user_homework.status === 2 ||
              homework.user_homework.status === 3)
        "
      >
        <label class="homework-label">作业点评：</label>
        <div class="reply-teacher-info">
          <the-avatar
            :size="46"
            :url="homework.user_homework.teacher.avatar_url"
          />
          <label class="reply-name">
            {{ homework.user_homework.teacher.nickname }}
          </label>
        </div>
        <div class="reply-content-wrapper">
          <the-fold :maxHeight="156" :isFold="fold">
            <div
              class="reply-content"
              v-html="homework.user_homework.a_content"
            ></div>
          </the-fold>
        </div>
      </div>
    </div>
    <label class="fold-label">
      <img
        v-if="!fold"
        @click.stop="fold = true"
        class="unfold-icon"
        src="~images/term/unfold.svg"
      />
      <img
        v-else
        @click.stop="fold = false"
        class="fold-icon"
        src="~images/term/fold.svg"
      />
    </label>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import TheAvatar from "components/TheAvatar";
import ThePreviewImage from "components/ThePreviewImage";
import TheFold from "components/TheFold";
import { formatDate, formNowFormatDay } from "utils/moment";
import { USER_HOMEWORK_SCORE } from "utils/const";
import warningImg from "images/warning.png";

const HOMEWORK_STATUS = {
  0: "待批改",
  1: "待提交", // 保存草稿
  2: "批改完成",
  3: "已驳回，待修改" // 已驳回
};

const HOMEWORK_STATUS_UPLOAD_DISPLAY = {
  0: "作业已提交",
  1: "作业已提交",
  2: "作业已批改",
  3: "重新提交" // 已驳回
};

export default {
  name: "TermHomeworkCard",
  components: {
    TheLoadingImage,
    TheAvatar,
    ThePreviewImage,
    TheFold
  },
  props: {
    homework: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      HOMEWORK_STATUS,
      HOMEWORK_STATUS_UPLOAD_DISPLAY,
      USER_HOMEWORK_SCORE,
      fold: false,
      isExpired: true,
      q_content: "",
      q_images: [],
      countDownTime: "",
      timer: null
    };
  },
  watch: {
    homework(val) {
      this.q_content = "";
      this.q_images = [];
      this.parseContent(val.user_homework && val.user_homework.q_content);
      this.judgeExpired();
    }
  },
  created() {
    this.judgeExpired();
    this.parseContent(
      this.homework.user_homework && this.homework.user_homework.q_content
    );
  },
  methods: {
    formatDate,
    formNowFormatDay,
    judgeExpired() {
      this.isExpired = new Date(this.homework.end_at) <= new Date();
      if (!this.isExpired && formNowFormatDay(this.homework.end_at) < 1) {
        const endTime = new Date(this.homework.end_at).valueOf();
        let dis = endTime - new Date().valueOf();
        this.countDown(dis);
        dis -= 1000;
        this.timer = setInterval(() => {
          this.countDown(dis);
          dis -= 1000;
          if (dis <= 0) {
            clearInterval(this.timer);
            this.timer = null;
            this.judgeExpired();
          }
        }, 1000);
      }
    },
    handleSubmitClick() {
      this.judgeExpired();
      const { user_homework } = this.homework;
      if (!this.isExpired || (user_homework && user_homework.status === 3)) {
        this.$emit("submitClick");
      }
    },
    parseContent(val) {
      try {
        const content = JSON.parse(val);
        this.q_content = content.content || "";
        this.q_images = content.images;
      } catch {
        this.q_content = val || "";
      }
    },
    showTips() {
      this.$msgBox.showMsgBox({
        img: warningImg,
        theme: "img_w_100",
        content:
          '<p style="font-size:20px;line-height:30px;color:#333;text-align:left;"><span style="color:#14AF64FF;">最佳日期</span>之前提交的作业，会被老师们优先批复，并有机会选为案例或神来之笔。一旦超过<span style="color:#D0021BFF;">截止日期</span>，则本节课作业无法提交。（注：不影响下次作业提交）</p>',
        confirmBtnText: "知道了",
        showCancelBtn: false,
        showCloseBtn: false
      });
    },
    countDown(dis) {
      const hour = Math.floor(dis / 1000 / 60 / 60);
      dis -= hour * 1000 * 60 * 60;
      const minute = Math.floor(dis / 1000 / 60);
      dis -= minute * 1000 * 60;
      const second = Math.floor(dis / 1000);
      this.countDownTime = hour + "小时" + minute + "分钟" + second + "秒";
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@leftWidth: 692px;
@leftMarginRight: 20px;
@unsubmit: #61c3d0ff;
@uncorrected: #ffb163ff;
@expired: #a0a0a0ff;
@rejected: #d40000ff;
.homework-card {
  position: relative;
  width: 100%;
  // padding: 0 20px;
  // height: 82px;
  background: #ffffff;
  .homework-info {
    padding: 20px 20px 34px;
    cursor: pointer;
  }
  .homework-name-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .homework-name {
      max-width: 690px;
      line-height: 20px;
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .homework-status {
      position: relative;
      margin-left: 15px;
      padding: 4px 12px 4px 20px;
      line-height: 16px;
      font-size: 12px;
      font-weight: 400;
      border-radius: 12px;
      &.unsubmit {
        color: #e6752a;
        background: #f9f3ef;
        &::after {
          position: absolute;
          left: 10px;
          top: 9px;
          width: 4px;
          height: 4px;
          content: "";
          background: #e6752a;
          border: 1px solid #fff;
          border-radius: 50%;
        }
      }
      &.expired {
        padding: 4px 12px;
        color: #606c66;
        background: #f4f4f4;
      }
      &.uncorrected {
        color: #4c5adc;
        background: #eff0f9;
        &::after {
          position: absolute;
          left: 10px;
          top: 9px;
          width: 4px;
          height: 4px;
          content: "";
          background: #4c5adc;
          border: 1px solid #fff;
          border-radius: 50%;
        }
      }
      &.corrected {
        color: @primaryColor;
        background: #e7f9f2;
        &::after {
          position: absolute;
          left: 5px;
          top: 6px;
          content: url("~images/term/tick.svg");
        }
      }
      &.rejected {
        color: #c84c4c;
        background: #fcecec;
        &::after {
          position: absolute;
          left: 10px;
          top: 9px;
          width: 4px;
          height: 4px;
          content: "";
          background: #c84c4c;
          border: 1px solid #fff;
          border-radius: 50%;
        }
      }
    }
  }
  .homework-time-wrapper {
    height: 14px;
    line-height: 1;
    font-size: 14px;
    font-weight: 400;
    .homework-start {
      padding: 8px;
      background-color: #eff9f4;
      color: @primaryColor;
      &::before {
        position: relative;
        top: 3px;
        content: url("~images/term/best-before.svg");
      }

      .clock-icon {
        display: inline-block;
        margin-right: 6px;
        font-size: 17px;
      }
    }
    .homework-end {
      display: inline-block;
      padding: 8px;
      margin-left: 15px;
      color: #606c66;
      background-color: #f4f4f4;
      &::before {
        position: relative;
        top: 3px;
        margin-right: 4px;
        content: url("~images/term/deadline.svg");
      }
      .homework-rest {
        margin: 0px 2px;
      }
    }
  }
  .fold-wrapper {
    padding: 0 20px 26px;
  }
  .homework-desc-wrapper {
    padding: 20px 0;
    min-height: 64px;
    border-top: 1px dashed #e6e6e6ff;
    .homework-whole {
      position: relative;
      margin-top: 14px;
      width: 100%;
    }
    .homework-desc {
      width: calc(50% - @leftMarginRight);
      margin-right: @leftMarginRight;
      .homework-desc-content {
        &::after {
          position: absolute;
          top: 7px;
          right: -10px;
          content: "";
          width: 0px;
          height: 0px;
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-left: 10px solid #f5f5f5ff;
          font-size: 0px;
          line-height: 0px;
        }
      }
    }
    .homework-desc-content {
      position: relative;
      width: 100%;
      min-height: 75px;
      background: #fafafa;

      .homework-desc-content_info {
        padding: 10px;
      }
    }
    .homework-desc-image {
      margin-top: 10px;
    }
  }
  .homework-reply-wrapper {
    margin: 0 0 40px;
    padding: 20px 0;
    width: 100%;
    border-top: 1px dashed #e6e6e6ff;
    .reply-teacher-info {
      display: flex;
      align-items: center;
      .reply-name {
        display: inline-block;
        margin-left: 7px;
      }
    }
    .reply-content-wrapper {
      margin-top: 12px;
      position: relative;
      min-height: 156px;
      background: #fafafa;
      &::after {
        position: absolute;
        top: -10px;
        left: 15px;
        content: "";
        width: 0px;
        height: 0px;
        border-bottom: 10px solid #f5f5f5ff;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        font-size: 0px;
        line-height: 0px;
      }
      .reply-content {
        padding: 10px;
      }
      label {
        line-height: 20px;
        font-size: 12px;
        font-weight: 400;
        color: #747474;
      }
      p {
        margin-top: 4px;
        line-height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: #ababab;
      }
    }
  }
  .homework-desc-content,
  .reply-content-wrapper {
    font-weight: 400;
  }
  .homework-label {
    display: inline-block;
    margin-bottom: 10px;
    line-height: 17px;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
  .homework-submit-wrapper {
    .homework-desc-content {
      min-height: 224px !important;
    }
    .homework-plan-card {
      display: flex;
      margin: 12px 0px 12px;
      width: 100%;
      height: 216px;
      padding: 8px;
      background: #fafafa;
      .card-left {
        width: 200px;
        height: 200px;
        margin-right: 20px;
      }
      .card-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 0 18px;
        .card-name {
          font-size: 18px;
          font-weight: bold;
          color: #333333;
        }
        .card-desc {
          display: flex;
          flex-direction: column;
          line-height: 18px;
          font-size: 12px;
          font-weight: 400;
          color: #ababab;
          label {
            font-size: 14px;
            font-weight: 400;
            color: #787878;
          }
          span {
            display: inline-block;
            margin-top: 10px;
          }
          .card-type {
            margin-right: 10px;
            &::before {
              position: relative;
              top: 3px;
              content: url("~images/term/area.svg");
            }
          }
          .card-structure {
            &::before {
              position: relative;
              top: 3px;
              content: url("~images/term/structure.svg");
            }
          }
        }
      }
    }
  }
}
.homework-submit-btn {
  position: absolute;
  top: -14px;
  right: 0;
  padding: 7px 23px;
  line-height: 1;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  background: #14af64;
  border-radius: unset;
  &.is-disabled,
  &.is-disabled:hover,
  &.is-disabled:focus,
  &.is-disabled:active {
    background: #d0d0d0;
    border-color: #d0d0d0;
    color: #fff;
  }
}
.fold-label {
  position: absolute;
  right: 21px;
  bottom: 24px;
  height: 16px;
  cursor: pointer;
  .unfold-icon,
  .fold-icon {
    width: 24px;
    height: 24px;
  }
}
.score-icon {
  position: absolute;
  top: 11px;
  right: 11px;
  width: 71.25px;
  height: 50px;
}
.expired-tips {
  position: absolute;
  top: 11px;
  right: 11px;
  display: flex;
  align-items: flex-start;
  .tips-wrapper {
    position: relative;
    display: inline-block;
    margin: 7px 1px 0 0;
    padding: 0 5px;
    // width: 272px;
    height: 23px;
    line-height: 22.5px;
    font-size: 12px;
    font-weight: 400;
    color: @expired;
    border: 1px solid @expired;
    border-right: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    &::after {
      position: absolute;
      top: 2.5px;
      right: -7.5px;
      display: inline-block;
      border-bottom: 1px solid;
      border-left: 1px solid;
      width: 14.5px;
      height: 14.5px;
      border-color: @expired;
      transform: rotate(-135deg);
      content: "";
    }
  }
  img {
    width: 71.25px;
    height: 50px;
  }
}
.reject-tips {
  position: absolute;
  top: 11px;
  right: 11px;
  display: flex;
  align-items: flex-start;
  .tips-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    display: inline-block;
    margin: 7px 1px 0 0;
    padding: 0 5px;
    // width: 272px;
    height: 23px;
    line-height: 23px;
    font-size: 12px;
    font-weight: 400;
    color: @rejected;
    border: 1px solid @rejected;
    border-right: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    &::after {
      position: absolute;
      top: 2.5px;
      right: -7.5px;
      display: inline-block;
      border-bottom: 1px solid;
      border-left: 1px solid;
      width: 14.5px;
      height: 14.5px;
      border-color: @rejected;
      transform: rotate(-135deg);
      content: "";
    }
    .warning-icon {
      width: 18px;
      height: 18px;
      vertical-align: -4px;
    }
    .tips {
      flex: 1;
    }
  }
  img {
    width: 71.25px;
    height: 50px;
  }
}
.pointer {
  cursor: pointer;
}
</style>

<style lang="less">
.homework-card {
  img {
    max-width: 100%;
  }
  ul li {
    list-style: disc;
  }
  ul,
  ol {
    margin-left: 20px;
  }
  ol,
  ol li {
    list-style: decimal;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    font-size: 0.67em;
  }

  h5 {
    font-size: 0.83em;
  }

  h4 {
    font-size: 1em;
  }

  h3 {
    font-size: 1.17em;
  }

  h2 {
    font-size: 1.5em;
  }

  h1 {
    font-size: 2em;
  }
}

a {
  text-decoration: none;
}

.ql-syntax {
  background-color: #23241f;
  color: #f8f8f2;
  overflow: visible;
  white-space: pre-wrap;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 5px 10px;
  border-radius: 3px;
}

blockquote {
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}

.ql-align-justify {
  text-align: justify;
}

.ql-align-right {
  text-align: right;
}

.ql-align-center {
  text-align: center;
}

.ql-size-huge {
  font-size: 2.5em;
}

.ql-size-large {
  font-size: 1.5em;
}

.ql-size-small {
  font-size: 0.75em;
}

.ql-direction-rtl {
  direction: rtl;
}

.ql-font-serif {
  font-family: Georgia, Times New Roman, serif;
}

.ql-font-monospace {
  font-family: Monaco, Courier New, monospace;
}

.ql-indent-8 {
  padding-left: 24em;
}

.ql-indent-7 {
  padding-left: 21em;
}

.ql-indent-6 {
  padding-left: 18em;
}

.ql-indent-5 {
  padding-left: 15em;
}

.ql-indent-4 {
  padding-left: 12em;
}

.ql-indent-3 {
  padding-left: 9em;
}

.ql-indent-2 {
  padding-left: 6em;
}

.ql-indent-1 {
  padding-left: 3em;
}
.bold {
  margin-left: 4px;
  font-weight: 600;
}
</style>

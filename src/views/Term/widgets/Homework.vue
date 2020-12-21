<template>
  <div class="homework-card">
    <img
      class="score-icon"
      v-if="homework.user_homework && homework.user_homework.teacher_id && fold"
      :src="USER_HOMEWORK_SCORE[homework.user_homework.score]"
    />
    <div
      class="expired-tips"
      v-if="!homework.user_homework && isExpired && fold"
    >
      <img src="~images/expired.png" />
      <label>错过提交时间,下次早点来!</label>
    </div>
    <div class="homework-info">
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
              homework.user_homework && homework.user_homework.status === 0,
            corrected:
              homework.user_homework && homework.user_homework.status !== 0
          }"
        >
          {{
            homework.user_homework
              ? HOMEWORK_STATUS[homework.user_homework.status]
              : isExpired
              ? "已过期"
              : "待提交"
          }}
        </label>
      </div>
      <div class="homework-time-wrapper">
        <span class="homework-end"
          >提交截止日期：{{ formatDate(homework.end_at) }}
        </span>
      </div>
    </div>
    <div class="fold-wrapper" v-show="fold">
      <div class="homework-desc-wrapper">
        <div class="homework-desc">
          <label class="homework-label">
            提交要求：
          </label>
          <div
            class="homework-desc-content"
            v-html="homework.description"
          ></div>
        </div>
        <el-button
          class="homework-submit-btn"
          type="primary"
          :disabled="!!homework.user_homework || isExpired"
          @click="handleSubmitClick"
        >
          上传作业
        </el-button>
      </div>
      <div
        class="homework-desc-wrapper homework-submit-wrapper"
        v-if="homework.user_homework"
      >
        <div class="homework-desc">
          <label class="homework-label">
            小结：
          </label>
          <div class="homework-desc-content">
            {{ homework.user_homework.q_content }}
          </div>
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
              <label>详细信息：</label>
              <span class="card-type">
                {{ parseInt(homework.user_homework.study_design_src_area) }}㎡ |
                {{ homework.user_homework.study_design_spec_name }}
              </span>
              <span class="card-address">
                <i class="el-icon-location-outline"></i>
                {{ homework.user_homework.study_design_city }}
                {{ homework.user_homework.study_design_comm_name }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="homework-reply-wrapper"
        v-if="homework.user_homework && homework.user_homework.teacher_id"
      >
        <the-avatar
          :size="46"
          :url="homework.user_homework.teacher.avatar_url"
        />
        <div class="reply-desc">
          <label class="reply-name">
            {{ homework.user_homework.teacher.nickname }}
          </label>
          <div class="reply-content-wrapper">
            <label>作业批复：</label>
            <p v-html="homework.user_homework.a_content"></p>
          </div>
        </div>
      </div>
    </div>
    <label class="fold-label">
      <span v-if="!fold" @click="fold = true">
        展开
        <icon-svg svg-class="unfold-icon" svg-name="fold" />
      </span>
      <span v-else @click="fold = false">
        收起
        <icon-svg svg-class="fold-icon" svg-name="fold" />
      </span>
    </label>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import TheAvatar from "components/TheAvatar";

import { formatDate } from "utils/moment";
import { USER_HOMEWORK_SCORE } from "utils/const";

const HOMEWORK_STATUS = {
  0: "待批改",
  1: "已批改",
  2: "已驳回"
};
export default {
  name: "TermHomework",
  components: {
    TheLoadingImage,
    TheAvatar
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
      USER_HOMEWORK_SCORE,
      fold: false,
      isExpired: true
    };
  },
  created() {
    this.judgeExpired();
  },
  methods: {
    formatDate,
    judgeExpired() {
      this.isExpired = new Date(this.homework.end_at) <= new Date();
    },
    handleSubmitClick() {
      this.judgeExpired();
      if (!this.isExpired) {
        this.$emit("submitClick");
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@leftWidth: 692px;
@leftMarginRight: 20px;
@unsubmit: #96eeff;
@uncorrected: #ffb163ff;
@expired: #a0a0a0ff;
.homework-card {
  position: relative;
  width: 100%;
  // height: 82px;
  padding: 20px;
  background: #ffffff;
  .homework-name-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 11px;
    .homework-name {
      font-size: 20px;
      font-weight: bold;
      color: #333333;
    }
    .homework-status {
      position: relative;
      margin-left: 15px;
      height: 20px;
      padding: 0 7px;
      line-height: 20px;
      font-size: 12px;
      font-weight: 400;
      color: @unsubmit;
      border: 1px solid @unsubmit;
      &.unsubmit {
        color: @unsubmit;
        border-color: @unsubmit;
        &::after {
          position: absolute;
          left: -4px;
          top: -4px;
          width: 8px;
          height: 8px;
          content: "";
          background: @unsubmit;
          border-radius: 50%;
        }
      }
      &.expired {
        color: @expired;
        border-color: @expired;
      }
      &.uncorrected {
        color: @uncorrected;
        border-color: @uncorrected;
      }
      &.corrected {
        color: @primaryColor;
        border-color: @primaryColor;
      }
    }
  }
  .homework-time-wrapper {
    line-height: 1;
    font-size: 12px;
    font-weight: 400;
    color: #ababab;
  }
  .fold-wrapper {
    margin-bottom: 20px;
  }
  .homework-desc-wrapper {
    margin-top: 16px;
    min-height: 64px;
    display: flex;
    align-items: flex-start;
    .homework-desc {
      position: relative;
      width: @leftWidth;
      margin-right: @leftMarginRight;
      padding: 10px;
      background: #f5f5f5;
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
      .homework-desc-content {
        margin-top: 4px;
        line-height: 17px;
        font-weight: 400;
        color: #ababab;
      }
    }
  }
  .homework-reply-wrapper {
    display: flex;
    margin-top: 20px;
    padding-top: 15px;
    width: 100%;
    border-top: 1px dashed #e6e6e6ff;
    .reply-desc {
      flex: 1;
      margin-left: 20px;
      .reply-name {
        line-height: 20px;
        font-size: 12px;
        font-weight: 400;
        color: #747474;
      }
      .reply-content-wrapper {
        margin-top: 6px;
        position: relative;
        padding: 10px;
        background: #f5f5f5;
        &::after {
          position: absolute;
          top: 7px;
          left: -10px;
          content: "";
          width: 0px;
          height: 0px;
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-right: 10px solid #f5f5f5ff;
          font-size: 0px;
          line-height: 0px;
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
  }
  .homework-label {
    line-height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #747474;
  }
  .homework-submit-wrapper {
    .homework-desc {
      min-height: 192px;
    }
    .homework-plan-card {
      display: flex;
      margin-top: -32px;
      width: 448px;
      height: 224px;
      padding: 10px;
      background: #fbfbfb;
      box-shadow: 0px 0px 12px 0px #cccccc;
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
          line-height: 1;
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
        }
      }
    }
  }
}
.homework-submit-btn {
  padding: 7px 23px;
  line-height: 1;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  background: #14af64;
  border-radius: unset;
}
.fold-label {
  position: absolute;
  right: 21px;
  bottom: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #ababab;
  cursor: pointer;
  .unfold-icon {
    transform: rotate(180deg);
  }
}
.score-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 114px;
  height: 80px;
}
.expired-tips {
  position: absolute;
  top: 50px;
  right: 147px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 114px;
    height: 80px;
  }
  label {
    line-height: 20px;
    font-size: 12px;
    font-weight: 400;
    color: #ababab;
  }
}
</style>

<style lang="less">
.homework-card {
  img {
    max-width: 100%;
  }
  ul,
  ul li {
    list-style: disc;
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
</style>

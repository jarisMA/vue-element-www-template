<template>
  <div class="question-card">
    <div class="card-header">
      <div class="card-header-title">{{ question.title }}</div>
    </div>
    <div class="card-content">
      <template
        v-if="
          [QUESTION_TYPE_QUESTION, QUESTION_TYPE_HELP].indexOf(
            question.type > 0
          )
        "
      >
        <the-loading-image
          v-if="
            question.type === QUESTION_TYPE_HELP &&
              question.layouts.length > 0 &&
              question.layouts[0].image_url
          "
          :width="230"
          :height="230"
          :url="question.layouts[0].image_url"
        />
        <the-loading-image
          v-if="
            question.type === QUESTION_TYPE_QUESTION &&
              question.images.length > 0
          "
          :width="230"
          :height="230"
          :url="question.images[0]"
        />
        <div class="card-content-desc" v-else-if="question.content">
          {{ question.content }}
        </div>
      </template>
    </div>
    <div class="card-footer">
      <div class="card-footer-left">
        <div class="card-footer-avatar">
          <the-avatar :size="20" :url="question.user.avatar_url" />
        </div>
        <span class="card-footer-nickname">{{ question.user.nickname }}</span>
      </div>
      <div class="card-footer-right">
        <div class="card-footer-calc">
          <i class="heat-icon"></i>
          <span class="card-footer-calc_text">{{
            heatCount > 999 ? "999+" : heatCount
          }}</span>
        </div>
        <div class="card-footer-calc">
          <i class="comment-icon"></i>
          <span class="card-footer-calc_text">{{
            question.answer_count + question.comment_count
          }}</span>
        </div>
      </div>
    </div>
    <i class="accepted-icon" v-if="question.accept_id"></i>
  </div>
</template>

<script>
import {
  QUESTION_TYPE_QUESTION,
  QUESTION_TYPE_HELP,
  QUESTION_TYPE_VOTE
} from "utils/const";
import TheLoadingImage from "components/TheLoadingImage";
import TheAvatar from "../../../../../homeplan-admin/src/components/TheAvatar.vue";

export default {
  name: "QuestionCard",
  components: {
    TheLoadingImage,
    TheAvatar
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      QUESTION_TYPE_QUESTION,
      QUESTION_TYPE_HELP,
      QUESTION_TYPE_VOTE
    };
  },
  computed: {
    heatCount() {
      const question = this.question;
      return (
        question.pv * 1 +
        (question.answer_count + question.comment_count) * 10 +
        question.like_count * 5 +
        question.favorite_count * 3
      );
    }
  }
};
</script>

<style lang="less" scoped>
.question-card {
  position: relative;
  width: 262px;
  min-height: 164px;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  .card-header {
    .card-header-title {
      line-height: 24px;
      font-weight: 600;
      font-size: 16px;
      color: #2c3330;
    }
  }
  .card-content {
    min-height: 64px;
    margin-top: 8px;
    .card-content-desc {
      position: relative;
      z-index: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      max-height: 48px;
      line-height: 24px;
      font-size: 14px;
      color: #8ea098;
      overflow: hidden;
    }
  }
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    width: 100%;
    .card-footer-left {
      display: flex;
      align-items: center;
      .card-footer-nickname {
        display: inline-block;
        margin-left: 5px;
        line-height: 1;
        font-size: 12px;
        color: #81948b;
      }
    }
    .card-footer-right {
      display: flex;
      align-items: center;
      .card-footer-calc {
        & + .card-footer-calc {
          margin-left: 8px;
        }
        .heat-icon,
        .comment-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: cover;
          background-repeat: no-repeat;
          vertical-align: bottom;
        }
        .heat-icon {
          background-image: url("~images/question/heat.svg");
        }
        .comment-icon {
          background-image: url("~images/question/comment.svg");
        }
        .card-footer-calc_text {
          display: inline-block;
          margin-left: 2px;
          line-height: 1;
          font-size: 12px;
          color: #2c3330;
        }
      }
    }
  }
  .accepted-icon {
    position: absolute;
    bottom: 56px;
    right: 20px;
    display: inline-block;
    width: 60px;
    height: 60px;
    background: url("~images/question/accepted.svg") no-repeat;
    background-size: cover;
  }
}
</style>

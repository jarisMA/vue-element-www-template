<template>
  <div class="question-card" @click="goQuestionDetail(question.id)">
    <div class="card-top">
      <label class="question-channel">
        <icon-svg svg-class="rz-icon" svg-name="rz"></icon-svg>
        {{ question.channel.name }}
      </label>
      <h3 class="question-title">
        {{ question.title }}
      </h3>
    </div>
    <div class="card-content">
      <div class="question-content" v-if="question.content">
        <p v-for="(item, key) of question.content.split('\n')" :key="key">
          {{ item }}
        </p>
      </div>
      <div class="question-images">
        <the-preview-image width="80px" height="80px" :srcList="images" />
      </div>
    </div>
    <div class="card-bottom">
      <div class="question-user">
        <the-avatar :size="20" :url="question.user.avatar_url" />
        <span
          :class="[
            'user-name',
            userInfo.id === question.user.id ? 'active' : ''
          ]"
          >{{ question.user.nickname }}</span
        >
      </div>
      <ul class="question-status">
        <li
          :class="['like-status', question.isLike ? 'active' : '']"
          @click.stop="handleLikeClick"
        >
          <icon-svg class="like-icon" svg-name="like"></icon-svg>
          好问题
          <span class="status-count">{{ question.like_count }}</span>
        </li>
        <li class="comment-status">
          <icon-svg class="comment-icon" svg-name="comment"></icon-svg>
          <span class="status-count">{{ question.answer_count }}</span
          >条回答
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ThePreviewImage from "components/ThePreviewImage";
import TheAvatar from "components/TheAvatar";
import { mapState } from "vuex";
import { goQuestionDetail } from "utils/routes";

export default {
  name: "QuestionCard",
  components: {
    ThePreviewImage,
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
      images: (this.question.images && this.question.images.split(",")) || []
    };
  },
  watch: {
    question(val) {
      this.images = (val.images && val.images.split(",")) || [];
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    goQuestionDetail,
    handleLikeClick() {
      this.$emit("like");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@duration: 0.2s;
@keyframes likeClick {
  0% {
    top: 0px;
  }
  10% {
    top: -3px;
  }
  20% {
    top: -6px;
  }
  30% {
    top: -9px;
  }
  40% {
    top: -12px;
    transform: rotate(6deg);
  }
  50% {
    top: -15px;
    transform: rotate(12deg);
  }
  60% {
    top: -18px;
    transform: rotate(6deg);
  }
  70% {
    top: -21px;
    transform: rotate(0deg);
  }
  80% {
    top: -24px;
    transform: rotate(-6deg);
  }
  90% {
    top: -27px;
    transform: rotate(-12deg);
  }
  100% {
    top: -30px;
    transform: rotate(-6deg);
  }
}
.question-card {
  padding: 24px 20px;
  background: #fff;
  cursor: pointer;
  .card-top {
    .question-channel {
      line-height: 24px;
      font-size: 14px;
      .rz-icon {
        font-size: 24px;
        color: #606c66;
      }
    }
    .question-title {
      margin-top: 10px;
      line-height: 26px;
      font-weight: bold;
      font-size: 20px;
      color: #111111;
    }
  }
  .card-content {
    margin-top: 20px;
    .question-content {
      margin-bottom: 10px;
      max-height: 42px;
      line-height: 21px;
      font-size: 14px;
      color: #111111;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .card-bottom {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .question-user {
      display: flex;
      align-items: center;
      .user-name {
        display: inline-block;
        margin-left: 7px;
        line-height: 18px;
        font-size: 12px;
        font-weight: normal;
        color: #81948b;
        &.active {
          color: @primaryColor;
        }
      }
    }
    .question-status {
      display: flex;
      .like-status,
      .comment-status {
        line-height: 24px;
        font-size: 14px;
        color: #81948b;
        transition: all @duration;
        cursor: pointer;
        // &:hover {
        //   color: @primaryColor;
        //   .like-icon,
        //   .comment-icon {
        //     fill: @primaryColor;
        //     stroke: @primaryColor;
        //   }
        // }
        &.active {
          color: @primaryColor;
          .like-icon,
          .comment-icon {
            fill: @primaryColor;
            stroke: @primaryColor;
          }
          .like-icon {
            animation: likeClick @duration 1;
          }
        }
        .status-count {
          display: inline-block;
          margin: 0 5px;
        }
      }
      .like-status {
        margin-right: 20px;
        .status-count {
          margin-right: 0;
        }
      }
      .like-icon,
      .comment-icon {
        display: inline-block;
        margin-right: 5px;
        font-size: 24px;
        vertical-align: -6px;
        fill: #81948b;
        stroke: #81948b;
        transition: all @duration;
      }
    }
  }
}
</style>

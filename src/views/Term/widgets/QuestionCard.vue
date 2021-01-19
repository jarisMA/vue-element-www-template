<template>
  <div class="question-card">
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
        <the-avatar :url="question.user.avatar_url" />
        <span>{{ question.user.nickname }}</span>
      </div>
      <ul class="question-status">
        <li>好问题 {{ question.like_count }}</li>
        <li>{{ question.answer_count }} 条回答</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ThePreviewImage from "components/ThePreviewImage";
import TheAvatar from "components/TheAvatar";

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
  }
};
</script>

<style lang="less" scoped>
.question-card {
  padding: 24px 20px;
  background: #fff;
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
  }
}
</style>

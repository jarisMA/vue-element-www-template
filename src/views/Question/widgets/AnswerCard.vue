<template>
  <div class="answer-card">
    <div class="card-top">
      <the-avatar :size="40" :url="answer.user.avatar_url" />
      <div class="user-content">
        <span class="user-name">{{ answer.user.nickname }}</span>
        <div class="create-time">{{ answer.created_at }}</div>
      </div>
    </div>
    <div class="card-content">
      <div class="content" v-html="answer.content"></div>
    </div>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";

export default {
  name: "QuestionAnswerCard",
  components: {
    TheAvatar
  },
  props: {
    answer: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.answer-card {
  padding: 20px;
  background: #fff;
  .card-top {
    display: flex;
    align-items: center;
    .user-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 14px;
      .user-name {
        line-height: 24px;
        font-weight: 500;
        font-size: 16px;
        color: #606c66;
      }
      .create-time {
        line-height: 18px;
        font-size: 12px;
        color: #c8d0cc;
      }
    }
  }
  .card-content {
    margin-top: 24px;
  }
}
</style>

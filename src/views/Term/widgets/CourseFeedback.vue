<template>
  <div class="feedback">
    <the-avatar class="feedback-avatar" :size="32" :url="userInfo.avatar_url" />
    <el-input
      :class="['feedback-textarea', focus ? 'focus' : '']"
      type="textarea"
      resize="none"
      placeholder="畅所欲言，跟大家分享一下这节课的收获吧"
      @focus="focus = true"
      @blur="focus = false"
      v-model="content"
    ></el-input>
    <el-button class="feedback-btn" type="primary" @click="handleFeedback"
      >发布</el-button
    >
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import { mapState } from "vuex";
export default {
  name: "TermCourseFeedback",
  components: { TheAvatar },
  computed: {
    ...mapState(["userInfo"])
  },
  data() {
    return {
      focus: false,
      content: ""
    };
  },
  methods: {
    handleFeedback() {
      if (!this.content.trim()) {
        return;
      }
      this.$emit("feedback", this.content);
    }
  }
};
</script>

<style lang="less" scoped>
.feedback {
  display: flex;
  align-items: flex-start;
  width: 100%;
  .feedback-avatar {
    flex: none;
  }
  .feedback-textarea {
    flex: 1;
    margin: 0 16px;
    height: 40px;
    &.focus {
      height: 64px;
    }
    /deep/ .el-textarea__inner {
      padding: 7px;
      height: 100%;
      line-height: 24px;
      font-size: 14px;
      &::placeholder {
        color: #8ea098;
      }
    }
  }
  .feedback-btn {
    flex: none;
    padding: 7px 23px;
    line-height: 24px;
    font-weight: 500;
    font-size: 14px;
  }
}
</style>

<template>
  <div class="feedback">
    <the-avatar class="feedback-avatar" :size="32" :url="userInfo.avatar_url" />
    <el-input
      :class="['feedback-textarea', focus ? 'focus' : '']"
      type="textarea"
      resize="none"
      placeholder="畅所欲言，跟大家分享一下这节课的收获吧"
      :autofocus="false"
      @focus="focus = true"
      @blur="handleBlur"
      v-model="content"
    ></el-input>
    <el-button
      class="feedback-btn"
      type="primary"
      :loading="feedbacking"
      @click="handleFeedback"
      >发布</el-button
    >
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import termService from "service/term";
import { mapState } from "vuex";
export default {
  name: "TermCourseFeedback",
  components: { TheAvatar },
  computed: {
    ...mapState(["userInfo"])
  },
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      focus: false,
      content: "",
      feedbacking: false
    };
  },
  methods: {
    handleFeedback() {
      const content = this.content.trim();
      if (!content) {
        return;
      }
      if (!this.feedbacking) {
        this.feedbacking = true;
        const params = {
          ...this.params,
          content
        };
        termService
          .addTermWidgetFeedback(params)
          .then(res => {
            this.$emit("added", {
              ...params,
              ...res
            });
            this.content = "";
            this.focus = false;
            this.$notice({
              type: "success",
              title: "反馈添加成功"
            });
          })
          .finally(() => {
            this.feedbacking = false;
          });
      }
    },
    handleBlur() {
      if (!this.content.trim()) {
        this.focus = false;
      }
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
      background: #494949;
      color: #dddddd;
      border: unset;
      &::placeholder {
        color: #81948B;
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

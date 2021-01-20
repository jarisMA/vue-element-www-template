<template>
  <div class="answer-rich-text-wrapper">
    <the-rich-text :value.sync="content" placeholder="写回答" />
    <div class="answer-info">
      <div class="answer-user">
        <the-avatar :size="32" :url="userInfo.avatar_url" />
        <span class="user-name">
          {{ userInfo.nickname }}
        </span>
        <!-- <label class="answer-status">
          草稿保存于 8 分钟前
        </label> -->
      </div>
      <div class="answer-submit">
        <!-- <el-select placeholder="设置转载权限">
        </el-select> -->
        <el-button
          class="submit-btn"
          type="primary"
          :loading="submiting"
          @click="submit"
          >发布答案</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import TheRichText from "components/TheRichText";
import TheAvatar from "components/TheAvatar";
import questionService from "service/question";
import { mapState } from "vuex";

export default {
  name: "AnswerRichText",
  components: {
    TheRichText,
    TheAvatar
  },
  data() {
    return {
      content: null,
      submiting: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    submit() {
      if (!this.isEmpty(this.content)) {
        questionService
          .addAnswer(this.$route.params.id, {
            content: this.content
          })
          .then(() => {
            this.$emit("submited");
            this.content = null;
          });
      } else {
        this.$notice({
          type: "danger",
          title: "内容不能为空"
        });
      }
    },
    isEmpty(value) {
      // eslint-disable-next-line
      if (!value || (/^\<p\>\s+\<\/p\>$/.test(value))) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.answer-rich-text-wrapper {
  .answer-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 25px 20px 25px 25px;
  }
  .answer-user {
    display: flex;
    align-items: center;
    .user-name,
    .answer-status {
      margin-left: 10px;
    }
    .user-name {
      line-height: 24px;
      font-weight: 500;
      font-size: 16px;
      color: #606c66;
    }
    .answer-status {
      line-height: 18px;
      font-weight: normal;
      font-size: 12px;
      color: #c8d0cc;
    }
  }
  .submit-btn {
    padding: 8px 24px;
    span {
      line-height: 14px;
      font-weight: normal;
      font-size: 14px;
    }
  }
}
</style>

<template>
  <div class="answer-rich-text-wrapper">
    <the-rich-text
      ref="richText"
      :value.sync="content"
      placeholder="写回答"
      @larger="larger"
    />
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
  props: {
    id: {
      type: Number,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    answer: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      content: this.isEdit
        ? (this.answer && this.answer.content) || null
        : null,
      submiting: false
    };
  },
  watch: {
    isEdit(val) {
      this.content = val ? (this.answer && this.answer.content) || null : null;
    },
    answer(val) {
      this.content = this.isEdit ? (val && val.content) || null : null;
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    submit() {
      if (!this.isEmpty(this.content)) {
        this.submiting = true;
        if (this.isEdit) {
          questionService
            .updateAnswer(this.answer.id, {
              content: this.content
            })
            .then(() => {
              this.$emit("updated", this.content);
              this.content = null;
            })
            .finally(() => {
              this.submiting = false;
            });
        } else {
          questionService
            .addAnswer(this.id, {
              content: this.content
            })
            .then(res => {
              const { id, nickname, avatar_url } = this.userInfo;
              this.$emit("submited", {
                ...res,
                content: this.content,
                auth_like_count: 0,
                comment_count: 0,
                like_count: 0,
                question_id: this.id,
                user: { id, nickname, avatar_url },
                comments: []
              });
              this.content = null;
            })
            .finally(() => {
              this.submiting = false;
            });
        }
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
    },
    focus() {
      this.$nextTick(() => {
        this.$refs["richText"].focus();
      });
    },
    larger() {
      this.$emit("larger");
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

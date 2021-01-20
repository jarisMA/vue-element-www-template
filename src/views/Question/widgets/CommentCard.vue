<template>
  <div class="comment-card">
    <div class="card-left">
      <the-avatar :size="20" :url="comment.user.avatar_url" />
    </div>
    <div class="card-right">
      <div class="comment-detail">
        <div class="card-top">
          <div class="user-info">
            <span class="user-name">{{ comment.user.nickname }}</span>
          </div>
          <div class="time-wrapper">
            {{ comment.created_at }}
          </div>
        </div>
        <div class="card-content">
          <div class="comment-content" v-if="comment.content">
            <p v-for="(item, key) of comment.content.split('\n')" :key="key">
              {{ item }}
            </p>
          </div>
          <div class="comment-images">
            <the-preview-image
              width="60px"
              height="60px"
              :srcList="comment.images"
            />
          </div>
        </div>
        <div class="card-bottom">
          <div
            v-if="allowComment"
            class="reply-operate operate-item"
            @click="commentVisible = true"
          >
            <img src="~images/question/reply.svg" />回复
          </div>
          <div
            class="delete-operate operate-item"
            v-if="allowDelete && userInfo.id === comment.user.id"
            @click="deleteComment"
          >
            <img src="~images/question/delete.svg" />删除
          </div>
          <div class="report-operate operate-item" v-else-if="allowReport">
            <img src="~images/question/report.svg" />举报
          </div>
        </div>
        <div v-show="commentVisible" class="reply-comment">
          <comment
            :answerId="answerId"
            :parentId="comment.id"
            @commented="commented"
          />
        </div>
      </div>
      <ul
        class="reply-list"
        v-show="comment.children && comment.children.length > 0"
      >
        <li
          class="reply-item"
          v-for="(item, key) of comment.children"
          :key="item.id"
        >
          <question-comment-card
            :comment="item"
            :answerId="answerId"
            :allowComment="false"
            :key="key"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import ThePreviewImage from "components/ThePreviewImage";
import Comment from "./Comment";
import { mapState } from "vuex";
import questionService from "service/question";

export default {
  name: "QuestionCommentCard",
  components: {
    TheAvatar,
    ThePreviewImage,
    Comment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    answerId: {
      type: Number,
      required: true
    },
    allowComment: {
      type: Boolean,
      default: true
    },
    allowDelete: {
      type: Boolean,
      default: true
    },
    allowReport: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      images: (this.comment.images && this.comment.images.split(",")) || [],
      commentVisible: false
    };
  },
  watch: {
    comment(val) {
      this.images = (val.images && val.images.split(",")) || [];
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    commented() {
      this.commentVisible = false;
      this.$emit("commented");
    },
    deleteComment() {
      questionService.deleteComment(this.comment.id).then(() => {
        this.$emit("commented");
      });
    }
  }
};
</script>

<style lang="less" scoped>
@baseColor: #81948b;
.comment-card {
  display: flex;
  .card-left {
    width: 20px;
  }
  .card-right {
    flex: 1;
    margin-left: 7px;
    width: 5px;
  }
  .comment-detail {
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-info {
        .user-name {
          display: inline-block;
          line-height: 21px;
          font-weight: 500;
          font-size: 14px;
          color: #111;
        }
      }
      .time-wrapper {
        line-height: 18px;
        font-weight: normal;
        font-size: 12px;
        color: @baseColor;
      }
    }
    .card-content {
      .comment-content {
        margin-top: 10px;
        line-height: 21px;
        font-size: 14px;
        color: #111;
      }
      .comment-images {
        margin-top: 10px;
      }
    }
    .card-bottom {
      display: flex;
      line-height: 18px;
      font-size: 12px;
      color: @baseColor;
      .operate-item {
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
      .reply-operate,
      .report-operate,
      .delete-operate {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      img {
        width: 18px;
        height: 18px;
      }
    }
    .reply-comment {
      margin-top: 20px;
    }
  }
  .reply-list {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #efefef;
    .reply-item {
      &:not(:first-child) {
        margin-top: 10px;
      }
      &:not(:last-child) {
        padding-bottom: 10px;
        border-bottom: 1px solid #efefef;
      }
    }
  }
}
</style>

<template>
  <div class="comment-card">
    <div class="card-left">
      <the-avatar :size="20" :url="comment.user.avatar_url" />
    </div>
    <div class="card-right">
      <div class="comment-detail">
        <div class="card-top">
          <div class="user-info">
            <span
              :class="[
                'user-name',
                userInfo.id === comment.user.id ? 'active' : ''
              ]"
              >{{ comment.user.nickname }}</span
            >
            <template v-if="comment.cited_user">
              <span class="reply-span">回复</span>
              <span
                :class="[
                  'user-name',
                  userInfo.id === comment.cited_user.id ? 'active' : ''
                ]"
                >{{ comment.cited_user.nickname }}</span
              >
            </template>
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
          <div class="comment-images" v-if="images.length > 0">
            <the-preview-image width="60px" height="60px" :srcList="images" />
          </div>
        </div>
        <div class="card-bottom">
          <div
            v-if="allowComment"
            class="reply-operate operate-item"
            @click="commentVisible = !commentVisible"
          >
            回复
          </div>
          <el-popconfirm
            v-if="allowDelete && userInfo.id === comment.user.id"
            @confirm="deleteComment"
            title="确定删除此评论吗？"
          >
            <div class="delete-operate operate-item" slot="reference">
              删除
            </div>
          </el-popconfirm>
          <div
            class="report-operate operate-item"
            v-else-if="allowReport"
            @click="reportComment"
          >
            举报
          </div>
        </div>
        <div v-show="commentVisible" class="reply-comment">
          <comment
            :answerId="answerId"
            :parent="comment"
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
            @deleted="deletedCommentSucc(key)"
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
    commented(val) {
      this.commentVisible = false;
      if (this.comment.children) {
        this.comment.children.push(val);
      } else {
        this.comment.children = [val];
      }
    },
    deleteComment() {
      questionService.deleteComment(this.comment.id).then(() => {
        this.$emit("deleted");
      });
    },
    deletedCommentSucc(key) {
      this.$emit("delete", key);
    },
    reportComment() {
      this.$notice({
        type: "warning",
        title: "等待开放..."
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

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
          &.active {
            color: @primaryColor;
          }
        }
        .reply-span {
          display: inline-block;
          margin: 0 10px;
          line-height: 21px;
          font-weight: normal;
          font-size: 14px;
          color: #81948b;
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
        word-break: break-all;
      }
      .comment-images {
        margin: 10px 0;
      }
    }
    .card-bottom {
      display: flex;
      margin-top: 10px;
      min-height: 18px;
      line-height: 18px;
      font-size: 12px;
      color: @baseColor;
      user-select: none;
      .operate-item {
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
      .reply-operate,
      .report-operate,
      .delete-operate {
        position: relative;
        padding-left: 18px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 18px;
          height: 18px;
          content: "";
          background-color: #81948b;
          mask-repeat: no-repeat;
          mask-size: cover;
        }
      }
      .reply-operate {
        &::before {
          mask-image: url("~images/question/reply.svg");
        }
      }
      .delete-operate {
        &::before {
          mask-image: url("~images/question/delete.svg");
        }
      }
      .report-operate {
        &::before {
          mask-image: url("~images/question/report.svg");
        }
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

<template>
  <div class="comment-card" v-loading="loading">
    <div class="card-left">
      <the-avatar :size="24" :url="comment.user.avatar_url" />
    </div>
    <div class="card-right">
      <div class="comment-detail">
        <div class="card-top">
          <div class="user-info">
            <span
              :class="[
                'user-name',
                userInfo && userInfo.id === comment.user.id ? 'active' : ''
              ]"
              >{{ comment.user.nickname }}</span
            >
            <template v-if="comment.cited_user && userInfo">
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
        <div class="card-bottom" v-if="userInfo">
          <div class="time-wrapper">
            {{ formatDate(comment.created_at, "MM-DD hh:mm") }}
          </div>
          <div style="display: flex;">
            <el-popconfirm
              style="margin-right: 20px;"
              v-if="allowDelete && userInfo.id === comment.user.id"
              @confirm="deleteComment"
              title="确定删除此评论吗？"
            >
              <div class="delete-operate operate-item" slot="reference">
                &nbsp;删除
              </div>
            </el-popconfirm>
            <div
              v-if="allowComment"
              class="reply-operate operate-item"
              @click="commentVisible = !commentVisible"
            >
              &nbsp;
              {{ commentVisible ? "取消回复" : "回复" }}
            </div>
            <div
              class="report-operate operate-item"
              v-else-if="allowReport && false"
              @click="reportComment"
            >
              举报
            </div>
          </div>
        </div>
        <div v-show="commentVisible && userInfo" class="reply-comment">
          <comment
            :answerId="answerId"
            :parent="parent || comment"
            :citedUser="citedUser"
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
            isSecondary
            :commentData="item"
            :answerId="answerId"
            :parent="comment"
            :citedUser="item.user"
            :key="item.id"
            @deleted="deletedCommentSucc(key)"
            @commented="val => commented(val, key)"
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
import { formatDate } from "utils/moment";

export default {
  name: "QuestionCommentCard",
  components: {
    TheAvatar,
    ThePreviewImage,
    Comment
  },
  props: {
    parent: {
      type: Object,
      default: () => null
    },
    citedUser: {
      type: Object,
      default: () => null
    },
    commentData: {
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
    },
    isSecondary: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      commentVisible: false,
      comment: this.commentData || {
        user: {},
        children: []
      }
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    images() {
      const { images } = this.commentData;
      if (!(images instanceof Array)) {
        return (images && images.split(",")) || [];
      }
      return [];
    }
  },
  methods: {
    formatDate,
    commented(val, key) {
      this.commentVisible = false;
      if (this.isSecondary) {
        this.$emit("commented", val);
      } else {
        if (this.comment.children) {
          if (typeof key === "number") {
            this.comment.children.splice(key + 1, 0, val);
            this.comment = JSON.parse(JSON.stringify(this.comment));
          } else {
            this.comment.children.unshift(val);
          }
        } else {
          this.comment.children = [val];
        }
      }
      this.$emit("added");
    },
    deleteComment() {
      this.loading = true;
      questionService
        .deleteComment(this.comment.id)
        .then(res => {
          this.$emit("deleted", res.count);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deletedCommentSucc(key) {
      this.$emit("deletedSecondary");
      this.comment.children.splice(key, 1);
      this.comment = JSON.parse(JSON.stringify(this.comment));
    },
    reportComment() {
      this.$notice({
        type: "warning",
        title: "等待开放..."
      });
    },
    added() {
      this.$emit("added");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.comment-card {
  display: flex;

  .card-left {
    width: 24px;
  }
  .card-right {
    flex: 1;
    margin-left: 8px;
    width: 5px;
  }
  .comment-detail {
    &:hover {
      .delete-operate {
        display: flex !important;
      }
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-info {
        .user-name {
          display: inline-block;
          line-height: 24px;
          font-weight: 400;
          font-size: 14px;
          color: #81948b;
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
          color: @baseColor;
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
        margin-top: 4px;
        line-height: 24px;
        font-size: 14px;
        color: #2c3330;
        word-break: break-all;
      }
      .comment-images {
        margin: 10px 0;
      }
    }
    .card-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      min-height: 18px;
      line-height: 20px;
      font-size: 12px;
      color: #81948b;
      user-select: none;
      .operate-item {
        display: flex;
        align-content: center;
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
          background-color: @baseColor;
          mask-repeat: no-repeat;
          mask-size: cover;
        }
        &:hover {
          color: @hoverColor;
          &::before {
            background-color: @hoverColor;
          }
        }
      }
      .report-operate,
      .delete-operate {
        display: none;
      }
      .reply-operate {
        &::before {
          mask-image: url("~images/question/comment.svg");
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

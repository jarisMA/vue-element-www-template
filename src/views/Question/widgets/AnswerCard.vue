<template>
  <div class="answer-card-wrapper" v-loading="loading">
    <div class="answer-card" :style="{ maxHeight: fold ? '363px' : 'unset' }">
      <div class="card-wrapper" ref="card">
        <div class="card-top">
          <div class="card-top-left">
            <the-avatar :size="36" :url="answer.user.avatar_url" />
            <div class="user-content">
              <span
                :class="[
                  'user-name',
                  userInfo && userInfo.id === answer.user.id ? 'active' : ''
                ]"
                >{{ answer.user.nickname }}</span
              >
              <div class="create-time">
                {{ formatDate(answer.created_at, "MM-DD hh:mm") }}
              </div>
            </div>
          </div>
          <div
            class="card-top-right"
            v-if="
              !answer.has_accepted &&
                userInfo &&
                userInfo.id === answer.question_author.id &&
                !answer.question_accept_id &&
                answer.user.id !== userInfo.id &&
                answer.question_type !== QUESTION_TYPE_VOTE
            "
          >
            <div class="card-accept-wrapper" @click="handleAccept">
              <i class="card-accept-icon"></i>
              采纳回答
            </div>
          </div>
        </div>
        <div class="card-content">
          <div class="content" v-html="answer.content"></div>
          <div
            class="image-list"
            v-if="answer.images && answer.images.length > 0"
          >
            <the-preview-image
              width="60px"
              height="60px"
              :srcList="answer.images"
            />
          </div>
        </div>
        <div class="unfold-wrapper" v-if="showUnfoldBtn && fold">
          <label class="unfold-btn" @click="fold = false">
            <span>展开阅读全文</span>
            <icon-svg svg-class="dropDown-icon" svg-name="drop_down" />
          </label>
        </div>
      </div>
    </div>
    <div class="answer-operate">
      <div class="answer-inner">
        <div class="operate-left">
          <div class="claps-wrapper" @click="handleToggleClap">
            <img
              :class="['clap-icon']"
              v-if="answer.auth_like_count"
              src="~images/question/claped.svg"
            />
            <img class="clap-icon" v-else src="~images/question/claps.svg" />
            <span :class="[answer.auth_like_count ? '' : 'grey-scale']">{{
              answer.like_count
            }}</span>
          </div>
          <div
            :class="[showComment ? 'active' : '', 'comment-wrapper']"
            @click="autoFocus"
          >
            <span :class="[showComment ? 'comment-active' : '']">{{
              answer.comment_count
            }}</span>
          </div>
          <div class="edit-wrapper" v-if="allowEdit" @click="editAnswer">
            <span>编辑回答</span>
          </div>
        </div>
        <div class="operate-right">
          <label class="fold-wrapper" v-if="!fold" @click="fold = true">
            <img src="~images/question/drop_up.svg" />
            <span>收起</span>
          </label>
          <el-dropdown
            class="dropdown-wrapper"
            placement="top-end"
            trigger="click"
            v-if="userInfo && userInfo.id === answer.user.id"
          >
            <i class="el-icon-more"></i>
            <el-dropdown-menu slot="dropdown" class="question-dropdown">
              <el-dropdown-item v-if="userInfo.id === answer.user.id">
                <el-popconfirm
                  @confirm="deleteAnswer"
                  title="确定删除此回答吗？"
                >
                  <div slot="reference">
                    <i class="el-icon-delete"></i>
                    <span class="delete-tip">删除</span>
                  </div>
                </el-popconfirm>
              </el-dropdown-item>
              <el-dropdown-item v-else @click.native="reportAnswer"
                >举报</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div class="comment-fold-wrapper" v-if="showComment">
      <comment
        ref="commentInput"
        class="comment-wrapper"
        :answerId="answer.id"
        @commented="commented"
      />
      <div
        class="comment-list-wrapper"
        ref="comment"
        v-if="answer.comments.length > 0"
      >
        <ul class="comment-list">
          <li
            class="comment-item"
            v-for="(item, key) of answer.comments"
            :key="item.id"
          >
            <comment-card
              :commentData="item"
              :answerId="answer.id"
              @commented="initDom"
              @added="addedComment"
              @deleted="count => deletedCommentSucc(key, count)"
              @deletedSecondary="deletedSecondaryComment"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import CommentCard from "./CommentCard";
import Comment from "./Comment";
import { formatDate } from "utils/moment";
import { mapState } from "vuex";
import questionService from "service/question";
import { TYPE_ANSWER, QUESTION_TYPE_VOTE } from "utils/const";
import commonMixins from "mixins/common";
import ThePreviewImage from "components/ThePreviewImage";

export default {
  name: "QuestionAnswerCard",
  mixins: [commonMixins],
  components: {
    TheAvatar,
    CommentCard,
    Comment,
    ThePreviewImage
  },
  props: {
    answerData: {
      type: Object,
      required: true
    },
    allowEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      QUESTION_TYPE_VOTE,
      loading: false,
      fold: true,
      showUnfoldBtn: false,
      showComment: false,
      maxHeight: 363,
      commentMaxHeight: 0,
      claping: false,
      answer: this.answerData || {
        user: {}
      },
      observer: null,
      accepting: false
    };
  },
  watch: {
    answerData: {
      handler(val) {
        this.answer = val;
        this.initDom();
      },
      deep: true
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.initDom();
    window.addEventListener("mouseup", this.handleMouseUp);
    let element = this.$refs["card"];
    this.observer = new ResizeObserver(() => {
      this.initDom();
    });
    this.observer.observe(element);
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.handleMouseUp);
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  },
  methods: {
    formatDate,
    autoFocus() {
      this.showComment = !this.showComment;
      this.$nextTick(() => {
        if (this.showComment) {
          this.$refs.commentInput.inputFocus();
        }
      });
    },

    deleteAnswer() {
      if (!this.checkIsLogin()) {
        return;
      }
      this.loading = true;
      questionService
        .deleteAnswer(this.answer.id)
        .then(() => {
          this.$notice({
            title: "回答删除成功"
          });
          this.$emit("deleted");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reportAnswer() {
      if (!this.checkIsLogin()) {
        return;
      }
      this.$notice({
        type: "warning",
        title: "等待开放..."
      });
    },
    commented(val) {
      this.answer.comments.push(val);
      this.updateCommentCount(1);
      this.initDom();
    },
    // 添加评论
    addedComment() {
      this.updateCommentCount(1);
    },
    updateCommentCount(count) {
      this.answer.comment_count += count;
    },
    // 删除第一级评论
    deletedCommentSucc(key, count) {
      this.updateCommentCount(-count);
      this.answer.comments.splice(key, 1);
      this.initDom();
    },
    // 删除第二级评论
    deletedSecondaryComment() {
      this.updateCommentCount(-1);
    },
    handleToggleClap() {
      if (!this.checkIsLogin()) {
        return;
      }
      if (!this.claping) {
        this.claping = true;
        let clapCount = 1;
        if (this.answer.auth_like_count) {
          clapCount = 0;
        }
        questionService
          .addLike({
            type: TYPE_ANSWER,
            resource_id: this.answer.id,
            count: clapCount
          })
          .then(() => {
            this.answer.auth_like_count = clapCount;
            this.answer.like_count += clapCount ? 1 : -1;
          })
          .finally(() => {
            this.claping = false;
          });
      }
    },
    handleAccept() {
      if (!this.checkIsLogin()) {
        return;
      }
      if (!this.accepting) {
        this.$confirm("提示", "确定采纳这条回答吗？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          this.accepting = true;
          questionService
            .acceptAnswer(this.answer.id)
            .then(() => {
              this.$notice({
                title: "采纳回答成功",
                type: "success"
              });
              this.answer.has_accepted = 1;
              this.$emit("accepted", this.answer.id);
            })
            .finally(() => {
              this.accepting = false;
            });
        });
      }
    },
    initDom() {
      this.$nextTick(() => {
        // console.log("init");
        if (this.$refs["card"]) {
          let offsetHeight = this.$refs["card"].offsetHeight;
          if (offsetHeight >= 363) {
            this.maxHeight = offsetHeight;
            this.showUnfoldBtn = true;
          }
          // let commentCount =
          //   (this.answer.comments && this.answer.comments.length) || 0;
          // this.commentMaxHeight =
          //   this.$refs["comment"].offsetHeight + commentCount * 114;
        }
      });
    },
    editAnswer() {
      this.$emit("editAnswer");
    }
  }
};
</script>

<style lang="less" scoped>
@padding: 20px;
@import "~styles/variable";

.answer-card-wrapper {
  background: #fff;
}

.grey-scale {
  filter: grayscale(1);
}

.answer-card {
  position: relative;
  overflow: hidden;
  padding: @padding @padding 0;
  background: #fff;
  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card-top-left {
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
          color: @hoverColor;
          &.active {
            color: @primaryColor;
          }
        }
        .create-time {
          line-height: 16px;
          font-size: 12px;
          font-weight: 400;
          color: #8ea098;
        }
      }
    }
    .card-top-right {
      .card-accept-wrapper {
        display: flex;
        align-items: center;
        padding: 2px 8px;
        line-height: 16px;
        font-size: 12px;
        color: @primaryColor;
        border: 1px solid @primaryColor;
        border-radius: 14px;
        cursor: pointer;
        .card-accept-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 2px;
          background: url("~images/question/modal.svg") no-repeat center;
        }
      }
    }
  }
  .card-content {
    margin-top: 16px;
    font-size: 15px;
    line-height: 1.67;
    word-break: break-all;
    /deep/ .content {
      img {
        margin: 0 auto !important;
        display: block !important;
        max-width: 100%;
      }
      ul li {
        list-style: disc;
      }
      ul,
      ol {
        margin-left: 20px;
      }
      ol,
      ol li {
        list-style: decimal;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: 700;
        font-size: 0.67em;
      }

      h5 {
        font-size: 0.83em;
      }

      h4 {
        font-size: 1em;
      }

      h3 {
        font-size: 1.17em;
      }

      h2 {
        font-size: 1.5em;
      }

      h1 {
        font-size: 2em;
      }
      a {
        text-decoration: none;
      }
      .ql-syntax {
        background-color: #23241f;
        color: #f8f8f2;
        overflow: visible;
        white-space: pre-wrap;
        margin-bottom: 5px;
        margin-top: 5px;
        padding: 5px 10px;
        border-radius: 3px;
      }

      blockquote {
        border-left: 4px solid #ccc;
        margin-bottom: 5px;
        margin-top: 5px;
        padding-left: 16px;
      }

      .ql-align-justify {
        text-align: justify;
      }

      .ql-align-right {
        text-align: right;
      }

      .ql-align-center {
        text-align: center;
      }

      .ql-size-huge {
        font-size: 2.5em;
      }

      .ql-size-large {
        font-size: 1.5em;
      }

      .ql-size-small {
        font-size: 0.75em;
      }

      .ql-direction-rtl {
        direction: rtl;
      }

      .ql-font-serif {
        font-family: Georgia, Times New Roman, serif;
      }

      .ql-font-monospace {
        font-family: Monaco, Courier New, monospace;
      }

      .ql-indent-8 {
        padding-left: 24em;
      }

      .ql-indent-7 {
        padding-left: 21em;
      }

      .ql-indent-6 {
        padding-left: 18em;
      }

      .ql-indent-5 {
        padding-left: 15em;
      }

      .ql-indent-4 {
        padding-left: 12em;
      }

      .ql-indent-3 {
        padding-left: 9em;
      }

      .ql-indent-2 {
        padding-left: 6em;
      }

      .ql-indent-1 {
        padding-left: 3em;
      }
    }
    .image-list {
      display: flex;
      margin-top: 8px;
    }
  }
  .unfold-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 100px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 84.73%
    );
    .unfold-btn {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: @primaryColor;
      cursor: pointer;
      .dropDown-icon {
        font-size: 24px;
        color: @primaryColor;
      }
    }
  }
}

.answer-operate {
  // position: sticky;
  // bottom: 0;
  padding: 0 @padding;

  .answer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px 0;
    background: #fff;
    z-index: 1;
    border-bottom: 1px solid #efefef;
  }

  .operate-left {
    display: flex;
    .claps-wrapper,
    .comment-wrapper,
    .edit-wrapper {
      display: flex;
      min-width: 40px;
      line-height: 24px;
      align-items: center;
      cursor: pointer;
      user-select: none;
      img {
        margin-right: 4px;
      }
      span {
        font-weight: normal;
        font-size: 14px;
        color: @baseColor;
      }
    }
    .claps-wrapper {
      position: relative;
      cursor: pointer;
      span {
        color: @primaryColor;
      }
    }
    .comment-wrapper,
    .edit-wrapper {
      position: relative;
      padding: 0 0 0 53px;
      &::before {
        position: absolute;
        top: 3px;
        left: 24px;
        width: 20px;
        height: 20px;
        content: "";
        background-color: @baseColor;
        mask-image: url("~images/question/comment.svg");
        mask-repeat: no-repeat;
        mask-size: cover;
      }
      &:hover {
        span {
          color: @primaryColor;
        }

        &::before {
          background-color: @primaryColor;
        }
      }

      &.active::before {
        background-color: @primaryColor;
      }
      .comment-active {
        color: @primaryColor;
      }
    }
    .edit-wrapper {
      &::before {
        mask-image: url("~images/question/edit.svg");
      }
    }
  }
  .operate-right {
    display: flex;
    align-items: center;
    .fold-wrapper {
      display: inline-flex;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;
      img {
        width: 24px;
      }
      span {
        font-size: 14px;
        color: @baseColor;
      }
    }
    .el-icon-more {
      color: @baseColor;
      cursor: pointer;
      outline: none;
      &:hover {
        color: @hoverColor;
      }
    }
  }
}
.comment-fold-wrapper {
  padding: 16px 20px 20px;
  border-bottom: 1px solid #efefef;
}
.comment-list-wrapper {
  position: relative;
  margin-top: 8px;
  padding: @padding;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  &::before {
    position: absolute;
    top: 0;
    left: @padding;
    width: calc(100% - @padding * 2);
    height: 1px;
    content: "";
    background: #efefef;
  }
  .comment-tips {
    margin-bottom: @padding;
    line-height: 21px;
    font-size: 14px;
    color: @hoverColor;
  }
  .comment-list {
    border-bottom: 1px solid #efefef;
    .comment-item {
      position: relative;
      padding: 10px 0;
      &:not(:last-child) {
        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #efefef;
          content: "";
        }
      }
    }
  }
  .comment-wrapper {
    margin-top: 20px;
  }
}
</style>
<style lang="less">
.el-popconfirm__main {
  padding-bottom: 10px !important;
}

.question-dropdown {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05) !important;
  /deep/ .el-dropdown-menu__item {
    line-height: 24px !important;
    padding: 10px !important;
  }
  /deep/ .popper__arrow {
    display: none !important;
  }
}
</style>

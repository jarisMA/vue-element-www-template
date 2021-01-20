<template>
  <div class="answer-card-wrapper">
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
    <div class="answer-operate">
      <div class="operate-left">
        <div class="claps-wrapper">
          <img src="~images/question/claps.svg" />
          <span>{{ answer.like_count }}</span>
        </div>
        <div class="comment-wrapper">
          <icon-svg svg-class="comment-icon" svg-name="comment"></icon-svg>
          <span>{{ answer.comment_count }} 评论</span>
        </div>
      </div>
      <div class="operate-right">
        <el-dropdown class="dropdown-wrapper" placement="top-end">
          <i class="el-icon-more"></i>
          <el-dropdown-menu slot="dropdown" class="question-dropdown">
            <el-dropdown-item
              v-if="userInfo.id === answer.user.id"
              @click.native="deleteAnswer"
            >
              <i class="el-icon-delete"></i>
              <span class="delete-tip">删除</span>
            </el-dropdown-item>
            <el-dropdown-item v-else @click.native="reportAnswer"
              >举报</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="comment-list-wrapper" v-if="showComment">
      <div class="comment-tips">{{ answer.comment_count }} 条评论</div>
      <ul class="comment-list">
        <li class="comment-item" v-for="item of answer.comments" :key="item.id">
          <comment-card
            :comment="item"
            :answerId="answer.id"
            @commented="commented"
          />
        </li>
      </ul>
      <comment
        class="comment-wrapper"
        :answerId="answer.id"
        @commented="commented"
      />
    </div>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import CommentCard from "./CommentCard";
import Comment from "./Comment";

import { mapState } from "vuex";
import questionService from "service/question";

export default {
  name: "QuestionAnswerCard",
  components: {
    TheAvatar,
    CommentCard,
    Comment
  },
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showAnswer: false,
      showComment: true
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    deleteAnswer() {
      questionService.deleteAnswer(this.answer.id).then(() => {
        this.$notice({
          title: "回答删除成功"
        });
        this.$emit("deleted");
      });
    },
    reportAnswer() {},
    commented() {
      this.$emit("commented");
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
.answer-card {
  padding: @padding;
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
.answer-operate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: @padding;
  background: #fff;
  .operate-left {
    display: flex;
    .claps-wrapper,
    .comment-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 24px 0 16px;
      height: 32px;
      img {
        margin-right: 4px;
      }
      span {
        font-weight: normal;
        font-size: 14px;
        color: #81948b;
      }
    }
    .claps-wrapper {
      background: #e9fff4;
      cursor: pointer;
      span {
        color: @primaryColor;
      }
    }
    .comment-icon {
      font-size: 24px;
      color: #81948b;
    }
  }
  .el-icon-more {
    color: #c4c4c4;
    cursor: pointer;
    outline: none;
  }
}
.comment-list-wrapper {
  position: relative;
  padding: @padding;
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
    color: #606c66;
  }
  .comment-list {
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

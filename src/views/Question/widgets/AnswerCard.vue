<template>
  <div class="answer-card-wrapper">
    <div
      class="answer-card"
      :style="{ maxHeight: fold ? '363px' : maxHeight + 'px' }"
    >
      <div class="card-wrapper" ref="card">
        <div class="card-top">
          <the-avatar :size="40" :url="answer.user.avatar_url" />
          <div class="user-content">
            <span
              :class="[
                'user-name',
                userInfo.id === answer.user.id ? 'active' : ''
              ]"
              >{{ answer.user.nickname }}</span
            >
            <div class="create-time">{{ answer.created_at }}</div>
          </div>
        </div>
        <div class="card-content">
          <div class="content" v-html="answer.content"></div>
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
      <div class="operate-left">
        <div class="claps-wrapper">
          <img src="~images/question/claps.svg" />
          <span>{{ answer.like_count }}</span>
        </div>
        <div class="comment-wrapper" @click="showComment = !showComment">
          <icon-svg svg-class="comment-icon" svg-name="comment"></icon-svg>
          <span v-if="!showComment">{{ answer.comment_count }} 评论</span>
          <span v-else>收起评论</span>
        </div>
      </div>
      <div class="operate-right">
        <label class="fold-wrapper" v-if="!fold" @click="fold = true">
          <img src="~images/question/drop_up.svg" />
          <span>收起</span>
        </label>
        <el-dropdown class="dropdown-wrapper" placement="top-end">
          <i class="el-icon-more"></i>
          <el-dropdown-menu slot="dropdown" class="question-dropdown">
            <el-dropdown-item v-if="userInfo.id === answer.user.id">
              <el-popconfirm @confirm="deleteAnswer" title="确定删除此回答吗？">
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
    <div
      class="comment-fold-wrapper"
      :style="{ maxHeight: showComment ? commentMaxHeight + 'px' : '0px' }"
    >
      <div class="comment-list-wrapper" ref="comment">
        <div class="comment-tips">{{ answer.comment_count }} 条评论</div>
        <ul class="comment-list">
          <li
            class="comment-item"
            v-for="item of answer.comments"
            :key="item.id"
          >
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
      fold: true,
      showUnfoldBtn: false,
      showComment: false,
      maxHeight: 363,
      commentMaxHeight: 0
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    let offsetHeight = this.$refs["card"].offsetHeight;
    if (offsetHeight >= 363) {
      this.maxHeight = offsetHeight;
      this.showUnfoldBtn = true;
    }
    this.commentMaxHeight = this.$refs["comment"].offsetHeight;
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
  position: relative;
  max-height: 363px;
  overflow: hidden;
  padding: @padding;
  transition: max-height 0.2s;
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
        &.active {
          color: @primaryColor;
        }
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
  position: sticky;
  bottom: 0;
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
      cursor: pointer;
      user-select: none;
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
      span {
        color: @primaryColor;
      }
    }
    .comment-icon {
      font-size: 24px;
      color: #81948b;
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
        color: #81948b;
      }
    }
    .el-icon-more {
      color: #c4c4c4;
      cursor: pointer;
      outline: none;
    }
  }
}
.comment-fold-wrapper {
  overflow: hidden;
  transition: max-height 0.2s;
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
<style lang="less">
.el-popconfirm__main {
  padding-bottom: 10px !important;
}
</style>

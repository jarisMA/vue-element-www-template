<template>
  <div class="answer-page" v-if="detail.id">
    <div class="page-header">
      <div class="container-780">
        <h3 class="page-header-title">{{ detail.question_title }}</h3>
        <div
          class="page-header-btn"
          @click="goQuestionDetail(detail.question_id)"
        >
          查看原问题
        </div>
      </div>
    </div>
    <div class="page-content container-780">
      <div class="page-content-main">
        <div class="content-main-header">
          <div class="content-main-header-left">
            <the-avatar :size="40" :url="detail.user.avatar_url" />
            <div class="content-main-header-info">
              <span class="content-main-nickname">{{
                detail.user.nickname
              }}</span>
              <span class="content-main-time">{{
                formatDateTime(detail.created_at)
              }}</span>
            </div>
          </div>
        </div>
        <div class="content-main-desc">
          <p class="content-main-content" v-html="detail.content"></p>
          <div
            class="content-main-image-wrapper"
            v-if="detail.images && detail.images.length > 0 && detail.images[0]"
          >
            <img
              v-for="(image, key) of detail.images"
              :key="key"
              :src="image"
              class="content-main-image"
            />
          </div>
        </div>
        <div class="content-main-footer">
          <div class="claps-wrapper" @click="handleToggleClap">
            <img
              :class="['clap-icon']"
              v-if="detail.auth_like_count"
              src="~images/question/claped.svg"
            />
            <img class="clap-icon" v-else src="~images/question/claps.svg" />
            <span>{{ detail.like_count }}</span>
          </div>
        </div>
      </div>
      <div class="page-content-sub">
        <div class="content-sub-header">
          <div
            :class="[
              'content-sub-header-item',
              activeTab === 1 ? 'active' : ''
            ]"
            @click="activeTab = 1"
          >
            {{ detail.comment_count }} 评论
          </div>
          <div
            :class="[
              'content-sub-header-item',
              activeTab === 2 ? 'active' : ''
            ]"
            @click="activeTab = 2"
          >
            {{ detail.like_count }} 鼓掌
          </div>
        </div>
        <div class="page-comment-wrapper" v-if="activeTab === 1">
          <comment :answerId="detail.id" @commented="commented" />
          <ul class="page-comment-list" v-if="detail.comments.length > 0">
            <li
              class="page-comment-item"
              v-for="item of detail.comments"
              :key="item.id"
            >
              <comment-card
                :commentData="item"
                :answerId="detail.id"
                @added="addedComment"
                @deleted="count => deletedCommentSucc(key, count)"
                @deletedSecondary="deletedSecondaryComment"
              />
            </li>
          </ul>
          <the-empty v-else />
        </div>
        <div class="page-clap-wrapper" v-if="activeTab === 2">
          <template v-if="detail.claps.length > 0">
            <clap-card
              v-for="clap of detail.claps"
              :key="clap.id"
              :clap="clap"
            />
          </template>
          <the-empty v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import questionService from "service/question";
import { goQuestionDetail } from "utils/routes";
import TheAvatar from "components/TheAvatar";
import { mapState } from "vuex";
import { formatDateTime } from "utils/moment";
import commonMixins from "./widgets/mixins";
import { TYPE_ANSWER } from "utils/const";
import Comment from "./widgets/Comment";
import CommentCard from "./widgets/CommentCard";
import ClapCard from "./widgets/clapCard.vue";
import TheEmpty from "components/TheEmpty";
export default {
  name: "QuestionAnswer",
  components: { TheAvatar, Comment, CommentCard, ClapCard, TheEmpty },
  mixins: [commonMixins],
  data() {
    return {
      loading: true,
      id: null,
      detail: {
        user: {}
      },
      activeTab: 1,
      claping: false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getData();
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    goQuestionDetail,
    formatDateTime,
    getData() {
      questionService
        .answer(this.id)
        .then(res => {
          this.detail = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleToggleClap() {
      if (!this.checkIsLogin()) {
        return;
      }
      if (!this.claping) {
        this.claping = true;
        let clapCount = 1;
        if (this.detail.auth_like_count) {
          clapCount = 0;
        }
        questionService
          .addLike({
            type: TYPE_ANSWER,
            resource_id: this.detail.id,
            count: clapCount
          })
          .then(() => {
            this.detail.auth_like_count = clapCount;
            this.detail.like_count += clapCount ? 1 : -1;
            const userInfo = this.userInfo;
            clapCount
              ? this.detail.claps.unshift({
                  count: 1,
                  resource_id: this.detail.id,
                  type: TYPE_ANSWER,
                  user_id: userInfo.id,
                  user: {
                    id: userInfo.id,
                    nickname: userInfo.nickname,
                    avatar_url: userInfo.avatar_url
                  }
                })
              : (this.detail.claps = this.detail.claps.filter(
                  clap => clap.user_id !== userInfo.id
                ));
          })
          .finally(() => {
            this.claping = false;
          });
      }
    },
    addedComment() {
      this.updateCommentCount(1);
    },
    updateCommentCount(count) {
      this.detail.comment_count += count;
    },
    commented(val) {
      this.detail.comments.unshift(val);
      this.updateCommentCount(1);
    },
    // 删除第一级评论
    deletedCommentSucc(key, count) {
      this.updateCommentCount(-count);
      this.detail.comments.splice(key, 1);
    },
    // 删除第二级评论
    deletedSecondaryComment() {
      this.updateCommentCount(-1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.container-780 {
  width: 780px;
  margin: auto;
}
.page-header {
  width: 100%;
  padding: 20px 0;
  background: #ffffff;
  .container-780 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .page-header-title {
    flex: 1;
    line-height: 28px;
    font-weight: 600;
    font-size: 20px;
    color: #2c3330;
  }
  .page-header-btn {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 38px;
    line-height: 1;
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    background: @primaryColor;
    cursor: pointer;
  }
}
.page-content {
  margin-top: 20px;
  background: #fff;
  .page-content-main {
    padding: 24px 20px;
    border-bottom: 1px solid #efefef;
    .content-main-header-left {
      display: flex;
      align-items: center;
      .content-main-header-info {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        .content-main-nickname {
          display: inline-block;
          margin-bottom: 4px;
          line-height: 1;
          font-weight: 500;
          font-size: 16px;
          color: #606c66;
        }
        .content-main-time {
          line-height: 16px;
          font-size: 12px;
          color: #8ea098;
        }
      }
    }
    .content-main-desc {
      .content-main-content {
        margin-top: 16px;
        line-height: 28px;
        font-size: 16px;
        color: #2c3330;
      }
      .content-main-image-wrapper {
        .content-main-image {
          width: 80px;
          height: 80px;
          margin-top: 8px;
          object-fit: cover;
          & + .content-main-image {
            margin-left: 8px;
          }
        }
      }
    }
    .content-main-footer {
      margin-top: 16px;
      .claps-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 24px 0 16px;
        height: 32px;
        cursor: pointer;
        user-select: none;
        background: #e9fff4;
        cursor: pointer;
        z-index: 2;
        img {
          margin-right: 4px;
        }
        span {
          font-weight: normal;
          font-size: 14px;
          color: @primaryColor;
        }
      }
    }
  }
  .page-content-sub {
    .content-sub-header {
      display: flex;
      align-items: center;
      padding: 24px 20px 0;
      .content-sub-header-item {
        line-height: 24px;
        font-size: 14px;
        color: #606c66;
        cursor: pointer;
        &.active {
          position: relative;
          font-weight: 500;
          color: #2c3330;
          &::after {
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: @primaryColor;
            content: "";
          }
        }
        & + .content-sub-header-item {
          margin-left: 20px;
        }
      }
    }
    .page-comment-wrapper {
      padding: 20px;
      .page-comment-list {
        .page-comment-item {
          /deep/ .comment-card {
            & > .card-right {
              padding-bottom: 10px;
              margin-bottom: 10px;
              border-bottom: 1px solid #efefef;
            }
            .reply-list {
              .card-right {
                padding-bottom: 0;
                margin-bottom: 0;
                border-bottom: unset;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div
    :class="['question-card', !userInfo ? 'auto' : '']"
    @click.prevent="goDetail(question.id)"
  >
    <div class="card-top">
      <label class="question-channel">
        <icon-svg svg-class="rz-icon" svg-name="rz"></icon-svg>
        {{ question.channel.name }}
      </label>
      <h3 class="question-title">
        {{ question.title }}
      </h3>
    </div>
    <div class="card-content">
      <div class="question-content" v-if="question.content">
        <p v-for="(item, key) of question.content.split('\n')" :key="key">
          {{ item }}
        </p>
      </div>
      <div class="question-images">
        <the-preview-image
          width="80px"
          height="80px"
          :srcList="images"
          @click.native.stop
        />
      </div>
    </div>
    <div class="card-bottom">
      <div class="question-user">
        <the-avatar :size="20" :url="question.user.avatar_url" />
        <span
          :class="[
            'user-name',
            userInfo && userInfo.id === question.user.id ? 'active' : ''
          ]"
          >{{ question.user.nickname }}</span
        >
      </div>
      <ul class="question-status">
        <li
          :class="[
            'like-status',
            !userInfo ? 'auto' : '',
            question.is_like ? 'active' : ''
          ]"
          @click.stop="handleLikeClick()"
        >
          好问题
          <span class="status-count">{{ question.like_count }}</span>
        </li>
        <li :class="['comment-status', !userInfo ? 'auto' : '']">
          <span class="status-count">{{ question.answer_count }}</span
          >条回答
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ThePreviewImage from "components/ThePreviewImage";
import TheAvatar from "components/TheAvatar";
import { mapState } from "vuex";
import { goQuestionDetail } from "utils/routes";

export default {
  name: "QuestionCard",
  components: {
    ThePreviewImage,
    TheAvatar
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      images: (this.question.images && this.question.images.split(",")) || []
    };
  },
  watch: {
    question(val) {
      this.images = (val.images && val.images.split(",")) || [];
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    goQuestionDetail,
    wxLogin() {
      this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
    },
    goDetail(id) {
      if (!this.userInfo) {
        this.wxLogin();
        return;
      }
      this.$emit("detail", id);
    },
    handleLikeClick() {
      if (!this.userInfo) {
        this.wxLogin();
        return;
      }
      if (this.question.is_like) {
        this.$emit("unlike");
      } else {
        this.$emit("like");
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@duration: 0.2s;
.question-card {
  padding: 24px 20px;
  background: #fff;
  cursor: pointer;
  &.auto {
    cursor: auto;
  }
  .card-top {
    .question-channel {
      line-height: 24px;
      font-size: 14px;
      .rz-icon {
        font-size: 24px;
        color: #606c66;
      }
    }
    .question-title {
      margin-top: 10px;
      line-height: 26px;
      font-weight: bold;
      font-size: 20px;
      color: #111111;
      word-break: break-all;
    }
  }
  .card-content {
    margin-top: 20px;
    .question-content {
      margin-bottom: 10px;
      max-height: 51px;
      line-height: 1.67;
      font-size: 15px;
      color: #111111;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-all;
    }
  }
  .card-bottom {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .question-user {
      display: flex;
      align-items: center;
      .user-name {
        display: inline-block;
        margin-left: 7px;
        line-height: 18px;
        font-size: 12px;
        font-weight: normal;
        color: @baseColor;
        &.active {
          color: @primaryColor;
        }
      }
    }
    .question-status {
      display: flex;
      .like-status,
      .comment-status {
        position: relative;
        padding-left: 29px;
        line-height: 24px;
        font-size: 14px;
        color: @baseColor;
        transition: all @duration;
        cursor: pointer;
        user-select: none;
        position: relative;
        &.auto {
          cursor: auto;
        }
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          content: "";
          background-color: @baseColor;
          mask-repeat: no-repeat;
          mask-size: cover;
        }
        &:not(.auto) {
          &:hover {
            color: #606c66;
            &::before {
              background-color: #606c66;
            }
          }
        }
        &.active {
          color: @primaryColor;
        }
        .status-count {
          display: inline-block;
          margin: 0 5px;
        }
      }
      .like-status {
        margin-right: 20px;
        &::before {
          mask-image: url("~images/question/like.svg");
        }
        &.active {
          &::before {
            background-color: @primaryColor;
          }
        }
        .status-count {
          margin-right: 0;
        }
      }
      .comment-status {
        &::before {
          mask-image: url("~images/question/comment.svg");
        }
        .status-count {
          margin-left: 0;
        }
      }
    }
  }
}
</style>

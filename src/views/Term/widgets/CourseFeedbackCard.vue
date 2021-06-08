<template>
  <div class="card">
    <div class="card-left">
      <the-avatar :size="32" :url="feedback.user.avatar_url" />
    </div>
    <div class="card-right">
      <div class="card-right-top">
        <div class="card-right-top-left">
          <label class="nickname">{{ feedback.user.nickname }}</label>
          <span class="time">{{ feedback.created_at }}</span>
        </div>
        <div class="card-right-top-right">
          <span
            class="delete-wrapper"
            v-if="userInfo.id === feedback.user.id"
            @click="handleDelete"
            >删除</span
          >
          <div
            :class="[
              'like-wrapper',
              feedback.auth_like_count > 0 ? 'active' : ''
            ]"
            @click="handleAddLike"
          >
            <i class="like-icon"></i>
            <span>{{ feedback.like_count }}</span>
          </div>
        </div>
      </div>
      <div class="card-right-content">
        {{ feedback.content }}
      </div>
    </div>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import { mapState } from "vuex";
export default {
  name: "CourseFeedbackCard",
  components: {
    TheAvatar
  },
  props: {
    feedback: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    handleAddLike() {
      const count = this.feedback.auth_like_count > 0 ? 0 : 1;
      this.$emit("addLike", count);
    },
    handleDelete() {
      this.$emit("delete");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.card {
  display: flex;
  align-items: flex-start;
  padding-top: 24px;
  .card-left {
    flex: none;
    margin-right: 8px;
  }
  .card-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
    border-bottom: 1px solid #efefef;
    .card-right-top {
      display: flex;
      justify-content: space-between;
      .card-right-top-left {
        .nickname {
          line-height: 24px;
          font-weight: 600;
          font-size: 14px;
          color: #606c66;
        }
        .time {
          margin-left: 8px;
          line-height: 24px;
          font-size: 12px;
          color: #8ea098;
        }
      }
      .card-right-top-right {
        display: flex;
        align-items: center;
        .delete-wrapper {
          margin-right: 8px;
          line-height: 24px;
          font-size: 12px;
          color: #81948b;
          cursor: pointer;
        }
        .like-wrapper {
          display: flex;
          align-items: center;
          line-height: 24px;
          font-size: 14px;
          color: #606c66;
          cursor: pointer;
          &.active {
            color: @primaryColor;
            .like-icon {
              background-color: @primaryColor;
            }
          }
          .like-icon {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 2px;
            mask-image: url("~images/term/like1.svg");
            mask-repeat: no-repeat;
            mask-size: cover;
            background-color: #81948b;
            cursor: pointer;
          }
        }
      }
    }
    .card-right-content {
      margin-top: 8px;
      line-height: 24px;
      font-size: 16px;
      letter-spacing: 1px;
      color: #2c3330;
    }
  }
}
</style>

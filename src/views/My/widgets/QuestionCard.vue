<template>
  <div class="card-wrapper" @click="goQuestionDetail(question.id)">
    <div class="card">
      <div class="card-header">
        <div class="card-header-left">
          <div class="card-header-title">
            <span>{{ question.title }}</span>
          </div>
        </div>
        <div class="card-header-right">
          <el-dropdown
            class="page-detail-footer-dropdown-wrapper"
            placement="top-end"
            trigger="hover"
          >
            <i class="el-icon-more"></i>
            <el-dropdown-menu slot="dropdown" class="page-dropdown">
              <el-dropdown-item v-if="mine">
                <el-popconfirm
                  @confirm="handleDelete"
                  title="确定删除此回答吗？"
                >
                  <div slot="reference">
                    <i class="el-icon-delete"></i>
                    <span class="delete-tip">删除</span>
                  </div>
                </el-popconfirm>
              </el-dropdown-item>
              <el-dropdown-item v-else @click.native="handleCancelFavorite">
                <i class="el-icon-star-off"></i>
                <span>取消收藏</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="card-label" v-if="question.deleted_at">
        问题已删除
      </div>
      <div :class="['card-content']">
        <div
          class="card-content-image_wrapper"
          v-if="question.type !== QUESTION_TYPE_VOTE"
        >
          <template v-if="question.type === QUESTION_TYPE_HELP">
            <img
              class="card-content-image"
              v-for="(layout, key) of question.layouts"
              :key="key"
              :src="layout.image_url"
            />
          </template>
          <template v-if="question.type === QUESTION_TYPE_QUESTION">
            <img
              class="card-content-image"
              v-for="(image, key) of question.images"
              :key="key"
              :src="image"
            />
          </template>
        </div>
        <div
          class="card-content-vote_wrapper"
          v-if="question.type === QUESTION_TYPE_VOTE"
        >
          <div class="card-vote-wrapper">
            <template v-if="question.vote.resource_type === 1">
              <div class="card-vote-item" v-for="item of 2" :key="item">
                <div class="card-vote-item_icon">
                  {{ VOTE_OPTION_INDEX[item - 1] }}
                </div>
                <div class="card-vote-item_title ellipsis">
                  {{ question.vote_options[item - 1].title }}
                </div>
              </div>
            </template>
            <div class="card-vote-img_wrapper" v-else>
              <div
                class="card-vote-img-item"
                v-for="(option, index) of question.vote_options"
                :key="index"
              >
                <template v-if="index < 4">
                  <div class="card-vote-img-item_icon">
                    {{ VOTE_OPTION_INDEX[index] }}
                  </div>
                  <img
                    class="card-vote-img-item_image"
                    :src="option.image_url"
                  />
                </template>
              </div>
            </div>
            <div class="card-vote-tips">
              {{
                closeDayDiff > 0
                  ? "还有" + closeDayDiff + "天结束"
                  : "投票已结束"
              }}
            </div>
          </div>
        </div>
        <div class="card-content-count_wrapper">
          <div class="card-content-heat_wrapper">
            <i class="heat-icon"></i>
            <span class="card-content-count">{{
              heatCount > 999 ? "999+" : heatCount
            }}</span>
          </div>
          <div class="card-content-answer_wrapper">
            <i class="comment-icon"></i>
            <span class="card-content-count">{{ question.answer_count }}</span>
          </div>
        </div>
      </div>
      <i class="accpeted-icon" v-if="question.accept_id"></i>
    </div>
  </div>
</template>

<script>
import { dateCompare, getCalDate } from "utils/moment";
import {
  QUESTION_TYPE_QUESTION,
  QUESTION_TYPE_HELP,
  QUESTION_TYPE_VOTE,
  VOTE_OPTION_INDEX
} from "utils/const";
import { goQuestionDetail } from "utils/routes";

export default {
  name: "MyQuestionCard",
  props: {
    question: {
      type: Object,
      required: true
    },
    mine: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      QUESTION_TYPE_QUESTION,
      QUESTION_TYPE_HELP,
      QUESTION_TYPE_VOTE,
      VOTE_OPTION_INDEX
    };
  },
  computed: {
    closeDayDiff() {
      if (this.question.type === QUESTION_TYPE_VOTE) {
        const { vote_closed_at } = this.question.vote;
        return dateCompare(
          getCalDate(vote_closed_at.replace(/-/g, "/"), 0).replace(/-/g, "/") +
            " 23:59:59",
          new Date()
        );
      }
      return 0;
    },
    heatCount() {
      const {
        pv,
        answer_count,
        comment_count,
        like_count,
        favorite_count
      } = this.question;
      return (
        pv * 1 +
        (answer_count + comment_count) * 10 +
        like_count * 5 +
        favorite_count * 3
      );
    }
  },
  methods: {
    goQuestionDetail,
    handleDelete() {
      this.$emit("delete");
    },
    handleCancelFavorite() {
      this.$emit("unFavorite");
    }
  }
};
</script>

<style lang="less" scoped>
.card-wrapper {
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  .card {
    position: relative;
    padding: 15px 0;
    width: 100%;
    min-height: 92px;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
    .accpeted-icon {
      position: absolute;
      top: 16px;
      right: 42px;
      display: inline-block;
      width: 60px;
      height: 60px;
      background: url("~images/question/accepted.svg") no-repeat;
    }
    .card-header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 1;
      margin-bottom: 16px;
      .card-header-title {
        display: flex;
        line-height: 24px;
        font-weight: 600;
        font-size: 16px;
        color: #2c3330;
      }
      .card-header-right {
        .el-icon-more {
          cursor: pointer;
        }
      }
    }
    .card-label {
      display: inline-flex;
      margin: 4px 0;
      padding: 2px 4px;
      line-height: 1;
      font-size: 12px;
      color: #81948b;
      background: #efefef;
      border-radius: 8px;
      box-sizing: border-box;
    }
  }
}

.card-content {
  position: relative;
  .card-content.no-flex {
    display: block;
  }
  .card-content-image_wrapper {
    min-height: 40px;
    .card-content-image {
      margin-top: 5px;
      margin-right: 10px;
      width: 60px;
      height: 60px;
      border: 1px solid #f2f2f2;
      box-sizing: border-box;
      object-fit: cover;
    }
  }

  .card-content-vote_wrapper {
    display: inline-block;
    margin-bottom: 10px;
    padding: 4px 6px 8px;
    background: #fafafa;
    box-sizing: border-box;
    .card-vote-wrapper {
      .card-vote-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        padding: 11px 7px;
        box-sizing: border-box;
        background: #efefef;
        & + .card-vote-item {
          margin-top: 4px;
        }
      }
    }
  }
}

.card-vote-item_icon,
.card-vote-img-item_icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 7px;
  width: 17px;
  height: 17px;
  line-height: 1;
  font-size: 12px;
  color: #fff;
  border-radius: 50%;
  background: #333;
}
.card-vote-item_title {
  line-height: 18px;
  font-size: 12px;
  color: #2c3330;
}
.card-vote-img_wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .card-vote-img-item {
    position: relative;
    width: 74px;
    height: 74px;
    & + .card-vote-img-item {
      margin-left: 8px;
    }
    .card-vote-img-item_image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .card-vote-img-item_icon {
      position: absolute;
      top: 7px;
      left: 7px;
    }
  }
}

.card-vote-tips {
  margin-top: 8px;
  line-height: 16px;
  font-size: 12px;
  color: #81948b;
}
.card-content-count_wrapper {
  display: flex;
  align-items: center;
  .card-content-answer_wrapper {
    margin-left: 16px;
  }
  .heat-icon,
  .comment-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: cover;
    background-repeat: no-repeat;
    vertical-align: bottom;
  }
  .heat-icon {
    background-image: url("~images/question/heat.svg");
  }
  .comment-icon {
    background-image: url("~images/question/comment.svg");
  }
}

.card-content-count {
  margin-left: 4px;
  line-height: 1;
  font-size: 12px;
  color: #2c3330;
}
</style>

<template>
  <div class="card-wrapper" @click="goQuestionAnswer(answer.id)">
    <div class="card">
      <div class="card-header">
        <div class="card-header-left">
          <div class="card-header-title">
            <span>{{ answer.question.title }}</span>
            <div
              class="card-header-vote"
              v-if="
                answer.question.type === QUESTION_TYPE_VOTE &&
                  answer.question.authVote
              "
            >
              已投
              <template v-for="(option, index) of answer.question.vote_options">
                <span :key="option.id" v-if="checkIsVote(option.id)">
                  {{ VOTE_OPTION_INDEX[index] }}
                </span>
              </template>
            </div>
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
              <el-dropdown-item>
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
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="card-label" v-if="answer.question.deleted_at">
        问题已删除
      </div>
      <div class="card-content">
        <span class="card-content-value">{{ answer.content }}</span>
        <div class="card-content-image_wrapper">
          <img
            class="card-content-image"
            v-for="(image, key) of answer.images"
            :key="key"
            :src="image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QUESTION_TYPE_VOTE, VOTE_OPTION_INDEX } from "utils/const";
import { goQuestionAnswer } from "utils/routes";

export default {
  name: "MyAnswerCard",
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      QUESTION_TYPE_VOTE,
      VOTE_OPTION_INDEX
    };
  },
  computed: {
    authOptionIds() {
      return this.answer.question.authVote.option_ids.split(",");
    },
    checkIsVote() {
      return id => {
        return this.authOptionIds.indexOf(id + "") > -1;
      };
    }
  },
  methods: {
    goQuestionAnswer,
    handleDelete() {
      this.$emit("delete");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.card-wrapper {
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  .card {
    position: relative;
    padding: 15px 0;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      .card-header-title {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        line-height: 20px;
        font-size: 15px;
        font-weight: 600;
        color: #2c3330;
      }
      .card-header-vote {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 8px;
        padding: 0 12px 0 8px;
        height: 22px;
        box-sizing: border-box;
        background: linear-gradient(
            0deg,
            rgba(20, 175, 100, 0.1),
            rgba(20, 175, 100, 0.1)
          ),
          #ffffff;
        border-radius: 16px;
        line-height: 1;
        font-weight: normal;
        font-size: 12px;
        color: @primaryColor;
      }
      .card-header-vote_icon {
        margin-right: 2px;
        width: 14px;
        height: 14px;
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
    .card-content-value {
      line-height: 24px;
      font-size: 14px;
      color: #606c66;
    }
    .card-content-image_wrapper {
      .card-content-image {
        margin-top: 5px;
        margin-right: 10px;
        width: 60px;
        height: 60px;
        border: 1px solid #f2f2f2;
        object-fit: cover;
      }
    }
  }
}
</style>

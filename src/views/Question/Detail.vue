<template>
  <div class="question-detail-page" v-loading="loading">
    <div class="detail-wrapper">
      <div class="container-920">
        <div class="detail-top">
          <label class="question-channel">
            <icon-svg svg-class="rz-icon" svg-name="rz"></icon-svg>
            {{ question.channel.name }}
          </label>
          <h3 class="question-title">
            {{ question.title }}
          </h3>
        </div>
        <div class="detail-content">
          <div class="question-content" v-if="question.content">
            <p v-for="(item, key) of question.content.split('\n')" :key="key">
              {{ item }}
            </p>
          </div>
          <div class="question-images">
            <the-preview-image
              width="80px"
              height="80px"
              :srcList="question.images"
            />
          </div>
        </div>
        <div class="detail-bottom">
          <el-button class="add-btn" type="primary">写回答</el-button>
          <ul class="question-status">
            <li
              :class="['like-status', question.isLike ? 'active' : '']"
              @click.stop="handleLikeClick"
            >
              <icon-svg class="like-icon" svg-name="like"></icon-svg>
              好问题
              <span class="status-count">{{ question.like_count }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container-960">
      <div class="total-answer-tip">
        共 <span>{{ question.answer_count }}</span> 条回答
      </div>
      <div class="question-main">
        <ul class="answer-list">
          <li class="answer-item" v-for="item of answers" :key="item.id">
            <answer-card :answer="item" />
          </li>
        </ul>
        <div class="question-main-right">
          <div class="question-card">
            <label class="question-channel">
              <icon-svg svg-class="rz-icon" svg-name="rz"></icon-svg>
              {{ question.channel.name }}
            </label>
            <h3 class="question-title">
              {{ question.title }}
            </h3>
            <el-button class="add-btn" type="primary">写回答</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import questionService from "service/question";
import ThePreviewImage from "components/ThePreviewImage";
import AnswerCard from "./widgets/AnswerCard";

import { mapState } from "vuex";

export default {
  name: "QuestionDetail",
  components: {
    ThePreviewImage,
    AnswerCard
  },
  data() {
    return {
      id: null,
      loading: true,
      question: {
        channel: {},
        images: []
      },
      answers: [],
      pagination: {
        size: 10,
        page: 1,
        total: 0
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.id = this.$route.params.id;
    this.getData();
  },
  methods: {
    getData() {
      const id = this.id;
      let promiseArr = [
        questionService.question(id),
        questionService.answers(this.id, {
          page: 1,
          page_size: this.pagination.size
        })
      ];
      Promise.all(promiseArr)
        .then(([question, answers]) => {
          question.images =
            (question.images && question.images.split(",")) || [];
          this.question = question;
          this.answers = answers.list;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getAnswers(start = 1) {
      this.loading = true;
      questionService
        .answers(this.id, {
          page: start,
          page_size: this.pagination.size
        })
        .then(res => {
          this.answers = res.list;
          this.pagination.page = start;
          this.pagination.total = res.pagination.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleLikeClick() {}
  }
};
</script>

<style lang="less" scoped>
@duration: 0.2s;
@import "~styles/variable";
.container-920 {
  width: 920px;
  margin: auto;
}
.container-960 {
  width: 960px;
  margin: auto;
}
.add-btn {
  height: 30px;
  padding: 8px 24px;
  border: unset;
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
  }
}
.detail-wrapper {
  padding: 30px 0;
  width: 100%;
  background: #fff;
  .detail-top {
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
      font-size: 20px;
      font-weight: bold;
      color: #111111;
    }
  }
  .detail-content {
    margin-top: 20px;
    .question-content {
      margin-bottom: 10px;
      line-height: 21px;
      font-size: 14px;
      color: #111111;
    }
  }
  .detail-bottom {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .question-status {
      display: flex;
      .like-status {
        line-height: 24px;
        font-size: 14px;
        color: #81948b;
        transition: all @duration;
        cursor: pointer;
        &.active {
          color: @primaryColor;
          .like-icon {
            fill: @primaryColor;
            stroke: @primaryColor;
            animation: likeClick @duration 1;
          }
        }
        .status-count {
          display: inline-block;
          margin: 0 0 0 5px;
        }
      }
      .like-icon {
        display: inline-block;
        margin-right: 5px;
        font-size: 24px;
        vertical-align: -6px;
        fill: #81948b;
        stroke: #81948b;
        transition: all @duration;
      }
    }
  }
}
.total-answer-tip {
  margin: 20px;
  line-height: 24px;
  font-weight: 500;
  font-size: 16px;
  color: #606c66;
}
.question-main {
  display: flex;
  .answer-list {
    width: 770px;
  }
  .question-main-right {
    margin-left: 20px;
    width: 170px;
    .question-card {
      padding: 20px;
      background: #fff;
      .question-channel {
        display: inline-block;
        line-height: 24px;
        margin-bottom: 20px;
        font-size: 14px;
        color: #606c66;
        .rz-icon {
          font-size: 24px;
        }
      }
      .add-btn {
        margin-top: 20px;
      }
    }
  }
}
</style>

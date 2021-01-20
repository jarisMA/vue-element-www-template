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
          <el-button class="add-btn" type="primary" @click="startAnswer"
            >写回答</el-button
          >
          <ul class="question-status">
            <li
              :class="['like-status', question.is_like ? 'active' : '']"
              @click.stop="toggleLikeClick"
            >
              <icon-svg class="like-icon" svg-name="like"></icon-svg>
              好问题
              <span class="status-count">{{ question.like_count }}</span>
            </li>
            <li class="more-status">
              <el-dropdown class="dropdown-wrapper" placement="top-end">
                <i class="el-icon-more"></i>
                <el-dropdown-menu slot="dropdown" class="question-dropdown">
                  <el-dropdown-item
                    v-if="userInfo.id === question.user.id"
                    @click.native="deleteQuestion"
                  >
                    <i class="el-icon-delete"></i>
                    <span class="delete-tip">删除</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-else @click.native="reportQuestion"
                    >举报</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container-960">
      <div class="total-answer-tip" v-if="question.answer_count > 0">
        共 <span>{{ question.answer_count }}</span> 条回答
      </div>
      <div class="question-main">
        <div class="question-main-left">
          <div v-show="answerVisible" :class="['rich-text-wrapper']">
            <answer-rich-text ref="answerRichText" @submited="addAnswerSucc" />
          </div>
          <div class="answer-list-wrapper" v-if="question.answer_count > 0">
            <ul class="answer-list">
              <li
                class="answer-item"
                v-for="(item, key) of answers"
                :key="item.id"
              >
                <answer-card
                  :answer="item"
                  @deleted="deleteAnswerSucc(key)"
                  @commented="getAnswers()"
                />
              </li>
            </ul>
            <div class="answer-more">
              <p>暂无更多回答</p>
              <p>
                你还可以
                <span class="primary" @click="startAnswer">写回答</span>
              </p>
            </div>
          </div>
          <div class="empty-wrapper" v-else-if="!loading">
            <img class="empty-icon" src="~images/question/answer_empty.svg" />
            <div class="empty-content">
              <p>还没有人回答过这个问题</p>
              <p>开始 <span class="primary">写第一个回答</span></p>
            </div>
          </div>
        </div>
        <div class="question-main-right">
          <div class="sticky-wrapper">
            <div class="question-card">
              <label class="question-channel">
                <icon-svg svg-class="rz-icon" svg-name="rz"></icon-svg>
                {{ question.channel.name }}
              </label>
              <h3 class="question-title">
                {{ question.title }}
              </h3>
              <el-button class="add-btn" type="primary" @click="startAnswer"
                >写回答</el-button
              >
            </div>
            <div class="back-top" @click="backTop">
              <img
                class="back-top-icon"
                src="~images/question/back_to_top.svg"
              />
              <span>回到顶部</span>
            </div>
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
import AnswerRichText from "./widgets/AnswerRichText";
import { mapState } from "vuex";

export default {
  name: "QuestionDetail",
  components: {
    ThePreviewImage,
    AnswerCard,
    AnswerRichText
  },
  data() {
    return {
      id: null,
      loading: true,
      answerVisible: false,
      question: {
        channel: {},
        images: [],
        user: {}
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
    startAnswer() {
      this.answerVisible = true;
      this.$nextTick(() => {
        this.$refs["answerRichText"].focus();
      });
      this.backTop();
    },
    addAnswerSucc() {
      this.answerVisible = false;
      this.question.answer_count++;
      this.getAnswers();
    },
    deleteAnswerSucc(key) {
      this.question.answer_count--;
      this.answers.splice(key, 1);
    },
    toggleLikeClick() {
      if (!this.question.is_like) {
        questionService
          .addLike({
            type: 1,
            resource_id: this.id
          })
          .then(() => {
            this.toggleLike(true);
          });
      } else {
        questionService.deleteLike(1, this.id).then(() => {
          this.toggleLike(false);
        });
      }
    },
    toggleLike(flag) {
      if (flag) {
        this.$set(this.question, "like_count", this.question.like_count + 1);
      } else {
        this.$set(this.question, "like_count", this.question.like_count - 1);
      }
      this.$set(this.question, "is_like", flag);
    },
    deleteQuestion() {
      this.loading = true;
      questionService
        .deleteQuestion(this.id)
        .then(() => {
          this.$notice("删除问题成功");
          this.$router.back();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reportQuestion() {},
    backTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@duration: 0.2s;
@baseColor: #81948b;
@import "~styles/variable";
.container-920 {
  width: 920px;
  margin: auto;
}
.container-960 {
  width: 960px;
  margin: 20px auto 0;
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
        color: @baseColor;
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
        fill: @baseColor;
        stroke: @baseColor;
        transition: all @duration;
      }
      .more-status {
        margin-left: 20px;
        .el-icon-more {
          line-height: 24px;
          color: #c4c4c4;
          cursor: pointer;
          outline: unset;
        }
      }
    }
  }
}
.total-answer-tip {
  margin: 0 20px 20px;
  line-height: 24px;
  font-weight: 500;
  font-size: 16px;
  color: #606c66;
}
.question-main {
  display: flex;
  .question-main-left {
    width: 770px;
    .rich-text-wrapper {
      margin-bottom: 30px;
      background: #fff;
    }
  }
  .answer-list {
    width: 100%;
    .answer-item {
      &:not(:last-child) {
        border-bottom: 1px solid #efefef;
      }
    }
  }
  .answer-more {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 30px auto 60px;
    width: 90px;
    line-height: 18px;
    font-size: 12px;
    text-align: center;
    color: #8ea098;
    &::before,
    &::after {
      position: absolute;
      top: 50%;
      width: 60px;
      height: 1px;
      background: #efefef;
      content: "";
      transform: translateY(-50%);
    }
    &::before {
      left: -91px;
    }
    &::after {
      right: -91px;
    }
    .primary {
      color: @primaryColor;
      cursor: pointer;
    }
  }
  .empty-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    width: 100%;
    height: 558px;
    background: #fff;
    .empty-icon {
      width: 260px;
      height: 180px;
    }
    .empty-content {
      margin-top: 20px;
      line-height: 18px;
      font-weight: normal;
      font-size: 12px;
      text-align: center;
      color: #8ea098;
    }
  }
  .question-main-right {
    margin-left: 20px;
    width: 170px;
    .sticky-wrapper {
      position: sticky;
      top: 90px;
    }
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
    .back-top {
      margin-top: 140px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 170px;
      height: 48px;
      background: #fff;
      cursor: pointer;
      .back-top-icon {
        width: 24px;
      }
      span {
        font-size: 14px;
        color: @baseColor;
      }
    }
  }
}
</style>

<style lang="less">
.question-dropdown {
  padding: 0 !important;
  .el-icon-delete,
  .delete-tip {
    color: #d40000;
  }
}
</style>

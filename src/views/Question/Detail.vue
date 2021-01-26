<template>
  <div class="question-detail-page" ref="page" v-loading="loading">
    <div class="detail-wrapper" ref="detail">
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
          <el-button
            v-if="authAnswer"
            class="add-btn"
            type="primary"
            @click="editAnswer"
            >编辑回答</el-button
          >
          <el-button v-else class="add-btn" type="primary" @click="startAnswer"
            >写回答</el-button
          >

          <ul class="question-status">
            <li
              class="edit-status"
              v-if="userInfo.id === question.user.id"
              @click.stop="isEdit = true"
            >
              修改问题
            </li>
            <li
              :class="['like-status', question.is_like ? 'active' : '']"
              @click.stop="toggleLikeClick"
            >
              好问题
              <span class="status-count">{{ question.like_count }}</span>
            </li>
            <li class="more-status" v-if="userInfo.id === question.user.id">
              <el-dropdown
                class="dropdown-wrapper"
                placement="top-end"
                trigger="click"
              >
                <i class="el-icon-more"></i>
                <el-dropdown-menu slot="dropdown" class="question-dropdown">
                  <el-dropdown-item v-if="userInfo.id === question.user.id">
                    <el-popconfirm
                      @confirm="deleteQuestion"
                      title="确定删除此回答吗？"
                    >
                      <div slot="reference">
                        <i class="el-icon-delete"></i>
                        <span class="delete-tip">删除</span>
                      </div>
                    </el-popconfirm>
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
          <div
            v-show="answerVisible"
            :class="['rich-text-wrapper', largerRichText ? 'large' : '']"
          >
            <h3 class="question-title" v-if="largerRichText">
              {{ question.title }}
            </h3>
            <answer-rich-text
              class="answer-rich-text"
              ref="answerRichText"
              :isEdit="isEditAnswer"
              :answer="authAnswer"
              @submited="addAnswerSucc"
              @larger="larger"
              @updated="updatedAnswer"
            />
            <div class="recover-operate" v-if="largerRichText" @click="recover">
              <span>退出全屏</span>
            </div>
          </div>
          <div class="answer-list-wrapper" v-if="question.answer_count > 0">
            <ul class="answer-list">
              <li
                class="answer-item auth-answer"
                v-if="authAnswerVisible && authAnswer"
              >
                <answer-card
                  :answerData="authAnswer"
                  allowEdit
                  @editAnswer="editAnswer"
                  @deleted="deletedAuthAnswer"
                />
              </li>
              <li class="more-item" v-if="authAnswer && answers.length > 0">
                更多回答
              </li>
              <li
                class="answer-item"
                v-for="(item, key) of answers"
                :key="item.id"
              >
                <answer-card
                  :answerData="item"
                  @deleted="deleteAnswerSucc(key)"
                />
              </li>
            </ul>
            <pagination
              class="pagination-wrapper"
              :pageSize="pagination.size"
              :current-page="pagination.page"
              :total="pagination.total"
              @change-page="getAnswers"
            />
            <div class="answer-more">
              <p>暂无更多回答</p>
              <p>
                你还可以
                <span v-if="authAnswer" class="primary" @click="editAnswer"
                  >编辑回答</span
                >
                <span v-else class="primary" @click="startAnswer">写回答</span>
              </p>
            </div>
          </div>
          <div class="empty-wrapper" v-else-if="!loading">
            <img class="empty-icon" src="~images/question/answer_empty.svg" />
            <div class="empty-content">
              <p>还没有人回答过这个问题</p>
              <p>
                开始
                <span class="primary" @click="startAnswer">写第一个回答</span>
              </p>
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
              <el-button
                v-if="authAnswer"
                class="add-btn"
                type="primary"
                @click="editAnswer"
                >编辑回答</el-button
              >
              <el-button
                v-else
                class="add-btn"
                type="primary"
                @click="startAnswer"
                >写回答</el-button
              >
            </div>
            <div class="back-top" @click="backTop" v-show="showBackTop">
              <span>回到顶部</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <question-edit
      :visible.sync="isEdit"
      :question="question"
      @update="updateQuestion"
    />
  </div>
</template>

<script>
import questionService from "service/question";
import ThePreviewImage from "components/ThePreviewImage";
import AnswerCard from "./widgets/AnswerCard";
import AnswerRichText from "./widgets/AnswerRichText";
import Pagination from "components/Pagination";
import QuestionEdit from "./widgets/QuestionEdit";

import { mapState } from "vuex";

export default {
  name: "QuestionDetail",
  components: {
    ThePreviewImage,
    AnswerCard,
    AnswerRichText,
    Pagination,
    QuestionEdit
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
      isEdit: false,
      isEditAnswer: false,
      authAnswer: null,
      authAnswerVisible: true,
      originAnswers: [],
      answers: [],
      pagination: {
        size: 10,
        page: 1,
        total: 0
      },
      largerRichText: false,
      showBackTop: false,
      liking: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.id = this.$route.params.id;
    this.getData();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getData() {
      const id = this.id;
      let promiseArr = [
        questionService.question(id),
        questionService.answers(id, {
          page: 1,
          page_size: this.pagination.size
        })
      ];
      Promise.all(promiseArr)
        .then(([res, answers]) => {
          const { question, auth_answer } = res;
          this.authAnswer = auth_answer;
          question.images =
            (question.images && question.images.split(",")) || [];
          this.question = question;
          this.originAnswers = answers.list;
          this.answers = this.originAnswers;
          this.answers = this.originAnswers.filter(
            item => item.id !== (this.authAnswer && this.authAnswer.id)
          );
          this.pagination.page = 1;
          this.pagination.total = answers.pagination.total;
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
          this.originAnswers = res.list;
          this.answers = res.list;
          this.answers = this.originAnswers.filter(
            item => item.id !== (this.authAnswer && this.authAnswer.id)
          );
          this.pagination.page = start;
          this.pagination.total = res.pagination.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateQuestion(data) {
      this.question = {
        ...this.question,
        ...data
      };
    },
    startAnswer() {
      this.answerVisible = true;
      this.$nextTick(() => {
        this.$refs["answerRichText"].focus();
      });
      this.backTop();
    },
    showAuthAnswer() {
      this.backTop();
      this.answerVisible = false;
      this.isEditAnswer = false;
      this.authAnswerVisible = true;
    },
    editAnswer() {
      this.backTop();
      this.authAnswerVisible = false;
      this.isEditAnswer = true;
      this.startAnswer();
    },
    updatedAnswer(val) {
      this.authAnswer.content = val;
      this.showAuthAnswer();
    },
    addAnswerSucc(value) {
      this.answerVisible = false;
      this.question.answer_count++;
      this.authAnswer = value;
    },
    deletedAuthAnswer() {
      this.question.answer_count--;
      this.authAnswer = null;
    },
    deleteAnswerSucc(key) {
      this.question.answer_count--;
      this.answers.splice(key, 1);
    },
    toggleLikeClick() {
      if (!this.liking) {
        this.liking = true;
        if (!this.question.is_like) {
          questionService
            .addLike({
              type: 1,
              resource_id: this.id
            })
            .then(() => {
              this.toggleLike(true);
            })
            .finally(() => {
              this.liking = false;
            });
        } else {
          questionService
            .deleteLike(1, this.id)
            .then(() => {
              this.toggleLike(false);
            })
            .finally(() => {
              this.liking = false;
            });
        }
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
    reportQuestion() {
      this.$notice({
        type: "warning",
        title: "等待开放..."
      });
    },
    backTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    larger() {
      this.largerRichText = true;
      document.querySelector("html").style.overflow = "hidden";
      this.$refs["page"].style.maxHeight = "calc(100vh - 120px)";
      this.$refs["page"].style.overflow = "hidden";
    },
    recover() {
      this.largerRichText = false;
      document.querySelector("html").style.overflow = "auto";
      this.$refs["page"].style.maxHeight = "unset";
      this.$refs["page"].style.overflow = "auto";
    },
    handleScroll() {
      if (window.scrollY > this.$refs["detail"].offsetHeight) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
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
      word-break: break-all;
    }
  }
  .detail-content {
    margin-top: 20px;
    .question-content {
      margin-bottom: 10px;
      line-height: 1.67;
      font-size: 15px;
      color: #111111;
      word-break: break-all;
    }
  }
  .detail-bottom {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .question-status {
      display: flex;
      li + li {
        margin-left: 20px;
      }
      .edit-status,
      .like-status {
        position: relative;
        padding-left: 29px;
        line-height: 24px;
        font-size: 14px;
        color: @baseColor;
        cursor: pointer;
        user-select: none;
        &::before {
          position: absolute;
          left: 0;
          top: 0;
          width: 24px;
          height: 24px;
          content: "";
          mask-repeat: no-repeat;
          mask-size: cover;
          background-color: @baseColor;
        }
        &:hover,
        &.active {
          color: @primaryColor;
          &::before {
            background-color: @primaryColor;
          }
        }
        .status-count {
          display: inline-block;
          margin: 0 0 0 5px;
        }
      }
      .edit-status {
        &::before {
          mask-image: url("~images/question/edit.svg");
        }
      }
      .like-status {
        &::before {
          mask-image: url("~images/question/like.svg");
        }
      }
      .more-status {
        .el-icon-more {
          line-height: 24px;
          color: @baseColor;
          cursor: pointer;
          outline: unset;
          &:hover {
            color: @primaryColor;
          }
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
      margin-bottom: 20px;
      background: #fff;
      &.large {
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 100%;
        background: #fff;
        content: "";
        z-index: 11;
        .question-title {
          margin: 30px auto 20px;
          width: 770px;
          padding: 0 20px;
          line-height: 32px;
          font-weight: bold;
          font-size: 24px;
          color: #111;
        }
        .answer-rich-text {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          margin: auto;
          width: 770px;
          z-index: 12;
          /deep/ .quillEditor-wrapper {
            flex: 1;
            height: 5px;
            .quill-editor {
              display: flex;
              flex-direction: column;
              height: 100%;
            }
            .ql-toolbar {
              &::before {
                position: absolute;
                left: 20px;
                top: 0;
                width: calc(100% - 20px * 2);
                height: 1px;
                content: "";
                background: #efefef;
              }
            }
            .ql-resize {
              display: none;
            }
            .ql-container {
              flex: 1;
              padding-bottom: 42px;
            }
          }
        }
        .recover-operate {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 112px;
          height: 32px;
          background: #fafafa;
          cursor: pointer;
          span {
            position: relative;
            display: inline-block;
            padding-left: 24px;
            line-height: 24px;
            font-weight: 500;
            font-size: 14px;
            color: #606c66;
            &::before {
              position: absolute;
              top: 0;
              left: 0;
              width: 24px;
              height: 24px;
              content: "";
              background-color: @baseColor;
              mask-image: url("~images/question/fold.svg");
              mask-repeat: no-repeat;
              mask-size: cover;
            }
          }
        }
      }
    }
  }
  .answer-list {
    width: 100%;
    .more-item {
      position: relative;
      padding: 15px 20px 0;
      color: #606c66;
      background: #fff;
      text-align: center;
      line-height: 21px;
      font-size: 14px;
      color: #606c66;
      &::before {
        position: absolute;
        top: 25px;
        left: 20px;
        width: calc((100% - 96px - 40px) / 2);
        height: 1px;
        background: #efefef;
        content: "";
        transform: translateY(-50%);
      }
      &::after {
        position: absolute;
        top: 25px;
        right: 20px;
        width: calc((100% - 96px - 40px) / 2);
        height: 1px;
        background: #efefef;
        content: "";
        transform: translateY(-50%);
      }
    }
    .answer-item {
      &.auth-answer {
        margin-bottom: 20px;
      }
      &:not(:last-child) {
        border-bottom: 1px solid #efefef;
      }
    }
  }
  .pagination-wrapper {
    margin-top: 20px;
  }
  .answer-more {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 30px auto 60px;
    width: 100px;
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
      span {
        position: relative;
        display: inline-block;
        padding-left: 24px;
        line-height: 24px;
        font-size: 14px;
        color: @baseColor;
        &::before {
          position: absolute;
          top: -1px;
          left: 0;
          width: 24px;
          height: 24px;
          content: "";
          background-color: @baseColor;
          mask-image: url("~images/question/back_to_top.svg");
          mask-repeat: no-repeat;
          mask-size: cover;
        }
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
  .el-dropdown-menu__item:not(.is-disabled):hover,
  .el-dropdown-menu__item:focus {
    background-color: #fafafa;
  }
}
</style>

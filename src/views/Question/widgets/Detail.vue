<template>
  <el-dialog
    class="page-wrapper"
    width="1120px"
    :show-close="false"
    :visible="visible"
  >
    <div class="page" v-loading="loading">
      <div class="container-980" v-if="detail">
        <div class="page-detail">
          <i class="page-accept-icon" v-if="detail.accept_id"></i>
          <div class="page-detail-top">
            <div class="page-detail-title">{{ detail.title }}</div>
            <p class="page-detail-desc" v-if="detail.content">
              {{ detail.content }}
            </p>
          </div>
          <div class="page-detail-content">
            <div
              class="page-detail-question_image-wrapper"
              v-if="
                detail.type === QUESTION_TYPE_QUESTION &&
                  detail.images.length > 0
              "
            >
              <el-carousel
                height="600px"
                arrow="always"
                :autoplay="false"
                :loop="false"
              >
                <el-carousel-item
                  v-for="(image, key) in detail.images"
                  :key="key"
                >
                  <the-loading-image :width="600" :height="600" :url="image" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="page-detail-footer">
            <div class="page-detail-footer-content">
              <div class="page-detail-footer-left">
                <the-avatar :size="24" :url="userInfo.avatar_url" />
                <span class="page-detail-nickname">{{
                  userInfo.nickname
                }}</span>
              </div>
              <div class="page-detail-footer-right">
                <div class="page-detail-footer-operate" @click="handleLikeAdd">
                  <i
                    :class="[
                      'page-brighten-icon',
                      detail.is_like ? 'active' : ''
                    ]"
                  ></i>
                  <span
                    :class="[
                      'page-detail-footer-count',
                      detail.is_like ? 'active' : ''
                    ]"
                    >{{
                      detail.is_like
                        ? "已擦亮"
                        : detail.user.id === userInfo.id
                        ? "擦亮"
                        : "帮擦亮"
                    }}
                    {{ detail.like_count }}</span
                  >
                </div>
                <div
                  class="page-detail-footer-operate"
                  @click="handleFavoriteClick"
                >
                  <i
                    :class="[
                      'page-collection-icon',
                      detail.is_favorite ? 'active' : ''
                    ]"
                  ></i>
                  <span
                    :class="[
                      'page-detail-footer-count',
                      detail.is_favorite ? 'active' : ''
                    ]"
                    >{{ detail.favorite_count }}</span
                  >
                </div>
                <el-dropdown
                  class="page-detail-footer-dropdown-wrapper"
                  placement="top-end"
                  trigger="click"
                  v-if="userInfo.id === detail.user.id"
                >
                  <i class="el-icon-more"></i>
                  <el-dropdown-menu slot="dropdown" class="page-dropdown">
                    <el-dropdown-item>
                      <el-popconfirm
                        @confirm="handleDeleteQuestion"
                        title="确定删除此问题吗？"
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
          </div>
        </div>
        <div class="page-content">
          <div class="page-content-main">
            <div :class="['rich-text-wrapper', largerRichText ? 'large' : '']">
              <h3 class="content-title" v-if="largerRichText">
                {{ detail.title }}
              </h3>
              <answer-rich-text
                v-if="userInfo"
                class="answer-rich-text"
                ref="answerRichText"
                :id="id"
                @submited="addAnswerSucc"
                @larger="larger"
              />
              <div
                class="recover-operate"
                v-if="largerRichText"
                @click="recover"
              >
                <span>退出全屏</span>
              </div>
            </div>
          </div>
          <div class="page-content-answers">
            <ul class="page-answer-list" v-if="detail.answer_count > 0">
              <li
                class="answer-item"
                v-for="(item, key) of answers"
                :key="item.id"
              >
                <answer-card
                  :answerData="item"
                  @deleted="deleteAnswerSucc(key)"
                  @accepted="handleAccepted"
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
          </div>
        </div>
      </div>
    </div>
    <i class="page-close-icon close-icon" @click="handleBeforeClose"></i>
  </el-dialog>
</template>

<script>
import questionService from "service/question";
import TheLoadingImage from "components/TheLoadingImage";
import TheAvatar from "components/TheAvatar";
import AnswerCard from "./AnswerCard";
import Pagination from "components/Pagination";
import AnswerRichText from "./AnswerRichText";

import { mapState } from "vuex";
import {
  QUESTION_TYPE_QUESTION,
  QUESTION_TYPE_HELP,
  QUESTION_TYPE_VOTE,
  TYPE_QUESTION
} from "utils/const";

export default {
  name: "QuestionDetail",
  components: {
    TheLoadingImage,
    TheAvatar,
    AnswerCard,
    Pagination,
    AnswerRichText
  },
  props: {
    visible: {
      type: Boolean
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      QUESTION_TYPE_QUESTION,
      QUESTION_TYPE_HELP,
      QUESTION_TYPE_VOTE,
      loading: true,
      detail: null,
      brightening: false,
      favoriteRequesting: false,
      answers: [],
      pagination: {
        size: 10,
        page: 1,
        total: 0
      },
      largerRichText: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      Promise.all([
        questionService.question(this.id),
        questionService.answers(this.id, {
          page: 1,
          page_size: this.pagination.size
        })
      ])
        .then(([detail, res]) => {
          this.detail = detail;
          this.answers = res.list;
          this.pagination.page = 1;
          this.pagination.total = res.pagination.total;
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
    handleBeforeClose() {
      this.$emit("update:visible", false);
    },
    handleDeleteQuestion() {},
    handleLikeAdd() {
      const detail = this.detail;
      const { id, is_like, like_count } = detail;
      if (is_like) {
        this.$notice({
          title: "不可重复擦亮",
          type: "warning"
        });
      } else {
        if (this.brightening) {
          return;
        }
        this.brightening = true;
        questionService
          .addLike({
            type: TYPE_QUESTION,
            resource_id: id,
            count: 1
          })
          .then(res => {
            detail.is_like = true;
            detail.like_count = like_count + 1;
            if (res.is_gain) {
              this.$notice({
                title: "暖心+2",
                type: "success"
              });
            } else {
              this.$notice({
                title: "擦亮成功",
                type: "success"
              });
            }
          })
          .finally(() => {
            this.brightening = false;
          });
      }
    },
    handleFavoriteClick() {
      if (this.favoriteRequesting) {
        return;
      }
      const detail = this.detail;
      const { id, is_favorite, favorite_count } = detail;
      const type = TYPE_QUESTION;
      this.favoriteRequesting = true;
      if (is_favorite) {
        questionService
          .questionFavoriteDelete(type, id)
          .then(() => {
            this.$notice({
              title: "取消收藏成功",
              type: "success"
            });
            detail.is_favorite = false;
            detail.favorite_count = favorite_count - 1;
          })
          .finally(() => {
            this.favoriteRequesting = false;
          });
      } else {
        questionService
          .questionFavoriteAdd({
            type,
            resource_id: id
          })
          .then(() => {
            this.$notice({
              title: "收藏成功",
              type: "success"
            });
            detail.is_favorite = true;
            detail.favorite_count = favorite_count + 1;
          })
          .finally(() => {
            this.favoriteRequesting = false;
          });
      }
    },
    deleteAnswerSucc(key) {
      this.detail.answer_count--;
      this.answers.splice(key, 1);
    },
    handleAccepted(id) {
      this.detail.answer_id = id;
    },
    addAnswerSucc(value) {
      this.detail.answer_count++;
      value = {
        ...value,
        question_author: this.detail.user,
        question_accept_id: this.detail.accept_id,
        question_type: this.detail.type
      };
      this.answers.unshift(value);
    },
    larger() {
      this.largerRichText = true;
      document.querySelector("html").style.overflow = "hidden";
    },
    recover() {
      this.largerRichText = false;
      document.querySelector("html").style.overflow = "auto";
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.page-wrapper {
  /deep/ .el-dialog {
    height: 100%;
    margin: 0 auto !important;
    background: transparent;
    box-shadow: unset;
    overflow: hidden;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      width: 100%;
      height: 100%;
      padding: 40px 0;
      overflow: hidden;
    }
  }
  .page-close-icon {
    position: fixed;
    top: 15px;
    right: 25px;
    display: inline-block;
    width: 24px;
    height: 24px;
    mask: url("~images/question/close.svg") no-repeat center;
    background-color: #fff;
    cursor: pointer;
  }
  .page-brighten-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-image: url("~images/question/brighten.svg");
    background-color: #2c3330;
    &.active {
      mask-image: url("~images/question/brighten_active.svg");
      background-color: @primaryColor !important;
    }
  }
  .page-collection-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-image: url("~images/question/collection.svg");
    background-color: #2c3330;
    &.active {
      mask-image: url("~images/question/collection_active.svg");
      background-color: @primaryColor !important;
    }
  }
  .page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .container-980 {
      height: 100%;
      overflow-y: auto;
      background: #f4f6f8;
      .page-detail {
        position: relative;
        background: #fff;
        .page-accept-icon {
          position: absolute;
          top: 40px;
          right: 40px;
          display: inline-block;
          width: 80px;
          height: 80px;
          background: url("~images/question/accepted.svg") no-repeat;
        }
        .page-detail-top {
          padding: 40px 100px 0;
          .page-detail-title {
            line-height: 28px;
            font-weight: 600;
            font-size: 20px;
            color: #111111;
          }
          .page-detail-desc {
            margin-top: 16px;
            line-height: 24px;
            font-size: 14px;
            color: #606c66;
          }
        }
        .page-detail-content {
          .page-detail-question_image-wrapper {
            width: 100%;
            height: 600px;
            margin: 24px auto 0;
            padding: 0 40px;

            /deep/ .el-carousel {
              .el-carousel__item {
                display: flex;
                justify-content: center;
              }
              .el-carousel__indicators--horizontal {
                display: none;
              }
              .el-carousel__arrow {
                background: rgba(0, 0, 0, 0.2);
                i {
                  font-size: 24px;
                  font-weight: bold;
                }
                &.el-carousel__arrow--left {
                  left: 0;
                }
                &.el-carousel__arrow--right {
                  right: 0;
                }
              }
            }
          }
        }
        .page-detail-footer {
          margin-top: 24px;
          width: 100%;
          padding: 0 100px;
          .page-detail-footer-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 0;
            border-top: 1px solid #efefef;
            .page-detail-footer-left {
              display: flex;
              align-items: center;
              .page-detail-nickname {
                display: inline-block;
                margin-left: 5px;
                line-height: 24px;
                font-size: 14px;
                color: #606c66;
              }
            }
            .page-detail-footer-right {
              display: flex;
              align-items: center;
              .page-detail-footer-operate {
                display: flex;
                align-items: center;
                cursor: pointer;
                & + .page-detail-footer-operate {
                  position: relative;
                  margin-left: 8px;
                  padding-left: 9px;
                  &::before {
                    position: absolute;
                    top: calc(50% - 6px);
                    left: 0;
                    width: 1px;
                    height: 12px;
                    content: "";
                    background: #efefef;
                  }
                }
                .page-brighten-icon,
                .page-collection-icon {
                  width: 20px;
                  height: 20px;
                  background-color: #81948b;
                }
                .page-detail-footer-count {
                  line-height: 12px;
                  font-size: 12px;
                  color: #81948b;
                  &.active {
                    color: @primaryColor;
                  }
                }
              }
              /deep/ .page-detail-footer-dropdown-wrapper {
                margin-left: 16px;
                padding: 0 !important;
                .el-icon-more {
                  color: #c4c4c4;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .page-content {
        margin: 16px 0 40px;
        padding: 0 100px;
        .page-content-main {
          width: 100%;
          .rich-text-wrapper {
            margin-bottom: 16px;
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
              .content-title {
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
                  color: @hoverColor;
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
        .page-content-answers {
          .pagination-wrapper {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
.page-dropdown {
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

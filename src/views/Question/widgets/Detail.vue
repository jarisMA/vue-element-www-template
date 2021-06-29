<template>
  <div
    :class="['page-wrapper', !showNavigation ? 'padding' : '']"
    ref="scroll"
    @scroll="handleScroll"
    @click="handleBeforeClose"
  >
    <div class="page" @click.stop="">
      <div class="container-980" v-loading="loading">
        <template v-if="detail">
          <div class="page-detail" ref="detail">
            <i class="page-accept-icon" v-if="detail.accept_id"></i>
            <div class="page-detail-top">
              <div class="page-detail-title">{{ detail.title }}</div>
              <div
                class="page-detail-info"
                v-if="detail.type === QUESTION_TYPE_HELP"
              >
                <div class="page-detail-info-item">
                  <i class="page-location-icon"></i>
                  <span
                    >{{ detail.informations.cityName }} ·
                    {{ detail.informations.neighbourhood }}</span
                  >
                </div>
                <div class="page-detail-info-item">
                  <i class="page-area-icon"></i>
                  <span>{{ detail.informations.area }}m²</span>
                </div>
                <div class="page-detail-info-item">
                  <i class="page-structure-icon"></i>
                  <span>{{ detail.informations.houseType }}</span>
                </div>
              </div>
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
                  max-height="600px"
                  arrow="always"
                  :autoplay="false"
                  :loop="false"
                >
                  <el-carousel-item
                    v-for="(image, key) of detail.images"
                    :key="key"
                  >
                    <el-image
                      :preview-src-list="detail.images"
                      style="max-width: 600px; max-height: 600px"
                      :src="image"
                      fit="contain"
                    >
                    </el-image>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div
                class="page-detail-help_layout-wrapper"
                v-if="
                  detail.type === QUESTION_TYPE_HELP &&
                    detail.layouts.length > 0
                "
              >
                <div class="layout-image-wrapper">
                  <el-carousel
                    height="600px"
                    arrow="always"
                    ref="layoutCarousel"
                    :autoplay="false"
                    :loop="false"
                    @change="handleLayoutCarouselChange"
                  >
                    <el-carousel-item
                      v-for="(layout, key) of detail.layouts"
                      :key="key"
                    >
                      <layout-show
                        :layoutSrc="srcLayout"
                        class="layout-wrapper"
                        :layout="layout"
                        :edit="false"
                        :activePointIndex="activePointIndex + 1"
                        @pointClick="(index) => handleSwiperSlideTo(index - 1)"
                      />
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <div class="layout-point-wrapper" v-if="points.length > 0">
                  <div
                    class="layout-point-container"
                    v-for="(item, key) of points"
                    :key="item.id"
                  >
                    <div class="layout-point-header">
                      <div class="point-label-wrapper">
                        问题
                        <label class="point-label">{{ item.index }}</label>
                        <div
                          class="point-list"
                          @mouseover="handleActivePointIndex(key)"
                        >
                          <div class="point-item">
                            {{ item.value }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="page-detail-vote-wrapper"
                v-if="detail.type === QUESTION_TYPE_VOTE"
              >
                <div class="vote-image-wrapper" v-if="detail.images">
                  <el-image
                    :preview-src-list="[detail.images]"
                    style="max-width: 600px; max-height: 600px"
                    :src="detail.images"
                    fit="contain"
                  >
                  </el-image>
                </div>
                <div class="vote-wrapper">
                  <vote
                    :question="detail"
                    @vote="handleVote"
                    ref="vote"
                    :voteSrc="srcVote"
                  />
                </div>
              </div>
            </div>
            <div class="page-detail-footer">
              <div class="page-detail-footer-content">
                <div class="page-detail-footer-left">
                  <the-avatar
                    :size="24"
                    :url="detail && detail.user && detail.user.avatar_url"
                  />
                  <span class="page-detail-nickname">{{
                    detail && detail.user && detail.user.nickname
                  }}</span>
                </div>
                <div class="page-detail-footer-right">
                  <div
                    class="page-detail-footer-operate"
                    @click="handleLikeAdd"
                    @mouseover="handleHover(1)"
                    @mouseout="handleHover(0)"
                  >
                    <i
                      :class="[
                        'page-brighten-icon',
                        detail.is_like ? 'active' : hover == 1 ? 'hover' : '',
                      ]"
                    ></i>
                    <span
                      :class="[
                        'page-detail-footer-count',
                        detail.is_like ? 'active' : '',
                      ]"
                      >{{
                        detail.is_like
                          ? "已擦亮"
                          : detail.user.id === (userInfo && userInfo.id)
                          ? "擦亮"
                          : "帮擦亮"
                      }}
                      {{ detail.like_count }}</span
                    >
                  </div>
                  <div
                    class="page-detail-footer-operate"
                    @click="handleFavoriteClick"
                    @mouseover="handleHover(2)"
                    @mouseout="handleHover(0)"
                  >
                    <i
                      :class="[
                        'page-collection-icon',
                        detail.is_favorite
                          ? 'active'
                          : hover == 2
                          ? 'hover'
                          : '',
                      ]"
                    ></i>
                    <span
                      :class="[
                        'page-detail-footer-count',
                        detail.is_favorite ? 'active' : '',
                      ]"
                      >{{ detail.is_favorite ? "已收藏" : "收藏" }}
                      {{ detail.favorite_count }}</span
                    >
                  </div>
                  <div v-if="(userInfo && userInfo.id) === detail.user.id">
                    <el-popconfirm
                      @confirm="handleDeleteQuestion"
                      title="确定删除此问题吗？"
                    >
                      <div slot="reference">
                        <span class="delete-hint"
                          >删除问题</span
                        >
                      </div>
                    </el-popconfirm>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="page-content">
            <div class="page-content-main" v-if="userInfo">
              <div
                v-show="largerRichText"
                class="rich-text-wrapper large"
                ref="editor"
              >
                <h3 class="content-title">
                  {{ detail.title }}
                </h3>
                <answer-rich-text
                  class="answer-rich-text"
                  ref="answerRichText"
                  :id="id"
                  @submited="addAnswerSucc"
                />
                <div class="recover-operate" @click="recover">
                  <span>退出全屏</span>
                </div>
              </div>
              <div
                class="simple-reply-wrapper"
                ref="editor"
                v-show="!largerRichText"
              >
                <simple-reply
                  :id="id"
                  @submited="addAnswerSucc"
                  @large="handleLarge"
                  :isVote="this.detail.type === QUESTION_TYPE_VOTE"
                />
              </div>
            </div>
            <div class="page-content-answers">
              <div class="page-answers-header">
                <div class="page-answers-header-left">
                  回答
                  <span class="page-answers-count">{{
                    detail.answer_count
                  }}</span>
                </div>
                <div class="page-answers-header-right">
                  <div
                    :class="[
                      'page-answer-order',
                      answerOrder === 1 ? 'active' : '',
                    ]"
                    @click="answerOrder = 1"
                  >
                    热门
                  </div>
                  <div
                    :class="[
                      'page-answer-order',
                      answerOrder === 2 ? 'active' : '',
                    ]"
                    @click="answerOrder = 2"
                  >
                    最新
                  </div>
                </div>
              </div>
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
              <the-empty v-else noText="暂无回答" />
              <pagination
                class="pagination-wrapper"
                :pageSize="pagination.size"
                :current-page="pagination.page"
                :total="pagination.total"
                @change-page="getAnswers"
              />
            </div>
          </div>
        </template>
      </div>
      <ul class="page-operate-wrapper" v-if="detail && showOperate">
        <li class="page-operate-item" @click="goReply">
          <div class="operate-icon reply">
            <i class="reply-icon"></i>
          </div>
          <span>写回答</span>
        </li>
        <li
          :class="['page-operate-item', detail.is_like ? 'active' : '']"
          @click="handleLikeAdd"
        >
          <div class="operate-icon">
            <i class="brighten-icon"></i>
          </div>
          <span>{{
            detail.is_like
              ? "已擦亮"
              : detail.user.id === (userInfo && userInfo.id)
              ? "擦亮"
              : "帮擦亮"
          }}</span>
        </li>
        <li
          :class="['page-operate-item', detail.is_favorite ? 'active' : '']"
          @click="handleFavoriteClick"
        >
          <div class="operate-icon">
            <i class="like-icon"></i>
          </div>
          <span>收藏</span>
        </li>
      </ul>
      <template v-if="showNavigation">
        <div class="page-left-operate">
          <div class="operate-icon left" @click="handlePrev">
            <i class="left-icon"></i>
          </div>
          <span>上一个</span>
        </div>
        <div class="page-right-operate">
          <div class="operate-icon right" @click="goTop">
            <i class="top-icon"></i>
          </div>
          <span class="operate-top">回到顶部</span>
          <div class="operate-icon right" @click="handleNext">
            <i class="right-icon"></i>
          </div>
          <span>下一个</span>
        </div>
      </template>
    </div>
    <i
      class="page-close-icon close-icon"
      v-if="showNavigation"
      @click="handleBeforeClose"
    ></i>
  </div>
</template>

<script>
import questionService from "service/question";
import TheAvatar from "components/TheAvatar";
import AnswerCard from "./AnswerCard";
import Pagination from "components/Pagination";
import AnswerRichText from "./AnswerRichText";
import LayoutShow from "./layout-show";
import Vote from "./Vote";
import TheEmpty from "components/TheEmpty";
import SimpleReply from "./SimpleReply";

import { mapState } from "vuex";
import {
  QUESTION_TYPE_QUESTION,
  QUESTION_TYPE_HELP,
  QUESTION_TYPE_VOTE,
  TYPE_QUESTION,
} from "utils/const";
import commonMixins from "mixins/common";
import { go404 } from "utils/routes";

export default {
  name: "QuestionDetail",
  mixins: [commonMixins],
  components: {
    TheAvatar,
    AnswerCard,
    Pagination,
    AnswerRichText,
    LayoutShow,
    Vote,
    TheEmpty,
    SimpleReply,
  },
  props: {
    visible: {
      type: Boolean,
    },
    id: {
      type: Number,
    },
    showNavigation: {
      type: Boolean,
      default: false,
    },
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
      voting: false,
      answers: [],
      answerOrder: 1,
      hover: "",
      pagination: {
        size: 10,
        page: 1,
        total: 0,
      },
      largerRichText: false,
      activePointIndex: 0,
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: false,
      },
      showOperate: false,
      srcLayout: [],
      srcVote: [],
      temp: "",
    };
  },
  watch: {
    answerOrder() {
      this.getAnswers();
    },
    id() {
      this.getData();
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    points() {
      let points = [];
      const { layouts } = this.detail;
      (layouts || []).forEach((layout, index) => {
        layout.points.forEach((point) => {
          point.imgIndex = index;
          points.push(point);
        });
      });
      return points;
    },
  },
  created() {
    this.getData();
  },

  methods: {
    handleLarge() {
      this.largerRichText = true;
    },
    handleHover(index) {
      this.hover = index;
    },
    getData() {
      this.loading = true;
      this.detail = null;
      this.answers = [];
      this.answerOrder = 1;
      this.activePointIndex = 0;
      this.showOperate = false;
      Promise.all([
        questionService.question(this.id),
        questionService.answers(this.id, {
          page: 1,
          page_size: this.pagination.size,
          hot: this.answerOrder === 1,
          showAll: true,
        }),
      ])
        .then(([detail, res]) => {
          if (detail.deleted_at) {
            go404();
            return;
          }
          detail.informations = detail.informations
            ? JSON.parse(detail.informations)
            : {};
          let index = 1;
          let layouts = detail.layouts;
          layouts
            ? (layouts || []).forEach((layout) => {
                layout.points = JSON.parse(layout.points);
                layout.points.forEach((point) => {
                  point.index = index;
                  index++;
                });
              })
            : [];
          this.detail = detail;
          this.answers = res.list;
          this.pagination.page = 1;
          this.pagination.total = res.pagination.total;
        })
        .finally(() => {
          this.loading = false;
          if (this.detail.type === QUESTION_TYPE_HELP) {
            this.srcLayout = this.detail.layouts.map((item) => item.image_url);
          }
          if (this.detail.type === QUESTION_TYPE_VOTE) {
            this.srcVote = this.detail.vote_options.map(
              (item) => item.image_url
            );
          }
        });
    },
    getAnswers(start = 1) {
      this.loading = true;
      questionService
        .answers(this.id, {
          page: start,
          page_size: this.pagination.size,
          hot: this.answerOrder === 1,
          showAll: true,
        })
        .then((res) => {
          this.answers = res.list;
          this.pagination.page = start;
          this.pagination.total = res.pagination.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleScroll(e) {
      if (this.detail) {
        const detailDom = this.$refs["detail"];
        if (
          e.target.scrollTop >
          detailDom.offsetTop + detailDom.clientHeight + 40
        ) {
          this.showOperate = true;
        } else {
          this.showOperate = false;
        }
      }
    },
    handleLayoutCarouselChange(imgIndex) {
      const point = this.points[this.activePointIndex];
      if (point.imgIndex !== imgIndex) {
        const index = this.points.findIndex(
          (item) => item.imgIndex === imgIndex
        );
        this.handleSwiperSlideTo(index);
      }
    },
    handleSwiperSlideTo(index) {
      const point = this.points[index];
      this.$refs["layoutCarousel"].setActiveItem(point.imgIndex);
      this.activePointIndex = index;
    },

    handleActivePointIndex(index) {
      this.activePointIndex = index;
      this.handleSwiperSlideTo(index);
    },

    goReply() {
      if (!this.checkIsLogin()) {
        return;
      }
      const editorDom = this.$refs["editor"];
      const scrollDom = this.$refs["scroll"];
      scrollDom.scrollTo({
        top: editorDom.offsetTop,
        behaviour: "smooth",
      });
    },
    handleBeforeClose() {
      this.$emit("update:visible", false);
    },
    handleDeleteQuestion() {
      if (!this.checkIsLogin()) {
        return;
      }
      this.loading = true;
      questionService
        .deleteQuestion(this.id)
        .then(() => {
          this.$notice("删除问题成功");
          this.$emit("deleted");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleLikeAdd() {
      if (!this.checkIsLogin()) {
        return;
      }
      const detail = this.detail;
      const { id, is_like, like_count } = detail;
      if (is_like) {
        this.$notice({
          title: "不可重复擦亮",
          type: "warning",
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
            count: 1,
          })
          .then((res) => {
            detail.is_like = true;
            detail.like_count = like_count + 1;
            if (res.is_gain) {
              this.$notice({
                title: "暖心+2",
                type: "success",
              });
            } else {
              this.$notice({
                title: "擦亮成功",
                type: "success",
              });
            }
          })
          .finally(() => {
            this.brightening = false;
          });
      }
    },
    handleFavoriteClick() {
      if (!this.checkIsLogin()) {
        return;
      }
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
              type: "success",
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
            resource_id: id,
          })
          .then(() => {
            this.$notice({
              title: "收藏成功",
              type: "success",
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
    handleVote(option_ids) {
      if (!this.checkIsLogin()) {
        return;
      }
      if (this.voting) {
        return;
      }
      const detail = this.detail;
      const params = {
        question_id: detail.id,
        vote_id: detail.vote.id,
        option_ids,
      };
      this.voting = true;
      questionService
        .vote(params)
        .then((res) => {
          detail.authVote = {
            ...res,
            ...params,
          };
          detail.vote_user_count++;
          detail.vote_options.forEach((option) => {
            if (option_ids.indexOf(option.id) > -1) {
              option.vote_count++;
            }
          });
          this.$notice({
            title: "投票成功",
            type: "success",
          });
        })
        .finally(() => {
          this.voting = false;
        });
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
        question_type: this.detail.type,
      };
      this.answers.unshift(value);
      this.largerRichText = false;
    },
    larger() {
      this.largerRichText = true;
      document.querySelector("html").style.overflow = "hidden";
    },
    recover() {
      this.largerRichText = false;
      document.querySelector("html").style.overflow = "auto";
    },
    handlePrev() {
      this.$emit("prev");
    },
    handleNext() {
      this.$emit("next");
    },
    goTop() {
      this.$refs.scroll.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.page-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  &.padding {
    padding-top: 20px;
    .page {
      padding-top: 0;
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
    &.hover {
      mask-image: url("~images/question/brighten_hover.svg");
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
    &.hover {
      mask-image: url("~images/question/collection_hover.svg");
      background-color: @primaryColor !important;
    }
  }
  .page {
    position: relative;
    width: 1120px;
    margin: auto;
    padding: 40px 0;
    min-height: 100%;
    .container-980 {
      min-height: calc(100vh - 80px);
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
          .page-detail-info {
            display: flex;
            align-items: center;
            margin-top: 8px;
            .page-detail-info-item {
              display: flex;
              align-items: center;
              line-height: 1;
              font-size: 12px;
              color: #81948b;
              & + .page-detail-info-item {
                margin-left: 12px;
              }
            }
            .page-location-icon,
            .page-area-icon,
            .page-structure-icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-right: 2px;
              background-repeat: no-repeat;
              background-size: cover;
            }
            .page-location-icon {
              background-image: url("~images/question/location.svg");
            }
            .page-area-icon {
              background-image: url("~images/question/area.svg");
            }
            .page-structure-icon {
              background-image: url("~images/question/structure.svg");
            }
          }
          .page-detail-desc {
            margin-top: 16px;
            line-height: 24px;
            font-size: 14px;
            color: #606c66;
          }
        }
        .page-detail-content {
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
          .page-detail-question_image-wrapper {
            width: 100%;
            max-height: 600px;
            margin: 24px auto 0;
            padding: 0 40px;
            /deep/ .cover-img {
              background: #f4f4f4;
              .cover {
                background-size: contain;
              }
            }
          }
          .page-detail-help_layout-wrapper {
            .layout-image-wrapper {
              width: 100%;
              height: 600px;
              margin: 24px auto 0;
              padding: 0 40px;
            }
            .layout-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 600px;
              height: 600px;
            }
            .layout-point-wrapper {
              width: 100%;
              margin-top: 20px;
              padding: 0 100px;

              .layout-point-container {
                margin-bottom: 20px;
              }

              .layout-point-header {
                display: flex;
                align-items: center;
                .point-label-wrapper {
                  line-height: 1;
                  font-weight: 500;
                  font-size: 16px;
                  color: #2c3330;
                  .point-label {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    margin-left: 4px;
                    line-height: 16px;
                    font-weight: 500;
                    font-size: 14px;
                    text-align: center;
                    color: #fff;
                    background: @primaryColor;
                    border-radius: 50%;
                  }
                }
                .point-pagination {
                  display: flex;
                  align-items: center;
                  margin-left: 16px;
                  .point-pagination-prev,
                  .point-pagination-next {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    mask-size: cover;
                    mask-repeat: no-repeat;
                    background-color: #2c3330;
                    cursor: pointer;
                    &.disabled {
                      background-color: #c8d0cc;
                      cursor: default;
                    }
                  }
                  .point-pagination-prev {
                    mask-image: url("~images/my/left.svg");
                  }
                  .point-pagination-next {
                    mask-image: url("~images/my/right.svg");
                  }
                }
              }
              .point-list {
                margin-top: 4px;
                line-height: 28px;
                font-size: 16px;
                font-weight: 400;
                color: #606c66;

                & :hover {
                  color: #2c3330;
                  cursor: pointer;
                }
              }
            }
          }
          .page-detail-vote-wrapper {
            .vote-image-wrapper {
              width: 600px;
              margin: 24px auto 0;
              text-align: center;
              /deep/ .cover-img {
                background: #f4f4f4;
                .cover {
                  background-size: contain;
                }
              }
            }
            .vote-wrapper {
              margin-top: 40px;
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

                &:hover {
                  .page-detail-footer-count {
                    color: #14af64;
                  }
                }

                & + .page-detail-footer-operate {
                  position: relative;
                  margin-left: 8px;
                  padding-left: 9px;
                }
                .page-brighten-icon,
                .page-collection-icon {
                  width: 24px;
                  height: 24px;
                  background-color: #81948b;
                }
                .page-detail-footer-count {
                  line-height: 14px;
                  margin-left: 4px;
                  font-size: 14px;
                  color: #81948b;
                  &.active {
                    color: @primaryColor;
                  }
                }
              }
              .delete-hint {
                cursor: pointer;
                font-size: 14px;
                color: #81948b;

                &::before{
                  position: relative;
                  top: 2px;
                  margin: 0px 10px;
                  content: url(~images/question/vertical.svg)
                }
              }

              /deep/ .page-detail-footer-dropdown-wrapper {
                margin-left: 16px;
                padding: 0 !important;
              }
            }
          }
        }
      }
      .page-content {
        padding: 16px 100px 40px;
        .page-content-main {
          width: 100%;
          margin-bottom: 16px;
          .rich-text-wrapper {
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
          background: #fff;
          .page-answers-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 60px;
            padding: 0 20px;
            background: #fff;
            border-bottom: 1px solid #efefef;

            .page-answers-header-left {
              font-weight: 500;
              font-size: 16px;
              color: #2c3330;
              .page-answers-count {
                font-weight: normal;
                color: #606c66;
              }
            }
            .page-answers-header-right {
              display: flex;
              align-items: center;
              .page-answer-order {
                width: 34px;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                color: #606c66;
                text-align: center;
                background: #fafafa;
                border: 1px solid #fafafa;
                cursor: pointer;
                &.active {
                  font-weight: 500;
                  color: #2c3330;
                  border-color: #efefef;
                  background: #fff;
                }
              }
            }
          }
          .pagination-wrapper {
            margin-top: 20px;
          }
        }
      }
    }
    .page-operate-wrapper {
      position: fixed;
      right: calc(50vw - 1120px / 2);
      top: 40px;
      .page-operate-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        & + .page-operate-item {
          margin-top: 20px;
        }
        &.active {
          .operate-icon {
            .brighten-icon {
              background-image: url("~images/question/brighten_active.svg");
            }
            .like-icon {
              background-image: url("~images/question/collection_active.svg");
            }
          }
        }
        .operate-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          margin-bottom: 10px;
          background: #fff;
          border-radius: 50%;
          cursor: pointer;
          &.reply {
            background: @primaryColor;
          }
          .reply-icon,
          .brighten-icon,
          .like-icon {
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .reply-icon {
            background-image: url("~images/question/write.svg");
          }
          .brighten-icon {
            background-image: url("~images/question/brighten.svg");
          }
          .like-icon {
            background-image: url("~images/question/collection.svg");
          }
        }
        span {
          line-height: 1;
          font-size: 12px;
          color: #ffffff;
        }
      }
    }
    .page-left-operate {
      position: fixed;
      bottom: 40px;
      left: calc(50vw - 1120px / 2);
    }
    .page-right-operate {
      position: fixed;
      bottom: 40px;
      right: calc(50vw - 1120px / 2);
    }
    .operate-top {
      margin-bottom: 40px;
    }

    .page-left-operate,
    .page-right-operate {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .operate-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
        background-color: #686868;
        border-radius: 50%;
        cursor: pointer;
      }
      .left-icon,
      .right-icon,
      .top-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .left-icon {
        background-image: url("~images/question/previous.svg");
      }
      .right-icon {
        background-image: url("~images/question/next.svg");
      }
      .top-icon {
        background-image: url("~images/question/gotop.svg");
      }
      span {
        line-height: 1;
        font-size: 12px;
        color: #fff;
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

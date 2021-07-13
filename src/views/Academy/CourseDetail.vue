<template>
  <div class="page" v-loading="loading">
    <div class="container-1180">
      <div class="page-header">
        <div class="page-header-title">{{ course.name }}</div>
        <div class="page-header-desc">
          <span>{{ course.lesson_number }} 课时</span> ·
          <span>{{ Math.floor(course.second_duration / 60) }}分钟</span>
          <span>{{ course.introduction }}</span>
        </div>
      </div>
      <div class="page-main">
        <div class="page-main-left">
          <div class="page-main-video-wrapper">
            <template
              v-if="course && course.lessons && course.lessons.length > 0"
            >
              <label
                class="page-main-video-tips"
                v-if="
                  !course.permission &&
                    course.lessons[activeLessonIndex].is_trial &&
                    showTips
                "
              >
                可试看{{
                  course.lessons[activeLessonIndex].trial_duration / 60 > 1
                    ? course.lessons[activeLessonIndex].trial_duration / 60 +
                      "分钟"
                    : course.lessons[activeLessonIndex].trial_duration + "秒"
                }}，请<span class="primary" @click="handleOrder"
                  >购买本课程</span
                >
                <span class="pointer vip" v-if="course.is_vip" @click="goVip">
                  或<i class="vip-icon"></i>
                  <span class="vip-label">开通VIP</span>
                </span>
                <i class="close-icon" @click="showTips = false"></i>
              </label>
              <video-player
                :autoplay="false"
                :vid="course.lessons[activeLessonIndex].vod_id"
                :isTrial="
                  !course.permission &&
                  course.lessons[activeLessonIndex].is_trial
                    ? true
                    : false
                "
                :cover="
                  course.lessons[activeLessonIndex].cover_url ||
                    course.cover_url
                "
                :startTime="
                  course.lessons[activeLessonIndex].is_trial
                    ? 0
                    : course.lessons[activeLessonIndex].last_play_position
                "
                :duration="course.lessons[activeLessonIndex].second_duration"
                @timeUpdate="handleVideoTimeUpdate"
                @setRecord="handleSetVideoRecord"
                @ended="handleVideoEnded"
              />
              <i
                :class="['page-main-video-more', hideMenu ? 'hide' : '']"
                @click="hideMenu = !hideMenu"
              ></i>
              <div
                class="page-main-video-end"
                v-if="!course.permission && showEnd"
              >
                <h4 class="end-title">试看已结束</h4>
                <p class="end-desc">
                  体验完整课程请<span class="primary" @click="handleOrder"
                    >购买本课</span
                  ><span v-if="course.is_vip">或</span>
                </p>
                <div v-if="course.is_vip" class="vip-btn" @click="goVip">
                  <i class="vip-icon"></i>开通VIP
                </div>
              </div>
            </template>
          </div>
          <div class="page-main-info" v-show="!loading">
            <label class="page-main-price">{{
              course.price_type === COURSE_PRICE_TYPE_PAY
                ? "¥" + course.current_price
                : "免费"
            }}</label>

            <div class="page-main-info-right">
              <label v-if="false" class="page-main-study-count"
                >{{ course.study_count }}人正在学</label
              >
              <el-button
                :class="[
                  course.is_vip && isVip() ? 'vip-btn' : 'page-main-btn'
                ]"
                type="primary"
                @click="
                  course.permission ? goCourse(course.id, 1) : handleOrder()
                "
              >
                {{ course.permission ? "进入学习" : "购买本课" }}
              </el-button>
              <el-button
                class="vip-free"
                v-if="course.is_vip && !isVip()"
                @click="goVip()"
              >
                <span style="font-weight:600">开通VIP</span>
                <span style="font-weight:400">免费学</span>
              </el-button>
            </div>
          </div>
        </div>
        <div class="page-main-right" v-show="!hideMenu">
          <div class="page-main-right-info">
            <label class="page-main-info-text">
              <i class="course-icon"></i>
              {{ course.lesson_number }} 课时
            </label>
            <label class="page-main-info-text">
              <i class="duration-icon"></i>
              {{ Math.floor(course.second_duration / 60) }}分钟
            </label>
          </div>
          <p class="page-main-intro" v-if="course.introduction">
            {{ course.introduction }}
          </p>
          <div class="page-lesson-wrapper">
            <div class="scroll-section">
              <ul class="page-lesson-list">
                <li
                  :class="[
                    'page-lesson-item',
                    activeLessonIndex === index ? 'active' : ''
                  ]"
                  v-for="(lesson, index) of course.lessons"
                  :key="lesson.id"
                  @click="
                    course.permission || lesson.is_trial
                      ? handleToggleLesson(index)
                      : null
                  "
                >
                  <div class="lesson-item-left">
                    <the-loading-image
                      :width="160"
                      :height="90"
                      :url="lesson.cover_url"
                    />
                    <label
                      class="lesson-item-left-label"
                      v-if="activeLessonIndex === index"
                      >正在播放</label
                    >
                  </div>
                  <div class="lesson-item-right">
                    <h5 class="lesson-item-title ellipsis">
                      {{ lesson.name }}
                    </h5>
                    <label class="lesson-item-duration">
                      <span v-if="activeLessonIndex === index">{{
                        formatSeconds(lesson.last_play_position) + " / "
                      }}</span>
                      {{ formatSeconds(lesson.second_duration) }}
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="page-content-relative" v-if="relations.length > 0">
          <h4 class="page-content-label">相关课程</h4>
          <ul class="page-content-relative-list">
            <li
              class="page-content-relative-item"
              v-for="item of relations"
              :key="item.id"
            >
              <course-card
                :course="item"
                @click.native.prevent="goDetail(item.id)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import VideoPlayer from "components/Course/VideoPlayer";
import { COURSE_PRICE_TYPE_PAY } from "utils/const";
import { COURSE_PRICE_TYPE_FREE } from "utils/const";
import courseSerive from "service/course";
import courseService from "service/course";

import { formatSeconds } from "utils/moment";
import CourseCard from "./widgets/CourseCard";
import orderService from "service/order";
import { ORDER_TYPE_COURSE } from "utils/const";
import { goOrder, goCourse } from "utils/routes";
import { mapState } from "vuex";
import { isVip } from "utils/function";
import { goVip } from "utils/routes";

export default {
  name: "AcademyCourseDetail",
  components: { TheLoadingImage, VideoPlayer, CourseCard },
  data() {
    return {
      COURSE_PRICE_TYPE_PAY,
      COURSE_PRICE_TYPE_FREE,
      loading: true,
      course: {},
      relations: [],
      activeLessonIndex: 0,
      setRecording: false,
      updatingTimer: null,
      hideMenu: false,
      showTips: true
    };
  },
  watch: {
    ["$route"]() {
      this.getData();
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    lessonStatus() {
      // 4 播放完成，3 播放过，2 正在播放，1 未播放， 5 不能播放
      return index => {
        const { lessons, permission } = this.course;
        if (!permission) {
          return 5;
        }
        const lesson = lessons[index];
        const last_play_position = lesson.last_play_position || 0;
        const play_second_duration = lesson.play_second_duration || 0;
        return play_second_duration >= lesson.second_duration * 0.9
          ? 4
          : last_play_position > 0
          ? 3
          : 1;
      };
    },
    lessonStatusText() {
      return index => {
        const status = this.lessonStatus(index);
        const { lessons } = this.course;
        const lesson = lessons[index];
        let text = "";
        switch (status) {
          case 3:
            text = this.formatSeconds(lesson.last_play_position);
            break;
          case 4:
          case 1:
          default:
            break;
        }
        return text;
      };
    },
    lessonStatusIconClass() {
      return index => {
        const status = this.lessonStatus(index);
        let iconClass = "unplay-icon";
        switch (status) {
          case 5:
            iconClass = "lock-icon";
            break;
          case 3:
            iconClass = "played-icon";
            break;
          case 4:
            iconClass = "completed-icon";
            break;
          case 1:
          default:
            break;
        }
        return iconClass;
      };
    }
  },
  created() {
    this.getData();
  },
  methods: {
    isVip,
    goVip,
    formatSeconds,
    goCourse,
    getData() {
      this.loading = true;
      courseSerive
        .course(this.$route.params.id)
        .then(course => {
          this.course = course;
          const withoutIds = [this.$route.params.id];
          this.activeLessonIndex = 0;
          courseSerive
            .courses({
              page_size: 4,
              page: 1,
              withoutIds
            })
            .then(relation => {
              this.relations = relation.list;
            })
            .finally(() => {
              this.loading = false;
              console.log(this.course);
            });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goDetail(id) {
      this.$router.push({
        params: {
          id
        }
      });
    },
    handleOrder() {
      if (!this.userInfo) {
        this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
        return;
      }
      orderService
        .addOrder({
          type: ORDER_TYPE_COURSE,
          resource_id: this.course.id,
          remark: "购买课程"
        })
        .then(res => {
          goOrder(res.no);
        });
    },
    handleVideoTimeUpdate(second) {
      const { course, activeLessonIndex } = this;
      if (this.updatingTimer) return false;
      this.updatingTimer = setTimeout(() => {
        course.lessons[activeLessonIndex]["last_play_position"] = Math.floor(
          second
        );
        clearTimeout(this.updatingTimer);
        this.updatingTimer = null;
      }, 300);
    },
    handleSetVideoRecord(params) {
      const { activeLessonIndex, course, setRecording } = this;
      const lesson = course.lessons[activeLessonIndex];
      if (!setRecording) {
        this.setRecording = true;
        courseService
          .setLessonRecord(course.id, lesson.id, params)
          .then(() => {
            this.$set(this.course.lessons, activeLessonIndex, {
              ...lesson,
              play_second_duration:
                lesson.play_second_duration - 0 + (params.second_duration - 0)
            });
          })
          .finally(() => {
            this.setRecording = false;
          });
      }
    },
    handleVideoEnded() {
      this.showEnd = true;
    },
    handleToggleLesson(index) {
      this.activeLessonIndex = index;
      this.showTips = true;
      this.showEnd = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.vip-icon {
  width: 18px;
  height: 18px;
  background-image: url(~images/academy/vip.svg);
}
.page {
  padding: 40px 0;
  background: #fff !important;
  .page-header {
    .page-header-title {
      line-height: 24px;
      font-weight: 600;
      font-size: 18px;
      color: #2c3330;
    }
    .page-header-desc {
      margin-top: 4px;
      line-height: 16px;
      font-size: 12px;
      color: #81948b;
    }
  }
  .page-main {
    display: flex;
    height: 520px;
    margin-top: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #efefef;
    .page-main-left {
      flex: 1;
      width: 5px;
      .page-main-video-wrapper {
        position: relative;
        width: 100%;
        height: 440px;
        background: #000;
        &:hover {
          .page-main-video-tips {
            bottom: 54px;
          }
        }
        .page-main-video-tips {
          position: absolute;
          bottom: 10px;
          left: 10px;
          padding: 8px 10px;
          line-height: 18px;
          font-size: 14px;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 17px;
          z-index: 1001;
          .vip {
            display: inline-flex;
            align-items: center;
            margin-left: 10px;
            .vip-label {
              color: #ffe761;
            }
          }
          .close-icon {
            display: inline-block;
            margin-left: 10px;
            width: 18px;
            height: 18px;
            mask: url("~images/commodity/close.svg") no-repeat center;
            background-color: #fff;
            vertical-align: text-bottom;
            cursor: pointer;
          }
        }
        .page-main-video-more {
          display: inline-block;
          position: absolute;
          left: 100%;
          top: 50%;
          width: 20px;
          height: 40px;
          background-color: rgba(0, 0, 0, 0.6);
          border-radius: 0 40px 40px 0;
          cursor: pointer;
          &::after {
            position: absolute;
            top: 50%;
            left: 0;
            width: 16px;
            height: 16px;
            content: "";
            mask: url("~images/commodity/expand.svg") no-repeat center;
            background: #fff;
            transform: translate(0, -50%) rotate(-90deg);
          }
          &.hide {
            &::after {
              transform: translate(0, -50%) rotate(90deg);
            }
          }
        }
        .page-main-video-end {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1002;
          color: #fff;
          .end-title {
            line-height: 24px;
            font-weight: 600;
            font-size: 18px;
          }
          .end-desc {
            margin-top: 4px;
            line-height: 24px;
            font-size: 14px;
          }
          .vip-btn {
            display: flex;
            align-items: center;
            margin-top: 20px;
            padding: 8px 24px;
            cursor: pointer;
            .vip-icon {
              width: 24px;
              height: 24px;
              margin-right: 8px;
            }
          }
        }
      }
      .page-main-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        .page-main-price {
          line-height: 32px;
          font-weight: 500;
          font-size: 24px;
          color: @primaryColor;
        }
        .page-vip-benefit {
          display: flex;
        }
        .page-vip-hint {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 85px;
          height: 32px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 16px;
          background-color: #efefef;

          .page-vip {
            margin-right: 7px;
            color: #ffbd12;
          }
          .page-freestudy {
            color: #000;
          }
        }
        .page-vip-price {
          margin-right: 8px;
          text-decoration: line-through;
        }

        .page-main-info-right {
          display: flex;
          align-items: center;
          .page-main-study-count {
            line-height: 24px;
            font-size: 14px;
            color: #81948b;
          }
          .page-main-btn {
            margin-left: 16px;
            padding: 16px 36px;
            span {
              line-height: 16px;
              font-weight: 500;
              font-size: 16px;
              color: #ffffff;
            }
          }
        }
      }
    }
    .page-main-right {
      flex: none;
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      width: 380px;
      height: 100%;
      padding: 16px;
      background: #fafafa;
      .page-main-right-info {
        flex: none;
        .page-main-info-text {
          line-height: 16px;
          font-weight: normal;
          font-size: 14px;
          color: #606c66;
          & + .page-main-info-text {
            margin-left: 12px;
          }
          .course-icon,
          .duration-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            mask-repeat: no-repeat;
            mask-size: cover;
            background: #606c66;
            vertical-align: bottom;
          }
          .course-icon {
            mask-image: url("~images/academy/course.svg");
          }
          .duration-icon {
            mask-image: url("~images/academy/duration.svg");
          }
        }
      }
      .page-main-intro {
        flex: none;
        margin-top: 16px;
        line-height: 24px;
        font-size: 14px;
        color: #81948b;
      }
      .page-lesson-wrapper {
        flex: 1;
        width: 100%;
        margin-top: 16px;
        overflow: hidden;
        background: #fafafa;
        .scroll-section {
          width: calc(100% + 15px);
          height: 100%;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 15px;
          }
          .page-lesson-list {
            background: #fafafa;
            .page-lesson-item {
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
              width: 100%;
              cursor: pointer;
              & + .page-lesson-item {
                margin-top: 8px;
              }
              &.active {
                .lesson-item-title {
                  color: @primaryColor !important;
                }
                .lesson-item-status {
                  color: @primaryColor !important;
                }
              }
              .lesson-item-left {
                flex: none;
                position: relative;
                width: 160px;
                .lesson-item-left-label {
                  position: absolute;
                  padding: 4px 8px;
                  right: 4px;
                  bottom: 4px;
                  line-height: 1;
                  font-size: 12px;
                  color: #ffffff;
                  background: @primaryColor;
                }
              }
              .lesson-item-right {
                flex: 1;
                width: 10px;
                display: inline-block;
                margin-left: 16px;
                line-height: 24px;
                font-size: 14px;
                text-align: left;
                color: #999;
                .lesson-item-title {
                  font-weight: 600;
                  line-height: 20px;
                  font-size: 14px;
                  color: #2c3330;
                }
                .lesson-item-duration {
                  display: inline-block;
                  line-height: 16px;
                  font-size: 12px;
                  color: #81948b;
                  span {
                    color: @primaryColor;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .page-content {
    margin-top: 40px;
    .page-content-label {
      line-height: 32px;
      font-weight: 600;
      font-size: 24px;
      letter-spacing: 1px;
      color: #2c3330;
    }
    .page-content-relative-list {
      display: flex;
      margin-top: 20px;
      .page-content-relative-item {
        & + .page-content-relative-item {
          margin-left: 20px;
        }
      }
    }
  }
  .vip-free {
    width: 186px;
    height: 48px;
    font-size: 16px;
    color: black;
    background: #f9da37;
  }
  .vip-btn {
    margin-left: 16px;
    padding: 16px 36px;
    font-size: 16px;
    color: black;
    background: #f9da37;
    border: none;
  }
}
</style>

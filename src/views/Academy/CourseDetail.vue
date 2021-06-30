<template>
  <div class="page" v-loading="loading">
    <div class="container-1180">
      <div class="page-main">
        <div class="page-main-left">
          <the-loading-image
            :width="780"
            :height="439"
            :url="course.cover_url"
          />
          <div class="page-main-info">
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
                  course.is_vip ? 'vip-btn' : 'page-main-btn'
                ]"
                type="primary"
                @click="
                  course.permission ? goCourse(course.id, 1) : handleOrder()
                "
              >
                {{ course.permission ? "开始学习" : "购买本课" }}
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
        <div class="page-main-right">
          <h3 class="page-main-title">{{ course.name }}</h3>
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
                    lessonStatus(index) === 3 ? 'active' : '',
                    lessonStatus(index) === 4 ? 'completed' : ''
                  ]"
                  v-for="(lesson, index) of course.lessons"
                  :key="lesson.id"
                  @click="
                    course.permission ? goCourse(course.id, index + 1) : null
                  "
                >
                  <div class="lesson-item-left">
                    <i
                      :class="[
                        'lesson-item-icon',
                        lessonStatusIconClass(index)
                      ]"
                    ></i>
                    <h5 class="lesson-item-title ellipsis">
                      {{ lesson.name }}
                    </h5>
                  </div>
                  <div class="lesson-item-right">
                    <label class="lesson-item-status">
                      {{ lessonStatusText(index) }}
                    </label>
                    <label class="lesson-item-duration">
                      {{ lessonStatusText(index) ? "/" : "" }}
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
import { COURSE_PRICE_TYPE_PAY } from "utils/const";
import courseSerive from "service/course";
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
  components: { TheLoadingImage, CourseCard },
  data() {
    return {
      COURSE_PRICE_TYPE_PAY,
      loading: true,
      course: {},
      relations: []
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.page {
  padding: 40px 0;
  background: #fff !important;
  .page-main {
    display: flex;
    height: 520px;
    padding-bottom: 16px;
    border-bottom: 1px solid #efefef;
    .page-main-left {
      width: 780px;
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
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      width: 380px;
      height: 100%;
      .page-main-title {
        flex: none;
        line-height: 32px;
        font-weight: 600;
        font-size: 20px;
        color: #2c3330;
      }
      .page-main-right-info {
        flex: none;
        margin-top: 8px;
        .page-main-info-text {
          line-height: 24px;
          font-weight: 500;
          font-size: 16px;
          color: #606c66;
          & + .page-main-info-text {
            margin-left: 16px;
          }
          .course-icon,
          .duration-icon {
            display: inline-block;
            width: 24px;
            height: 24px;
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
        margin-top: 24px;
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
            padding: 16px;
            background: #fafafa;
            .page-lesson-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              padding: 16px 8px;
              cursor: pointer;
              & + .page-lesson-item {
                border-top: 1px solid #2c33301a;
              }
              &:hover {
                background: rgba(0, 0, 0, 0.05);
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
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .lesson-item-icon {
                  flex: none;
                  display: block;
                  margin-right: 16px;
                  width: 24px;
                  height: 24px;
                  mask-size: cover;
                  mask-repeat: no-repeat;
                  &.unplay-icon {
                    background-color: #2c3330;
                    mask-image: url("~images/course/unplay.svg");
                  }
                  &.played-icon {
                    background-color: @primaryColor;
                    mask-image: url("~images/course/unplay.svg");
                  }
                  &.completed-icon {
                    background-color: #2c3330;
                    mask-image: url("~images/course/completed.svg");
                  }
                  &.lock-icon {
                    background-color: #2c3330;
                    mask-image: url("~images/course/lock.svg");
                  }
                }
                .lesson-item-title {
                  flex: 1;
                  width: 5px;
                  line-height: 24px;
                  font-size: 14px;
                  font-weight: normal;
                  color: #2c3330;
                }
              }

              .lesson-item-right {
                flex: none;
                display: inline-block;
                line-height: 24px;
                font-size: 14px;
                text-align: right;
                color: #999;
                .lesson-item-duration {
                  display: inline-block;
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

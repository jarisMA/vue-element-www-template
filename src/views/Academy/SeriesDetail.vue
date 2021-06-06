<template>
  <div class="page" v-loading="loading">
    <div class="container-1180">
      <div class="page-main">
        <div class="page-main-left">
          <the-loading-image
            :width="780"
            :height="439"
            :url="series.cover_url"
          />
          <div class="page-main-info">
            <label class="page-main-price">
              {{ "¥" + series.current_price }}</label
            >
            <div class="page-main-info-right">
              <label class="page-main-study-count"
                >{{ series.study_count }}人正在学</label
              >
              <el-button
                class="page-main-btn"
                type="primary"
                @click="
                  series.permission
                    ? goSeriesCourse(series.id, series.courses[0].id, 1)
                    : handleOrder()
                "
              >
                {{ series.permission ? "开始学习" : "购买本课" }}
              </el-button>
            </div>
          </div>
        </div>
        <div class="page-main-right">
          <h3 class="page-main-title">{{ series.name }}</h3>
          <div class="page-main-right-info">
            <label class="page-main-info-text">
              <i class="series-icon"></i>
              {{ series.lesson_number }} 课时
            </label>
            <label class="page-main-info-text">
              <i class="duration-icon"></i>
              {{ Math.floor(series.second_duration / 60) }}分钟
            </label>
          </div>
          <p class="page-main-intro" v-if="series.introduction">
            {{ series.introduction }}
          </p>
          <ul class="page-course-list">
            <li
              class="page-course-item"
              v-for="(course, key) of series.courses"
              :key="key"
            >
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <div class="course-header">
                      <h4 class="course-header-title ellipsis">
                        {{ course.name }}
                      </h4>
                      <div class="course-header-right">
                        <label class="course-header-count"
                          >共{{ course.lesson_number }}节</label
                        >
                        <label class="course-header-duration"
                          >{{
                            Math.floor(course.second_duration / 60)
                          }}分钟</label
                        >
                      </div>
                    </div>
                  </template>
                  <ul
                    class="page-lesson-list"
                    v-if="course.lessons && course.lessons.length > 0"
                  >
                    <li
                      :class="[
                        'page-lesson-item',
                        lessonStatus(key, index) === 3 ? 'active' : '',
                        lessonStatus(key, index) === 4 ? 'completed' : ''
                      ]"
                      v-for="(lesson, index) of course.lessons"
                      :key="lesson.id"
                    >
                      <div class="lesson-item-left">
                        <i
                          :class="[
                            'lesson-item-icon',
                            lessonStatusIconClass(key, index)
                          ]"
                        ></i>
                        <h5 class="lesson-item-title ellipsis">
                          {{ lesson.name }}
                        </h5>
                      </div>
                      <div class="lesson-item-right">
                        <label class="lesson-item-status">
                          {{ lessonStatusText(key, index) }}
                        </label>
                        <label class="lesson-item-duration">
                          {{ lessonStatusText(key, index) ? "/" : "" }}
                          {{ formatSeconds(lesson.second_duration) }}
                        </label>
                      </div>
                    </li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </li>
          </ul>
        </div>
      </div>
      <div class="page-content">
        <div class="page-content-relative">
          <h4 class="page-content-label">相关课程</h4>
          <ul class="page-content-relative-list">
            <li
              class="page-content-relative-item"
              v-for="item of relations"
              :key="item.id"
            >
              <set-card
                :series="item"
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
import courseService from "service/course";
import { formatSeconds } from "utils/moment";
import SetCard from "./widgets/SetCard";
import orderService from "service/order";
import { ORDER_TYPE_COURSE_SERIES } from "utils/const";
import { goOrder, goSeriesCourse } from "utils/routes";

export default {
  name: "AcademySeriesDetail",
  components: { TheLoadingImage, SetCard },
  data() {
    return {
      loading: true,
      series: {},
      relations: []
    };
  },
  watch: {
    ["$route"]() {
      this.getData();
    }
  },
  computed: {
    lessonStatus() {
      // 4 播放完成，3 播放过，2 正在播放，1 未播放
      return (key, index) => {
        const { lessons } = this.series.courses[key];
        if (!index) {
          return 1;
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
      return (key, index) => {
        const status = this.lessonStatus(key, index);
        const { lessons } = this.series.courses[key];
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
      return (key, index) => {
        const status = this.lessonStatus(key, index);
        let iconClass = "unplay-icon";
        switch (status) {
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
    formatSeconds,
    goSeriesCourse,
    getData() {
      this.loading = true;
      courseService
        .set(this.$route.params.id)
        .then(series => {
          this.series = series;
          const withoutIds = [this.$route.params.id];
          courseService
            .series({
              page_size: 3,
              page: 1,
              withoutIds,
              cat_id: series.cat_id
            })
            .then(relation => {
              this.relations = relation.list;
            })
            .finally(() => {
              this.loading = false;
            });
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
      orderService
        .addOrder({
          type: ORDER_TYPE_COURSE_SERIES,
          resource_id: this.series.id,
          remark: "购买体系课"
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
      margin-left: 20px;
      width: 380px;
      .page-main-title {
        line-height: 32px;
        font-weight: 600;
        font-size: 20px;
        color: #2c3330;
      }
      .page-main-right-info {
        margin-top: 8px;
        .page-main-info-text {
          line-height: 24px;
          font-weight: 500;
          font-size: 16px;
          color: #606c66;
          & + .page-main-info-text {
            margin-left: 16px;
          }
          .series-icon,
          .duration-icon {
            display: inline-block;
            width: 24px;
            height: 24px;
            mask-repeat: no-repeat;
            mask-size: cover;
            background: #606c66;
            vertical-align: bottom;
          }
          .series-icon {
            mask-image: url("~images/academy/course.svg");
          }
          .duration-icon {
            mask-image: url("~images/academy/duration.svg");
          }
        }
      }
      .page-main-intro {
        margin-top: 16px;
        line-height: 24px;
        font-size: 14px;
        color: #81948b;
      }
      .page-course-list {
        height: 375px;
        padding: 16px;
        margin-top: 24px;
        overflow-y: auto;
        background: #fafafa;
        .el-collapse {
          border-top: unset;
          /deep/ .el-collapse-item {
            .el-collapse-item__header {
              padding: 16px 8px;
              height: auto;
              background: transparent;
              .course-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                .course-header-title {
                  flex: 1;
                  line-height: 24px;
                  font-weight: 500;
                  font-size: 16px;
                  color: #2c3330;
                }
                .course-header-right {
                  flex: none;
                  margin-right: 8px;
                  line-height: 24px;
                  font-size: 12px;
                  color: rgba(0, 0, 0, 0.6);
                  .course-header-duration {
                    margin-left: 8px;
                  }
                }
              }
            }
            .el-collapse-item__wrap {
              background: transparent;
            }
          }
        }
        .page-lesson-list {
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
}
</style>

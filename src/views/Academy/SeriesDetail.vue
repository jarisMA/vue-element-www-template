<template>
  <div class="page" v-loading="loading">
    <div class="container-1180">
      <div class="page-main">
        <div class="page-main-left">
          <the-loading-image
            :width="780"
            :height="440"
            :url="series.cover_url + '?x-oss-process=style/pc_course_show'"
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
                    ? goAcademySeriesVideo(
                        series.id,
                        series.chapters[0].id,
                        series.chapters[0].sections[0].id
                      )
                    : handleOrder()
                "
              >
                {{ series.permission ? "开始学习" : "购买本课" }}
              </el-button>
              <el-button
                class="vip-free"
                v-if="series.origin_price > 0 && !isVip()"
                @click="goVip()"
              >
                <span style="font-weight:600">开通VIP</span>
                <span style="font-weight:400">免费学</span>
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
          <div class="page-chapter-list">
            <div class="scroll-section">
              <el-collapse v-model="activeChapterIndexArr">
                <div
                  class="page-chapter-item"
                  v-for="(chapter, key) of series.chapters"
                  :key="key"
                >
                  <el-collapse-item :name="key">
                    <template slot="title">
                      <div class="chapter-header">
                        <h4 class="chapter-header-title ellipsis">
                          <span
                            @click.stop="
                              series.permission
                                ? goAcademySeriesVideo(
                                    series.id,
                                    chapter.id,
                                    chapter.sections[0].id
                                  )
                                : null
                            "
                            >{{ chapter.name }}</span
                          >
                        </h4>
                        <div class="chapter-header-right">
                          <label class="chapter-header-count"
                            >共{{ chapter.lesson_number }}节</label
                          >
                          <label class="chapter-header-duration"
                            >{{
                              Math.floor(chapter.second_duration / 60)
                            }}分钟</label
                          >
                        </div>
                      </div>
                    </template>
                    <ul
                      class="page-section-list"
                      v-if="chapter.sections && chapter.sections.length > 0"
                    >
                      <li
                        :class="[
                          'page-section-item',
                          lessonStatus(key, index) === 3 ? 'active' : '',
                          lessonStatus(key, index) === 4 ? 'completed' : ''
                        ]"
                        v-for="(section, index) of chapter.sections"
                        :key="section.id"
                        @click.stop="
                          series.permission
                            ? goAcademySeriesVideo(
                                series.id,
                                chapter.id,
                                section.id
                              )
                            : null
                        "
                      >
                        <div class="section-item-left">
                          <i
                            :class="[
                              'section-item-icon',
                              lessonStatusIconClass(key, index)
                            ]"
                          ></i>
                          <h5 class="section-item-title ellipsis">
                            {{ section.name }}
                          </h5>
                        </div>
                        <div class="section-item-right">
                          <label class="section-item-status">
                            {{ lessonStatusText(key, index) }}
                          </label>
                          <label class="section-item-duration">
                            {{ lessonStatusText(key, index) ? "/" : "" }}
                            {{ formatSeconds(section.second_duration) }}
                          </label>
                        </div>
                      </li>
                    </ul>
                  </el-collapse-item>
                </div>
              </el-collapse>
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
import { goOrder, goAcademySeriesVideo } from "utils/routes";
import { mapState } from "vuex";
import { goVip } from "utils/routes";
import { isVip } from "utils/function";

export default {
  name: "AcademySeriesDetail",
  components: { TheLoadingImage, SetCard },
  data() {
    return {
      loading: true,
      series: {},
      relations: [],
      activeChapterIndexArr: [0]
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
      // 4 播放完成，3 播放过，2 正在播放，1 未播放, 5 不能播放
      return (key, index) => {
        const { sections } = this.series.chapters[key];
        if (!this.series.permission) {
          return 5;
        }
        if (!index) {
          return 1;
        }
        const section = sections[index];
        const last_play_position = section.last_play_position || 0;
        const play_second_duration = section.play_second_duration || 0;
        return play_second_duration >= section.second_duration * 0.9
          ? 4
          : last_play_position > 0
          ? 3
          : 1;
      };
    },
    lessonStatusText() {
      return (key, index) => {
        const status = this.lessonStatus(key, index);
        const { sections } = this.series.chapters[key];
        const section = sections[index];
        let text = "";
        switch (status) {
          case 3:
            text = this.formatSeconds(section.last_play_position);
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
    goAcademySeriesVideo,
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
      if (!this.userInfo) {
        this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
        return;
      }
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
        flex: none;
        margin-top: 16px;
        line-height: 24px;
        font-size: 14px;
        color: #81948b;
      }
      .page-chapter-list {
        flex: 1;
        height: 375px;
        padding: 16px 0;
        margin-top: 24px;
        background: #fafafa;
        .scroll-section {
          width: calc(100% + 15px);
          height: 100%;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 15px;
          }
        }
        .el-collapse {
          margin: 0 16px;
          border-top: unset;
          /deep/ .el-collapse-item {
            .el-collapse-item__header {
              padding: 16px 8px;
              height: auto;
              background: transparent;
              .chapter-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                .chapter-header-title {
                  flex: 1;
                  line-height: 24px;
                  font-weight: 500;
                  font-size: 16px;
                  color: #2c3330;
                }
                .chapter-header-right {
                  flex: none;
                  margin-right: 8px;
                  line-height: 24px;
                  font-size: 12px;
                  color: rgba(0, 0, 0, 0.6);
                  .chapter-header-duration {
                    margin-left: 8px;
                  }
                }
              }
            }
            .el-collapse-item__wrap {
              background: transparent;
              .el-collapse-item__content {
                padding-bottom: 0;
              }
            }
          }
        }
        .page-section-list {
          .page-section-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 16px 8px;
            cursor: pointer;
            & + .page-section-item {
              border-top: 1px solid #2c33301a;
            }
            &:hover {
              background: rgba(0, 0, 0, 0.05);
            }
            &.active {
              .section-item-title {
                color: @primaryColor !important;
              }
              .section-item-status {
                color: @primaryColor !important;
              }
            }
            .section-item-left {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              .section-item-icon {
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
              .section-item-title {
                flex: 1;
                width: 5px;
                line-height: 24px;
                font-size: 14px;
                font-weight: normal;
                color: #2c3330;
              }
            }

            .section-item-right {
              flex: none;
              display: inline-block;
              line-height: 24px;
              font-size: 14px;
              text-align: right;
              color: #999;
              .section-item-duration {
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
    color: black;
    background: #f9da37;
    border: none;
  }
}
</style>

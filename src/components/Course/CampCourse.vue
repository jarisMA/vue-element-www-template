<template>
  <div class="course-page">
    <div class="page-header">
      <div class="page-header-left">
        <i
          :class="[
            'page-header-left_icon',
            'menu-icon',
            showMenu ? 'close' : 'show'
          ]"
          @click="showMenu = !showMenu"
        ></i>
        <label class="page-header-left_text ellipsis">
          {{ detail.name }}
        </label>
      </div>
      <div class="page-header-content">
        <h3 class="page-header-title">
          {{
            chapters.length > 0
              ? chapters[chapterIndex].sections[sectionIndex].name
              : ""
          }}
        </h3>
      </div>
      <div class="page-header-right">
        <i class="page-header-right_icon"></i>
        <label class="page-header-right_text">
          斗西老师正在授课
        </label>
      </div>
    </div>
    <div class="page-content">
      <div :class="['page-content-left', showMenu ? 'show' : 'hide']">
        <div class="page-fold-left" @click="showMenu = !showMenu"></div>
        <el-scrollbar class="scrollbar-section" ref="scroll">
          <div
            class="page-menu-wrapper"
            v-for="(chapter, cIndex) of chapters"
            :key="chapter.id"
          >
            <el-collapse v-model="activeNames">
              <el-collapse-item
                :name="chapter.id"
                :disabled="
                  chapter.start_at &&
                    new Date().valueOf() < new Date(chapter.start_at).valueOf()
                "
              >
                <template slot="title">
                  <div
                    class="page-menu-title ellipsis"
                    :style="{
                      color:
                        chapters[chapterIndex].id === chapter.id
                          ? '#14af64'
                          : '',
                      opacity:
                        chapter.start_at &&
                        new Date().valueOf() <
                          new Date(chapter.start_at).valueOf()
                          ? '0.6'
                          : ''
                    }"
                  >
                    {{ chapter.title }}
                  </div>
                </template>
                <div class="page-menu-empty" v-if="chapter.sections.length < 1">
                  暂无视频
                </div>
                <div
                  :class="[
                    'page-menu-item',
                    chapters[chapterIndex].sections[sectionIndex].id ===
                    section.id
                      ? 'active'
                      : '',
                    [4].indexOf(sectionStatus(section)) > -1 ? 'completed' : ''
                  ]"
                  v-for="(section, sIndex) of chapter.sections"
                  :key="section.id"
                  @click="handleToggleSection(cIndex, sIndex)"
                  v-else
                >
                  <i
                    :class="[
                      'page-menu-item_icon',
                      sectionStatusIconClass(section)
                    ]"
                  ></i>
                  <h4 class="page-menu-item_name ellipsis">
                    {{ section.name }}
                  </h4>
                  <label class="page-menu-item-duration">
                    <template
                      v-if="[2, 3].indexOf(sectionStatus(section)) > -1"
                    >
                      <span
                        :class="[
                          [2].indexOf(sectionStatus(section)) > -1
                            ? 'primary'
                            : ''
                        ]"
                        >{{ secondsUpdate(section.last_play_position) }}</span
                      >/ </template
                    >{{ formatSeconds(section.second_duration) }}
                  </label>
                </div>
              </el-collapse-item>
            </el-collapse>
            <div class="page-menu-footer"></div>
          </div>
        </el-scrollbar>
      </div>
      <div class="page-content-right">
        <video-player
          v-if="chapters.length > 0"
          :vid="chapters[chapterIndex].sections[sectionIndex].vod_id"
          :startTime="
            chapters[chapterIndex].sections[sectionIndex].last_play_position
          "
          :duration="
            chapters[chapterIndex].sections[sectionIndex].second_duration
          "
          :next="next"
          ref="video"
          @setRecord="handleSetRecord"
          @timeUpdate="handleTimeUpdate"
          @ended="handleEnded"
          @handleContent="handleContent"
          @next="handleNextLesson"
        />
        <div class="remind-feedback">
          <div class="remind-text-wrapper">
            <div
              :class="[
                'remind-text',
                chapters[chapterIndex].sections[
                  chapters[chapterIndex].sections.length - 1
                ].id == chapters[chapterIndex].sections[sectionIndex].id &&
                chapters[chapterIndex].sections[sectionIndex]
                  .last_play_position >
                  chapters[chapterIndex].sections[sectionIndex]
                    .second_duration /
                    2
                  ? 'show'
                  : ''
              ]"
            >
              <p>这节课是不是收获颇丰呢？</p>
              <p>
                点击下方<img
                  src="~images/academy/video-feedback.svg"
                  class="feedback-icon"
                />与同学们分享一下吧～
              </p>
            </div>
          </div>
          <img
            src="~images/course/avatar.png"
            class="remind-icon"
            v-if="
              chapters[chapterIndex].sections[
                chapters[chapterIndex].sections.length - 1
              ].id == chapters[chapterIndex].sections[sectionIndex].id &&
                chapters[chapterIndex].sections[sectionIndex]
                  .last_play_position >
                  chapters[chapterIndex].sections[sectionIndex]
                    .second_duration /
                    2
            "
          />
        </div>
      </div>
      <div :class="['page-content-aside', showAside ? 'show' : 'hide']">
        <div
          class="page-fold-right"
          @click="handleShowAside()"
          v-if="showAside"
        ></div>
        <course-feedback-list
          :campId="campId"
          :termId="termId"
          :category="activeFeedbackCategory"
          v-if="showContent == 'feedback'"
        />
        <div class="course-note" v-if="showContent == 'note'">
          <div
            class="course-video-note"
            v-if="chapters[chapterIndex].sections[sectionIndex].note"
          >
            <div
              class="course-note-title"
              v-html="chapters[chapterIndex].sections[sectionIndex].note.name"
            ></div>
            <div
              class="course-note-content"
              v-html="
                chapters[chapterIndex].sections[sectionIndex].note.content
              "
            ></div>
          </div>
          <div class="course-note-empty" v-else>
            <img src="~/images/course/note-empty.svg" class="empty-img" />
            <p>这节课没有笔记可查阅噢</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "./VideoPlayer";
import { formatSeconds } from "utils/moment";
import CourseFeedbackList from "@/views/Term/widgets/CourseFeedbackList";

export default {
  name: "CampCourse",
  components: { VideoPlayer, CourseFeedbackList },
  props: {
    course: {
      type: Object,
      required: true
    },
    courseChapters: {
      type: Array,
      required: true
    },
    chapterIndex: {
      type: Number,
      required: true
    },
    sectionIndex: {
      type: Number,
      required: true
    },
    next: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      detail: {},
      chapters: [],
      showMenu: true,
      showAside: false,
      showContent: "",
      updatingTimer: null,
      activeNames: [],
      campId: "",
      termId: "",
      activeFeedbackCategory: null
    };
  },
  watch: {
    course() {
      this.getData();
    },
    ["$route"]() {
      this.getParams();
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.goTop();
  },
  computed: {
    sectionStatus() {
      // 4 播放完成，3 播放过，2 正在播放，1 未播放
      return section => {
        const last_play_position = section.last_play_position || 0;
        const play_second_duration = section.play_second_duration || 0;
        return section.id ===
          this.chapters[this.chapterIndex].sections[this.sectionIndex].id
          ? 2
          : play_second_duration >= section.second_duration * 0.9
          ? 4
          : last_play_position > 0
          ? 3
          : 1;
      };
    },
    sectionStatusIconClass() {
      return section => {
        const status = this.sectionStatus(section);
        let iconClass = "unplay-icon";
        switch (status) {
          case 2:
            iconClass = "playing-icon";
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
    },
    secondsUpdate() {
      return last_play_position => {
        return formatSeconds(last_play_position || 0);
      };
    }
  },
  methods: {
    formatSeconds,
    getData() {
      this.detail = JSON.parse(JSON.stringify(this.course));
      this.chapters = JSON.parse(JSON.stringify(this.courseChapters));
      if (this.chapters[this.chapterIndex]) {
        this.activeNames = [this.chapters[this.chapterIndex].id];
      }
      this.goTop();
    },
    getParams() {
      let { campId, termId, widgetId } = this.$route.params;
      this.campId = parseInt(campId);
      this.termId = parseInt(termId);
      if (this.chapters && widgetId) {
        this.activeFeedbackCategory = this.chapters.find(
          item => item.id == widgetId
        );
      }
    },
    handleShowAside() {
      this.showAside = !this.showAside;
      if (!this.showAside) {
        this.$refs.video.clean();
      }
    },
    handleContent(val) {
      this.getParams();
      if (!this.showAside || (this.showAside && this.showContent == val)) {
        this.showAside = !this.showAside;
      }
      this.showContent = val;
    },

    handleSetRecord(params) {
      this.$emit("setRecord", params);
    },
    handleToggleSection(chapterIndex, sectionIndex) {
      this.$emit("toggle", chapterIndex, sectionIndex);
    },
    handleTimeUpdate(second) {
      const { chapters, chapterIndex, sectionIndex } = this;
      if (this.updatingTimer) return false;
      this.updatingTimer = setTimeout(() => {
        this.$set(chapters[chapterIndex].sections, sectionIndex, {
          ...chapters[chapterIndex].sections[sectionIndex],
          last_play_position: Math.floor(second)
        });
        clearTimeout(this.updatingTimer);
        this.updatingTimer = null;
      }, 300);
    },
    handleEnded() {
      this.$emit("ended");
    },
    goTop() {
      this.$nextTick(() => {
        if (this.$refs.scroll) {
          this.$refs.scroll.wrap.scrollTo(0, this.chapterIndex * 48);
        }
      });
    },
    handleNextLesson() {
      this.$emit("next");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.course-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #444444;
}

.page-header {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7.4%;
  min-height: 52px;
  max-height: 80px;
  background: #393939;
  .page-header-left {
    flex: none;
    width: 20%;
    padding-left: 30px;
    min-width: 230px;
    max-width: 370px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .page-header-left_icon {
      display: inline-block;
      margin-right: 10px;
      width: 24px;
      height: 24px;
      mask-repeat: no-repeat;
      mask-size: cover;
      cursor: pointer;
      background-color: #999;
      &.close-icon {
        mask-image: url("~images/course/menuclose.svg");
      }
      &.menu-icon {
        mask-image: url("~images/course/menu.svg");
        &.close {
          background-color: #14af64;
        }
      }
    }
    .page-header-left_text {
      flex: 1;
      font-size: 14px;
      line-height: 24px;
      color: #999999;
    }
  }

  .page-header-content {
    .page-header-title {
      line-height: 28px;
      font-weight: 500;
      font-size: 16px;
      text-align: center;
      color: #999999;
    }
  }
  .page-header-right {
    flex: none;
    display: flex;
    align-items: center;
    padding-right: 30px;
    .page-header-right_icon {
      display: inline-block;
      margin-right: 5px;
      width: 40px;
      height: 40px;
      background-size: cover;
      background-image: url("~images/course/douxi.png");
    }
    .page-header-right_text {
      line-height: 24px;
      font-size: 14px;
      color: #999999;
    }
  }
}

.page-content {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: calc(100% - 80px);
  .page-content-left {
    position: relative;
    flex: none;
    width: 20%;
    min-width: 230px;
    max-width: 370px;
    height: 100%;
    background: #494949;
    transition: width 0.3s;

    &:hover .page-fold-left {
      position: absolute;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      display: inline-block;
      content: "";
      border-radius: 0 40px 40px 0;
      background: #333333;
      width: 20px;
      height: 40px;
      z-index: 2;
      cursor: pointer;

      &:before {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        content: "";
        mask-image: url("~images/course/fold.svg");
        mask-repeat: no-repeat;
        mask-size: cover;
        background: #dddddd;
        width: 16px;
        height: 20px;
      }

      &:hover {
        background: #111111;
      }
    }
    .scrollbar-section {
      height: 100%;
      /deep/ .el-scrollbar__wrap {
        overflow: hidden;
        overflow-y: scroll;
      }
    }
    &.show {
      width: 20%;
    }
    &.hide {
      min-width: 0px;
      width: 0%;
    }
    .page-menu-wrapper {
      width: 20vw;
      min-width: 230px;
      max-width: 370px;
      min-height: 100%;

      /deep/ .el-collapse {
        position: relative;
        border: unset;

        .el-collapse-item__header {
          margin: 0px 20px 1px;
          height: 64px;
          font-weight: 400;
          font-size: 16px;
          color: #ddd;
          background: #494949;
          border-color: #595959 !important;
        }

        & .is-active {
          border: unset;
        }

        & .is-disabled {
          .el-collapse-item__arrow {
            &::before {
              position: relative;
              top: -5px;
              display: inline-block;
              content: "";
              mask-image: url("~images/course/locked.svg");
              mask-repeat: no-repeat;
              mask-size: cover;
              width: 20px;
              height: 20px;
              background: #eeeeee;
              opacity: 0.6;
            }
          }
        }

        .el-collapse-item__arrow {
          position: absolute;
          top: 26px;
          font-size: 12px;
          font-weight: 900;
        }

        .el-collapse-item__wrap {
          margin: 0px 20px;
          border-color: #595959;
        }

        .el-collapse-item__content {
          padding: 0px;
          border-bottom: 1px solid #595959;
          background: #494949;
          .page-menu-item {
            &:last-child {
              margin-bottom: 20px;
            }
          }
        }
      }
      .page-menu-title {
        margin-left: 27px;
        line-height: 24px;
        font-weight: bold;
        font-size: 16px;
        color: #ddd;
      }
      .page-menu-list {
        padding: 4px 0;
      }
      .page-menu-empty {
        padding-bottom: 20px;
        text-align: center;
        color: #999;
        font-size: 14px;
      }

      .page-menu-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 16px 8px;
        width: 100%;
        height: 40px;
        background: #494949;
        cursor: pointer;
        &:hover {
          filter: opacity(0.95);
          border-color: rgba(255, 255, 255, 0.1);
        }
        &.active {
          background: #444444;
          .page-menu-item_name {
            color: @primaryColor;
          }
        }
        &.completed {
          .page-menu-item_name {
            color: #999999;
          }
          .page-menu-item-duration {
            color: #666666;
          }
        }
      }
      .page-menu-item_icon {
        flex: none;
        display: inline-block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: cover;
        &.unplay-icon {
          background-image: url("~images/course/unplay.svg");
        }
        &.playing-icon {
          background-image: url("~images/course/playing.svg");
        }
        &.played-icon {
          background-image: url("~images/course/played.svg");
        }
        &.completed-icon {
          background-image: url("~images/course/completed.svg");
        }
      }
      .page-menu-item_name {
        flex: 1;
        margin: 0 8px;
        width: 5px;
        line-height: 24px;
        font-weight: normal;
        font-size: 14px;
        color: #ddd;
      }
      .page-menu-item-duration {
        flex: none;
        line-height: 24px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
  .page-content-right {
    position: relative;
    flex: 1;
    width: 50px;
    height: 100%;

    .remind-feedback {
      position: absolute;
      bottom: 80px;
      right: 30px;
      display: flex;
      align-items: center;

      .remind-text-wrapper {
        width: 232px;
        height: 52px;
        overflow: hidden;

        .remind-text {
          position: relative;
          left: 100%;
          padding: 6px 10px;
          color: white;
          background-image: url("~images/course/dialog.svg");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          transition: all 0.5s;

          &.show {
            left: 0;
          }
        }

        .feedback-icon {
          width: 16px;
          height: 16px;
          vertical-align: text-bottom;
        }
      }

      .remind-icon {
        width: 64px;
        height: 64px;
      }
    }
  }

  .page-content-aside {
    flex: none;
    height: 100%;
    min-width: 432px;
    max-width: 576px;
    background: #494949;
    overflow: auto;
    transition: width 0.3s;

    .course-note {
      display: flex;
      min-height: 100%;
      padding: 40px;
      color: #dddddd;

      .course-video-note{
        width: 100%;
      }

      .course-note-title {
        font-weight: 600;
        font-size: 24px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #595959;
      }

      .course-note-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        flex: 1;
        font-size: 16px;
        font-weight: 600;
        color: #dddddd;
      }
    }

    &.show {
      width: 30%;
    }
    &.hide {
      min-width: 0px;
      width: 0%;
    }

    &:hover .page-fold-right {
      position: absolute;
      top: 50%;
      transform: translateX(-100%) translateY(-50%) rotate(180deg);
      display: inline-block;
      content: "";
      border-radius: 0 40px 40px 0;
      background: #333333;
      width: 20px;
      height: 40px;
      z-index: 2;
      cursor: pointer;

      &:before {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        content: "";
        mask-image: url("~images/course/fold.svg");
        mask-repeat: no-repeat;
        mask-size: cover;
        background: #dddddd;
        width: 16px;
        height: 20px;
      }

      &:hover {
        background: #111111;
      }
    }
  }
}
@media screen and (max-width: 1440px) {
  .page-content {
    .page-content-left {
      .page-menu-header {
        padding: 24px 0;
        .page-menu-title {
          font-size: 16px;
        }
      }
      .page-menu-content {
        .page-menu-item_icon {
          width: 20px;
          height: 20px;
        }
        .page-menu-item_name,
        .page-menu-item-duration {
          line-height: 16px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style lang="less">
.course-note-content {
  img {
    max-width: 100%;
    height: auto !important;
  }
}
</style>

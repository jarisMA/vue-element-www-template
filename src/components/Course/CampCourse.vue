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
          {{
            chapters.length > 0
              ? chapters[chapterIndex].sections[sectionIndex].name
              : ""
          }}
        </label>
      </div>
      <div class="page-header-content">
        <h3 class="page-header-title">{{ detail.name }}</h3>
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
        <el-scrollbar class="scrollbar-section" ref="scroll">
          <div
            class="page-menu-wrapper"
            v-for="(chapter, cIndex) of chapters"
            :key="chapter.id"
          >
            <el-collapse v-model="activeNames">
              <el-collapse-item :name="chapter.id">
                <template slot="title">
                  <div
                    class="page-menu-title ellipsis"
                    :style="{
                      color:
                        chapters[chapterIndex].id === chapter.id
                          ? '#14af64'
                          : ''
                    }"
                  >
                    {{ chapter.title }}
                  </div>
                </template>
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
          @setRecord="handleSetRecord"
          @timeUpdate="handleTimeUpdate"
          @ended="handleEnded"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "./VideoPlayer";
import { formatSeconds } from "utils/moment";

export default {
  name: "CampCourse",
  components: { VideoPlayer },
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
    }
  },
  data() {
    return {
      detail: {},
      chapters: [],
      showMenu: true,
      updatingTimer: null,
      activeNames: []
    };
  },
  watch: {
    course() {
      this.getData();
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
        document
          .getElementsByClassName("el-scrollbar__wrap")[0]
          .scrollTo(0, this.chapterIndex * 48);
      });
    },
    handleNextLesson() {}
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
    flex: none;
    width: 20%;
    min-width: 230px;
    max-width: 370px;
    height: 100%;
    background: #494949;
    transition: width 0.3s;
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
          font-weight: 400;
          font-size: 16px;
          color: #eeeeee;
          background: #494949;
          border-color: #595959;
        }

        & .is-active {
          border: unset;
        }

        .el-collapse-item__arrow {
          position: absolute;
          top: 16px;
          font-weight: 900;
        }

        .el-collapse-item__wrap {
          margin: 0px 20px;
          border-color: #595959;
        }

        .el-collapse-item__content {
          padding: 0px;
          border-bottom: 1px solid #595959;
        }
      }
      .page-menu-title {
        margin-left: 27px;
        line-height: 24px;
        font-weight: bold;
        font-size: 16px;
        color: #eeeeee;
      }
      .page-menu-list {
        padding: 4px 0;
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
        width: 24px;
        height: 24px;
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
        margin: 0 16px;
        width: 5px;
        line-height: 24px;
        font-weight: normal;
        font-size: 14px;
        color: #eeeeee;
      }
      .page-menu-item-duration {
        flex: none;
        line-height: 24px;
        font-size: 14px;
        color: #999999;
      }
    }
  }
  .page-content-right {
    flex: 1;
    width: 50px;
    height: 100%;
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

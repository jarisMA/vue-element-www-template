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
        <label class="page-header-left_text">
          {{ activeLessonIndex > -1 ? lessons[activeLessonIndex].name : "" }}
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
        <div class="page-menu-wrapper">
          <div class="page-menu-header">
            <h3 class="page-menu-title">{{ detail.name }}</h3>
          </div>
          <div class="page-menu-content">
            <div class="page-menu-list">
              <div
                :class="[
                  'page-menu-item',
                  activeLessonIndex > -1 &&
                  lessons[activeLessonIndex].id === lesson.id
                    ? 'active'
                    : '',
                  [4].indexOf(lessonStatus(index)) > -1 ? 'completed' : ''
                ]"
                v-for="(lesson, index) of lessons"
                :key="lesson.id"
                @click="handleToggleLesson(index)"
              >
                <i
                  :class="['page-menu-item_icon', lessonStatusIconClass(index)]"
                ></i>
                <h4 class="page-menu-item_name">
                  {{ lesson.name }}
                </h4>
                <label class="page-menu-item-duration">
                  <template v-if="[2, 3].indexOf(lessonStatus(index)) > -1">
                    <span
                      :class="[
                        [2].indexOf(lessonStatus(index)) > -1 ? 'primary' : ''
                      ]"
                      >{{ secondsUpdate(lesson.last_play_position) }}</span
                    >/ </template
                  >{{ formatSeconds(lesson.second_duration) }}
                </label>
              </div>
            </div>
          </div>
          <div class="page-menu-footer"></div>
        </div>
      </div>
      <div class="page-content-right">
        <video-player
          v-if="activeLessonIndex > -1"
          :vid="lessons[activeLessonIndex].vod_id"
          :startTime="lessons[activeLessonIndex].last_play_position"
          :duration="lessons[activeLessonIndex].second_duration"
          @timeUpdate="handleTimeUpdate"
          @setRecord="setLessonRecord"
          @ended="handleNextLesson"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "./widgets/VideoPlayer";
import courseService from "service/course";
import { formatSeconds } from "utils/moment";

export default {
  name: "TermCourse",
  components: { VideoPlayer },
  data() {
    return {
      detail: {},
      lessons: [],
      lessonIndex: 1,
      activeLessonIndex: -1,
      showMenu: false,
      setRecording: false
    };
  },
  created() {
    this.lessonIndex = this.$route.params.lessonIndex;
    this.getCourse();
  },
  computed: {
    lessonStatus() {
      // 4 播放完成，3 播放过，2 正在播放，1 未播放
      return index => {
        const { lessons, activeLessonIndex } = this;
        const lesson = lessons[index];
        const last_play_position = lesson.last_play_position || 0;
        const play_second_duration = lesson.play_second_duration || 0;
        return index === activeLessonIndex
          ? 2
          : play_second_duration * 0.9 >= lesson.second_duration
          ? 4
          : last_play_position > 0
          ? 3
          : 1;
      };
    },
    lessonStatusIconClass() {
      return index => {
        const status = this.lessonStatus(index);
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
    getCourse() {
      courseService.course(this.$route.params.id).then(res => {
        this.detail = res;
        this.lessons = res.lessons;
        this.activeLessonIndex =
          res.lessons.length >= this.lessonIndex ? this.lessonIndex - 1 : -1;
      });
    },
    setLessonRecord(params) {
      const { lessons, activeLessonIndex, setRecording } = this;
      const lesson = lessons[activeLessonIndex];
      if (!setRecording) {
        this.setRecording = true;
        courseService
          .setLessonRecord(this.$route.params.id, lesson.id, params)
          .finally(() => {
            this.setRecording = false;
          });
      }
    },
    handleToggleLesson(index) {
      const { lessons, activeLessonIndex } = this;
      if (lessons[index].id === lessons[activeLessonIndex].id) {
        return;
      }
      this.activeLessonIndex = index;
    },
    handleTimeUpdate(last_play_position) {
      const { lessons, activeLessonIndex } = this;
      this.$set(lessons, activeLessonIndex, {
        ...lessons[activeLessonIndex],
        last_play_position: last_play_position
      });
    },
    handleNextLesson() {
      const { lessons, activeLessonIndex } = this;
      if (lessons.length > activeLessonIndex + 1) {
        this.handleToggleLesson(activeLessonIndex + 1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.course-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #444444;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  width: 100%;
  height: 80px;
  background: #393939;

  .page-header-left {
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
    display: flex;
    align-items: center;
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
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: calc(100% - 80px);
  .page-content-left {
    flex: none;
    width: 370px;
    height: 100%;
    background: #494949;
    overflow: hidden;
    transition: width 0.3s;
    &.show {
      width: 370px;
    }
    &.hide {
      width: 0px;
    }
    .page-menu-wrapper {
      padding: 0 20px;
      width: 370px;
      height: 100%;
      overflow-y: auto;
    }
    .page-menu-header {
      padding: 30px 0;
      width: 100%;
      .page-menu-title {
        line-height: 24px;
        font-weight: bold;
        font-size: 18px;
        color: #eeeeee;
      }
    }
    .page-menu-content {
      border-top: 1px solid #595959;
      .page-menu-list {
        padding: 4px 0;
      }
      .page-menu-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 16px 8px;
        width: 100%;
        border: 1px solid #494949;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        &.active {
          background: rgba(0, 0, 0, 0.1);
          border-color: rgba(0, 0, 0, 0.1);
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
</style>

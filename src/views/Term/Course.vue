<template>
  <div class="course-page">
    <div class="page-header">
      <div class="page-header-left">
        <i
          :class="[
            'page-header-left_icon',
            showMenu ? 'close-icon' : 'menu-icon'
          ]"
          @click="showMenu = !showMenu"
        ></i>
        <label class="page-header-left_text">
          {{ activeLesson && activeLesson.name }}
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
                  activeLesson.id === lesson.id ? 'active' : ''
                ]"
                v-for="lesson of lessons"
                :key="lesson.id"
                @click="handleToggleLesson(lesson)"
              >
                <i
                  :class="[
                    'page-menu-item_icon',
                    activeLesson.id === lesson.id
                      ? 'playing-icon'
                      : 'unplay-icon'
                  ]"
                ></i>
                <h4 class="page-menu-item_name">
                  {{ lesson.name }}
                </h4>
                <label class="page-menu-item-duration">
                  <span class="primary" v-if="activeLesson.id === lesson.id">{{
                    secondsUpdate
                  }}</span
                  >/{{ formatSeconds(lesson.second_duration) }}
                </label>
              </div>
            </div>
          </div>
          <div class="page-menu-footer"></div>
        </div>
      </div>
      <div class="page-content-right">
        <video-player
          v-if="activeLesson"
          :vid="activeLesson.vod_id"
          @timeUpdate="handleTimeUpdate"
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
      activeLesson: null,
      showMenu: false
    };
  },
  created() {
    this.getCourse();
  },
  computed: {
    secondsUpdate() {
      const format = formatSeconds(
        (this.activeLesson && this.activeLesson.currentTime) || 0
      );
      return format;
    }
  },
  methods: {
    formatSeconds,
    getCourse() {
      courseService.course(this.$route.params.id).then(res => {
        this.detail = res;
        this.lessons = res.lessons;
        this.activeLesson = this.lessons[0];
      });
    },
    handleToggleLesson(lesson) {
      if (lesson.id === this.activeLesson.id) {
        return;
      }
      this.activeLesson = lesson;
    },
    handleTimeUpdate(currentTime) {
      this.activeLesson = {
        ...this.activeLesson,
        currentTime
      };
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
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      &.close-icon {
        background-image: url("~images/course/menuclose.svg");
      }
      &.menu-icon {
        background-image: url("~images/course/menu.svg");
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
      background: url("~images/course/douxi.svg") no-repeat;
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
      width: 100%;
      padding: 0 20px;
      overflow-y: auto;
    }
    .page-menu-header {
      padding: 30px;
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
        padding: 16px 8px 16px 10px;
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
        color: #999999;
      }
      .page-menu-item-duration {
        flex: none;
        line-height: 24px;
        font-size: 14px;
        color: #666666;
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

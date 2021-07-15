<template>
  <div
    :class="['category-card', isDisabled ? 'disable' : 'pointer']"
    @click.stop="isDisabled ? handleNotAvailable() : null"
  >
    <el-collapse>
      <el-collapse-item :disabled="category.type === null || isDisabled">
        <template slot="title">
          <div class="card-header" @click.prevent>
            <div class="card-header-left">
              <i
                :class="[
                  'card-header-icon',
                  category.type === COURSE_TYPE_COURSE ? courseStatusIcon : '',
                  category.type === COURSE_TYPE_BIBLE ? 'bible-icon' : '',
                  category.type === COURSE_TYPE_LIVE ? 'live-icon' : ''
                ]"
              ></i>
            </div>
            <div class="card-header-content">
              <div class="card-header-content-left">
                <h4
                  class="card-header-title ellipsis"
                  @click.prevent="!isDisabled ? handleCardClick() : null"
                >
                  {{ category.title }}
                </h4>
                <p class="card-header-desc" v-if="category.description">
                  {{ category.description }}
                </p>
              </div>
              <div
                class="card-header-content-right"
                v-if="category.type === COURSE_TYPE_COURSE"
              >
                <label class="card-header-count"
                  >{{ category.resource.lessons.length }}节课</label
                >
                <label class="card-header-duration"
                  >（{{ Math.floor(courseDuration / 60) }}分钟）</label
                >
              </div>
              <div
                class="card-header-content-right"
                v-if="category.type === COURSE_TYPE_LIVE"
              >
                <label class="card-header-date">{{
                  formatDate(category.start_at, "MM月DD日 HH:mm")
                }}</label>
              </div>
            </div>
          </div>
        </template>
        <div class="card-content">
          <div
            class="card-content-list"
            v-if="category.type === COURSE_TYPE_COURSE"
          >
            <div
              :class="[
                'card-content-item',
                lessonStatus(index) === 3 ? 'active' : '',
                lessonStatus(index) === 4 ? 'completed' : ''
              ]"
              v-for="(lesson, index) of category.resource.lessons"
              :key="lesson.id"
              @click.stop="handleLessonClick(index)"
            >
              <div class="card-content-item-left">
                <i
                  :class="[
                    'card-content-item-icon',
                    lessonStatusIconClass(index)
                  ]"
                ></i>
                <h5 class="card-content-item-title ellipsis">
                  {{ lesson.name }}
                </h5>
              </div>
              <div class="card-content-item-right">
                <label class="card-content-item-status">
                  {{ lessonStatusText(index) }}
                </label>
                <label class="card-content-item-duration">
                  {{ formatSeconds(lesson.second_duration) }}
                </label>
              </div>
            </div>
          </div>
          <div
            class="card-content-live"
            v-if="category.type === COURSE_TYPE_LIVE"
          >
            <i class="upload-icon"></i>
            <p class="card-content-live-desc">
              录播视频将在直播结束后 24 小时内上传，敬请期待
            </p>
          </div>
          <!-- <div class="card-feedback-wrapper">
            <course-feedback
              class="card-feedback"
              :params="{
                camp_id: campId,
                term_id: termId,
                widget_id: category.id,
                resource_type: category.type,
                resource_id: category.resource_id || category.bible_id
              }"
              @added="handleShowFeedback"
            />
            <label class="card-feedback-more" @click="handleShowFeedback">
              <span>看看同学们怎么说</span>
              <i class="card-more-icon"></i>
            </label>
          </div> -->
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {
  COURSE_TYPE_COURSE,
  COURSE_TYPE_BIBLE,
  COURSE_TYPE_LIVE
} from "utils/const";
import { goBibleDetail, goCourse } from "utils/routes";
import { formatSeconds, formatDate } from "utils/moment";
//import CourseFeedback from "./CourseFeedback";

export default {
  name: "CategoryCard",
  //components: { CourseFeedback },
  props: {
    category: {
      type: Object,
      required: true
    },
    campId: {
      type: Number
    },
    termId: {
      type: Number
    }
  },
  data() {
    return {
      COURSE_TYPE_COURSE,
      COURSE_TYPE_BIBLE,
      COURSE_TYPE_LIVE
    };
  },
  computed: {
    isDisabled() {
      const category = this.category;
      const { type, resource, resource_id, start_at } = category;
      if (type === COURSE_TYPE_BIBLE) {
        const { parent } = resource;
        if (
          (resource_id && resource.is_block === 1) ||
          parent.is_online !== 1 ||
          parent.status === 0
        ) {
          return true;
        }
      }
      return (
        start_at && new Date().valueOf() < new Date(category.start_at).valueOf()
      );
    },
    courseDuration() {
      const { category } = this;
      const { type, resource } = category;
      let duration = 0;
      if (type === COURSE_TYPE_COURSE) {
        duration = resource.lessons.reduce((prev, next) => {
          return prev + next.second_duration;
        }, 0);
      }
      return duration;
    },
    lessonStatus() {
      // 4 播放完成，3 播放过，2 正在播放，1 未播放
      return index => {
        const { type, resource } = this.category;
        if (type !== COURSE_TYPE_COURSE) return 0;
        const { lessons } = resource;
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
        const { type, resource } = this.category;
        if (type !== COURSE_TYPE_COURSE) return 0;
        const status = this.lessonStatus(index);
        const { lessons } = resource;
        const lesson = lessons[index];
        let text = "";
        switch (status) {
          case 3:
            text = "学习至" + this.formatSeconds(lesson.last_play_position);
            break;
          case 4:
            text = "已学完";
            break;
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
    courseStatus() {
      // 3 播放完成，2 上次播放，1 未播放
      const { type, resource } = this.category;
      if (type !== COURSE_TYPE_COURSE) return 0;
      const { lessons } = resource;
      return lessons.every((lesson, index) => {
        return this.lessonStatus(index) === 4;
      })
        ? 3
        : 1;
    },
    courseStatusIcon() {
      const { type } = this.category;
      if (type !== COURSE_TYPE_COURSE) return 0;
      let iconClass = "unplay-icon";
      const status = this.courseStatus;
      switch (status) {
        case 3:
          iconClass = "completed-icon";
          break;
        case 1:
        default:
          break;
      }
      return iconClass;
    }
  },
  methods: {
    formatDate,
    formatSeconds,
    handleCardClick() {
      const { resource, resource_id, bible_id, type } = this.category;
      if (!this.isDisabled && type === COURSE_TYPE_BIBLE) {
        goBibleDetail(
          resource_id ? resource.bible_id : bible_id,
          resource_id
            ? {
                tab: resource_id
              }
            : null,
          "_blank"
        );
      }
    },
    handleLessonClick(index) {
      const { type, resource } = this.category;
      if (type === COURSE_TYPE_COURSE) {
        goCourse(resource.id, index + 1);
      }
    },
    handleShowFeedback() {
      this.$emit("showFeedback");
    },
    handleNotAvailable() {
      this.$message({
        message: "本章节尚未到开放时间",
        center: true
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.category-card {
  width: 100%;
  &:hover {
    .card-header-title {
      color: #232926 !important;
    }
    .card-header-desc {
      color: #4d5652 !important;
    }
    .card-header-date {
      color: #72807a !important;
    }
    /deep/ .el-collapse-item__arrow {
      color: #72807a;
    }
  }

  &.disable {
    filter: opacity(0.5);
    pointer-events: auto !important;
  }
  &.pointer {
    /deep/ .el-collapse-item__header {
      cursor: pointer !important;
      border: unset;
    }
  }
  /deep/ .el-collapse {
    border: unset;
    .el-collapse-item.is-disabled {
      .el-collapse-item__arrow {
        display: none;
      }
      .el-collapse-item__header {
        cursor: auto;
        cursor: pointer !important;
      }
    }
    .el-collapse-item__header {
      height: auto;
    }
    .el-collapse-item__wrap {
      border: unset;
    }
    .el-collapse-item__content {
      padding: 0;
    }
  }
}
.category-card + .category-card {
  border-top: 1px solid #efefef;
}
.card-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  font-weight: 400;
  .card-header-left {
    flex: none;
    padding-right: 10px;
    .card-header-icon {
      display: block;
      width: 32px;
      height: 32px;
      background-color: #2c3330;
      mask-repeat: no-repeat;
      mask-size: cover;
      mask-image: url("~images/academy/note.svg");
      &.active {
        background-color: @primaryColor;
      }
      &.unplay-icon {
        mask-image: url("~images/course/unplay.svg");
      }
      &.played-icon {
        background-color: @primaryColor;
        mask-image: url("~images/course/played.svg");
      }
      &.completed-icon {
        mask-image: url("~images/course/completed.svg");
      }
      &.bible-icon {
        mask-image: url("~images/academy/bible.svg");
      }
      &.live-icon {
        mask-image: url("~images/academy/live.svg");
      }
      &.complete-icon {
        mask-image: url("~images/academy/complete.svg");
      }
    }
  }

  .card-header-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 5px;
    .card-header-content-left {
      flex: 1;
      width: 5px;
    }
    .card-header-title {
      width: 100%;
      line-height: 24px;
      font-weight: 500;
      font-size: 18px;
      color: #2c3330;
    }
    .card-header-desc {
      margin-top: 5px;
      line-height: 18px;
      font-size: 12px;
      color: #606c66;
    }
    .card-header-content-right {
      flex: none;
      line-height: 2;
      font-size: 12px;
      color: #8ea098;
      .card-header-date {
        margin-right: 24px;
        line-height: 16px;
        font-size: 12px;
        color: #8ea098;
      }
    }
  }
}

.card-content {
  width: calc(100% - 42px);
  margin-left: 42px;
  padding: 0 0 20px 0;
  .card-content-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 11px 10px 11px 6px;
    cursor: pointer;
    &:hover {
      background: #f7fdfa;
      .card-content-item-title {
        color: #111 !important;
      }
    }
    &.active {
      .card-content-item-title {
        color: @primaryColor !important;
      }
      .card-content-item-status {
        color: @primaryColor !important;
      }
    }
    &.completed {
    }
    .card-content-item-left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .card-content-item-icon {
        flex: none;
        display: block;
        margin-right: 9px;
        width: 20px;
        height: 20px;
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
      .card-content-item-title {
        flex: 1;
        width: 5px;
        line-height: 21px;
        font-size: 14px;
        font-weight: normal;
        color: #2c3330;
      }
    }

    .card-content-item-right {
      flex: none;
      display: inline-block;
      line-height: 16px;
      font-size: 12px;
      text-align: right;
      color: #8ea098;
      .card-content-item-duration {
        display: inline-block;
        width: 50px;
      }
    }
  }
  .card-content-live {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    cursor: default;
    .upload-icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: url("~images/term/upload.svg") no-repeat center;
    }
    .card-content-live-desc {
      margin-top: 10px;
      line-height: 16px;
      font-size: 12px;
      color: #8ea098;
    }
  }
}

.card-feedback-wrapper {
  .card-feedback {
    padding: 20px 0;
  }
  .card-feedback-more {
    display: inline-block;
    margin-left: 48px;
    line-height: 24px;
    font-weight: 500;
    font-size: 14px;
    color: @primaryColor;
    cursor: pointer;
    .card-more-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-color: @primaryColor;
      mask: url("~images/my/arrow.svg") no-repeat center;
      vertical-align: bottom;
    }
  }
}
</style>
<style lang="less">
.el-message {
  min-width: 196px !important;
  min-height: 40px !important;
  padding: 7px 24px !important;
  background: white !important;
  border: none !important;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1) !important;

  .el-message__content {
    font-size: 12px;
    color: #606c66;
  }

  .el-icon-info:before {
    content: "" !important;
    display: inline-block;
    width: 24px;
    height: 24px;
    mask-size: cover;
    mask-repeat: no-repeat;
    background-color: #606c66;
    mask-image: url("~images/term/clock.svg");
  }
}

/deep/ .el-collapse-item__arrow {
  color: #8ea098;
}
</style>

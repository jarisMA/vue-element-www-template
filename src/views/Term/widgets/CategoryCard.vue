<template>
  <div
    :class="[
      'category-card',
      new Date().valueOf() < new Date(category.start_at).valueOf()
        ? 'disabled'
        : ''
    ]"
    @click.prevent="
      new Date().valueOf() >= new Date(category.start_at).valueOf()
        ? handleCardClick()
        : null
    "
  >
    <el-collapse>
      <el-collapse-item :disabled="category.type !== COURSE_TYPE_COURSE">
        <template slot="title">
          <div class="card-header" @click.prevent>
            <div class="card-header-left">
              <i
                :class="[
                  'card-header-icon',
                  category.type === COURSE_TYPE_COURSE ? 'play-icon' : '',
                  category.type === COURSE_TYPE_BIBLE ? 'bible-icon' : '',
                  category.type === COURSE_TYPE_LIVE ? 'live-icon' : ''
                ]"
              ></i>
            </div>
            <div class="card-header-content">
              <div class="card-header-content-left">
                <h4 class="card-header-title">
                  {{ category.title }}
                </h4>
                <p class="card-header-desc">
                  {{ category.description }}
                </p>
              </div>
              <div
                class="card-header-content-right"
                v-if="category.type === COURSE_TYPE_COURSE"
              >
                <label class="card-header-count"
                  >{{ category.resource.lesson_number }}节课</label
                >
                <label class="card-header-duration"
                  >（{{
                    Math.floor(category.resource.second_duration / 60)
                  }}分钟）</label
                >
              </div>
            </div>
          </div>
        </template>
        <div class="card-content" v-if="category.type === COURSE_TYPE_COURSE">
          <div class="card-content-list">
            <div
              class="card-content-item"
              v-for="(lesson, index) of category.resource.lessons"
              :key="lesson.id"
              @click.stop="handleLessonClick(index)"
            >
              <div class="card-content-item-left">
                <i class="card-content-item-icon play-icon"></i>
                <h5 class="card-content-item-title">
                  {{ lesson.name }}
                </h5>
              </div>
              <div class="card-content-item-right">
                <label class="card-content-item-status">
                  <!-- {{ lesson.status }} -->
                </label>
                <label class="card-content-item-duration">
                  {{ formatSeconds(lesson.second_duration) }}
                </label>
              </div>
            </div>
          </div>
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
import { formatSeconds } from "utils/moment";

export default {
  name: "CategoryCard",
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      COURSE_TYPE_COURSE,
      COURSE_TYPE_BIBLE,
      COURSE_TYPE_LIVE
    };
  },
  methods: {
    formatSeconds,
    handleCardClick() {
      const { type, resource } = this.category;
      if (type === COURSE_TYPE_BIBLE) {
        goBibleDetail(resource.bible_id);
      }
    },
    handleLessonClick(index) {
      const { type, resource } = this.category;
      if (type === COURSE_TYPE_COURSE) {
        goCourse(resource.id, index + 1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.category-card {
  width: 100%;
  &.disabled {
    filter: opacity(0.5);
    cursor: auto;
  }
  /deep/ .el-collapse {
    border: unset;
    .el-collapse-item.is-disabled {
      .el-collapse-item__arrow {
        display: none;
      }
      .el-collapse-item__header {
        cursor: auto;
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
      &.active {
        background-color: @primaryColor;
      }
    }
  }

  .card-header-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 5px;
    .card-header-title {
      line-height: 24px;
      font-weight: 500;
      font-size: 18px;
      color: #2c3330;
    }
    .card-header-desc {
      margin-top: 5px;
      line-height: 16px;
      font-size: 12px;
      color: #606c66;
    }
    .card-header-content-right {
      line-height: 2;
      font-size: 12px;
      color: #8ea098;
    }
  }
}

.card-content {
  width: calc(100% - 42px);
  margin-left: 42px;
  padding: 20px 0 20px 0;
  border-top: 1px solid #efefef;
  .card-content-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 11px 10px 11px 6px;
    cursor: pointer;
    &:hover {
      background: #f7fdfa;
    }
    .card-content-item-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .card-content-item-icon {
        display: block;
        margin-right: 9px;
        width: 20px;
        height: 20px;
        background-color: #2c3330;
        mask-size: cover;
        mask-repeat: no-repeat;
      }
      .card-content-item-title {
        line-height: 21px;
        font-size: 14px;
        font-weight: normal;
        color: #2c3330;
      }
    }

    .card-content-item-right {
      display: inline-block;
      line-height: 16px;
      font-size: 12px;
      text-align: right;
      color: #8ea098;
      .card-content-item-status {
        margin-right: 25px;
      }
    }
  }
}

.play-icon {
  mask-image: url("~images/academy/play.svg");
}
.bible-icon {
  mask-image: url("~images/academy/bible.svg");
}
.live-icon {
  mask-image: url("~images/academy/live.svg");
}
.complete-icon {
  mask-image: url("~images/academy/complete.svg");
}
</style>

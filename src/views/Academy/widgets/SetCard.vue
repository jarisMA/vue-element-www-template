<template>
  <div class="card">
    <div class="card-top">
      <the-loading-image :width="378" :height="224" :url="series.cover_url" />
    </div>
    <div class="card-bottom">
      <div class="card-bottom-content">
        <h4 class="card-title ellipsis">{{ series.name }}</h4>
        <div class="card-info">
          <label class="card-info-text">
            <i class="course-icon"></i>
            {{ series.lesson_number }} 门课
          </label>
          <label class="card-info-text">
            <i class="duration-icon"></i>
            {{ Math.floor(series.second_duration / 60) }}分钟
          </label>
        </div>
      </div>
      <div class="card-bottom-footer">
        <label class="current-price">¥{{ series.current_price }}</label>
        <label class="orgin-price" v-if="series.origin_price > 0"
          >¥{{ series.origin_price }}</label
        >
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import { COURSE_LEVEL } from "utils/const";
export default {
  name: "CourseCard",
  components: {
    TheLoadingImage
  },
  props: {
    series: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      COURSE_LEVEL
    };
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.card {
  width: 380px;
  border: 1px solid #efefef;
  cursor: pointer;
  .card-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 128px;
    padding: 16px;
    .card-title {
      line-height: 24px;
      font-weight: 600;
      font-size: 16px;
    }
    .card-info {
      display: flex;
      align-items: center;
      margin-top: 8px;
      padding: 4px 0;
      .card-info-text {
        line-height: 16px;
        font-size: 14px;
        color: #8ea098;
        cursor: pointer;
        & + .card-info-text {
          margin-left: 8px;
          padding-left: 8px;
          border-left: 1px solid #efefef;
        }
      }
      .course-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 2px;
        background: url("~images/academy/course.svg") no-repeat center;
        vertical-align: text-bottom;
      }
      .duration-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 2px;
        background: url("~images/academy/duration.svg") no-repeat center;
        vertical-align: text-bottom;
      }
    }
    .current-price {
      line-height: 24px;
      font-weight: 600;
      font-size: 16px;
      color: @primaryColor;
      cursor: pointer;
    }
    .orgin-price {
      margin-left: 4px;
      line-height: 24px;
      font-size: 14px;
      text-decoration-line: line-through;
      color: #8ea098;
      cursor: pointer;
    }
  }
}
</style>

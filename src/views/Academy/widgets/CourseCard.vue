<template>
  <div
    class="card"
    @click="goAcademyCourseDetail(course.id)"
    @mouseover="getData()"
    @mouseleave="clearData()"
  >
    <div class="card-top">
      <the-loading-image
        :width="278"
        :height="156"
        :url="course.cover_url + '?x-oss-process=style/pc_course_index'"
      />
    </div>
    <div class="card-bottom">
      <div class="card-bottom-content">
        <h4 class="card-title">{{ course.name }}</h4>
        <div class="card-info">
          <label class="card-info-text" v-if="COURSE_LEVEL[course.level]">
            {{ COURSE_LEVEL[course.level] }}
          </label>
          <label class="card-info-text">
            <i class="course-icon"></i>
            <span>{{ course.lesson_number }} 课时</span>
          </label>
          <label class="card-info-text">
            <i class="duration-icon"></i>
            <span>{{ Math.floor(course.second_duration / 60) }}分钟</span>
          </label>
        </div>
      </div>
      <div class="card-bottom-footer">
        <div class="card-bottom-footer-left">
          <div class="vip-free" v-if="fee > 0 && vip == '1'">
            <span class="vip">VIP</span
            ><span style="margin-left: 4px;">免费学</span>
          </div>
          <div class="not-free" v-else>
            <label class="current-price">{{
              course.price_type === COURSE_PRICE_TYPE_PAY
                ? "¥" + course.current_price
                : "免费"
            }}</label>
            <label class="orgin-price" v-if="course.origin_price > 0"
              >¥{{ course.origin_price }}</label
            >
          </div>
        </div>
        <div class="card-bottom-footer-right">
          开始学习<i class="more-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import { COURSE_LEVEL, COURSE_PRICE_TYPE_PAY } from "utils/const";
import { goAcademyCourseDetail } from "utils/routes";

export default {
  name: "CourseCard",
  components: {
    TheLoadingImage
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      COURSE_PRICE_TYPE_PAY,
      COURSE_LEVEL,
      fee: "",
      vip: ""
    };
  },
  methods: {
    goAcademyCourseDetail,
    getData() {
      this.fee = this.course.origin_price;
      this.vip = this.course.is_vip;
    },
    clearData() {
      this.fee = "";
      this.vip = "";
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.card {
  width: 280px;
  border: 1px solid #efefef;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    .card-bottom-footer-right {
      display: flex !important;
    }
  }
  .card-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 161px;
    padding: 17px;
    .card-title {
      line-height: 24px;
      font-weight: 600;
      font-size: 16px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
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
    .card-bottom-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .vip-free {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 85px;
        height: 32px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 16px;
        background-color: #efefef;

        .vip {
          font-size: 15px;
          color: #ffbd12;
        }
      }

      .card-bottom-footer-right {
        display: none;
        align-items: center;
        line-height: 24px;
        font-weight: 600;
        font-size: 16px;
        color: @primaryColor;
        .more-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          mask: url("~images/academy/vector.svg") no-repeat center;
          background-color: @primaryColor;
        }
      }
    }
  }
}
</style>

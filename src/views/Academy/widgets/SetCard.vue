<template>
  <div
    class="card"
    @click="goAcademySeriesDetail(series.id)"
    @mouseover="getData()"
    @mouseleave="clearData()"
  >
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
        <div class="card-bottom-footer-left">
          <div class="vip-free" v-if="fee > 0 && vip == '1'">
            <span class="vip">VIP</span
            ><span style="margin-left: 4px;">免费学</span>
          </div>
          <div class="not-free" v-else>
            <label class="current-price">¥{{ series.current_price }}</label>
            <label class="orgin-price" v-if="series.origin_price > 0"
              >¥{{ series.origin_price }}</label
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
import { COURSE_LEVEL } from "utils/const";
import { goAcademySeriesDetail } from "utils/routes";

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
      COURSE_LEVEL,
      fee: "",
      vip: ""
    };
  },
  methods: {
    goAcademySeriesDetail,
    getData() {
      this.fee = this.series.origin_price;
      this.vip = this.series.is_vip;
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
  width: 380px;
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
    .card-bottom-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
}
</style>

<template>
  <div class="term-card" @click="itemClick">
    <div class="term-card-top">
      <the-loading-image
        class="image-wrapper"
        :width="300"
        :height="170"
        :url="detail.cover_file_url || defaultCoverImg"
      />
    </div>
    <div :class="['term-card-bottom']">
      <div class="term-name-wrapper">
        <h4 class="term-name ellipsis">{{ detail.name }}</h4>
      </div>
      <div class="term-time-wrapper">
        <span class="term-start"
          >{{ formatDate(detail.start_at, "YYYY-MM-DD") }} -
          {{ formatDate(detail.end_at, "YYYY-MM-DD") }}</span
        >
      </div>
      <div class="term-status-wrapper">
        <label
          :class="{
            'term-status': true,
            started: detail.status === 1,
            ended: detail.status === 2,
            unstart: detail.status === 0
          }"
          >{{ TERM_STATUS[detail.status] }}</label
        >
        <div class="enter-btn">进入班级<i class="arrow-icon"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import defaultCoverImg from "images/planCover.png";
import { formatDate } from "utils/moment";
import { TERM_STATUS } from "utils/const";

export default {
  name: "PlanCard",
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  components: {
    TheLoadingImage
  },
  data() {
    return {
      TERM_STATUS,
      defaultCoverImg
    };
  },
  methods: {
    formatDate,
    itemClick() {
      this.$emit("itemClick");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";
@padding: 10px;
.term-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  &:hover {
    .enter-btn {
      display: flex !important;
    }
  }
  .term-card-top {
    position: relative;
    width: 100%;
    height: 170px;
    text-align: center;
  }
  .term-card-bottom {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    .term-name-wrapper {
      display: flex;
      align-items: center;
      .term-name {
        flex: 1;
        margin-bottom: 0;
        font-size: 16px;
        line-height: 24px;
        font-size: 16px;
        font-weight: normal;
        color: #2c3330;
      }
    }
    .term-time-wrapper {
      margin-top: 4px;
      line-height: 16px;
      font-size: 12px;
      font-weight: 400;
      color: #81948b;
    }
    .term-status-wrapper {
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 24px;
      .term-status {
        display: inline-block;
        padding: 2px 4px;
        line-height: 1;
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        background: #d8d8d8;
        border-radius: 10px;
        cursor: pointer;
        &.unstart {
          color: #eab968ff;
          background: #ffedcfff;
        }
        &.started {
          color: #ffffffff;
          background: #18c20eff;
        }
        &.ended {
          color: #999999ff;
          background: #d8d8d8ff;
        }
      }
      .enter-btn {
        display: none;
        align-items: center;
        justify-content: center;
        line-height: 24px;
        font-size: 16px;
        color: #81948b;
        cursor: pointer;
        .arrow-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          mask-image: url("~images/my/arrow.svg");
          mask-size: cover;
          mask-repeat: no-repeat;
          background-color: #81948b;
        }
      }
    }
  }
}
</style>

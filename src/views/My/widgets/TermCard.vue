<template>
  <div class="term-card" @click="itemClick">
    <div class="term-card-top">
      <the-loading-image
        class="image-wrapper"
        :width="284"
        :height="212"
        :url="detail.cover_file_url || defaultCoverImg"
      />
    </div>
    <div :class="['term-card-bottom']">
      <div class="term-name-wrapper">
        <h4 class="term-name">{{ detail.name }}</h4>
        <label
          :class="{
            'term-status': true,
            started: detail.status === 1,
            ended: detail.status === 2,
            unstart: detail.status === 0
          }"
          >{{ TERM_STATUS[detail.status] }}</label
        >
      </div>
      <div class="term-time-wrapper">
        <span class="term-start">{{ formatDate(detail.start_at) }} 开课 </span>
        |
        <span class="term-start">{{ formatDate(detail.end_at) }} 前有效 </span>
      </div>
      <div class="enter-btn">
        进入班级
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
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 12px 0px #cccccc;
    .term-card-bottom {
      .enter-btn {
        color: @primaryColor;
        border-color: @primaryColor;
      }
    }
  }
  .term-card-top {
    position: relative;
    padding: @padding;
    width: 100%;
    height: 232px;
    text-align: center;
    .image-wrapper {
      position: absolute;
      top: @padding;
      left: @padding;
      width: 100%;
    }
  }
  .term-card-bottom {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 105px;
    padding: @padding;
    border-top: 1px solid #e6e6e6;
    .term-name-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .term-name {
        flex: 1;
        margin-bottom: 0;
        line-height: 1;
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .term-status {
        padding: 0 7px;
        line-height: 20px;
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        background: #d8d8d8;
        border-radius: 10px;
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
    }
    .term-time-wrapper {
      line-height: 1;
      font-size: 12px;
      font-weight: 400;
      color: #ababab;
    }
    .enter-btn {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 40px;
      font-size: 16px;
      font-weight: 500;
      color: #666666;
      border: 1px solid #e2e2e2;
      cursor: pointer;
      // &:hover {
      //   color: @primaryColor;
      //   border-color: @primaryColor;
      // }
    }
  }
}
</style>

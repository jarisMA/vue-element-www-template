<template>
  <div class="homework-card">
    <div class="homework-info">
      <div class="homework-name-wrapper">
        <h4 class="homework-name">
          {{ homework.name }}
        </h4>
        <label
          :class="{
            'homework-status': true,
            unsubmit: true,
            uncorrected: false,
            corrected: false
          }"
        >
          待提交
        </label>
      </div>
      <div class="homework-time-wrapper">
        <span class="homework-end"
          >提交截止日期：{{ formatDate(homework.end_at) }}
        </span>
      </div>
    </div>
    <div class="homework-desc-wrapper">
      <div class="homework-desc">
        <label class="homework-label">
          提交要求：
        </label>
        <div class="homework-desc-content" v-html="homework.description"></div>
      </div>
      <el-button class="homework-submit-btn" type="primary">
        上传作业
      </el-button>
    </div>
  </div>
</template>

<script>
import { formatDate } from "utils/moment";
export default {
  name: "TermHomework",
  props: {
    homework: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@leftWidth: 692px;
@leftMarginRight: 20px;
@unsubmit: #96eeff;
@uncorrected: #ffb163ff;
.homework-card {
  width: 100%;
  // height: 82px;
  padding: 20px;
  background: #ffffff;
  .homework-name-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 11px;
    .homework-name {
      font-size: 20px;
      font-weight: bold;
      color: #333333;
    }
    .homework-status {
      position: relative;
      margin-left: 15px;
      height: 20px;
      padding: 0 7px;
      line-height: 20px;
      font-size: 12px;
      font-weight: 400;
      color: @unsubmit;
      border: 1px solid @unsubmit;
      &.unsubmit {
        color: @unsubmit;
        border-color: @unsubmit;
        &::after {
          position: absolute;
          left: -4px;
          top: -4px;
          width: 8px;
          height: 8px;
          content: "";
          background: @unsubmit;
          border-radius: 50%;
        }
      }
      &.uncorrected {
        color: @uncorrected;
        border-color: @uncorrected;
      }
      &.corrected {
        color: @primaryColor;
        border-color: @primaryColor;
      }
    }
  }
  .homework-time-wrapper {
    line-height: 1;
    font-size: 12px;
    font-weight: 400;
    color: #ababab;
  }
  .homework-desc-wrapper {
    margin-top: 16px;
    min-height: 64px;
    display: flex;
    align-items: flex-start;
    .homework-desc {
      position: relative;
      width: @leftWidth;
      margin-right: @leftMarginRight;
      padding: 10px;
      background: #f5f5f5;
      &::after {
        position: absolute;
        top: 7px;
        right: -10px;
        content: "";
        width: 0px;
        height: 0px;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-left: 10px solid #f5f5f5ff;
        font-size: 0px;
        line-height: 0px;
      }
      .homework-label {
        line-height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: #747474;
      }
      .homework-desc-content {
        margin-top: 4px;
        line-height: 17px;
        font-weight: 400;
        color: #ababab;
      }
    }
  }
}
.homework-submit-btn {
  padding: 7px 23px;
  line-height: 1;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  background: #14af64;
  border-radius: unset;
}
</style>

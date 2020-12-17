<template>
  <div class="term-container" v-loading="loading">
    <div class="term-info-wrapper" v-if="detail">
      <div class="container-1200">
        <div class="term-cover">
          <the-loading-image
            :url="detail.cover_file_url"
            :width="350"
            :height="196"
          />
        </div>
        <div class="term-info">
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
            <span class="term-start"
              >{{ formatDate(detail.start_at) }} 开课
            </span>
            |
            <span class="term-end"
              >{{ formatDate(detail.end_at) }} 前有效
            </span>
          </div>
          <p class="term-desc">
            {{ detail.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="term-content container-1200">
      <el-tabs v-model="activeName">
        <el-tab-pane label="作业" name="homework">
          <p class="homework-tips">
            *请先在「我的方案」中创建方案并完成作业要求，在进行作业提交。
          </p>
          <ul class="homework-list">
            <li v-for="homework of homeworks" :key="homework.id">
              <homework :homework="homework" />
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="讨论区" name="discussion" disabled> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import termService from "service/term";
import TheLoadingImage from "components/TheLoadingImage";
import Homework from "./widgets/Homework";

import { TERM_STATUS } from "utils/const";
import { formatDate } from "utils/moment";
export default {
  name: "Term",
  components: {
    TheLoadingImage,
    Homework
  },
  data() {
    return {
      TERM_STATUS,
      loading: true,
      detail: null,
      activeName: "homework",
      homeworks: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    formatDate,
    getData() {
      termService
        .campTerm(this.$route.params.id)
        .then(res => {
          this.detail = res.camp_term;
          this.homeworks = res.homeworks;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.term-container {
  min-height: calc(100vh - 130px);
}
.term-info-wrapper {
  width: 100%;
  height: 210px;
  padding-top: 60px;
  background: #fff;
  .container-1200 {
    display: flex;
    .term-cover {
      margin-right: 20px;
      width: 350px;
      height: 196px;
    }
    .term-info {
      flex: 1;
      .term-name-wrapper {
        display: flex;
        align-items: center;
        .term-name {
          margin-right: 15px;
          line-height: 1;
          font-size: 24px;
          font-weight: bold;
          color: #333333;
        }
        .term-status {
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          font-weight: 400;
          color: #666666;
          background: #d8d8d8;
          border-radius: 10px;
          &.unstart {
            color: #6e6e6e;
            background: #ffedcfff;
          }
          &.started {
            color: #6e6e6e;
            background: #64ff5aff;
          }
          &.ended {
            color: #666666;
            background: #d8d8d8ff;
          }
        }
      }
      .term-time-wrapper {
        margin: 12px 0 24px;
        line-height: 1;
        font-size: 14px;
        font-weight: bold;
        color: #ababab;
      }
      .term-desc {
        line-height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: #ababab;
      }
    }
  }
}
.term-content {
  margin-top: 108px;
  height: 500px;
  /deep/ .el-tabs {
    .el-tabs__header {
      margin-bottom: 20px;
    }
    .el-tabs__nav-scroll {
      display: flex;
    }
    .el-tabs__active-bar {
      // display: none;
      width: 70px !important;
      transform: translateX(0) !important;
    }
    .el-tabs__item {
      position: relative;
      padding: 0 20px !important;
      font-size: 16px;
      font-weight: bold;
      color: #333333;
    }
    .el-tabs__nav-wrap::after {
      width: 0 !important;
    }
    .el-tabs__item.is-disabled {
      color: #cccccc;
    }
  }
  .homework-tips {
    margin-bottom: 5px;
    line-height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #ababab;
  }
}
</style>

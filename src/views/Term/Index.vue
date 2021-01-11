<template>
  <div class="term-container" v-loading="loading">
    <div class="term-info-wrapper" v-if="detail">
      <div class="container-1200">
        <div class="term-cover">
          <the-loading-image
            :url="detail.cover_file_url"
            :width="284"
            :height="212"
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
            课程有效期：
            <span class="term-start">{{ formatDate(detail.start_at) }} </span>
            至
            <span class="term-end">{{ formatDate(detail.end_at) }} </span>
          </div>
          <p class="term-desc">
            {{ detail.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="term-content container-1200">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="作业" name="homework">
          <homework
            :homeworks="homeworks"
            :loading="loading"
            @added="getData"
          />
        </el-tab-pane>
        <el-tab-pane label="资料包" name="attach">
          <attach />
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
import Attach from "./widgets/Attach";

import { TERM_STATUS } from "utils/const";
import { formatDate } from "utils/moment";
import { goDrawPlan, goMy } from "utils/routes";

export default {
  name: "Term",
  components: {
    TheLoadingImage,
    Homework,
    Attach
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
    const { tab } = this.$route.query;
    if (tab && ["homework", "attach"].includes(tab)) {
      this.activeName = tab;
    }
    this.getData();
  },
  methods: {
    formatDate,
    goDrawPlan,
    getData() {
      this.loading = true;
      termService
        .campTerm(this.$route.params.id)
        .then(res => {
          this.detail = res.camp_term;
          this.homeworks = res.homeworks.filter(
            item =>
              item.is_online === 1 &&
              new Date().valueOf() >= new Date(item.start_at).valueOf()
          );
        })
        .catch(() => {
          goMy("replace");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    tabClick(tab) {
      if (tab.name !== this.$route.query.tab) {
        this.$router.push({
          query: {
            tab: tab.name
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
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
      width: 284px;
      height: 212px;
    }
    .term-info {
      flex: 1;
      .term-name-wrapper {
        display: flex;
        align-items: center;
        .term-name {
          margin-right: 15px;
          max-width: 755px;
          line-height: 1;
          font-size: 24px;
          font-weight: bold;
          color: #333333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
            color: #fff;
            background: #18c20eff;
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
  margin-bottom: 30px;
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
      // transform: translateX(0) !important;
      height: 4px;
    }
    .el-tabs__item {
      position: relative;
      padding: 0 20px 0 0 !important;
      width: 70px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      box-sizing: content-box;
    }
    .el-tabs__nav-wrap::after {
      width: 0 !important;
    }
    .el-tabs__item.is-disabled {
      color: #cccccc;
    }
  }
}
</style>

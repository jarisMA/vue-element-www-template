<template>
  <div class="page" v-loading="loading">
    <div class="container-1200">
      <div class="page-left">
        <the-loading-image
          :width="240"
          :height="180"
          :url="detail.cover_file_url"
        />
        <h3 class="page-left-title">{{ detail.name }}</h3>
        <p class="page-left-date">
          {{ formatDate(detail.start_at) }} – {{ formatDate(detail.end_at) }}
        </p>
        <p class="page-left-desc">
          {{ detail.description }}
        </p>
        <!-- <div class="page-left-more_list">
          <div class="page-left-more_item">
            班级公约
          </div>
          <div class="page-left-more_item">
            班级手册
          </div>
        </div> -->
      </div>
      <div class="page-right">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="课程章节" name="category">
            <div class="category-list">
              <category-card
                v-for="category of categories"
                :key="category.id"
                :category="category"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="作业" name="homework">
            <homework
              :homeworks="homeworks"
              :loading="loading"
              @added="getData"
            />
          </el-tab-pane>
          <el-tab-pane label="资料包" name="attach">
            <attach :attaches="attaches" :loading="loading" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import termService from "service/term";
import TheLoadingImage from "components/TheLoadingImage";
import CategoryCard from "./widgets/CategoryCard";
import Homework from "./widgets/Homework";
import Attach from "./widgets/Attach";

import { TERM_STATUS } from "utils/const";
import { formatDate } from "utils/moment";
import { goDrawPlan, goMy } from "utils/routes";

export default {
  name: "Term",
  components: {
    TheLoadingImage,
    CategoryCard,
    Homework,
    Attach
  },
  data() {
    return {
      TERM_STATUS,
      loading: true,
      detail: {},
      activeName: "category",
      categories: [],
      homeworks: [],
      attaches: []
    };
  },
  created() {
    const { tab } = this.$route.query;
    if (tab && ["category", "homework", "attach"].includes(tab)) {
      this.activeName = tab;
    }
    this.getData();
  },
  methods: {
    formatDate,
    goDrawPlan,
    getData() {
      this.loading = true;
      const id = this.$route.params.id;
      Promise.all([termService.campTerm(id), termService.campAttach(id)])
        .then(([res, attaches]) => {
          this.detail = res.camp_term;
          this.categories = res.categories;
          this.homeworks = res.homeworks.filter(
            item =>
              item.is_online === 1 &&
              new Date().valueOf() >= new Date(item.start_at).valueOf()
          );
          this.attaches = attaches;
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
.page {
  width: 100%;
  padding: 40px 0;
}
.container-1200 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 10px;
  .page-left {
    flex: none;
    margin-right: 20px;
    padding: 20px;
    width: 280px;
    background: #ffffff;
    .page-left-title {
      margin-top: 20px;
      line-height: 28px;
      font-size: 22px;
      font-weight: bold;
      color: #2c3330;
    }
    .page-left-date {
      margin-top: 10px;
      line-height: 21px;
      font-size: 14px;
      letter-spacing: 1px;
      color: #2c3330;
    }
    .page-left-desc {
      margin-top: 20px;
      line-height: 16px;
      font-size: 12px;
      color: #81948b;
    }
    .page-left-more_list {
      margin-top: 34px;
      width: 100%;
    }
    .page-left-more_item {
      padding: 10px 0;
      width: 100%;
      line-height: 21px;
      font-size: 14px;
      color: #2c3330;
      cursor: pointer;
    }
    .page-left-more_item + .page-left-more_item {
      border-top: 1px solid #efefef;
    }
  }
  .page-right {
    flex: 1;
    width: 880px;
    background: #fff;
    /deep/ .el-tabs {
      width: 100%;
      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__nav-scroll {
        padding: 0 20px;
      }
      .el-tabs__item {
        padding: 20px;
        height: 69px;
        line-height: 28px;
        font-weight: normal;
        font-size: 16px;
        color: #81948b;
        &.is-active {
          color: #2c3330;
        }
      }
      .el-tabs__nav-wrap::after {
        background-color: #efefef;
      }
    }
  }
}
.category-list {
  padding: 0 20px;
  width: 100%;
}
</style>

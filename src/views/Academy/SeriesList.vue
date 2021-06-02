<template>
  <div class="page" v-loading="loading">
    <div class="container-1180">
      <div class="page-header">
        <h3 class="page-header-title">
          家计划
          <el-select v-model="value" @change="goAcademyCourseList()">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </h3>
        <the-search-bar @search="handleKeywordChange" />
      </div>
      <div class="page-content">
        <div class="course-cat-list">
          <div
            :class="['course-cat-item', catId === null ? 'active' : '']"
            @click="catId = null"
          >
            全部
          </div>
          <div
            :class="['course-cat-item', catId === item.id ? 'active' : '']"
            v-for="(item, key) of cats"
            :key="key"
            @click="catId = item.id"
          >
            {{ item.name }}
          </div>
        </div>
        <template v-if="series.length > 0">
          <ul class="series-list">
            <li class="series-item" v-for="item of series" :key="item.id">
              <set-card :series="item" />
            </li>
          </ul>
          <pagination
            :pageSize="pagination.size"
            :current-page="pagination.page"
            :total="pagination.total"
            @change-page="getSeries"
          ></pagination>
        </template>
        <the-empty v-else-if="!loading" noText="暂无视频课" />
      </div>
    </div>
  </div>
</template>

<script>
import TheSearchBar from "components/TheSearchBar";
import SetCard from "./widgets/SetCard";
import courseService from "service/course";
import Pagination from "components/Pagination";
import TheEmpty from "components/TheEmpty";
import { goAcademyCourseList } from "utils/routes";

export default {
  name: "AcademyCourseList",
  components: { TheSearchBar, SetCard, Pagination, TheEmpty },
  data() {
    return {
      loading: true,
      value: 2,
      options: [
        {
          value: 1,
          label: "视频课"
        },
        {
          value: 2,
          label: "体系课"
        }
      ],
      pagination: {
        size: 12,
        page: 1,
        total: 0
      },
      cats: [],
      catId: null,
      series: [],
      keyword: null
    };
  },
  watch: {
    catId() {
      this.getSeries();
    }
  },
  created() {
    this.getData();
  },
  methods: {
    goAcademyCourseList,
    getData() {
      Promise.all([
        courseService.seriesCategory(),
        courseService.series({
          page_size: this.pagination.size,
          page: 1
        })
      ])
        .then(([cats, series]) => {
          this.cats = cats;
          this.series = series.list;
          this.pagination.total = series.pagination.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSeries(start = 1) {
      this.loading = true;
      courseService
        .series({
          page_size: this.pagination.size,
          page: start,
          name: this.keyword,
          cat_id: this.catId
        })
        .then(series => {
          this.series = series.list;
          this.pagination.total = series.pagination.total;
          this.pagination.page = start;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleKeywordChange(keyword) {
      this.keyword = keyword;
      this.getSeries();
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.page {
  padding: 40px 0;
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-header-title {
      display: flex;
      line-height: 40px;
      font-weight: 600;
      font-size: 40px;
      color: #2c3330;
      .el-select {
        width: 150px;
        height: 40px;
        /deep/ .el-input {
          height: 100%;
          .el-select__caret {
            color: #81948b;
          }
          .el-input__inner {
            padding: unset;
            line-height: 40px;
            font-weight: 600;
            font-size: 40px;
            color: @primaryColor;
            background: transparent;
            border: unset;
          }
        }
      }
    }
  }
  .page-content {
    margin-top: 40px;
    .course-cat-list {
      display: flex;
      margin-bottom: 24px;
      .course-cat-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        line-height: 20px;
        font-size: 14px;
        color: #2c3330;
        cursor: pointer;
        & + .course-level-item {
          margin-left: 8px;
        }
        &.active {
          color: #fff;
          background: #2c3330;
        }
      }
    }
    .series-list {
      display: flex;
      flex-wrap: wrap;
      .series-item {
        margin-bottom: 40px;
        &:nth-child(3n-1) {
          margin-left: 20px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>

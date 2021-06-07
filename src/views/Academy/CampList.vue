<template>
  <div class="page" v-loading="loading">
    <div class="container-1180">
      <div class="page-header">
        <h3 class="page-header-title">
          家计划
          <el-select v-model="value" @change="handleOptionSelect">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </h3>
      </div>
      <div class="page-content">
        <template v-if="camps.length > 0">
          <ul class="camp-list">
            <li class="camp-item" v-for="item of camps" :key="item.id">
              <camp-card :camp="item" />
            </li>
          </ul>
          <pagination
            :pageSize="pagination.size"
            :current-page="pagination.page"
            :total="pagination.total"
            @change-page="getData"
          ></pagination>
        </template>
        <the-empty v-else-if="!loading" noText="暂无视频课" />
      </div>
    </div>
  </div>
</template>

<script>
import CampCard from "./widgets/CampCard";
import campService from "service/camp";
import Pagination from "components/Pagination";
import TheEmpty from "components/TheEmpty";
import { listMixin } from "./widgets/mixin";

export default {
  name: "AcademyCampList",
  components: { CampCard, Pagination, TheEmpty },
  mixins: [listMixin],
  data() {
    return {
      loading: true,
      value: 3,
      pagination: {
        size: 12,
        page: 1,
        total: 0
      },
      camps: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(start = 1) {
      this.loading = true;
      campService
        .camps({
          page_size: this.pagination.size,
          page: start
        })
        .then(camps => {
          this.camps = camps.list;
          this.pagination.total = camps.pagination.total;
          this.pagination.page = start;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.page {
  padding: 40px 0;
  background: #fff !important;
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
    .camp-list {
      display: flex;
      flex-wrap: wrap;
      .camp-item {
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

<template>
  <div class="class-section" v-if="total > 0">
    <div class="class-head">
      <div class="class-left">
        <span class="class-title">我的体系课</span>
        <span class="class-number">共有 {{ total }} 门体系课</span>
      </div>
      <div>
        <search-bar :holder="holder" @search="handleSearch"></search-bar>
      </div>
    </div>
    <div class="class-content">
      <div v-for="item of systems" :key="item.id">
        <system-card :list="item" @itemClick="goAcademySeriesDetail(item.id)" />
      </div>
      <pagination
        :class="['pagination-wrapper']"
        :pageSize="size"
        :current-page="page"
        :total="total"
        @change-page="getData"
      />
    </div>
  </div>
  <the-empty v-else-if="!loading" noText="暂无任何课程" />
</template>

<script>
import SearchBar from "./SearchBar.vue";
import SystemCard from "./SystemCard.vue";
import coursesService from "service/course";
import { goAcademySeriesDetail } from "utils/routes";
import Pagination from "components/Pagination";
import TheEmpty from "components/TheEmpty";

export default {
  components: { SearchBar, SystemCard, Pagination, TheEmpty },
  name: "MySystems",

  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      holder: "搜索我的系统课",
      systems: [],
      size: 9,
      page: 1,
      total: 0,
      keyword: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    goAcademySeriesDetail,
    getData(start = 1) {
      this.$emit("update:loading", true);
      coursesService
        .mySeries({
          name: this.keyword || null,
          page_size: this.size,
          page: start
        })
        .then(res => {
          this.systems = res.list;
          this.total = res.pagination.total;
          this.page = start;
        })
        .finally(() => {
          this.$emit("update:loading", false);
        });
    },
    handleSearch(keyword) {
      this.keyword = keyword;
      this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
.class-section {
  .class-head {
    display: flex;
    width: 880px;
    justify-content: space-between;

    .class-left {
      display: flex;
      align-items: center;

      .class-title {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #2c3330;
      }
      .class-number {
        margin-left: 8px;
        font-size: 16px;
        line-height: 24px;
        color: #81948b;
      }
    }
  }
  .class-content {
    width: 1000px;
    height: 100%;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }

  .pagination-wrapper {
    position: absolute;
    top: 1050px;
    left: 250px;
  }
}
</style>

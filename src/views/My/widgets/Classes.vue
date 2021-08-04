<template>
  <div class="class-section" v-if="terms.length > 0">
    <div class="class-head">
      <div class="class-left">
        <span class="class-title">我的训练营</span>
        <span class="class-number">加入了 {{ terms.length }} 个训练营</span>
      </div>
      <div>
        <search-bar :holder="holder" @search="handleSearch"></search-bar>
      </div>
    </div>
    <div>
      <div v-for="(item, index) of terms" :key="index">
        <div class="course-item">
          <class-card :detail="item" @itemClick="goTerm(item.id)" />
        </div>
      </div>
    </div>
  </div>
  <the-empty v-else-if="!loading" noText="暂无任何课程" />
</template>

<script>
import termService from "service/term";
import ClassCard from "./ClassCard.vue";
import SearchBar from "./SearchBar.vue";
import { goTerm } from "utils/routes";
import TheEmpty from "components/TheEmpty";
// import Pagination from "components/Pagination";

export default {
  components: { ClassCard, SearchBar, TheEmpty },
  name: "MyClass",

  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      terms: [],
      holder: "搜索我的训练营",
      keyword: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    goTerm,
    getData() {
      this.$emit("update:loading", true);
      termService
        .myCampTerms({ term_name: this.keyword || null })
        .then(res => {
          this.terms = res.sort(function(a, b) {
            return (
              new Date(b.created_at).valueOf() -
              new Date(a.created_at).valueOf()
            );
          });
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
        line-height: 32px;
        font-weight: 600;
        font-size: 24px;
        color: #2c3330;
      }
      .class-number {
        margin-left: 8px;
        line-height: 24px;
        font-size: 16px;
        color: #81948b;
      }
    }
  }
  .class-content {
    width: 100%;
    height: 100%;
  }
}
</style>

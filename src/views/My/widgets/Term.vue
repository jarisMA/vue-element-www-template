<template>
  <div class="term-list-container">
    <template v-if="terms.length > 0">
      <ul class="term-list">
        <li :class="['term-item']" v-for="item of terms" :key="item.id">
          <term-card :detail="item" @itemClick="goTerm(item.id)" />
        </li>
      </ul>
      <pagination
        :pageSize="pagination.size"
        :current-page.sync="pagination.page"
        :total="pagination.total"
        @change-page="getData"
      />
    </template>
    <template v-else-if="showNoTips">
      <div class="empty-wrapper">
        <img :src="defaultNoPic" :alt="noText" />
        <span>{{ noText }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import termService from "service/term";
import Pagination from "components/Pagination";
import defaultNoPic from "images/noPlan.png";
import TermCard from "./TermCard";

export default {
  name: "MyTerm",
  components: {
    Pagination,
    TermCard
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      defaultNoPic,
      noText: "暂未加入任何班级",
      terms: [],
      pagination: {
        size: 16,
        page: 1,
        total: 0
      },
      showNoTips: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(start = 1) {
      this.$emit("update:loading", true);
      termService
        .campTerms({
          page: start,
          page_size: this.termCount
        })
        .then(res => {
          this.terms = res.list;
          this.pagination.total = res.totalCount;
          this.pagination.page = start;
          this.showNoTips = true;
        })
        .finally(() => {
          this.$emit("update:loading", false);
        });
    },
    goTerm(id) {
      this.$router.push({
        name: "Term",
        params: {
          id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@margin: 24px;
@count: 3;
.term-list-container {
  margin-top: 20px;
}
.term-list {
  display: flex;
  flex-wrap: wrap;
  .term-item {
    width: calc(100% / @count - @margin * (@count - 1) / @count + @margin);
    padding-right: @margin;
    margin-bottom: @margin;
    &:nth-child(@{count}n) {
      width: calc(100% / @count - @margin * (@count - 1) / @count);
      padding-right: 0;
    }
  }
}
.empty-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 100px;
  img {
    width: 350px;
  }
  span {
    display: inline-block;
    margin-top: 24px;
    line-height: 1;
    font-size: 16px;
    font-weight: 500;
    color: #ababab;
  }
}
</style>

<template>
  <div class="pagination-wrapper">
    <el-pagination
      background
      :hide-on-single-page="hideIfSingle"
      :layout="paginationLayout"
      :current-page.sync="current"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :pager-count="5"
      :total="total"
      @current-change="handleChangePage"
      @size-change="handleChangeSize"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    hideIfSingle: {
      type: Boolean,
      default: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 12
    },
    pageSizes: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: "jumper"
    }
  },
  data() {
    return {
      current: this.currentPage
    };
  },
  watch: {
    currentPage(val) {
      this.current = val;
    }
  },
  methods: {
    handleChangePage(current) {
      this.$emit("change-page", current);
    },
    handleChangeSize(size) {
      this.$emit("change-size", size);
    }
  },
  computed: {
    paginationLayout() {
      switch (this.layout) {
        case "jumper":
          return "prev, pager, next, jumper";
        case "next":
          return "sizes, prev, pager, next";
        default:
          return "prev, pager, next";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  /deep/ .el-pagination {
    .el-pager li,
    .btn-prev,
    .btn-next {
      background: #fff;
    }
  }
}
</style>

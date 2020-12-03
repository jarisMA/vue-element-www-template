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
          return "prev, pager, next, jumper";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pagination-wrapper {
  display: flex;
  /deep/ .el-pagination {
    margin: 30px auto 40px;
    .number,
    .btn-prev,
    .btn-next,
    .el-input__inner {
      display: inline-block;
      min-width: 40px;
      height: 40px !important;
      margin-right: 8px;
      font-family: Arial;
      line-height: 38px;
      text-align: center;
      vertical-align: middle;
      list-style: none;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 0;
      outline: 0;
      cursor: pointer;
      user-select: none;
    }
    .el-icon-more,
    .el-icon.more {
      height: 40px;
      line-height: 40px;
    }
    .el-pagination__jump {
      line-height: 40px;
    }
    .el-pagination__sizes {
      float: right;
    }
  }
}
</style>

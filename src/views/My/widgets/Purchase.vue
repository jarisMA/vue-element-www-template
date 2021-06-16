<template>
  <div class="purchase-section" v-if="total > 0">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
    <!-- <el-tab-pane label="虚拟商品" name="virtuality"> -->
    <div class="purchase-list">
      <el-table :data="order" style="width: 100%">
        <el-table-column
          prop="name"
          label="商品名称"
          min-width="20%"
        ></el-table-column>
        <el-table-column label="类型" min-width="10%">
          <template slot-scope="scope">
            {{ ORDER_TYPE[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column label="数量" min-width="10%">1</el-table-column>
        <el-table-column label="价格" min-width="10%">
          <template slot-scope="scope">
            ¥{{ scope.row.total_amount }}
          </template>
        </el-table-column>
        <el-table-column
          prop="no"
          label="订单号"
          min-width="25%"
        ></el-table-column>
        <el-table-column
          prop="created_at"
          label="日期"
          min-width="25%"
        ></el-table-column>
      </el-table>
      <pagination
        :class="['pagination-wrapper']"
        :pageSize="size"
        :current-page="page"
        :total="total"
        @change-page="getData"
      />
    </div>
    <!-- </el-tab-pane> -->
    <!-- <el-tab-pane label="实物商品" name="entity"> -->
    <!-- <el-dropdown class="purchase-type">
      <el-button>
        全部类型<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>课程</el-dropdown-item>
        <el-dropdown-item>会员</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <!-- </el-tab-pane> -->
    <!-- </el-tabs> -->
    <!-- <el-dropdown class="purchase-type">
      <el-button>
        全部类型<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>课程</el-dropdown-item>
        <el-dropdown-item>会员</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
  </div>
  <the-empty v-else-if="!loading" noText="暂无任何订单" />
</template>

<script>
import orderService from "service/order";
import Pagination from "components/Pagination";
import TheEmpty from "components/TheEmpty";
import { ORDER_TYPE } from "utils/const";

export default {
  components: { Pagination, TheEmpty },
  name: "MyOrder",

  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      order: [],
      size: 9,
      page: 1,
      total: 0,
      ORDER_TYPE

      // activeName: "virtuality",
    };
  },
  methods: {
    getData(start = 1) {
      this.$emit("update:loading", true);
      orderService
        .myOrder({
          page_size: this.size,
          page: start
        })
        .then(res => {
          this.order = res.list;
          this.total = res.pagination.total;
          this.page = start;
          console.log(res);
        })
        .finally(() => {
          this.$emit("update:loading", false);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.purchase-section {
  padding: 20px;
  width: 100%;
  height: 100%;

  /deep/ .el-tabs__item {
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    color: #81948b;
  }

  /deep/ .el-tabs__active-bar {
    background-color: white;
  }

  /deep/ .el-tabs__item.is-active {
    color: #2c3330;
  }

  /deep/ .el-tabs__nav-wrap::after {
    height: 0px;
  }

  /deep/ .el-table--fit {
    min-height: 500px;
  }

  /deep/ .el-table::before {
    height: 0px;
  }

  // .purchase-type {
  //   position: absolute;
  //   z-index: 999;
  //   left: 843px;
  //   top: 20px;
  // }

  .pagination-wrapper {
    margin-top: 20px;
  }
}
</style>

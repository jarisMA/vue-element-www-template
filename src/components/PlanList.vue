<template>
  <div>
    <template v-if="plans.length > 0 || theme === 'my'">
      <ul class="plan-list">
        <li :class="['plan-item', theme]" v-if="theme === 'my'">
          <div class="add-plan" @click="addClick()">
            <div class="add-plan-top">
              <img src="~images/add_green.png" />
              <label>新建方案</label>
            </div>
            <div class="add-plan-button">
              <img src="~images/plango.png" />
            </div>
          </div>
        </li>
        <li
          :class="['plan-item', theme]"
          v-for="(item, index) of plans"
          :key="item.planId"
        >
          <plan-card
            :detail="item"
            :canDelete="canDelete"
            :theme="theme"
            :activeIndex="activeIndex"
            @itemClick="itemClick(item)"
            @copyClick="copyClick(item)"
            @editClick="editClick(index, item)"
            @delete="deleteItem(index, item)"
          />
        </li>
      </ul>
      <pagination
        :class="['pagination-wrapper', theme]"
        :pageSize="size"
        :current-page="page"
        :total="total"
        :layout="paginationLayout.layout || ''"
        @change-page="pageChange"
      />
    </template>
    <template v-else-if="showNoTips">
      <the-empty :noPic="noPic" :noText="noText" />
    </template>
  </div>
</template>

<script>
import Pagination from "components/Pagination";
import PlanCard from "components/PlanCard";
import TheEmpty from "components/TheEmpty";

export default {
  name: "PlanList",
  components: {
    Pagination,
    PlanCard,
    TheEmpty
  },
  props: {
    plans: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      default: 12
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    canDelete: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String
    },
    showNoTips: {
      type: Boolean,
      default: false
    },
    noPic: {
      type: String,
      default: null
    },
    noText: {
      type: String,
      default: "暂无任何方案"
    },
    activeIndex: {
      type: [String, Number],
      default: null
    },
    paginationLayout: {
      type: Object,
      default: () => {
        return { layout: "jumper" };
      }
    }
  },
  methods: {
    addClick() {
      this.$emit("add");
    },
    itemClick(item) {
      this.$emit("itemClick", item);
    },
    copyClick(item) {
      this.$emit("copyClick", item);
    },
    editClick(index, item) {
      this.$emit("editClick", index, item);
    },
    pageChange(page) {
      this.$emit("pageChange", page);
    },
    deleteItem(index, item) {
      this.$emit("delete", index, item);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

@margin: 24px;
@myMargin: 20px;
@count: 4;

.plan-list {
  display: flex;
  flex-wrap: wrap;
  .add-plan {
    display: flex;
    flex-direction: column;
    flex-direction: column;
    align-items: center;
    height: 380px;
    width: 100%;
    padding: 7px;
    border: 1px solid #efefef;
    background: #fff;
    cursor: pointer;
    .add-plan-top {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 300px;
      margin-bottom: 16px;
      color: @primaryColor;
      background: #f9f9f9ff;
      img {
        width: 48px;
        margin-bottom: 8px;
      }
      label {
        font-size: 16px;
        font-weight: 500;
        line-height: 28px;
        color: #14af64;
      }
    }
    .add-plan-button {
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: @primaryColor;
      img {
        height: 26px;
      }
    }
  }
  .plan-item {
    width: calc(100% / @count - @margin * (@count - 1) / @count + @margin);
    padding-right: @margin;
    margin-bottom: @margin;
    &:nth-child(@{count}n) {
      width: calc(100% / @count - @margin * (@count - 1) / @count);
      padding-right: 0;
    }
    &.my,
    &.homework {
      width: calc(
        100% / @count - @myMargin * (@count - 1) / @count + @myMargin
      );
      padding-right: @myMargin;
      margin-bottom: @myMargin;
      &:nth-child(@{count}n) {
        width: calc(100% / @count - @myMargin * (@count - 1) / @count);
        padding-right: 0;
      }
    }
  }
}
.pagination-wrapper {
  margin-top: 80px;
}
.pagination-wrapper {
  /deep/ &.homework {
    position: absolute;
    bottom: 26px;
    margin-top: 0;
    justify-content: flex-start;
    .el-pagination {
      margin: 0;
      padding: 0;
      .btn-prev {
        margin-left: 0;
      }
      .btn-prev,
      .btn-next,
      .el-pager .number {
        min-width: 20px;
        height: 20px !important;
        line-height: 20px;
      }
    }
  }
}
</style>

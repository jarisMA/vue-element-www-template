<template>
  <div class="plan-list-container">
    <template v-if="plans.length > 0">
      <ul class="plan-list">
        <li
          :class="['plan-item', theme]"
          v-for="(item, index) of plans"
          :key="item.planId"
        >
          <plan-card
            :detail="item"
            :canDelete="canDelete"
            :theme="theme"
            @itemClick="itemClick(item)"
            @delete="deleteItem(index, item)"
          />
        </li>
      </ul>
      <pagination :pageSize="size" :total="total" @change-page="pageChange" />
    </template>
    <template v-else-if="showNoTips">
      <div class="empty-wrapper">
        <img :src="noPic" :alt="noText" />
        <span>{{ noText }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import Pagination from "components/Pagination";
import PlanCard from "components/PlanCard";
import defaultNoPic from "images/noPlan.png";

export default {
  name: "PlanList",
  components: {
    Pagination,
    PlanCard
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
      default: defaultNoPic
    },
    noText: {
      type: String,
      default: "暂无任何方案"
    }
  },
  methods: {
    itemClick(item) {
      this.$emit("itemClick", item);
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
@margin: 24px;
@myMargin: 20px;
@count: 4;
.plan-list {
  display: flex;
  flex-wrap: wrap;
  .plan-item {
    width: calc(100% / @count - @margin * (@count - 1) / @count + @margin);
    padding-right: @margin;
    margin-bottom: @margin;
    &:nth-child(@{count}n) {
      width: calc(100% / @count - @margin * (@count - 1) / @count);
      padding-right: 0;
    }
    &.my {
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

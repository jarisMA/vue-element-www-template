<template>
  <div class="plan-list-container">
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
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import PlanCard from "@/components/PlanCard";

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
@myMargin: 15px;
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
</style>

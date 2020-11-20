<template>
  <div class="plan-list-container">
    <ul class="plan-list">
      <li class="plan-item" v-for="(item, index) of plans" :key="item.planId">
        <plan-card
          :detail="item"
          :canDelete="canDelete"
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
    }
  },
  methods: {
    itemClick(item) {
      this.$emit("itemClick", item);
    },
    pageChange(page) {
      console.log(page);
      this.$emit("pageChange", page);
    },
    deleteItem(index, item) {
      this.$emit("delete", index, item);
    }
  }
};
</script>

<style lang="less" scoped>
.plan-list {
  display: flex;
  flex-wrap: wrap;
  .plan-item {
    width: 25%;
  }
}
</style>

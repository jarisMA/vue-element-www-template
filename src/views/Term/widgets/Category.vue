<template>
  <div class="category-wrapper">
    <div class="category-list" v-if="categories.length > 0">
      <category-card
        v-for="category of categories"
        :key="category.id"
        :category="category"
        :campId="campId"
        :termId="termId"
        @showFeedback="handleShowFeedback(category)"
      />
    </div>
    <the-empty v-else-if="!loading" noText="暂无课程可学习" />
  </div>
</template>

<script>
import TheEmpty from "components/TheEmpty";
import CategoryCard from "./CategoryCard";

export default {
  name: "TermCategory",
  components: {
    CategoryCard,
    TheEmpty
  },
  props: {
    campId: {
      type: Number
    },
    termId: {
      type: Number
    },
    categories: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      listVisible: false,
      activeFeedbackCategory: null
    };
  },
  methods: {
    handleShowFeedback(category) {
      this.activeFeedbackCategory = category;
      this.listVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.category-list {
  padding: 0 20px;
  width: 100%;
}
</style>

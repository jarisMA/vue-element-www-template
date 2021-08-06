<template>
  <div class="category-wrapper">
    <div class="category-list" v-if="categories.length > 0">
      <category-card
        v-for="category of categories"
        :key="category.id"
        :category="category"
        :campId="campId"
        :termId="termId"
        @showNote="handleShowNote(category)"
      />
    </div>
    <the-empty v-else-if="!loading" noText="暂无课程可学习" />
    <el-drawer
      class="note-drawer"
      size="576px"
      :visible.sync="listVisible"
      :show-close="false"
    >
      <el-select
        :popper-append-to-body="false"
        v-model="note.id"
        style="width:100%"
      >
        <el-option
          v-for="note in activeNote"
          :key="note.id"
          :label="note.name"
          :value="note.id"
        >
        </el-option>
      </el-select>
    </el-drawer>
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
      activeNote: null
    };
  },
  methods: {
    handleShowNote(category) {
      this.activeNote = category.resources;
      this.listVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.category-list {
  padding: 0 20px 0 50px;
  width: 100%;
}
</style>

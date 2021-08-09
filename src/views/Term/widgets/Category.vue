<template>
  <div class="category-wrapper">
    <div class="category-list" v-if="categories.length > 0">
      <category-card
        v-for="category of categories"
        :key="category.id"
        :category="category"
        :campId="campId"
        :termId="termId"
        @showNote="handleShowNote"
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
        v-model="notes.id"
        style="width:576px; position:fixed; top:0;"
        v-if="listVisible"
        @change="handleNoteChange(notes.id)"
      >
        <el-option
          v-for="note in activeNote"
          :key="note.id"
          :label="note.name"
          :value="note.id"
          class="dropdown-item"
        >
        </el-option>
      </el-select>
      <div class="note-wrapper">
        <div class="note-title" v-html="notes.title"></div>
        <div class="note-content" v-html="notes.content"></div>
      </div>
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
      activeNote: [],
      notes: {
        id: "",
        content: "",
        title: ""
      }
    };
  },
  methods: {
    handleShowNote(note) {
      this.activeNote = note;
      this.listVisible = true;
      this.notes.id = note[0].id;
      this.notes.content = note[0].note.content;
      this.notes.title = note[0].note.name;
    },
    handleNoteChange(id) {
      this.notes.content = this.activeNote.find(
        item => item.id == id
      ).note.content;
      this.notes.title = this.activeNote.find(item => item.id == id).note.name;
    }
  }
};
</script>

<style lang="less" scoped>
.category-list {
  padding: 0 20px 0 50px;
  width: 100%;
}
/deep/ .note-drawer {
  .el-drawer__header {
    display: none;
  }
  .el-select .el-input__inner {
    padding: 12px 25px;
    color: #2c3330;
    border: none;
    background: #f4f4f4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-icon-arrow-up::before {
    color: #2c3330;
  }

  .note-wrapper {
    padding: 60px 40px;
  }
  .note-title {
    color: #2c3330;
    font-weight: 600;
    font-size: 24px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #efefef;
  }
}
</style>

<style lang="less">
.note-content {
  img {
    max-width: 100%;
  }

  p {
    color: #2c3330;
  }
}
.category-wrapper {
  .el-select-dropdown__list {
    padding: 0px;
  }
  .el-popper {
    width: 576px !important;
    margin: 0px !important;
    right: 0 !important;
    left: auto !important;
  }

  .popper__arrow {
    display: none !important;

    .el-select__caret {
      color: black !important;
    }
  }

  .dropdown-item {
    line-height: 14px;
    height: 40px;
    padding: 12px 25px;
    color: #2c3330;
    border: none;
    background: #f4f4f4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    background: white !important;

    &:hover {
      background: #f4f4f4 !important;
    }
  }
}
</style>

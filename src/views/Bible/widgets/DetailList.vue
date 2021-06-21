<template>
  <ul :class="['bible-item', theme]">
    <li v-for="item of list" :key="item.id">
      <bible-card
        :bible="item"
        :theme="theme"
        @showDetail="showDetail(item)"
        @previewImage="showPreviewImage"
      />
    </li>
  </ul>
</template>

<script>
import BibleCard from "./BibleCard";

export default {
  name: "BibleDetailList",
  components: {
    BibleCard
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: "three"
    }
  },
  methods: {
    showDetail(data) {
      this.$emit("showDetail", data);
    },
    showPreviewImage(url) {
      this.$emit("previewImage", url);
    }
  }
};
</script>

<style lang="less" scoped>
.bible-item {
  display: flex;
  flex-wrap: wrap;
  li {
    margin-bottom: 20px;
  }
  &.three {
    li {
      &:nth-child(3n-1) {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
  &.two {
    li {
      &:nth-child(odd) {
        margin-right: 20px;
      }
    }
  }
}
</style>

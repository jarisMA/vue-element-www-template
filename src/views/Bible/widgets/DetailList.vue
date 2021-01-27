<template>
  <ul class="bible-item">
    <li v-for="item of list" :key="item.id">
      <bible-card :bible="item" @showDetail="showDetail(item)" />
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
    }
  },
  methods: {
    showDetail(data) {
      this.$emit("showDetail", data);
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
    &:nth-child(3n-1) {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
}
</style>

<template>
  <div class="empty-wrapper">
    <img :src="noPic || defaultNoPic" :alt="noText" />
    <span>{{ noText }}</span>
  </div>
</template>

<script>
import defaultNoPic from "images/noPlan.png";

export default {
  name: "TheEmpty",
  props: {
    noPic: {
      type: String,
      default: defaultNoPic
    },
    noText: {
      type: String,
      default: "暂无任何数据"
    }
  },
  data() {
    return {
      defaultNoPic
    };
  }
};
</script>

<style lang="less" scoped>
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

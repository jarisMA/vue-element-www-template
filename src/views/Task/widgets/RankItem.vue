<template>
  <div class="item-content">
    <span class="item-index">{{ rank.no }}</span>
    <span class="item-name">{{ rank.name }}</span>
    <span class="item-award">¥{{ priceFormat(rank.price) }}</span>
  </div>
</template>

<script>
import { priceFormat } from "utils/function";

export default {
  name: "RankItem",
  props: {
    rank: {
      type: Object,
      required: true,
    },
  },
  methods: {
    priceFormat,
  },
};
</script>

<style lang="less" scoped>
.item-content {
  line-height: 30px;
  width: 173px;
  height: 30px;
  background-image: url("~images/task/item.svg");
  background-repeat: no-repeat;

  .item-index {
    display: inline-block;
    width: 30px;
    height: 30px;
    padding-left: 11px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
    overflow: hidden;
  }

  .item-name {
    display: inline-block;
    width: 70px;
    height: 30px;
    padding: 0px 3px;
    font-weight: 600;
    text-align: center;
    font-size: 12px;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-award {
    display: inline-block;
    width: 73px;
    height: 30px;
    padding-left: 14px;
    font-weight: 600;
    font-size: 12px;
    text-align: center;
    color: #000;
    text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0;
    overflow: hidden;
    
  }
}
</style>

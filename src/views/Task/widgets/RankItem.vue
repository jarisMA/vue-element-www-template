<template>
  <div class="item-content">
    <span class="item-index">4</span>
    <span class="item-name">用户名</span>
    <span class="item-award">¥9000</span>
  </div>
</template>

<script></script>

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
  }

  .item-name {
    display: inline-block;
    width: 70px;
    height: 30px;
    font-weight: 600;
    text-align: center;
    font-size: 12px;
    color: black;
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
  }
}
</style>

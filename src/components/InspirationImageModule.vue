<template>
  <div class="inspiration-item">
    <img src="~images/dwelling.png" alt="" class="item-img" />
    <div class="item-text">
      <p class="text">小型住宅设计，带分隔夹层 | 妙屋集</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      props: {
        item: {
          type: Object,
          default: function() {
            return { key: "value" };
          }
        }
      }
    };
  }
};
</script>
<style lang="less" scoped>
@import "~styles/variable.less";
.inspiration-item {
  width: 380px;
  height: 413px;
  font-size: 0;
  border: 2px solid #000;
  &:hover {
    cursor: pointer;
    border-color: @primaryColor;
    .item-text {
      border-color: @primaryColor;
    }
  }
  .item-img {
    width: 376px;
    height: 284px;
  }
  .item-text {
    display: block;
    width: 100%;
    height: 128px;
    padding: 25px;
    font-size: 22px;
    font-weight: 500;
    line-height: 37px;
    color: #333333;
    background-color: #fff;
    text-align: left;
    border-bottom: 2px solid #000;
    .text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>

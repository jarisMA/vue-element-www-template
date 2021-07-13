<template>
  <div class="rank-card">
    <div class="rank-title">TOP {{ rank.no }}</div>
    <div class="rank-avatar">
      <div class="inner-avatar">
        <the-loading-image :width="90" :height="90" :url="rank.cover_url" />
      </div>
    </div>
    <div class="rank-name">
      <p class="username">{{ rank.name }}</p>
      <p class="user-award">¥{{ priceFormat(rank.price) }}</p>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import { priceFormat } from "utils/function";

export default {
  name: "RankCard",
  components: {
    TheLoadingImage,
  },
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
.rank-card {
  width: 155px;
  height: 224px;
  background-image: url("~images/task/container.svg");
  background-repeat: no-repeat;

  .rank-title {
    position: relative;
    top: -25px;
    line-height: 29px;
    width: 98px;
    height: 26px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: white;
    text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
    mask-image: url("~images/task/subtitle.svg");
    background: linear-gradient(to right, #54995a, #753ec2);

  }

  .rank-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 126px;
    height: 126px;
    margin: -10px auto;
    mask-image: url("~images/task/avatar.svg");
    background: linear-gradient(to right, #54995a, #753ec2);

    .inner-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 126px;
      height: 126px;
      margin: -10px auto;
      background-image: url("~images/task/avatar.svg");
      background-repeat: no-repeat;
    }
  }

  .rank-name {
    width: 122px;
    height: 51px;
    margin: 25px auto;
    background-image: url("~images/task/name.svg");
    background-repeat: no-repeat;
  }

  .username {
    line-height: 23px;
    padding: 0px 5px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-award {
    line-height: 23px;
    padding-left: 36px;
    font-weight: 600;
    font-size: 18px;
    color: #000;
    text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0;
  }
}
</style>

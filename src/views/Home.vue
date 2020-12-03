<template>
  <div class="home-page" v-loading="loading">
    <div class="banner-container">
      <div class="banner-section">
        <div class="left">
          <img src="~images/banner-1_title.svg" class="title" />
          <button
            class="apply"
            @click="
              planLinkVisible(
                'https://seller.shejijia.com/decoration/user/login'
              )
            "
          ></button>
        </div>
        <img src="~images/banner-1_image.svg" class="right" />
      </div>
    </div>
    <div class="banner-2-container">
      <div class="banner-2-section">
        <button
          class="look"
          @click="
            goRoute(
              'https://mp.weixin.qq.com/s/F6MAFZZIQnuB55gXRtJLuA',
              '_blank'
            )
          "
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { goRoute } from "utils/routes";

export default {
  name: "Home",
  data() {
    return {
      loading: false
    };
  },
  methods: {
    goRoute,
    planLinkVisible(link) {
      if (
        this.$store.state.userInfo.id &&
        !this.$store.state.userInfo.vip_expired
      ) {
        return this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 7);
      }
      goRoute(link, "_blank");
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
.home-page {
  .banner-container {
    background-color: #fcfcfc;
    width: 100%;
    height: 702px;
    text-align: center;
    .banner-section {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        height: 456px;
        display: flex;
        flex-direction: column;
        .title {
          width: 376px;
          height: 181px;
          margin-bottom: 136px;
        }
        .apply {
          background: url("./../assets/images/buttom_1-bg.svg") no-repeat center;
          width: 300px;
          height: 78px;
          outline: none;
          border: none;
          &:hover {
            cursor: pointer;
            background: url("./../assets/images/buttom_1-1-bg.svg") no-repeat
              center;
          }
          &:active {
            background: url("./../assets/images/buttom_1-2-bg.svg") no-repeat
              center;
          }
        }
      }
      .right {
        width: 616px;
        height: 456px;
      }
    }
  }
  .banner-2-container {
    background: url("./../assets/images/banner-2.svg") no-repeat center;
    height: 600px;
    max-width: 1920px;
    background-size: 1920px;
    position: relative;
    margin: 0 auto;
    margin-bottom: 80px;
    text-align: center;
    .banner-2-section {
      width: 1200px;
      height: 500px;
      margin: 0 auto;
      position: relative;
      .look {
        position: absolute;
        top: 380px;
        left: 460px;
        width: 300px;
        height: 84px;
        // transform: translateX(-50%);
        background: url("./../assets/images/buttom_2-1-bg.svg") no-repeat center;
        border: none;
        outline: none;
        &:hover {
          cursor: pointer;
          background: url("./../assets/images/buttom_2-2-bg.svg") no-repeat
            center;
        }
        &:active {
          background: url("./../assets/images/buttom_2-3-bg.svg") no-repeat
            center;
        }
      }
    }
  }
}
</style>

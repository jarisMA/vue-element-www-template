<template>
  <div class="home-page" v-loading="loading">
    <div class="banner-container">
      <div class="banner-section">
        <button class="apply" @click="linkRputer(0)">创建PLAN</button>
      </div>
    </div>
    <div class="banner-2-container">
      <div class="banner-2-section">
        <button class="look" @click="linkRputer(0)">查看详情</button>
      </div>
    </div>
    <!-- 最新博文 -->
    <div class="article-container" v-if="false">
      <div class="article-section">
        <p class="article-title">最新博文</p>
        <div class="article-ima_list">
          <div class="swiper-container">
            <swiper class="swiper" ref="swiper" :options="swiperOption">
              <swiper-slide
                v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
                :key="item"
              >
                <InspirationImageModule></InspirationImageModule>
              </swiper-slide>
              <div
                class="swiper-button-prev"
                slot="button-prev"
                @click="prev"
              ></div>
              <div
                class="swiper-button-next"
                slot="button-next"
                @click="next"
              ></div>
            </swiper>
          </div>
        </div>
      </div>
      <div class="look-container">
        <button class="look-article">
          <p class="look-article-text">查看更多</p>
          <img
            src="~@/assets/images/direction_logo-4.png"
            alt=""
            class="item-img"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import InspirationImageModule from "./../components/InspirationImageModule";

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      swiperOption: {
        loop: true,
        initialSlide: 2,
        centeredSlides: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {
    linkRputer(index) {
      this.$store.commit("LINK_ROUTER", index);
    },
    prev() {
      this.$refs.swiper.$swiper.slidePrev();
    },
    next() {
      this.$refs.swiper.$swiper.slideNext();
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    InspirationImageModule
  },
  directives: {
    swiper: directive
  }
};
</script>

<style type="text/css" lang="less" scoped>
.home-page {
  background: #f4f6f3;
  .banner-container {
    background: url("./../assets/images/banner_1.svg") no-repeat center;
    background-repeat: no-repeat;
    max-width: 1920px;
    margin: 0 auto;
    height: 702px;
    text-align: center;
    .banner-section {
      position: relative;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      .apply {
        position: absolute;
        left: 0px;
        bottom: 200px;
        background: url("./../assets/images/buttom_1-bg.svg") no-repeat center;
        background-size: cover;
        width: 292px;
        height: 76px;
        outline: none;
        border: none;
        font-size: 24px;
        font-weight: 500;
        padding: 0 10px 10px 0;
        color: #396efe;
        transition: all 0;
        &:hover {
          cursor: pointer;
          background: url("./../assets/images/buttom_1-1-bg.svg") no-repeat
            center;
          color: #fff;
        }
        &:active {
          background: url("./../assets/images/buttom_1-2-bg.svg") no-repeat
            center;
          color: #fff;
        }
      }
    }
  }
  .banner-2-container {
    height: 600px;
    background: url("./../assets/images/banner_2.svg") no-repeat center;
    background-repeat: no-repeat;
    max-width: 1920px;
    position: relative;
    margin: 0 auto;
    margin-bottom: 80px;
    .look {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 145px;
      width: 248px;
      height: 69px;
      background: url("./../assets/images/buttom_2-1-bg.svg") no-repeat center;
      border: none;
      outline: none;
      font-size: 24px;
      font-weight: 500;
      color: #000000;
      padding: 0 8px 7px 0;
      transition: all 0s;
      &:hover {
        cursor: pointer;
        background: url("./../assets/images/buttom_2-2-bg.svg") no-repeat center;
        color: #fff;
      }
      &:active {
        background: url("./../assets/images/buttom_2-3-bg.svg") no-repeat center;
        color: #fff;
      }
    }
  }
  .article-container {
    text-align: center;
    .article-section {
      background-color: #fff;
      text-align: center;
      height: 348px;
      position: relative;
      .article-title {
        display: inline-block;
        margin: 0 auto;
        padding: 100px 0 106px 0;
        font-size: 28px;
        font-weight: 500;
        line-height: 28px;
        color: #000000;
        position: relative;
        &:after {
          content: "";
          display: inline-block;
          height: 2px;
          width: 224px;
          background-color: #000;
          position: absolute;
          top: 50%;
          right: -276px;
        }
        &:before {
          content: "";
          display: inline-block;
          height: 2px;
          width: 224px;
          background-color: #000;
          position: absolute;
          top: 50%;
          left: -276px;
        }
      }
      .article-ima_list {
        position: absolute;
        bottom: -299px;
        left: 0;
        height: 413px;
        width: 100%;
        .swiper-container {
          width: 100%;
          height: 100%;
          --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
          --swiper-navigation-color: #fff; /* 单独设置按钮颜色 */
          --swiper-navigation-size: 30px; /* 设置按钮大小 */
          .swiper-button-prev,
          .swiper-button-next {
            height: 100%;
            width: 160px;
            background: rgba(191, 191, 191, 0.61);
            top: 0;
            bottom: 0;
            margin-top: 0;
          }
          .swiper-button-prev {
            &:after {
              content: "";
              display: inline-block;
              background: url("./../assets/images/previous_logo.png") no-repeat
                center;
              background-size: cover;
              width: 100px;
              height: 100px;
            }
            left: 0;
          }
          .swiper-button-next {
            &:after {
              content: "";
              display: inline-block;
              background: url("./../assets/images/next_logo.png") no-repeat
                center;
              background-size: cover;
              width: 100px;
              height: 100px;
            }
            right: 0;
          }
          .swiper {
            display: flex;
            .swiper-slide {
              height: 100%;
              width: 380px !important;
            }
          }
        }
      }
    }
    .look-container {
      width: 1200px;
      margin: 0 auto;
      .look-article {
        width: 134px;
        height: 46px;
        padding: 0 4px 4px 0;
        outline: none;
        border: none;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        color: #ffffff;
        background: url("./../assets/images/buttom_6-1-bg.svg") no-repeat center;
        background-size: contain;
        border: none;
        outline: none;
        margin: 393px 0 135px 0;
        &:hover {
          transition: all 0s;
          cursor: pointer;
        }
        .look-article-text {
          display: inline-block;
        }
        .item-img {
          width: 16px;
          height: 16px;
          display: inline-block;
          vertical-align: bottom;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>

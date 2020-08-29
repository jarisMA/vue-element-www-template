<template>
  <div class="home-page" v-loading="loading">
    <div class="banner-container">
      <div class="banner-section">
        <button class="apply">申请免费使用</button>
      </div>
    </div>
    <!-- 最新博文 -->
    <div class="article-container">
      <div class="article-section">
        <p class="article-title">最新博文</p>
        <div class="article-ima_list">
          <div class="swiper-container">
            <swiper class="swiper" ref="swiper" :options="swiperOption">
              <swiper-slide
                v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
                :key="item"
              >
                <div class="article-item">
                  <img
                    src="~@/assets/images/lgttp_1@2x.png"
                    alt=""
                    class="item-img"
                  />
                  <div class="item-text">
                    <p class="text">
                      小型住宅设计，带分隔夹层 | 妙屋集 {{ item }}
                    </p>
                  </div>
                </div>
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
      <button class="look-article">
        <p class="look-article-text">查看更多</p>
        <img
          src="~@/assets/images/zxbw-ckgd-gd@2x.png"
          alt=""
          class="item-img"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
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
  created() {},
  methods: {
    prev() {
      this.$refs.swiper.$swiper.slidePrev();
    },
    next() {
      this.$refs.swiper.$swiper.slideNext();
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
};
</script>

<style type="text/css" lang="less" scoped>
.home-page {
  height: 900px;
  background: #f4f6f3;
  .banner-container {
    background: url("./../assets/images/Lark20200828-191144.png") no-repeat
      center;
    background-size: cover;
    width: 100%;
    height: 900px;
    text-align: center;
    .banner-section {
      position: relative;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      .apply {
        position: absolute;
        left: 20px;
        bottom: 200px;
        background-color: #14af64;
        width: 280px;
        height: 64px;
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
        outline: none;
        border: none;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
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
        font-family: Noto Sans S Chinese;
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
              background: url("./../assets/images/zxbw-gd-z@2x.png") no-repeat
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
              background: url("./../assets/images/zxbw-gd-y@2x.png") no-repeat
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
            .article-item {
              width: 380px;
              height: 413px;
              .item-img {
                width: 380px;
                height: 284px;
              }
              .item-text {
                display: block;
                width: 100%;
                height: 129px;
                padding: 25px;
                font-size: 22px;
                font-family: Noto Sans S Chinese;
                font-weight: 500;
                line-height: 37px;
                color: #333333;
                background-color: #fff;
                text-align: left;
                .text {
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
              }
            }
          }
        }
      }
    }
    .look-article {
      width: 130px;
      height: 42px;
      outline: none;
      border: none;
      font-size: 16px;
      font-family: Noto Sans S Chinese;
      font-weight: 500;
      line-height: 16px;
      color: #ffffff;
      background-color: #14af64;
      margin: 393px 0 135px 0;
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
</style>

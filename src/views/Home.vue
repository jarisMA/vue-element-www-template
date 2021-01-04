<template>
  <div class="home-page" v-loading="loading">
    <div class="img-wrapper">
      <div class="main-img-wrapper">
        <img class="hi-img" src="~images/hi.png" />
        <img class="main-img" src="~images/home/home.svg" />
        <img class="douxi-gif" src="~images/douxi.gif" />
      </div>
    </div>
    <div class="enter-btn">
      <img src="~images/home/enter.svg" @click="enterClass" />
    </div>
    <div class="story-wrapper">
      <img class="story-img" src="~images/home/story.svg" />
      <div class="carousel-wrapper">
        <swiper
          ref="mySwiper"
          :options="swiperOptions"
          @mouseover.native="stopAutoplay"
        >
          <swiper-slide v-for="(item, key) of stories" :key="key">
            <story-card :story="item" />
          </swiper-slide>
          <!-- <div class="swiper-button-prev"
               slot="button-prev"></div>
          <div class="swiper-button-next"
               slot="button-next"></div> -->
        </swiper>
        <div class="carousel-button-prev" @click="prev"></div>
        <div class="carousel-button-next" @click="next"></div>
      </div>
    </div>
    <div class="works-wrapper">
      <div class="work-carousel-wrapper">
        <el-carousel
          class="work-carousel"
          arrow="never"
          height="688px"
          loop
          trigger="click"
          :autoplay="false"
          :interval="5000"
        >
          <el-carousel-item v-for="(item, key) in works" :key="key">
            <work-card :work="item" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { goTerm } from "utils/routes";
import { mapState } from "vuex";
import termService from "service/term";
import douxiGif from "images/douxi2.gif";
import StoryCard from "components/StoryCard";
import WorkCard from "components/WorkCard";
import { stories, works } from "utils/story";

export default {
  name: "Home",
  components: {
    StoryCard,
    WorkCard
  },
  data() {
    return {
      loading: false,
      swiperOptions: {
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        loopedSlides: 0,
        // autoplay: true,
        speed: 5000,
        autoplayDisableOnInteraction: true,
        nextButton: ".carousel-button-next",
        prevButton: ".carousel-button-prev"
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev'
      },
      stories,
      works
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    enterClass() {
      if (this.userInfo) {
        termService.checkTerm().then(res => {
          if (res.status === 1) {
            goTerm(process.env.VUE_APP_TERM_ID);
          } else {
            this.$msgBox.showMsgBox({
              img: douxiGif,
              theme: "img_s_174_176",
              content:
                "<p style='color:#14AF64FF;font-size: 36px;font-weight:500px;line-height:36px;'>抱歉，你好像并没有报名噢…</p>",
              confirmBtnText: "",
              confirmBtnIcon: "correct",
              showCancelBtn: false,
              showCloseBtn: false
            });
          }
        });
      } else {
        this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
      }
    },
    prev() {
      this.stopAutoplay();
      this.$refs.mySwiper.$swiper.slidePrev(null, 1000);
    },
    next() {
      this.stopAutoplay();
      this.$refs.mySwiper.$swiper.slideNext(null, 1000);
    },
    stopAutoplay() {
      this.$refs.mySwiper.$swiper.stopAutoplay();
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
@import "~styles/variable";

.home-page {
  .img-wrapper {
    position: relative;
    width: 100%;
    &::after {
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      width: 100%;
      height: 233px;
      background: #d8efe4ff;
      border-bottom: 6px solid #000;
    }
  }
  .main-img-wrapper {
    position: relative;
    margin: 83px auto 61px;
    width: 772px;
    height: 594px;
    background: #fafafa;
    z-index: 1;
    &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      width: 227px;
      height: 233px;
      background: #d8efe4ff;
      border-bottom: 6px solid #000;
      border-right: 6px solid #000;
      border-bottom-right-radius: 6px;
    }
    &::after {
      position: absolute;
      right: -1px;
      bottom: 0;
      content: "";
      width: 227px;
      height: 233px;
      background: #d8efe4ff;
      border-bottom: 6px solid #000;
      border-left: 6px solid #000;
      border-bottom-left-radius: 6px;
    }
    .hi-img {
      position: absolute;
      top: 188px;
      left: 220px;
      width: 167px;
      height: 124px;
    }
    .main-img {
      width: 100%;
      height: 100%;
    }
    .douxi-gif {
      position: absolute;
      bottom: 65px;
      right: 229px;
      height: 300px;
    }
  }
  .enter-btn {
    margin: auto;
    width: 308px;
    height: 98px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .story-wrapper {
    position: relative;
    margin-top: 210px;
    width: 100%;
    height: 604px;
    background: url("~images/home_bg.png") repeat;
    .story-img {
      position: absolute;
      top: -61px;
      left: 50%;
      width: 538px;
      height: 120px;
      transform: translateX(-50%);
    }
    .carousel-wrapper {
      position: relative;
      width: 1090px;
      margin: auto;
      padding-top: 100px;
      .carousel-button-prev,
      .carousel-button-next {
        position: absolute;
        top: 224px;
        width: 46px;
        height: 70px;
        background-size: cover;
        cursor: pointer;
      }
      .carousel-button-prev {
        left: -60px;
        background: url("~images/L.png") no-repeat;
      }
      .carousel-button-next {
        right: -60px;
        background: url("~images/R.png") no-repeat;
      }
      /deep/ .swiper-wrapper {
        // transition-timing-function: cubic-bezier(
        //   0.64,
        //   0.24,
        //   0.3,
        //   1.01
        // ) !important;
        transition-timing-function: ease-in-out !important;
        // transition-delay: 3000ms;
      }
    }
  }
  .works-wrapper {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 754px;
    background: #f5f5f5ff;
    overflow: visible;
    .work-carousel-wrapper {
      margin: -76px auto 0;
      width: 1200px;
      height: 688px;
      background: url("~images/home/work_bg.svg") no-repeat;
      background-size: cover;
    }
    /deep/ .work-carousel {
      margin: auto;
      width: 1110px;
      height: 688px;
      .el-carousel__indicators--horizontal {
        transform: unset;
        left: 5px;
        bottom: 26px;
        .el-carousel__indicator {
          padding: 0;
          .el-carousel__button {
            padding: 0 !important;
            margin: 0 10px;
            width: 14px !important;
            height: 14px !important;
            background: #d8d8d8ff;
            border: 1px solid #979797;
            outline: unset !important;
            border-radius: 50%;
            opacity: 1 !important;
          }
          &.is-active {
            .el-carousel__button {
              background-color: @primaryColor !important;
              border-color: @primaryColor !important;
            }
          }
        }
      }
    }
  }
}
</style>

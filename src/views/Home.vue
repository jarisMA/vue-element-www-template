<template>
  <div class="home-page" v-loading="loading">
    <div class="img-wrapper">
      <div class="main-img-wrapper">
        <img class="main-img" src="~images/home.png" />
        <img class="douxi-gif" src="~images/douxi.gif" />
      </div>
    </div>
    <div class="enter-btn">
      <img src="~images/enter.png" @click="enterClass" />
    </div>
    <div class="story-wrapper">
      <img class="story-img" src="~images/story.png" />
      <div class="carousel-wrapper">
        <carousel
          :paginationEnabled="false"
          :perPage="5"
          navigationEnabled
          navigationPrevLabel='<div class="slide-icon L"></div>'
          navigationNextLabel='<div class="slide-icon R"></div>'
        >
          <slide v-for="(item, key) of stories" :key="key">
            <story-card :story="item" />
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { goTerm } from "utils/routes";
import { mapState } from "vuex";
import termService from "service/term";
import douxiGif from "images/douxi2.gif";
import { Carousel, Slide } from "vue-carousel";
import StoryCard from "components/StoryCard";
import stories from "utils/story";

export default {
  name: "Home",
  components: {
    Carousel,
    Slide,
    StoryCard
  },
  data() {
    return {
      loading: false,
      stories
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
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
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
      width: 1070px;
      margin: auto;
      padding-top: 120px;
      /deep/ .VueCarousel-navigation {
        .VueCarousel-navigation-prev {
          margin: 0 !important;
          padding: 0 !important;
          transform: translate(calc(-100% - 18px), -50%) !important;
        }
        .VueCarousel-navigation-next {
          margin: 0 !important;
          padding: 0 !important;
          transform: translate(calc(100% + 18px), -50%) !important;
        }
        .slide-icon {
          width: 46px;
          height: 70px;
          background-size: cover;
          background-repeat: no-repeat;
          &.L {
            background-image: url("~images/L.png");
          }
          &.R {
            background-image: url("~images/R.png");
          }
        }
      }
    }
  }
}
</style>

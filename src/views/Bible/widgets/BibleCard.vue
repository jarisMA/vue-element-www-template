<template>
  <div
    :class="['bible-item-card', isShowDetail(bible) ? 'info' : '']"
    @click="showDetail(bible)"
  >
    <div class="bible-card-top">
      <swiper ref="mySwiper" v-if="images.length > 1" :options="swiperOptions">
        <swiper-slide v-for="(image, key) of images" :key="key">
          <the-loading-image
            :width="260"
            :height="260"
            :key="key"
            :url="image"
          />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="bible-cover-prev" @click.stop slot="button-prev"></div>
        <div class="bible-cover-next" @click.stop slot="button-next"></div>
      </swiper>
      <the-loading-image v-else :width="260" :height="260" :url="images[0]" />
    </div>
    <div class="bible-card-bottom">
      {{ bible.name }}
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";

export default {
  name: "BibleCard",
  components: {
    TheLoadingImage
  },
  props: {
    bible: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      images: this.getImages(this.bible.cover_url),
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        loopedSlides: 0,
        pagination: ".swiper-pagination",
        nextButton: ".bible-cover-next",
        prevButton: ".bible-cover-prev"
      }
    };
  },
  watch: {
    bible: {
      handler(val) {
        this.images = this.getImages(val.cover_url);
      },
      deep: true
    }
  },
  computed: {
    isShowDetail() {
      return data => {
        data.content =
          data.content instanceof Array
            ? data.content
            : (data.content && JSON.parse(data.content)) || [];
        if (data.content.length < 1 || !data.content[0].label) {
          return false;
        }
        return true;
      };
    }
  },
  methods: {
    getImages(val) {
      return (val && val.split(",")) || [];
    },
    showDetail(data) {
      if (this.isShowDetail(data)) {
        this.$emit("showDetail");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bible-item-card {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 330px;
  background: #fafafa;
  &.info {
    position: relative;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 11px 0px rgba(183, 183, 183, 0.5);
    }
    &::after {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 20px;
      height: 20px;
      background-image: url("~images/bible/warn.svg");
      background-size: cover;
      background-repeat: no-repeat;
      content: "";
      z-index: 1;
    }
  }
  .bible-card-top {
    height: 280px;
    padding: 10px;
    &:hover {
      .bible-cover-prev,
      .bible-cover-next {
        display: block;
      }
    }
    /deep/ .swiper-pagination.swiper-pagination-bullets {
      bottom: 0;
      display: flex;
      .swiper-pagination-bullet {
        flex: 1;
        margin: 0;
        height: 2px;
        border-radius: unset !important;
        background: #efefef;
        opacity: unset;
        border: unset;
        &.swiper-pagination-bullet-active {
          background: #333333;
        }
      }
    }
    .bible-cover-prev,
    .bible-cover-next {
      position: absolute;
      display: none;
      top: 50%;
      width: 24px;
      height: 24px;
      transform: translateY(-50%);
      background-color: #979797;
      mask-size: cover;
      mask-repeat: no-repeat;
      z-index: 1;
    }
    .bible-cover-prev {
      left: 0;
      mask-image: url("~images/bible/chevron_left.svg");
    }
    .bible-cover-next {
      right: 0;
      mask-image: url("~images/bible/chevron_right.svg");
    }
  }
  .bible-card-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    text-shadow: 0px 0px 11px rgba(183, 183, 183, 0.5);
    border-top: 1px solid #b7b7b780;
  }
}
</style>

<template>
  <div :class="['bible-item-card', theme]">
    <div
      class="info-wrapper"
      v-if="isShowDetail(bible)"
      @click.stop="showDetail(bible)"
    >
      <div class="info"></div>
    </div>
    <div class="bible-card-top">
      <div class="swiper-wrapper" v-if="images.length > 1">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(image, key) of images" :key="key">
            <the-loading-image
              :width="imageSize"
              :height="imageSize"
              :key="key"
              :url="image"
              @click.stop.native="showPreviewImage(image)"
            />
          </swiper-slide>
          <div
            :class="['bible-cover-prev', 'bible-prev-' + bible.id]"
            @click.stop
            slot="button-prev"
          >
            <div class="btn-icon"></div>
          </div>
          <div
            :class="['bible-cover-next', 'bible-next-' + bible.id]"
            @click.stop
            slot="button-next"
          >
            <div class="btn-icon"></div>
          </div>
        </swiper>
        <div
          :class="['swiper-pagination', 'bible-pagination' + bible.id]"
          slot="pagination"
        ></div>
      </div>

      <the-loading-image
        v-else
        :width="imageSize"
        :height="imageSize"
        :url="images[0]"
        @click.stop.native="showPreviewImage(images[0])"
      />
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
    },
    theme: {
      type: String,
      default: "three"
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
        pagination: ".bible-pagination" + this.bible.id,
        nextButton: ".bible-next-" + this.bible.id,
        prevButton: ".bible-prev-" + this.bible.id,
        observe: true
      }
    };
  },
  watch: {
    bible: {
      handler(val) {
        this.images = this.getImages(val.cover_url);
      },
      deep: true
    },
    theme() {
      const swiper = this.$refs["mySwiper"];
      if (swiper) {
        this.$nextTick(() => {
          swiper.$swiper.init();
        });
      }
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
    },
    imageSize() {
      switch (this.theme) {
        case "two":
          return 410;
        default:
          return 260;
      }
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
    },
    showPreviewImage(url) {
      this.$emit("previewImage", url);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.bible-item-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 330px;
  background: #fafafa;
  &:hover {
    .bible-cover-prev,
    .bible-cover-next {
      display: block !important;
    }
    /deep/ .swiper-pagination.swiper-pagination-bullets {
      display: flex !important;
    }
  }
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
  .info-wrapper {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    .info {
      width: 20px;
      height: 20px;
      background-image: url("~images/bible/warn.svg");
      background-size: cover;
      background-repeat: no-repeat;
      cursor: pointer;
    }
  }
  .bible-card-top {
    height: 280px;
    padding: 10px;
    .swiper-wrapper {
      position: relative;
      width: 100%;
    }
    .cover-img {
      cursor: pointer;
    }
    /deep/ .swiper-pagination.swiper-pagination-bullets {
      bottom: -10px;
      left: -10px;
      display: flex;
      width: calc(100% + 20px);
      .swiper-pagination-bullet {
        flex: 1;
        margin: 0;
        height: 2px;
        border-radius: unset !important;
        background: #b7b7b780;
        border: unset;
        opacity: unset !important;
        &.swiper-pagination-bullet-active {
          opacity: 1;
          background: #333;
        }
      }
    }
    .bible-cover-prev,
    .bible-cover-next {
      position: absolute;
      display: none;
      top: 50%;
      width: 30px;
      height: 30px;
      transform: translateY(-50%);
      z-index: 1;
      cursor: auto;
      .btn-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 24px;
        height: 24px;
        transform: translate(-50%, -50%);
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 50%;
        cursor: pointer;
      }
    }
    .bible-cover-prev {
      left: 0;
      .btn-icon {
        background-image: url("~images/bible/chevron_left.svg");
        &:hover {
          background-image: url("~images/bible/chevron_left_hover.svg");
        }
      }
    }
    .bible-cover-next {
      right: 0;
      .btn-icon {
        background-image: url("~images/bible/chevron_right.svg");
        &:hover {
          background-image: url("~images/bible/chevron_right_hover.svg");
        }
      }
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
.bible-item-card.two {
  width: 430px;
  height: 480px;
  .bible-card-top {
    height: 430px;
  }
}
</style>

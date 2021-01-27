<template>
  <div
    :class="['bible-item-card', isShowDetail(bible) ? 'info' : '']"
    @click="showDetail(bible)"
  >
    <div class="bible-card-top">
      <div class="swiper-wrapper" v-if="images.length > 1">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(image, key) of images" :key="key">
            <the-loading-image
              :width="260"
              :height="260"
              :key="key"
              :url="image"
            />
          </swiper-slide>
          <div
            :class="['bible-cover-prev', 'bible-prev-' + bible.id]"
            @click.stop
            slot="button-prev"
          ></div>
          <div
            :class="['bible-cover-next', 'bible-next-' + bible.id]"
            @click.stop
            slot="button-next"
          ></div>
        </swiper>
        <div
          :class="['swiper-pagination', 'bible-pagination' + bible.id]"
          slot="pagination"
        ></div>
      </div>

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
        pagination: ".bible-pagination" + this.bible.id,
        nextButton: ".bible-next-" + this.bible.id,
        prevButton: ".bible-prev-" + this.bible.id
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
@import "~styles/variable";
.bible-item-card {
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
  .bible-card-top {
    height: 280px;
    padding: 10px;
    .swiper-wrapper {
      position: relative;
      width: 100%;
    }
    /deep/ .swiper-pagination.swiper-pagination-bullets {
      bottom: -10px;
      left: -10px;
      display: none;
      width: calc(100% + 20px);
      .swiper-pagination-bullet {
        flex: 1;
        margin: 0;
        height: 2px;
        border-radius: unset !important;
        background: #b7b7b780;
        border: unset;
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
      width: 24px;
      height: 24px;
      transform: translateY(-50%);
      z-index: 1;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 50%;
      cursor: pointer;
    }
    .bible-cover-prev {
      left: 0;
      background-image: url("~images/bible/chevron_left.svg");
      &:hover {
        background-image: url("~images/bible/chevron_left_active.svg");
      }
    }
    .bible-cover-next {
      right: 0;
      background-image: url("~images/bible/chevron_right.svg");
      &:hover {
        background-image: url("~images/bible/chevron_right_active.svg");
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
</style>

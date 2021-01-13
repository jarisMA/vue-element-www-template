<template>
  <div class="bible-nav-wrapper">
    <div class="bible-nav-list">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item, key) of navs" :key="key">
          <div
            :class="[
              'bible-nav-item',

              'len-' + (navs.length >= 6 ? 6 : navs.length >= 5 ? 5 : 4),
              activeNav.id === item.id ? 'active' : ''
            ]"
            @click="toggleNav(item)"
          >
            <label
              class="bible-nav-item-label ellipsis"
              :style="{ color: activeNav.id === item.id ? color : '' }"
              >{{ item.name }}</label
            >
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <template v-if="navs.length > 6">
      <img class="left-arrow" src="~images/bible/left.svg" slot="button-prev" />
      <img
        class="right-arrow"
        src="~images/bible/right.svg"
        slot="button-next"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "BibleDetailNav",
  props: {
    activeNav: {
      type: Object,
      required: true
    },
    navs: {
      type: Array,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  watch: {
    navs(val) {
      if (val.length >= 6) {
        this.swiperOptions.slidesPerView = 6;
      } else if (val.length >= 5) {
        this.swiperOptions.slidesPerView = 5;
      } else {
        this.swiperOptions.slidesPerView = 4;
      }
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 0,
        speed: 200,
        nextButton: ".right-arrow",
        prevButton: ".left-arrow"
      }
    };
  },
  created() {
    if (this.navs.length >= 6) {
      this.swiperOptions.slidesPerView = 6;
    } else if (this.navs.length >= 5) {
      this.swiperOptions.slidesPerView = 5;
    } else {
      this.swiperOptions.slidesPerView = 4;
    }
  },
  methods: {
    toggleNav(nav) {
      if (this.activeNav.id !== nav.id) {
        this.$emit("toggleNav", nav);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bible-nav-wrapper {
  position: relative;
  flex: 1;
  margin-top: 36px;
  width: 906px;
  height: 40px;
  // background: red;
  .bible-nav-list {
    width: 816px;
    height: 40px;
    margin: auto;
  }
  /deep/ .swiper-slide {
    cursor: pointer;
  }
  .bible-nav-item {
    display: inline-block;
    position: relative;
    width: 204px;
    height: 0px;
    border-width: 0px 30px 40px 0px;
    border-style: none solid solid;
    border-color: transparent transparent rgba(255, 255, 255, 0.3);
    box-shadow: -2px -2px 3px 0px rgba(111, 111, 111, 0.5);
    box-sizing: border-box;
    cursor: pointer;
    &.active {
      border-color: transparent transparent #fff;
    }
    &.len-5 {
      width: 163.2px;
      .bible-nav-item-label {
        width: 133.2px;
      }
    }
    &.len-6 {
      width: 136px;
      .bible-nav-item-label {
        width: 106px;
      }
    }
    .bible-nav-item-label {
      position: absolute;
      left: 0;
      top: 0;
      width: 174px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
  }
  .left-arrow,
  .right-arrow {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    object-fit: cover;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .left-arrow {
    left: 17px;
  }
  .right-arrow {
    right: 17px;
  }
}
</style>

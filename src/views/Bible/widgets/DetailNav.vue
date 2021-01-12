<template>
  <div class="bible-nav-wrapper">
    <div class="bible-nav-list">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item, key) of navs" :key="key">
          <div
            :class="[
              'bible-nav-item',
              'ellipsis',
              'len-' + (navs.length >= 6 ? 6 : navs.length >= 5 ? 5 : 4),
              activeNav.id === item.id ? 'active' : ''
            ]"
            :style="{ color: activeNav.id === item.id ? color : '' }"
            @click="toggleNav(item)"
          >
            {{ item.name }}
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
    overflow: hidden;
  }
  .bible-nav-inner {
    width: 100%;
    display: flex;
    height: 40px;
  }
  .bible-nav-item {
    display: inline-block;
    position: relative;
    width: 204px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 8px 0px rgba(111, 111, 111, 0.5);
    cursor: pointer;
    &.active {
      background: #fff;
    }
    &.len-5 {
      width: 163.2px;
    }
    &.len-6 {
      width: 136px;
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

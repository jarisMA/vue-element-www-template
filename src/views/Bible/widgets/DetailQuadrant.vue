<template>
  <div class="bible-quadrant">
    <div class="bible-quadrant-header">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide
          v-for="(menu, index) of menus"
          :key="menu.id"
          class="bible-swiper-slide"
        >
          <div
            @click="setActiveSubMenu(index)"
            :class="[
              'bible-submenu-item',
              activeSubMenu && activeSubMenu.id === menu.id ? 'active' : ''
            ]"
          >
            {{ menu.name }}
          </div>
        </swiper-slide>
      </swiper>
      <img
        class="left-arrow"
        src="~images/bible/sub-right.svg"
        slot="button-prev"
      />
      <img
        class="right-arrow"
        src="~images/bible/sub-right.svg"
        slot="button-next"
      />
    </div>
    <div class="bible-quadrant-container">
      <bible-quadrant v-if="activeSubMenu" :content="activeSubMenu.quadrant" />
    </div>
  </div>
</template>

<script>
import BibleQuadrant from "./Quadrant";
export default {
  name: "BibleDetailQuadrant",
  components: { BibleQuadrant },
  props: {
    menus: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeSubMenu: null,
      swiperOptions: {
        slidesPerView: "auto",
        spaceBetween: 0,
        speed: 200,
        nextButton: ".right-arrow",
        prevButton: ".left-arrow"
      }
    };
  },
  watch: {
    menus() {
      this.setActiveSubMenu();
    }
  },
  created() {
    this.setActiveSubMenu();
  },
  methods: {
    setActiveSubMenu(index = 0) {
      if (this.menus.length > index) {
        this.activeSubMenu = this.menus[index];
      } else {
        this.activeSubMenu = null;
      }
    },
    init() {
      this.$nextTick(() => {
        document.getElementsByClassName("swiper-wrapper")[1].style.transform =
          "translate3d(0px, 0px, 0px)";
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.bible-quadrant-header {
  position: fixed;
  top: 136px;
  height: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 80px);
  height: 52px;
  padding: 30px 20px 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  overflow: visible;
  z-index: 5;

  /deep/ .swiper-wrapper {
    width: auto !important;
    margin: 0 auto;
  }

  .bible-swiper-slide {
    display: inline;
    width: auto !important;
    padding-right: 40px;
  }

  .bible-submenu-item {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    color: #81948b;
    cursor: pointer;
    overflow: visible;

    &.active {
      font-weight: 600;
      color: @primaryColor;
      border-bottom: 2px solid @primaryColor;
    }
    & + .bible-submenu-item {
      margin-left: 40px;
    }
  }
  .left-arrow,
  .right-arrow {
    position: absolute;
    bottom: 0;
    width: 20px;
    height: 20px;
    object-fit: cover;
    cursor: pointer;
    z-index: 5;

    &.swiper-button-disabled {
      display: none;
      cursor: auto;
    }
  }
  .left-arrow {
    left: -20px;
    transform: rotate(180deg);
  }
  .right-arrow {
    right: -20px;
  }
}
.bible-quadrant-container {
  margin: auto;
  padding: 0 0 30px;
}
</style>

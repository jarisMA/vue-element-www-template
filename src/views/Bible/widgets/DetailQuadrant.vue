<template>
  <div class="bible-quadrant-container">
    <ul class="bible-submenu-list">
      <li
        :class="[
          'bible-submenu-item',
          activeSubMenu && activeSubMenu.id === menu.id ? 'active' : ''
        ]"
        v-for="(menu, index) of menus"
        :key="menu.id"
        @click="setActiveSubMenu(index)"
      >
        {{ menu.name }}
      </li>
    </ul>
    <bible-quadrant v-if="activeSubMenu" :content="activeSubMenu.quadrant" />
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
      activeSubMenu: null
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.bible-quadrant-container {
  margin: auto;
  padding: 0 0 30px;
  .bible-submenu-list {
    position: fixed;
    top: 135px;
    height: 70px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    z-index: 5;
    .bible-submenu-item {
      line-height: 40px;
      font-size: 14px;
      color: #81948b;
      cursor: pointer;
      &.active {
        font-weight: 600;
        color: @primaryColor;
        border-bottom: 2px solid @primaryColor;
      }
      & + .bible-submenu-item {
        margin-left: 40px;
      }
    }
  }
}
</style>

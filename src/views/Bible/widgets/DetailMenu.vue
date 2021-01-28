<template>
  <div class="bible-menu-wrapper" v-if="depth >= 2">
    <div class="scroll-inner">
      <ul class="bible-menu" v-for="(menu, key) of menus" :key="menu.id">
        <div class="bible-menu-header" @click="foldChange(key)">
          <label
            :class="[
              'menu-header-icon',
              'bible-menu-label',
              isActiveMenu(key) ? 'active' : ''
            ]"
            :style="{ color: isActiveMenu(key) ? color : '' }"
            >{{ menu.name }}</label
          >
          <div
            class="menu-header-border"
            :style="{ backgroundColor: isActiveMenu(key) ? color : '' }"
          ></div>
          <img
            v-if="getDepth(menu.children, 1) > 2"
            :class="[menu.isFold ? 'unfold-icon' : 'fold-icon']"
            src="~images/bible/fold.svg"
          />
        </div>
        <div
          v-if="getDepth(menu.children, 1) === 2 && menu.cover_url"
          :class="['bible-menu-cover', isActiveMenu(key) ? 'active' : '']"
          :style="{
            borderColor: isActiveMenu(key) ? color : ''
          }"
        >
          <the-loading-image
            class="loading-img"
            :width="260"
            :height="260"
            :url="(menu.cover_url.split(',') || [])[0]"
          />
        </div>
        <div
          v-else-if="getDepth(menu.children, 1) > 2"
          :class="['bible-submenu-wrapper', menu.isFold ? 'fold' : 'unfold']"
          :style="{
            maxHeight: menu.isFold ? '0px' : maxHeight(menu.children)
          }"
        >
          <ul class="bible-submenu" v-if="getDepth(menu.children, 1) > 2">
            <li
              v-for="item of menu.children"
              :key="item.id"
              :class="item.id === activeSubMenu.id ? 'active' : ''"
              @click="toggleMenu(item)"
            >
              <div
                class="bible-submenu-name"
                :style="{
                  backgroundColor: item.id === activeSubMenu.id ? color : '',
                  color:
                    item.id !== activeSubMenu.id && item.id === hoverId
                      ? color
                      : ''
                }"
                @mouseenter="hoverId = item.id"
                @mouseleave="hoverId = null"
              >
                {{ item.name }}
              </div>
              <template v-if="item.cover_url">
                <div
                  :class="[
                    'bible-submenu-cover',
                    item.id === activeSubMenu.id ? 'active' : ''
                  ]"
                  :style="{
                    borderColor: item.id === activeSubMenu.id ? color : ''
                  }"
                >
                  <the-loading-image
                    :width="260"
                    :height="260"
                    :url="(item.cover_url.split(',') || [])[0]"
                  />
                </div>
              </template>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import { detailMixin } from "../mixin";

export default {
  name: "BibleDetailMenu",
  mixins: [detailMixin],
  components: {
    TheLoadingImage
  },
  props: {
    menus: {
      type: Array,
      required: true
    },
    activeSubMenu: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      default: "#14af64"
    },
    depth: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hoverId: null
    };
  },
  computed: {
    isActiveMenu() {
      return key => {
        let flag = false;
        if (this.menus[key].id === this.activeSubMenu.id) {
          return true;
        }
        ((this.menus[key] || {}).children || []).some(item => {
          if (item.id === this.activeSubMenu.id) {
            flag = true;
            return true;
          }
        });
        return flag;
      };
    },
    maxHeight() {
      return arr => {
        let height = 0;
        if (arr && arr.length > 0) {
          arr.map(item => {
            if (item.cover_url) {
              height += 280;
            }
            height += 40;
          });
        }
        return height + "px";
      };
    }
  },
  methods: {
    foldChange(key) {
      if (this.getDepth(this.menus[key].children, 1) > 2) {
        this.$emit("foldChange", key);
      } else {
        this.toggleMenu(this.menus[key]);
      }
    },
    toggleMenu(item) {
      this.$emit("toggleMenu", item);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@duration: 0.2s;
.bible-menu-wrapper {
  position: fixed;
  top: 160px;
  left: calc((100vw - 1200px) / 2 - 8px);
  width: 280px;
  height: calc(100vh - 160px - 60px);
  overflow: hidden;
  .scroll-inner {
    width: 295px;
    height: calc(100vh - 160px - 60px);
    overflow-y: scroll;
  }
  .bible-menu {
    position: relative;
    width: 100%;
    user-select: none;
    background: #fff;
    .bible-menu-header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      border-bottom: 1px solid #efefefff;
      cursor: pointer;
      .menu-header-icon {
        transition: all 0.2s;
      }
      .menu-header-border {
        position: absolute;
        top: 46px;
        left: 0;
        width: 50px;
        height: 4px;
        background: #efefef;
      }
      .unfold-icon {
        transform: rotate(180deg);
      }
    }
    .bible-menu-cover {
      height: 0;
      overflow: hidden;
      transition: all @duration;
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      &.active {
        height: 280px;
      }
      .loading-img {
        margin: 10px;
      }
    }
    .bible-menu-label {
      position: relative;
      display: inline-block;
      line-height: 50px;
      font-size: 14px;
      font-weight: 600;
      color: #9ba2a5;
      &.active {
        color: @primaryColor;
        &::after {
          background: @primaryColor;
        }
      }
    }
    .bible-submenu-wrapper {
      margin-top: 10px;
      transition: all 0.2s;
      overflow: hidden;
      &.fold {
        overflow: hidden;
      }
      .bible-submenu {
        li {
          cursor: pointer;
          .bible-submenu-name {
            padding: 0 50px;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            color: #9ba2a5;
            transition: all 0.2s;
          }
          .bible-submenu-cover {
            height: 0;
            overflow: hidden;
            transition: height @duration;
            &.active {
              padding: 10px;
              height: 280px;
            }
          }
          &:hover {
            .bible-submenu-name {
              font-size: 16px;
              // color: @primaryColor;
            }
          }
          &.active {
            .bible-submenu-name {
              font-size: 16px;
              color: #ffffff;
              background: @primaryColor;
            }
            .bible-submenu-cover {
              border: 1px solid @primaryColor;
              border-top: unset;
            }
          }
        }
      }
    }
  }
}
</style>

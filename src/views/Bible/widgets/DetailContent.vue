<template>
  <div class="detail-content">
    <detail-list
      v-if="depth < 2"
      :list="menus"
      :theme="theme"
      @showDetail="showDetail"
    />
    <ul v-else class="bible-list" v-for="menu of menus" :key="menu.id">
      <label
        :class="[
          'bible-list-name',
          activeSubMenu.id === menu.id ? 'active' : ''
        ]"
        :id="'menu-' + menu.id"
        :style="{ color: activeSubMenu.id === menu.id ? color : '' }"
      >
        {{ menu.name }}
        <span
          class="underline"
          :style="{
            backgroundColor: activeSubMenu.id === menu.id ? color : ''
          }"
        >
        </span>
      </label>
      <detail-list
        v-if="!menu.children || menu.children.length < 1"
        :list="[menu]"
        :theme="theme"
        @showDetail="showDetail"
      />
      <detail-list
        v-if="getDepth(menu.children, 1) <= 2"
        :list="menu.children"
        :theme="theme"
        @showDetail="showDetail"
      />
      <ul class="bible-sublist" v-else>
        <li v-for="submenu of menu.children" :key="submenu.id">
          <label
            :class="[
              'bible-sublist-name',
              activeSubMenu.id === submenu.id ? 'active' : ''
            ]"
            :id="'menu-' + submenu.id"
            :style="{ color: activeSubMenu.id === submenu.id ? color : '' }"
          >
            {{ submenu.name }}
            <span
              class="underline"
              :style="{
                backgroundColor: activeSubMenu.id === submenu.id ? color : ''
              }"
            ></span>
          </label>
          <detail-list
            :list="submenu.children"
            :theme="theme"
            @showDetail="showDetail"
          />
        </li>
      </ul>
    </ul>
    <ul class="detail-operate">
      <li
        :class="['two-operate', theme === 'two' ? 'active' : '']"
        @click.stop="theme = 'two'"
      ></li>
      <li
        :class="['three-operate', theme === 'three' ? 'active' : '']"
        @click.stop="theme = 'three'"
      ></li>
    </ul>
  </div>
</template>

<script>
import DetailList from "./DetailList";
import { detailMixin } from "../mixin";

export default {
  name: "BibleDetailContent",
  mixins: [detailMixin],
  components: {
    DetailList
  },
  props: {
    menus: {
      type: Array,
      required: true
    },
    depth: {
      type: Number,
      required: true
    },
    activeSubMenu: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      theme: "three"
    };
  },
  methods: {
    showDetail(data) {
      this.$emit("showDetail", data);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.bible-list {
  .bible-list-name {
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: #333330;
  }
  .bible-sublist {
    .bible-sublist-name {
      display: inline-block;
      margin-bottom: 15px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
    }
  }
  .bible-list-name,
  .bible-sublist-name {
    position: relative;
    .underline {
      position: absolute;
      bottom: -4px;
      left: 0;
      display: inline-block;
      width: 0;
      height: 2px;
      background: @primaryColor;
      transition: all 0.2s;
    }
    &.active {
      color: @primaryColor;
      .underline {
        width: 100%;
      }
    }
  }
}
.detail-operate {
  position: fixed;
  top: 160px;
  left: calc(100vw - (100vw - 1200px) / 2);
  display: flex;
  li + li {
    margin-left: 20px;
  }
  .two-operate,
  .three-operate {
    width: 24px;
    height: 24px;
    mask-repeat: no-repeat;
    mask-size: cover;
    background-color: #efefef;
    cursor: pointer;
    &.active,
    &:hover {
      background-color: @primaryColor;
    }
  }
  .two-operate {
    mask-image: url("~images/bible/two.svg");
  }
  .three-operate {
    mask-image: url("~images/bible/three.svg");
  }
}
</style>

<template>
  <div>
    <detail-list v-if="depth < 2" :list="menus" @showDetail="showDetail" />
    <ul v-else class="bible-list" v-for="menu of menus" :key="menu.id">
      <label class="bible-list-name" :id="'menu-' + menu.id">{{
        menu.name
      }}</label>
      <detail-list
        v-if="!menu.children || menu.children.length < 1"
        :list="[menu]"
        @showDetail="showDetail"
      />
      <detail-list
        v-if="getDepth(menu.children, 1) <= 2"
        :list="menu.children"
        @showDetail="showDetail"
      />
      <ul class="bible-sublist" v-else>
        <li v-for="submenu of menu.children" :key="submenu.id">
          <label class="bible-sublist-name" :id="'menu-' + submenu.id">{{
            submenu.name
          }}</label>
          <detail-list :list="submenu.children" @showDetail="showDetail" />
        </li>
      </ul>
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
    }
  },
  methods: {
    showDetail(data) {
      this.$emit("showDetail", data);
    }
  }
};
</script>

<style lang="less" scoped>
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
}
</style>

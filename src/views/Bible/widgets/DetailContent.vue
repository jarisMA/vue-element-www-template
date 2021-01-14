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
      <ul class="bible-sublist">
        <li v-for="submenu of menu.children" :key="submenu.id">
          <label class="bible-sublist-name" :id="'menu-' + submenu.id">{{
            submenu.name
          }}</label>
          <detail-list
            v-if="!submenu.children || submenu.children.length < 1"
            :list="[submenu]"
            @showDetail="showDetail"
          />
          <detail-list
            v-else
            :list="submenu.children"
            @showDetail="showDetail"
          />
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
import DetailList from "./DetailList";

export default {
  name: "BibleDetailContent",
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
.bible-item {
  display: flex;
  flex-wrap: wrap;
  li {
    margin-bottom: 20px;
    &:nth-child(3n-1) {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  .bible-item-card {
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 330px;
    background: #fafafa;
    &:hover {
      box-shadow: 0px 0px 11px 0px rgba(183, 183, 183, 0.5);
    }
    &.info {
      position: relative;
      cursor: pointer;
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
      }
    }
    .bible-card-top {
      padding: 10px;
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
}
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

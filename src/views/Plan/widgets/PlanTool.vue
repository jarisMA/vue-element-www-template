<template>
  <div class="tool-wrapper">
    <div class="cat-wrapper">
      <div class="cat-top-wrapper">
        <ul class="tab-list">
          <li
            class="tab-item pointer"
            v-for="(tab, key) of rootCats"
            :key="tab.id"
            :class="{ active: key === activeKey }"
            @click="activeKey = key"
          >
            <label
              class="tab-cover-img pointer"
              :style="{
                backgroundImage:
                  key === activeKey
                    ? `url(${tab.active_cover_url})`
                    : `url(${tab.cover_url})`
              }"
            ></label>
            {{ tab.name }}
          </li>
        </ul>
      </div>
      <div class="cat-bottom-wrapper">
        <ul class="cat-list" v-if="(rootCats[activeKey] || {}).children">
          <li
            class="cat-item pointer"
            v-for="cat of rootCats[activeKey].children"
            :key="cat.id"
          >
            <label class="cat-name pointer">
              {{ cat.name }}
            </label>
            <label
              class="cat-cover-img pointer"
              :style="{ backgroundImage: `url(${cat.cover_url})` }"
            ></label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import commodityService from "service/commodity";

export default {
  name: "PlanTool",
  props: {
    rootCats: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      cats: [],
      activeKey: 0
    };
  },
  created() {},
  methods: {
    getCats(id) {
      commodityService.cat(id).then(res => {
        this.cats = res;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.tool-wrapper {
  width: 320px;
  height: 100%;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  background: #fafafa;
  overflow: hidden;
  .cat-wrapper {
    width: 100%;
    height: 100%;
    .cat-top-wrapper {
      width: 100%;
      height: 62px;
      background: #fafafa;
      .tab-list {
        width: 100%;
        height: 100%;
        display: flex;
        .tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 79px;
          height: 100%;
          font-family: PingFang SC;
          font-weight: 600;
          font-size: 14px;
          color: #666666;

          &.active {
            background: #fff;
            color: @primaryColor;
          }
          .tab-cover-img {
            width: 24px;
            height: 24px;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
      }
    }
    .cat-bottom-wrapper {
      width: 100%;
      height: calc(100% - 62px);
      overflow-y: auto;
      padding: 10px;
      background: #fff;
      .cat-list {
        .cat-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          padding: 0 20px;
          width: 100%;
          height: 60px;
          border: 1px solid #fafafa;
          box-sizing: border-box;
          .cat-name {
            font-size: 14px;
            color: #111111;
          }
          .cat-cover-img {
            width: 40px;
            height: 40px;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>

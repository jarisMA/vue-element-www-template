<template>
  <div class="tool-container">
    <div class="cat-container">
      <div class="cat-top-wrapper">
        <ul class="tab-list">
          <li
            class="tab-item pointer"
            v-for="(tab, key) of rootCats"
            :key="tab.id"
            :class="{ active: key === activeTabKey }"
            @click="activeTabKey = key"
          >
            <label
              class="tab-cover-img pointer"
              :style="{
                backgroundImage:
                  key === activeTabKey
                    ? `url(${tab.active_cover_url})`
                    : `url(${tab.cover_url})`
              }"
            ></label>
            {{ tab.name }}
          </li>
        </ul>
      </div>
      <div class="cat-bottom-wrapper">
        <ul class="cat-list" v-if="(rootCats[activeTabKey] || {}).children">
          <li
            class="cat-item pointer"
            v-for="cat of rootCats[activeTabKey].children"
            :key="cat.id"
            @click="activeParentCat = cat"
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
    <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
    >
      <div class="search-container" v-if="activeParentCat">
        <div class="search-header">
          <div class="cat-name">
            <label
              class="back-icon bgImg pointer"
              @click="activeParentCat = null"
            ></label>
            <h3>
              {{ (activeParentCat || {}).name }}
            </h3>
          </div>
          <label class="search-icon bgImg"></label>
        </div>
        <div class="cat-wrapper">
          <label
            :class="['cat-label', 'pointer', !activeCat && 'active']"
            @click="activeCat = null"
          >
            全部
          </label>
          <label
            :class="[
              'cat-label',
              'pointer',
              activeCat && activeCat.id === cat.id ? 'active' : ''
            ]"
            v-for="cat of cats"
            :key="cat.id"
            @click="activeCat = cat"
          >
            {{ cat.name }}
          </label>
        </div>
        <div class="attr-wrapper">
          <div class="attr-header">
            <el-tooltip
              popper-class="tool-label-tip"
              effect="dark"
              content="品牌"
              placement="bottom"
            >
              <label class="bgImg brand-icon"></label>
            </el-tooltip>
            <el-tooltip
              popper-class="tool-label-tip"
              effect="dark"
              content="价格"
              placement="bottom"
            >
              <label class="bgImg price-icon"></label>
            </el-tooltip>
            <el-tooltip
              popper-class="tool-label-tip"
              effect="dark"
              content="尺寸"
              placement="bottom"
            >
              <label class="bgImg size-icon"></label>
            </el-tooltip>
            <el-tooltip
              v-for="attr of attrs"
              :key="attr.id"
              popper-class="tool-label-tip"
              effect="dark"
              :content="attr.name"
              placement="bottom"
            >
              <label
                class="bgImg"
                :style="{ backgroundImage: `url(${attr.default_icon})` }"
              ></label>
            </el-tooltip>
            <el-tooltip
              popper-class="tool-label-tip"
              effect="dark"
              content="其余"
              placement="bottom"
            >
              <label class="bgImg filter-icon"></label>
            </el-tooltip>
          </div>
        </div>
        <div class="commodity-wrapper">
          <div class="scroll-section">
            <!-- <div v-for="item of 10"
                 :key="item"> -->
            <commodity-card
              v-for="commodity of commodities"
              :key="commodity.id"
              :commodity="commodity"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import commodityService from "service/commodity";
import CommodityCard from "./CommodityCard.vue";

export default {
  name: "PlanTool",
  components: {
    CommodityCard
  },
  props: {
    rootCats: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      cats: [],
      activeTabKey: 0,
      activeParentCat: null,
      activeCat: null,
      attrs: [],
      commodities: []
    };
  },
  watch: {
    activeParentCat(val) {
      if (val) {
        this.getCats(val.id);
        this.getCommodity();
      }
    }
  },
  created() {
    this.getAttrs();
  },
  methods: {
    getAttrs() {
      commodityService.attrs().then(res => {
        this.attrs = res;
      });
    },
    getCats(id) {
      commodityService.cat(id).then(res => {
        this.cats = res.children;
      });
    },
    getCommodity() {
      commodityService
        .commodities({
          parent_cat_id: this.activeParentCat.id
        })
        .then(res => {
          this.commodities = res;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.tool-container {
  position: relative;
  width: 320px;
  height: 100%;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  background: #fafafa;
  overflow: hidden;
  .scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .cat-container {
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
  .search-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    .search-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #efefef;
      .cat-name {
        display: flex;
        h3 {
          line-height: 24px;
          font-weight: 600;
          font-size: 16px;
          color: #666666;
        }
      }
      .back-icon {
        width: 24px;
        height: 24px;
        background-image: url("~images/common/back.svg");
      }
      .search-icon {
        width: 24px;
        height: 24px;
        background-image: url("~images/common/search.svg");
      }
    }
    .cat-wrapper {
      padding: 0 10px 10px;
      .cat-label {
        display: inline-block;
        padding: 3px 4px;
        margin-top: 10px;
        margin-right: 14px;
        line-height: 1;
        font-size: 12px;
        color: #111111;
        background: #f4f4f4;
        border-radius: 10px;
        &.active {
          color: #ffffff;
          background: @primaryColor;
        }
      }
    }
    .attr-wrapper {
      width: 100%;
      border-top: 1px solid #efefef;
      border-bottom: 1px solid #efefef;
      .attr-header {
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        .bgImg {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .brand-icon {
          background-image: url("~images/commodity/brand-default.png");
          &.active {
            background-image: url("~images/commodity/brand-selected.png");
          }
          &.focus {
            background-image: url("~images/commodity/brand-active.png");
          }
        }
        .price-icon {
          background-image: url("~images/commodity/price-default.png");
          &.active {
            background-image: url("~images/commodity/price-selected.png");
          }
          &.focus {
            background-image: url("~images/commodity/price-active.png");
          }
        }
        .size-icon {
          background-image: url("~images/commodity/size-default.png");
          &.active {
            background-image: url("~images/commodity/size-selected.png");
          }
          &.focus {
            background-image: url("~images/commodity/size-active.png");
          }
        }
        .filter-icon {
          background-image: url("~images/commodity/filter-default.png");
          &.active {
            background-image: url("~images/commodity/filter-selected.png");
          }
          &.focus {
            background-image: url("~images/commodity/filter-active.png");
          }
        }
      }
    }
    .commodity-wrapper {
      flex-grow: 1;
      width: 100%;
      height: 5px;
      overflow: hidden;
      .scroll-section {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px 10px 0 10px;
        width: calc(100% + 14px);
        height: 100%;
        overflow-y: scroll;
      }
    }
  }
}
</style>
<style lang="less">
.tool-label-tip {
  padding: 2px 4px !important;
  color: #fff !important;
  border-radius: 2px !important;
  &.is-dark {
    background: #333 !important;
  }
}
</style>

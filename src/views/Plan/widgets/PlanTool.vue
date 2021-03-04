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
          <template v-if="!isSearch">
            <div class="cat-name">
              <label
                class="back-icon bgImg pointer"
                @click="handleBack"
              ></label>
              <h3>
                {{ (activeParentCat || {}).name }}
              </h3>
            </div>
            <label
              class="search-icon bgImg pointer"
              @click="isSearch = true"
            ></label>
          </template>
          <el-input
            v-else
            class="name-search"
            :placeholder="`在「${(activeParentCat || {}).name}」下搜索`"
            prefix-icon="search-icon bgImg"
            clearable
            v-model="name"
            @keyup.enter.native="handleNameInputConfirm"
            @blur="handleNameInputConfirm"
          >
          </el-input>
        </div>
        <ul class="value-list" v-if="values.length > 0">
          <li class="reset-wrapper pointer" @click="handleValueReset">
            <label class="reset-icon bgImg"></label>
          </li>
          <li
            class="value-item"
            v-for="(item, key) of values"
            :key="item.value.id"
            :style="{ color: item.color }"
          >
            {{
              item.type === "price"
                ? `${item.value.min_price ? item.value.min_price : "∞"}-${
                    item.value.max_price ? item.value.max_price : "∞"
                  }元`
                : item.type === "size_x"
                ? `a：${item.value.min_size_x ? item.value.min_size_x : "∞"}-${
                    item.value.max_size_x ? item.value.max_size_x : "∞"
                  }mm`
                : item.type === "size_y"
                ? `b：${item.value.min_size_y ? item.value.min_size_y : "∞"}-${
                    item.value.max_size_y ? item.value.max_size_y : "∞"
                  }mm`
                : item.type === "size_z"
                ? `c：${item.value.min_size_z ? item.value.min_size_z : "∞"}-${
                    item.value.max_size_z ? item.value.max_size_z : "∞"
                  }mm`
                : item.value.name
            }}
            <label
              class="bgImg close-icon pointer"
              @click="handleValueRemove(key)"
            ></label>
          </li>
        </ul>
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
        <commodity-attr
          @addValue="handleValueAdd"
          :values="values"
          :parentCat="activeParentCat"
          :activeCat="activeCat"
        />
        <div class="commodity-wrapper">
          <div class="scroll-section">
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
import CommodityAttr from "./CommodityAttr.vue";

export default {
  name: "PlanTool",
  components: {
    CommodityCard,
    CommodityAttr
  },
  props: {
    rootCats: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isSearch: false,
      name: null,
      cats: [],
      activeTabKey: 0,
      activeParentCat: null,
      activeCat: null,
      commodities: [],
      values: []
    };
  },
  watch: {
    activeParentCat(val) {
      if (val) {
        this.getCats(val.id);
        this.getCommodity();
      }
    },
    activeCat() {
      this.getCommodity();
    },
    values() {
      this.getCommodity();
    }
  },
  methods: {
    getCats(id) {
      commodityService.cat(id).then(res => {
        this.cats = res.children;
      });
    },
    getCommodity() {
      const brandIds = this.values
        .filter(item => item.type === "brand")
        .map(item => item.value.id);
      const priceIndex = this.values.findIndex(item => item.type === "price");
      const sizeXIndex = this.values.findIndex(item => item.type === "size_x");
      const sizeYIndex = this.values.findIndex(item => item.type === "size_y");
      const sizeZIndex = this.values.findIndex(item => item.type === "size_z");

      commodityService
        .commodities({
          parent_cat_id: this.activeParentCat.id,
          cat_id: (this.activeCat && this.activeCat.id) || null,
          brand_ids: brandIds,
          name: this.name || null,
          min_price:
            priceIndex > -1 ? this.values[priceIndex].value.min_price : null,
          max_price:
            priceIndex > -1 ? this.values[priceIndex].value.max_price : null,
          price_sort:
            priceIndex > -1 ? this.values[priceIndex].value.price_sort : null,
          min_size_x:
            sizeXIndex > -1 ? this.values[sizeXIndex].value.min_size_x : null,
          max_size_x:
            sizeXIndex > -1 ? this.values[sizeXIndex].value.max_size_x : null,
          min_size_y:
            sizeYIndex > -1 ? this.values[sizeYIndex].value.min_size_y : null,
          max_size_y:
            sizeYIndex > -1 ? this.values[sizeYIndex].value.max_size_y : null,
          min_size_z:
            sizeZIndex > -1 ? this.values[sizeZIndex].value.min_size_z : null,
          max_size_z:
            sizeZIndex > -1 ? this.values[sizeZIndex].value.max_size_z : null
        })
        .then(res => {
          this.commodities = res;
        });
    },
    handleBack() {
      this.activeParentCat = null;
      this.values = [];
    },
    handleNameInputConfirm() {
      this.getCommodity();
      this.isSearch = false;
    },
    handleValueAdd(value) {
      const valueIds = this.values
        .filter(item => item.value.id)
        .map(item => item.value.id);
      if (value.value.id && valueIds.indexOf(value.value.id) < 0) {
        this.values.push(value);
      } else if (value.type === "price") {
        const index = this.values.findIndex(item => item.type === value.type);
        if (index > -1) {
          this.values.splice(index, 1);
        }
        this.values.push(value);
      } else if (["size_x", "size_y", "size_z"].indexOf(value.type) > -1) {
        const index = this.values.findIndex(item => item.type === value.type);
        if (index > -1) {
          this.values.splice(index, 1);
        }
        let flag = false;
        for (let key in value.value) {
          if (value.value[key]) {
            flag = true;
          }
          break;
        }
        flag && this.values.push(value);
      }
    },
    handleValueRemove(key) {
      this.values.splice(key, 1);
    },
    handleValueReset() {
      this.values = [];
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
    position: relative;
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
      /deep/ .name-search {
        width: 100%;
        .el-input__inner {
          width: 100%;
          height: 28px;
          background: #fafafa;
          border: unset;
          border-radius: 2px;
          &::placeholder {
            color: #999999;
          }
        }
        .el-input__icon {
          margin-top: 2px;
          line-height: 24px;
          &.search-icon {
            width: 24px;
            height: 24px;
            background: url("~images/common/search.svg");
          }
        }
      }
    }
    .value-list {
      position: absolute;
      top: 40px;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      transform: translateX(100%);
      height: 200px;
      li + li {
        margin-top: 1px;
      }
      .reset-wrapper {
        padding: 8px;
        background: #fafafa;
        .reset-icon {
          width: 24px;
          height: 24px;
          background-image: url("~images/common/reset.svg");
        }
      }
      .value-item {
        position: relative;
        padding: 5px 8px;
        color: #14af64;
        background: #eaf9f2;
        &:hover {
          .close-icon {
            display: block;
          }
        }
        .close-icon {
          position: absolute;
          top: 0;
          right: 0;
          width: 10px;
          height: 10px;
          background-image: url("~images/common/close.svg");
          display: none;
        }
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

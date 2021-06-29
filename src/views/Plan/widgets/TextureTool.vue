<template>
  <div class="tool-container" ref="tool">
    <div class="tool-wrapper">
      <div class="cat-container">
        <div class="cat-top-wrapper">
          <h3 class="cat-top-title">{{ toolName }}</h3>
        </div>
        <div class="cat-bottom-wrapper">
          <ul class="cat-list">
            <li
              class="cat-item pointer"
              v-for="cat of rootCats"
              :key="cat.id"
              @click="handleToggleRootCat(cat)"
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
        <div class="tool-main-wrapper" v-if="activeRootCat">
          <div class="tool-left">
            <div class="tool-left-back" @click="handleBack">
              <i class="tool-left-back_icon"></i>
            </div>
            <div class="tool-left-parent_cat">
              <span>{{ activeRootCat.name }}</span>
              <i class="tool-left-parent_triangle"></i>
              <ul class="tool-left-parent_cat_list">
                <li
                  :class="[
                    'tool-left-parent_cat_item',
                    activeRootCat.id === cat.id ? 'active' : ''
                  ]"
                  v-for="cat of rootCats"
                  :key="cat.id"
                  @click="handleToggleRootCat(cat)"
                >
                  {{ cat.name }}
                </li>
              </ul>
            </div>
            <ul class="tool-left-list" v-if="activeRootCat.children">
              <li
                v-if="
                  activeRootCat.children && activeRootCat.children.length > 3
                "
                class="tool-left-more"
                @click="showMore = !showMore"
              >
                <i :class="['expand-icon', showMore ? 'unexpand' : '']"></i>
              </li>
              <template v-for="(cat, index) of activeRootCat.children">
                <li
                  v-show="index < 3 || showMore"
                  :class="[
                    'tool-left-item',
                    index === activeParentCatIndex ? 'active' : ''
                  ]"
                  :key="cat.id"
                  @click="handleToggleParentCat(index)"
                >
                  <span class="tool-left-item-name">{{ cat.name }}</span>
                </li>
              </template>
            </ul>
          </div>
          <div class="search-container" v-loading="catLoading">
            <div class="search-header">
              <el-input
                ref="nameSearch"
                class="name-search"
                type="text"
                :placeholder="
                  `在「${
                    (
                      (activeRootCat.children &&
                        activeRootCat.children[activeParentCatIndex]) ||
                      {}
                    ).name
                  }」下搜索`
                "
                prefix-icon="search-icon bgImg"
                v-model="name"
                clearable
                @keyup.enter.native="handleNameInputConfirm"
              >
              </el-input>
            </div>
            <div
              class="cat-wrapper"
              v-if="
                activeRootCat.children &&
                  activeRootCat.children[activeParentCatIndex]
              "
            >
              <label
                :class="['cat-label', 'pointer', !activeCat && 'active']"
                @click="handleToggleCat(null)"
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
                @click="handleToggleCat(cat)"
              >
                {{ cat.name }}
              </label>
            </div>
            <commodity-attr
              type="texture"
              :showAttr="false"
              :values="values"
              :parentCat="
                activeRootCat.children &&
                  activeRootCat.children[activeParentCatIndex]
              "
              :activeCat="activeCat"
              :columns="columns"
              @addValue="handleValueAdd"
              ref="commodityAttr"
            />
            <div class="commodity-wrapper" v-loading="commodityLoading">
              <div
                class="scroll-section"
                ref="commodityScroll"
                v-homeplan-infinite="handleCommodityScroll"
              >
                <div class="commodity-list" ref="commodityList">
                  <commodity-card
                    v-for="(commodity, index) of commodities"
                    :key="`${commodity.id}-${index}`"
                    type="texture"
                    :commodity="commodity"
                    :values="values"
                    :columns="columns"
                    @detail="handleCommodityDetail(commodity)"
                    @clearTimer="handleCommodityDetail(commodity, false)"
                    @showSkus="skus => handleShowSkus(commodity.id, skus)"
                    @addModel="handleAddModel"
                    @showFeedback="handleShowFeedback"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <ul class="value-list" v-if="values.length > 0">
      <li class="reset-wrapper pointer" @click="handleValueReset">
        <label class="reset-icon bgImg"></label>
        重置
      </li>
      <li
        class="value-item"
        v-for="(item, key) of values"
        :key="item.value.id"
        :style="{
          color: item.color,
          backgroundColor: hex2Rgba(item.color, 0.1)
        }"
        @click="handleValueRemove(key)"
      >
        {{
          item.type === "search"
            ? item.value && item.value.name
            : item.type === "price"
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
            : item.value && item.value.name
        }}
        <label class="close-icon-wrapper" @click.stop="handleValueRemove(key)">
          <i class="bgImg close-icon pointer"></i>
        </label>
      </li>
    </ul>
    <div
      class="commodity-detail-card"
      ref="commodityDetail"
      v-if="activeCommodity"
      :style="{ top: offsetTop + 'px' }"
      @mouseover="detailTimer && clearTimeout(detailTimer)"
      @mouseout="handleCommodityDetail(activeCommodity)"
    >
      <div class="card-top">
        <div class="swiper-wrapper" v-if="activeCommodity.images.length > 1">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide
              v-for="(image, key) of activeCommodity.images"
              :key="key"
            >
              <the-loading-image
                :width="200"
                :height="200"
                :key="key"
                :url="image"
              />
            </swiper-slide>
            <div :class="['card-img-prev']" @click.stop slot="button-prev">
              <div class="btn-icon"></div>
            </div>
            <div :class="['card-img-next']" @click.stop slot="button-next">
              <div class="btn-icon"></div>
            </div>
          </swiper>
        </div>

        <the-loading-image
          v-else
          :width="200"
          :height="200"
          :url="activeCommodity.images[0]"
        />
      </div>
      <div class="card-bottom">
        <h4 class="card-name">{{ activeCommodity.name }}</h4>
        <label class="card-brand" v-if="activeCommodity.brand_name">{{
          activeCommodity.brand_name
        }}</label>
      </div>
    </div>
    <commodity-sku-list
      class="sku-list-wrapper"
      type="texture"
      :style="{ top: offsetTop + 'px' }"
      :skus.sync="activeSkus"
      v-if="activeSkus"
      @addModel="handleAddModel"
      @showFeedback="handleShowFeedback"
    />
  </div>
</template>

<script>
import commodityService from "service/commodity";
import CommodityAttr from "./CommodityAttr";
import CommodityCard from "./CommodityCard";
import CommoditySkuList from "./CommoditySkuList";
import TheLoadingImage from "components/TheLoadingImage";
import { hex2Rgba } from "utils/function";

export default {
  name: "TextureTool",
  components: {
    CommodityAttr,
    CommodityCard,
    CommoditySkuList,
    TheLoadingImage
  },
  data() {
    return {
      catLoading: true,
      commodityLoading: true,
      commodityLoadingMore: false,
      showMore: false,
      toolName: "",
      name: "",
      columns: 2,
      rootCats: [],
      activeParentCatIndex: 0,
      activeRootCat: null,
      cats: [],
      activeCat: null,
      values: [],
      commodities: [],
      activeCommodity: null,
      activeSkus: null,
      offsetTop: 0,
      detailTimer: null,
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        loopedSlides: 0,
        nextButton: ".card-img-next",
        prevButton: ".card-img-prev",
        observe: true
      },
      pagination: {
        size: 30,
        page: 1,
        total: 0
      }
    };
  },
  watch: {
    values() {
      this.getCommodity();
    }
  },
  created() {
    this.getData();
  },
  methods: {
    hex2Rgba,
    handleBack() {
      this.$refs["commodityAttr"].handleReset("brand");
      this.activeRootCat = null;
      this.activeParentCatIndex = 0;
      this.activeCat = null;
      this.showMore = false;
      this.values = [];
      this.name = "";
    },
    getData() {
      commodityService
        .cats()
        .then(cats => {
          const rootCats = cats.find(
            item => item.id === parseInt(process.env.VUE_APP_TEXTURE_CAT_ID)
          );
          this.toolName = rootCats && rootCats.name;
          this.rootCats = (rootCats && rootCats.children) || [];
        })
        .finally(() => {
          this.catLoading = false;
        });
    },
    getCats(id) {
      this.catLoading = true;
      commodityService
        .cat(id)
        .then(res => {
          this.cats = res.children;
        })
        .finally(() => {
          this.catLoading = false;
        });
    },
    getCommodity(flag = false) {
      if (!this.activeRootCat) {
        return;
      }
      if (!flag) {
        this.pagination.page = 1;
      } else {
        if (this.pagination.page < this.pagination.total) {
          this.pagination.page += 1;
        } else {
          return;
        }
      }
      this.activeCommodity = null;
      this.activeSkus = null;
      const brandIds = this.values
        .filter(item => item.type === "brand")
        .map(item => item.value.id);
      const priceIndex = this.values.findIndex(item => item.type === "price");
      const sizeXIndex = this.values.findIndex(item => item.type === "size_x");
      const sizeYIndex = this.values.findIndex(item => item.type === "size_y");
      const sizeZIndex = this.values.findIndex(item => item.type === "size_z");
      const valueIds = this.values
        .filter(item => item.type === "value")
        .map(item => item.value.id);
      const names = this.values
        .filter(item => item.type === "search")
        .map(item => item.value && item.value.name);
      !flag && (this.commodityLoading = true);
      this.commodityLoadingMore = true;
      commodityService
        .commodities({
          parent_cat_id:
            (this.activeRootCat.children &&
              this.activeRootCat.children[this.activeParentCatIndex] &&
              this.activeRootCat.children[this.activeParentCatIndex].id) ||
            this.activeRootCat.id,
          cat_id: (this.activeCat && this.activeCat.id) || null,
          brand_ids: brandIds,
          name: names ? names[0] || null : null,
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
            sizeZIndex > -1 ? this.values[sizeZIndex].value.max_size_z : null,
          value_ids: valueIds,
          page: this.pagination.page,
          page_size: this.pagination.size
        })
        .then(res => {
          const { data } = res;
          if (flag) {
            this.commodities = this.commodities.concat(data.list);
          } else {
            this.commodities = data.list;
          }
          this.pagination.total = data.pagination.total_pages;
        })
        .finally(() => {
          this.commodityLoading = false;
          this.commodityLoadingMore = false;
        });
    },
    handleCommodityScroll() {
      if (!this.commodityLoadingMore) {
        this.commodityLoadingMore = true;
        this.getCommodity(true);
      }
    },
    handleToggleRootCat(cat) {
      if (cat.id !== (this.activeRootCat && this.activeRootCat.id)) {
        this.activeRootCat && this.handleBack();
        this.activeRootCat = cat;
        this.getCats(
          (cat.children && cat.children[0] && cat.children[0].id) || cat.id
        );
        this.getCommodity();
      }
    },
    handleToggleParentCat(index) {
      if (index === 2) {
        this.showMore = true;
      }
      if (this.activeParentCatIndex !== index) {
        this.activeParentCatIndex = index;
        this.name = "";
        this.$refs["commodityAttr"].handleReset("brand");
        this.activeCat = null;
        this.values = [];
        this.getCats(this.activeRootCat.children[index].id);
        this.getCommodity();
      }
    },
    handleToggleCat(cat) {
      this.activeCat = cat;
      this.getCommodity();
    },
    handleNameInputConfirm() {
      this.handleValueAdd({
        type: "search",
        attrId: 0,
        color: "#9F8164",
        value: {
          id: -1,
          name: this.name
        }
      });
    },
    handleValueAdd(value) {
      let flag = true;
      const valueIds = this.values
        .filter(item => item.value.id)
        .map(item => item.value.id);
      const existIndex = this.values.findIndex(
        item =>
          item.type === value.type &&
          JSON.stringify(item.value) === JSON.stringify(value.value)
      );
      if (["brand", "value"].indexOf(value.type) > -1 && existIndex > -1) {
        this.values.splice(existIndex, 1);
        return;
      }
      if (value.type === "search") {
        const index = this.values.findIndex(item => item.type === value.type);
        if (index > -1) {
          this.values.splice(index, 1);
        }
        !value.value.name && (flag = false);
      } else if (value.value.id && valueIds.indexOf(value.value.id) < 0) {
        flag = true;
      } else if (value.type === "price") {
        const index = this.values.findIndex(item => item.type === value.type);
        if (index > -1) {
          this.values.splice(index, 1);
        }
      } else if (["size_x", "size_y", "size_z"].indexOf(value.type) > -1) {
        const index = this.values.findIndex(item => item.type === value.type);
        if (index > -1) {
          this.values.splice(index, 1);
        }
        flag = false;
        for (let key in value.value) {
          if (value.value[key]) {
            flag = true;
            break;
          }
        }
      }
      if (this.values.length === 15) {
        this.$notice({
          type: "warning",
          title: "筛选条件最多只能15条"
        });
        return;
      }
      flag && this.values.push(value);
    },
    handleValueRemove(key) {
      const value = this.values[key];
      if (value.type === "search") {
        this.name = "";
      }
      this.values.splice(key, 1);
    },
    handleValueReset() {
      this.values = [];
      this.name = "";
    },
    handleCommodityDetail(data, flag = true) {
      if (this.detailTimer) {
        clearTimeout(this.detailTimer);
        this.detailTimer = null;
      }
      this.activeSkus = null;
      data.images =
        data.images instanceof Array
          ? data.images
          : data.images
          ? (data.images || "").split(",")
          : [];
      const scrollTop = this.$refs.commodityScroll.scrollTop;
      const offsetTop =
        document.getElementById(`commodity-${data.id}`).offsetTop - scrollTop;

      const height = 280;
      if (offsetTop + height > this.$refs["tool"].clientHeight) {
        this.offsetTop =
          offsetTop + (this.$refs["tool"].clientHeight - (offsetTop + height));
      } else {
        this.offsetTop = offsetTop;
      }
      this.activeCommodity = data;
      if (flag) {
        this.detailTimer = setTimeout(() => {
          this.activeCommodity = null;
          clearTimeout(this.detailTimer);
          this.detailTimer = null;
        }, 500);
      }
    },
    clearTimeout(timer) {
      clearTimeout(timer);
    },
    handleShowSkus(id, skus) {
      this.activeCommodity = null;
      const scrollTop = this.$refs.commodityScroll.scrollTop;
      const offsetTop =
        document.getElementById(`commodity-${id}`).offsetTop - scrollTop;

      const height = Math.min(
        skus.length * 145 + (skus.length - 1) * 10 + 10,
        424
      );
      if (offsetTop + height > this.$refs["tool"].clientHeight) {
        this.offsetTop =
          offsetTop + (this.$refs["tool"].clientHeight - (offsetTop + height));
      } else {
        this.offsetTop = offsetTop;
      }

      this.activeSkus = skus;
    },
    handleAddModel(goodId) {
      this.$emit("addModel", goodId);
    },
    handleShowFeedback(sku) {
      this.$emit("showFeedback", sku);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@transitionDuration: 0.02s;
.tool-container {
  position: relative;
  width: 345px;
  height: 100%;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  background: #fafafa;
  transition: width @transitionDuration;
  user-select: none;
  .tool-left {
    position: absolute;
    left: -45px;
    top: 0;
    display: flex;
    flex-direction: column;
    width: 44px;
    max-height: 100%;
    overflow: visible;
    .tool-left-back {
      flex: 1;
      padding: 8px 10px;
      background: #fff;
      cursor: pointer;
      .tool-left-back_icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        mask: url("~images/commodity/chevron-left.svg") no-repeat center;
        background-color: #666;
      }
    }
    .tool-left-parent_cat {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 8px 10px;
      background: #eff9f4;
      cursor: pointer;
      &:hover {
        .tool-left-parent_triangle {
          transform: rotate(-90deg);
        }
        .tool-left-parent_cat_list {
          display: block;
        }
      }
      span {
        line-height: 16px;
        font-weight: 600;
        font-size: 12px;
        color: @primaryColor;
      }
      .tool-left-parent_triangle {
        display: inline-block;
        margin-top: 6px;
        width: 0;
        height: 0;
        border: 4px solid @primaryColor;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom: unset;
      }
      .tool-left-parent_cat_list {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        width: 132px;
        background: #ffffff;
        box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1);
        transform: translate(100%);
        z-index: 1;
        .tool-left-parent_cat_item {
          display: flex;
          justify-content: center;
          width: 100%;
          padding: 8px 0;
          line-height: 24px;
          font-size: 14px;
          color: #2c3330;
          cursor: pointer;
          &.active {
            color: @primaryColor;
          }
          &:hover {
            background: #fafafa;
          }
        }
      }
    }
    .tool-left-list {
      flex: 1;
      width: 100%;
      padding: 8px 0;
      background: #fff;
      overflow-y: scroll;
      &:hover {
        width: 80px;
        box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05);
        z-index: 2;
        .tool-left-list {
          .tool-left-item {
            text-align: left;
            .tool-left-item-name {
              width: 100%;
            }
          }
        }
      }
      &::-webkit-scrollbar {
        width: 0px;
      }
      .tool-left-item {
        width: 100%;
        padding: 8px 10px;
        line-height: 16px;
        font-weight: 400;
        font-size: 12px;
        text-align: left;
        color: #2c3330;
        cursor: pointer;
        .tool-left-item-name {
          display: inline-block;
          width: 24px;
          white-space: nowrap;
          text-overflow: "";
          overflow: hidden;
        }
        &.active {
          font-weight: 600;
          color: @primaryColor;
        }
        &:hover {
          color: @primaryColor;
        }
      }
    }
    .tool-left-more {
      padding-left: 10px;
      cursor: pointer;
      .expand-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        mask: url("~images/commodity/expand.svg") no-repeat center;
        background: #81948b;
        transition: transform 0.1s;
        &.unexpand {
          transform: rotate(180deg);
        }
        &:hover {
          background: #2c3330;
        }
      }
    }
  }
  .tool-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    border-left: 1px solid #efefef;
    /deep/ .attr-wrapper {
      .attr-list-left {
        flex: none;
        .price-icon,
        .size-icon {
          display: none;
        }
      }
    }
  }
  .cat-container {
    width: 100%;
    height: 100%;
    background: #ffffff;
    .cat-top-wrapper {
      width: 100%;
      padding: 20px 20px 16px;
      .cat-top-title {
        font-weight: 600;
        line-height: 34px;
        font-size: 24px;
        color: #2c3330;
      }
    }
    .cat-bottom-wrapper {
      width: 100%;
      height: calc(100% - 62px);
      overflow-y: auto;
      padding: 10px;
      &::-webkit-scrollbar {
        width: 0;
      }
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
      padding: 0 10px 0 0;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #efefef;
      .cat-name {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .back-icon-wrapper {
          flex: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          cursor: pointer;
          .back-icon {
            width: 24px;
            height: 24px;
            background-image: url("~images/common/back.svg");
          }
        }
        h3 {
          flex: 1;
          width: 5px;
          line-height: 24px;
          font-weight: 600;
          font-size: 16px;
          color: #666666;
        }
      }
      .search-icon {
        flex: none;
        width: 24px;
        height: 24px;
        background-image: url("~images/common/search.svg");
      }
      /deep/ .name-search {
        margin-left: 10px;
        width: calc(100% - 10px);
        .el-input__inner {
          width: 100%;
          height: 28px;
          background: #fafafa;
          border: unset;
          font-size: 12px;
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
        .el-input__suffix {
          right: 2px;
          .el-input__suffix-inner {
            .el-input__icon {
              background: red;
              width: 24px;
              height: 24px;
              background: url("~images/commodity/cancel.svg") no-repeat;
              border: unset;
              &::before {
                display: none;
              }
            }
          }
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
        padding: 5px 15px 53px;
        width: calc(100% + 15px);
        height: 100%;
        overflow-y: scroll;
        .commodity-list {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          width: 100%;
          & > div {
            margin: 5px;
          }
        }
      }
    }
    .unfold-icon {
      position: absolute;
      top: 50%;
      right: 0;
      width: 8px;
      height: 30px;
      background: rgba(0, 0, 0, 0.05);
      transform: translateY(-50%);
      cursor: pointer;
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 3px;
        height: 6px;
        background-image: url("~images/commodity/unfold.svg");
        background-repeat: no-repeat;
        background-size: cover;
        content: "";
        transform: translate(-50%, -50%);
        transition: transform @transitionDuration;
      }
      &.fold-icon {
        &::after {
          transform: translate(-50%, -50%) rotate(180deg);
        }
      }
    }
    .commodity-list-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(calc(100% - 48px));
      transition: transform @transitionDuration * 10;
      &.show {
        transform: translateY(0);
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
      display: flex;
      align-items: center;
      padding: 8px;
      font-size: 12px;
      color: #666;
      background: #fafafa;
      .reset-icon {
        display: inline-block;
        margin-right: 2px;
        width: 16px;
        height: 16px;
        background-image: url("~images/common/reset.svg");
      }
    }
    .value-item {
      position: relative;
      padding: 8px;
      line-height: 1;
      font-size: 12px;
      color: #14af64;
      background-color: #eaf9f2;
      cursor: pointer;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: "";
        background: #fff;
        z-index: -1;
      }
      &:hover {
        .close-icon-wrapper {
          display: block;
        }
      }
      .close-icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 0 10px 10px;
        display: none;
        .close-icon {
          width: 10px;
          height: 10px;
          background-image: url("~images/common/close.svg");
        }
      }
    }
  }
  .commodity-detail-card {
    position: absolute;
    top: 50%;
    right: -1px;
    width: 200px;
    background: #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    transform: translate(100%, 0);
    &:hover {
      .card-img-prev,
      .card-img-next {
        display: block !important;
      }
    }
    .card-top {
      width: 100%;
      height: 200px;
      background: #fafafa;
      .swiper-wrapper {
        position: relative;
        width: 100%;
      }
      .card-img-prev,
      .card-img-next {
        position: absolute;
        display: none;
        top: 50%;
        width: 10px;
        height: 30px;
        transform: translateY(-50%);
        z-index: 1;
        background: #0000000d;
        cursor: pointer;
        .btn-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 8px;
          transform: translate(-50%, -50%);
          background-size: cover;
          background-repeat: no-repeat;
          cursor: pointer;
        }
      }
      .card-img-prev {
        left: 0;
        .btn-icon {
          background-image: url("~images/common/left.svg");
          opacity: 0.5;
          &:hover {
            opacity: 0.8;
          }
        }
      }
      .card-img-next {
        right: 0;
        .btn-icon {
          background-image: url("~images/common/right.svg");
          opacity: 0.5;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
    .card-bottom {
      width: 100%;
      padding: 10px;
      .card-name {
        width: 100%;
        line-height: 22px;
        font-weight: 600;
        font-size: 16px;
        color: #111111;
      }
      .card-brand {
        display: block;
        line-height: 17px;
        font-size: 12px;
        color: #111111;
      }
    }
  }
  .sku-list-wrapper {
    position: absolute;
    top: 50%;
    right: -1px;
    background: #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    transform: translate(100%, 0%);
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

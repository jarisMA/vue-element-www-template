<template>
  <div
    class="tool-container"
    ref="tool"
    :style="{ width: columns >= 4 ? '655px' : '' }"
  >
    <div class="tool-left">
      <el-scrollbar class="scroll-section">
        <ul class="tool-left-list">
          <template v-for="(cat, index) of rootCats">
            <li
              v-show="index < 3 || showMore"
              :class="[
                'tool-left-item',
                index === activeRootCatIndex ? 'active' : ''
              ]"
              :key="cat.id"
              @click="handleToggleParentCat(index)"
            >
              {{ cat.name }}
            </li>
          </template>
          <li
            v-if="rootCats.length > 3"
            class="tool-left-more"
            @click="showMore = !showMore"
          >
            <i :class="['expand-icon', showMore ? 'unexpand' : '']"></i>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="tool-wrapper" v-if="rootCats[activeRootCatIndex]">
      <div class="search-container" v-loading="catLoading">
        <div class="search-header">
          <el-input
            ref="nameSearch"
            class="name-search"
            type="text"
            :placeholder="
              `在「${(rootCats[activeRootCatIndex] || {}).name}」下搜索`
            "
            prefix-icon="search-icon bgImg"
            v-model="name"
            clearable
            @keyup.enter.native="handleNameInputConfirm"
          >
          </el-input>
        </div>
        <div class="cat-wrapper" v-if="rootCats[activeRootCatIndex]">
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
            v-for="cat of rootCats[activeRootCatIndex].children"
            :key="cat.id"
            @click="activeCat = cat"
          >
            {{ cat.name }}
          </label>
        </div>
        <commodity-attr
          :showAttr="false"
          :values="values"
          :parentCat="rootCats[activeRootCatIndex]"
          :activeCat="activeCat"
          :columns="columns"
          @addValue="handleValueAdd"
          @columnChange="handleColumnChange"
        />
        <div class="commodity-wrapper" v-loading="commodityLoading">
          <div
            class="scroll-section"
            ref="commodityScroll"
            v-infinite-scroll="getCommodity(true)"
          >
            <div class="commodity-list">
              <commodity-card
                v-for="(commodity, index) of commodities"
                :key="`${commodity.id}-${index}`"
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
        <label
          :class="['unfold-icon', columns > 2 ? 'fold-icon' : '']"
          @click="columns > 2 ? (columns = 2) : (columns = 4)"
        ></label>
      </div>
    </div>
  </div>
</template>

<script>
import commodityService from "service/commodity";
import CommodityAttr from "./CommodityAttr.vue";
import CommodityCard from "./CommodityCard.vue";

export default {
  name: "TextureTool",
  components: { CommodityAttr, CommodityCard },
  data() {
    return {
      catLoading: true,
      commodityLoading: false,
      showMore: false,
      name: "",
      columns: 2,
      rootCats: [],
      activeRootCatIndex: 0,
      activeCat: null,
      values: [],
      commodities: [],
      activeCommodity: null,
      activeSkus: null,
      pagination: {
        size: 30,
        page: 1,
        total: 0
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      commodityService
        .cats()
        .then(cats => {
          const rootCats = cats.find(
            item => item.id === parseInt(process.env.VUE_APP_SOFT_CAT_ID)
          );
          this.rootCats = (rootCats && rootCats.children) || [];
          this.getCommodity();
        })
        .finally(() => {
          this.catLoading = false;
        });
    },
    getCommodity(flag = false) {
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
        .map(item => item.value.name);
      this.commodityLoading = true;
      commodityService
        .commodities({
          parent_cat_id: this.rootCats[this.activeRootCatIndex].id,
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
        });
    },
    handleToggleParentCat(index) {
      this.activeRootCatIndex = index;
    },
    handleValueAdd() {},
    handleColumnChange() {},
    handleCommodityDetail() {},
    handleShowSkus() {},
    handleAddModel() {},
    handleShowFeedback() {}
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
    left: -44px;
    top: 0;
    width: 44px;
    max-height: 100%;
    overflow: auto;
    .tool-left-list {
      width: 100%;
      padding: 8px 0;
      background: #fff;
      .tool-left-item {
        width: 100%;
        padding: 8px 10px;
        line-height: 16px;
        font-weight: 600;
        font-size: 12px;
        text-align: center;
        color: #2c3330;
        cursor: pointer;
        &.active {
          color: @primaryColor;
        }
      }
    }
    .tool-left-more {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .expand-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        mask: url("~images/commodity/expand.svg") no-repeat center;
        background: #2c3330;
        transition: transform 0.1s;
        &.unexpand {
          transform: rotate(180deg);
        }
      }
    }
  }
  .tool-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-left: 1px solid #efefef;
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
      cursor: auto;
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
      .card-price {
        line-height: 17px;
        font-size: 12px;
        color: #666666;
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

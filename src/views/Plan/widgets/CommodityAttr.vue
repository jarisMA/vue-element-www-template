<template>
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
    <div class="attr-content">
      <div class="scroll-section">
        <div class="brand-wrapper">
          <el-autocomplete
            class="brand-search"
            :fetch-suggestions="brandSearch"
            placeholder="搜索品牌"
            prefix-icon="search-icon bgImg"
            v-model="brandName"
          >
          </el-autocomplete>
          <div class="brand-content">
            <div class="brand-recommend">
              <h4 class="brand-recommend-title">推荐品牌</h4>
              <ul class="brand-list">
                <li
                  class="brand-item ellipsis"
                  v-for="brand of recommendBrands"
                  :key="brand.id"
                >
                  {{ brand.name }}
                </li>
              </ul>
            </div>
            <div class="brand-all">
              <h4 class="brand-all-title">全部品牌</h4>
              <ul class="brand-list">
                <ul
                  class="brand-group"
                  v-for="(brand, key) of allBrands"
                  :key="key"
                  :id="key"
                >
                  <li
                    class="brand-item ellipsis"
                    v-for="item of brand.brands"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <ul class="brand-initial">
            <li
              :class="[
                brand.initial === (brandInitial || allBrands[0].initial)
                  ? 'active'
                  : ''
              ]"
              v-for="(brand, key) of allBrands"
              :key="key"
              @click="brandInitial = brand.initial"
            >
              <span>{{ brand.initial }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commodityService from "service/commodity";
import { checkCh } from "utils/function";

export default {
  name: "CommodityAttr",
  data() {
    return {
      attrs: [],
      brands: [],
      brandName: "",
      brandInitial: null
    };
  },
  computed: {
    recommendBrands() {
      return this.brands.filter(brand => brand.is_recommend === 1);
    },
    allBrands() {
      let brands = {},
        result = [];
      this.brands.map(brand => {
        console.log();
        const initial = checkCh(brand.name)
          .toUpperCase()
          .charAt(0);
        brand.initial = initial;
        if (brands[initial]) {
          brands[initial].push(brand);
        } else {
          brands[initial] = [brand];
        }
      });
      Object.keys(brands)
        .sort()
        .forEach(function(key) {
          result.push({
            initial: key,
            brands: brands[key]
          });
        });
      return result;
    }
  },
  created() {
    this.getAttrs();
    this.getBrands();
  },
  methods: {
    getAttrs() {
      commodityService.attrs().then(res => {
        this.attrs = res;
      });
    },
    getBrands() {
      commodityService.brands().then(res => {
        this.brands = res;
      });
    },
    brandSearch(q, callback) {
      console.log(q);
      callback([
        {
          value: 1
        }
      ]);
    }
  }
};
</script>

<style lang="less" scoped>
@recommendBrandColor: #caa74d;
@brandWidth: 33%;

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
  .attr-content {
    position: relative;
    max-height: 467px;
    .scroll-section {
      padding: 15px 10px;
      width: calc(100% + 14px);
      max-height: 467px;
      overflow-y: scroll;
    }
    .brand-wrapper {
      /deep/ .brand-search {
        width: 100%;
        .el-input__inner {
          width: 100%;
          height: 28px;
          background: #fafafa;
          border-color: #efefef;
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
      .brand-content {
        .brand-recommend,
        .brand-all {
          position: relative;
          padding: 15px 0 10px 0;
          margin-right: 15px;
        }
        .brand-recommend {
          padding-bottom: 0;
          border-bottom: 1px solid #efefef;
          .brand-list {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            margin-top: 4px;
            .brand-item {
              display: inline-block;
              margin-bottom: 10px;
              padding-right: 14px;
              width: @brandWidth;
              line-height: 1;
              font-size: 12px;
              color: @recommendBrandColor;
            }
          }
        }
        .brand-recommend-title,
        .brand-all-title {
          position: relative;
          padding-left: 24px;
          line-height: 24px;
          font-size: 12px;
          &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 24px;
            height: 24px;
            content: "";
            background-repeat: no-repeat;
            background-size: cover;
          }
        }
        .brand-recommend-title {
          color: @recommendBrandColor;
          &::before {
            background-image: url("~images/commodity/crown.svg");
          }
        }
        .brand-all-title {
          color: #111;
          &::before {
            background-image: url("~images/commodity/all.svg");
          }
        }

        .brand-all {
          .brand-list {
            margin-top: 4px;
            .brand-group {
              display: inline;
              .brand-item {
                display: inline-block;
                margin-bottom: 10px;
                padding-right: 14px;
                width: @brandWidth;
                line-height: 1;
                font-size: 12px;
                color: #666;
              }
            }
          }
        }
      }
      .brand-initial {
        position: absolute;
        top: 50%;
        right: 10px;
        width: 14px;
        transform: translateY(-50%);
        li {
          display: inline-block;
          padding: 1px 0;
          width: 14px;
          line-height: 1;
          font-size: 12px;
          color: #111;
          text-align: center;
          &.active {
            color: #fff;
            background: #14af64;
          }
        }
      }
    }
  }
}
</style>

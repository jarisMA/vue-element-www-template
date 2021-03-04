<template>
  <div class="attr-wrapper">
    <div class="attr-header">
      <el-tooltip
        popper-class="tool-label-tip"
        effect="dark"
        content="品牌"
        placement="bottom"
      >
        <div
          :class="[
            'bgImg-wrapper',
            'brand-icon',
            attrFocusId === -1 ? 'focus' : ''
          ]"
          @click="handleAttrFocusChange(-1)"
        >
          <label :class="['bgImg', attrFocusId === -1 ? 'focus' : '']"></label>
        </div>
      </el-tooltip>
      <el-tooltip
        popper-class="tool-label-tip"
        effect="dark"
        content="价格"
        placement="bottom"
      >
        <div
          :class="[
            'bgImg-wrapper',
            'price-icon',
            attrFocusId === -2 ? 'focus' : ''
          ]"
          @click="handleAttrFocusChange(-2)"
        >
          <label :class="['bgImg', attrFocusId === -2 ? 'focus' : '']"></label>
        </div>
      </el-tooltip>
      <el-tooltip
        popper-class="tool-label-tip"
        effect="dark"
        content="尺寸"
        placement="bottom"
      >
        <div
          :class="[
            'bgImg-wrapper',
            'size-icon',
            attrFocusId === -3 ? 'focus' : ''
          ]"
          @click="handleAttrFocusChange(-3)"
        >
          <label :class="['bgImg', attrFocusId === -3 ? 'focus' : '']"></label>
        </div>
      </el-tooltip>
      <el-tooltip
        v-for="attr of attrs"
        :key="attr.id"
        popper-class="tool-label-tip"
        effect="dark"
        :content="attr.name"
        placement="bottom"
      >
        <div
          :class="['bgImg-wrapper', attrFocusId === attr.id ? 'focus' : '']"
          :style="{
            backgroundColor: attrFocusId === attr.id ? attr.color : null
          }"
          @click="handleAttrFocusChange(attr.id)"
        >
          <label
            :class="['bgImg', attrFocusId === attr.id ? 'focus' : '']"
            :style="{
              backgroundImage:
                attrFocusId === attr.id
                  ? `url(${attr.focus_icon})`
                  : `url(${attr.default_icon})`
            }"
          ></label>
        </div>
      </el-tooltip>
      <el-tooltip
        popper-class="tool-label-tip"
        effect="dark"
        content="其余"
        placement="bottom"
      >
        <div
          :class="[
            'bgImg-wrapper',
            'filter-icon',
            attrFocusId === -4 ? 'focus' : ''
          ]"
          @click="handleAttrFocusChange(-4)"
        >
          <label :class="['bgImg', attrFocusId === -4 ? 'focus' : '']"></label>
        </div>
      </el-tooltip>
    </div>
    <div class="attr-content">
      <div class="scroll-section" ref="scroll" @scroll="handleScroll">
        <div class="brand-wrapper" v-if="attrFocusId === -1">
          <el-autocomplete
            class="brand-search"
            :fetch-suggestions="brandSearch"
            placeholder="搜索品牌"
            prefix-icon="search-icon bgImg"
            value-key="name"
            v-model="brandName"
            @select="brand => handleAttrValueClick('brand', brand)"
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
                  :id="brand.initial"
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
                'pointer',
                brand.initial === (brandInitial || allBrands[0].initial)
                  ? 'active'
                  : ''
              ]"
              v-for="(brand, key) of allBrands"
              :key="key"
              @click="scrollToBrandGroup(brand.initial)"
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
      attrFocusId: 0,
      brands: [],
      brandName: "",
      brandInitial: null,
      handleScrollFlag: true
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
    handleAttrFocusChange(id) {
      if (this.attrFocusId !== id) {
        this.attrFocusId = id;
      } else {
        this.attrFocusId = null;
      }
    },
    brandSearch(q, callback) {
      if (q) {
        const result = this.brands.filter(item => item.name.indexOf(q) >= 0);
        console.log(result);
        callback(result);
      } else {
        callback([]);
      }
    },
    scrollToBrandGroup(initial) {
      this.brandInitial = initial;
      const dom = this.$refs["scroll"];
      this.handleScrollFlag = false;
      dom.scrollTo({
        top: document.getElementById(initial).offsetTop - 14,
        behaviour: "smooth"
      });
      this.handleScrollFlag = true;
    },
    handleScroll(e) {
      if (this.handleScrollFlag && this.attrFocusId === -1) {
        const brands = this.allBrands;
        for (let i = brands.length - 1; i >= 0; i--) {
          const initial = brands[i].initial;
          if (
            document.getElementById(initial).offsetTop - 14 >=
            e.target.scrollTop
          ) {
            this.brandInitial = initial;
          }
        }
      }
    },
    handleAttrValueClick(type, value) {
      console.log(type, value);
      this.$emit("addValue", {
        type,
        value
      });
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
    background: #fdfdfd;
    .bgImg-wrapper {
      flex: 1;
      padding: 5px 12px;
      cursor: pointer;
      outline: unset;
    }
    .bgImg {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    .brand-icon {
      .bgImg {
        background-image: url("~images/commodity/brand-default.png");
        &.active {
          background-image: url("~images/commodity/brand-active.png");
        }
        &.focus {
          background-image: url("~images/commodity/brand-selected.png");
        }
      }
      &.focus {
        background-color: #eaf9f2;
      }
    }
    .price-icon {
      .bgImg {
        background-image: url("~images/commodity/price-default.png");
        &.active {
          background-image: url("~images/commodity/price-active.png");
        }
        &.focus {
          background-image: url("~images/commodity/price-selected.png");
        }
      }
      &.focus {
        background-color: #ebfaf7;
      }
    }
    .size-icon {
      .bgImg {
        background-image: url("~images/commodity/size-default.png");
        &.active {
          background-image: url("~images/commodity/size-active.png");
        }
        &.focus {
          background-image: url("~images/commodity/size-selected.png");
        }
      }
      &.focus {
        background-color: #fcf2ef;
      }
    }
    .filter-icon {
      .bgImg {
        background-image: url("~images/commodity/filter-default.png");
        &.active {
          background-image: url("~images/commodity/filter-active.png");
        }
        &.focus {
          background-image: url("~images/commodity/filter-selected.png");
        }
      }
      &.focus {
        background-color: #fbf5f0;
      }
    }
  }
  .attr-content {
    position: relative;
    max-height: 467px;
    .scroll-section {
      width: calc(100% + 14px);
      max-height: 467px;
      overflow-y: scroll;
    }
    .brand-wrapper {
      padding: 15px 10px;
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
        display: flex;
        flex-direction: column;
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

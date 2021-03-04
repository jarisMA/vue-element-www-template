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
            @select="
              brand =>
                handleAttrValueClick({
                  type: 'brand',
                  color: '#14AF64',
                  value: brand
                })
            "
          >
          </el-autocomplete>
          <div class="brand-content">
            <div class="brand-recommend">
              <h4 class="brand-recommend-title">推荐品牌</h4>
              <ul class="brand-list">
                <li
                  class="brand-item ellipsis pointer"
                  v-for="brand of recommendBrands"
                  :key="brand.id"
                  @click="
                    handleAttrValueClick({
                      type: 'brand',
                      value: brand
                    })
                  "
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
                    :class="[
                      'brand-item',
                      'ellipsis',
                      'pointer',
                      brandSelectedId.indexOf(item.id) > -1 ? 'active' : ''
                    ]"
                    v-for="item of brand.brands"
                    :key="item.id"
                    @click="
                      handleAttrValueClick({
                        type: 'brand',
                        color: '#14AF64',
                        value: item
                      })
                    "
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
        <div class="price-wrapper" v-if="attrFocusId === -2">
          <div class="price-content">
            <ul class="price-list">
              <li class="price-item" @click="handleSetPrice(1000, 9999)">
                千元档
              </li>
              <li class="price-item" @click="handleSetPrice(10000, 99999)">
                万元档
              </li>
            </ul>
            <div class="price-input-wrapper">
              <div class="price-input number-input">
                <el-input
                  v-model="form.min_price"
                  placeholder="最低价"
                  onkeyup="this.value = this.value.replace(/\D/g,'')"
                  :controls="false"
                ></el-input>
                <label class="border"></label>
                <el-input
                  v-model="form.max_price"
                  placeholder="最高价"
                  onkeyup="this.value = this.value.replace(/\D/g,'')"
                  :controls="false"
                ></el-input>
              </div>
              <div class="price-order">
                <el-select v-model="form.price_sort" placeholder="请选择">
                  <el-option
                    v-for="item in price_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="operate-wrapper">
            <label class="reset-btn" @click="handleReset('price')">重置</label>
            <label class="confirm-btn" @click="handleConfirm('price')"
              >确认</label
            >
          </div>
        </div>
        <div class="size-wrapper" v-if="attrFocusId === -3">
          <div class="size-content">
            <img
              :src="
                activeCat
                  ? activeCat.size_legend_url
                  : parentCat.size_legend_url
              "
            />
            <div class="size-input-wrapper">
              <div class="number-input size-input">
                <el-input
                  v-model="form.min_size_x"
                  placeholder="a"
                  onkeyup="this.value = this.value.replace(/\D/g,'')"
                  :controls="false"
                ></el-input>
                <label class="border"></label>
                <el-input
                  v-model="form.max_size_x"
                  placeholder="a"
                  onkeyup="this.value = this.value.replace(/\D/g,'')"
                  :controls="false"
                ></el-input>
              </div>
              <div class="number-input size-input">
                <el-input
                  v-model="form.min_size_y"
                  placeholder="b"
                  onkeyup="this.value = this.value.replace(/\D/g,'')"
                  :controls="false"
                ></el-input>
                <label class="border"></label>
                <el-input
                  v-model="form.max_size_y"
                  placeholder="b"
                  onkeyup="this.value = this.value.replace(/\D/g,'')"
                  :controls="false"
                ></el-input>
              </div>
              <div class="number-input size-input">
                <el-input
                  v-model="form.min_size_z"
                  placeholder="c"
                  onkeyup="this.value = this.value.replace(/\D/g,'')"
                  :controls="false"
                ></el-input>
                <label class="border"></label>
                <el-input
                  v-model="form.max_size_z"
                  placeholder="c"
                  onkeyup="this.value = this.value.replace(/\D/g,'')"
                  :controls="false"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="operate-wrapper">
            <label class="reset-btn" @click="handleReset('size')">重置</label>
            <label class="confirm-btn" @click="handleConfirm('size')"
              >确认</label
            >
          </div>
        </div>
        <template v-for="attr of attrs">
          <div
            class="system-attr-wrapper"
            :key="attr.id"
            v-if="attrFocusId === attr.id"
          >
            <ul class="value-list">
              <li
                :class="[
                  value.color ? 'value-color' : 'value-item',
                  valueSelectedId.indexOf(value.id) > -1 ? 'active' : ''
                ]"
                v-for="value of attr.children"
                :key="value.id"
                @click="
                  handleAttrValueClick({
                    type: 'value',
                    color: attr.color,
                    value: value
                  })
                "
              >
                <span
                  v-if="value.color"
                  :style="{ backgroundColor: value.color }"
                ></span
                >{{ value.name }}
              </li>
            </ul>
          </div>
        </template>
        <div class="filter-wrapper" v-if="attrFocusId === -4">
          <div class="attr-list">
            <div class="attr-item" v-for="attr of moreAttrs" :key="attr.id">
              <label class="attr-name">{{ attr.name }}</label>
              <ul class="value-list">
                <li
                  :class="[
                    'value-item',
                    valueSelectedId.indexOf(value.id) > -1 ? 'active' : ''
                  ]"
                  v-for="value of attr.children"
                  :key="value.id"
                  @click="
                    handleAttrValueClick({
                      type: 'value',
                      color: '#9F8164',
                      value: value
                    })
                  "
                >
                  {{ value.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commodityService from "service/commodity";
import { checkCh } from "utils/function";
const price_options = [
  { value: 0, label: "默认排序" },
  { value: 1, label: "价格升序" },
  { value: -1, label: "价格降序" }
];
export default {
  name: "CommodityAttr",
  props: {
    values: {
      type: Array,
      required: true
    },
    parentCat: {
      type: Object
    },
    activeCat: {
      type: Object
    }
  },
  data() {
    return {
      price_options,
      attrs: [],
      attrFocusId: 0,
      brands: [],
      brandName: "",
      brandInitial: null,
      handleScrollFlag: true,
      form: {
        min_price: null,
        max_price: null,
        price_sort: 0,
        min_size_x: null,
        max_size_x: null,
        min_size_y: null,
        max_size_y: null,
        min_size_z: null,
        max_size_z: null
      },
      moreAttrs: []
    };
  },
  watch: {
    activeCat(val) {
      this.getAttrsByCatId(val.id);
    }
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
    },
    brandSelectedId() {
      return this.values
        .filter(item => item.type === "brand")
        .map(item => item.value.id);
    },
    valueSelectedId() {
      return this.values
        .filter(item => item.type === "value")
        .map(item => item.value.id);
    }
  },
  created() {
    this.getAttrs();
    this.getBrands();
    this.getAttrsByCatId(this.parentCat.id);
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
    getAttrsByCatId(catId) {
      commodityService.catAttrs(catId).then(res => {
        this.moreAttrs = res;
      });
    },
    handleAttrFocusChange(id) {
      this.brandInitial = null;
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
    handleAttrValueClick(value) {
      this.$emit("addValue", value);
    },
    handleSetPrice(min, max) {
      this.form.min_price = min + "";
      this.form.max_price = max + "";
    },
    handleReset(type) {
      switch (type) {
        case "price":
          this.form.min_price = null;
          this.form.max_price = null;
          this.form.price_sort = 0;
          break;
        case "size":
          this.form.min_size_x = null;
          this.form.max_size_x = null;
          this.form.min_size_y = null;
          this.form.max_size_y = null;
          this.form.min_size_z = null;
          this.form.max_size_z = null;
          break;
        default:
          break;
      }
      this.$emit("reset", type);
    },
    handleConfirm(type) {
      switch (type) {
        case "price": {
          const { min_price, max_price, price_sort } = this.form;
          this.handleAttrValueClick({
            type: "price",
            color: "#5BCAB5",
            value: {
              min_price: (min_price || "").replace(/\D/g, ""),
              max_price: (max_price || "").replace(/\D/g, ""),
              price_sort
            }
          });
          break;
        }
        case "size": {
          const {
            min_size_x,
            max_size_x,
            min_size_y,
            max_size_y,
            min_size_z,
            max_size_z
          } = this.form;
          this.handleAttrValueClick({
            type: "size_x",
            color: "#F17851",
            value: {
              min_size_x: (min_size_x || "").replace(/\D/g, ""),
              max_size_x: (max_size_x || "").replace(/\D/g, "")
            }
          });
          this.handleAttrValueClick({
            type: "size_y",
            color: "#F17851",
            value: {
              min_size_y: (min_size_y || "").replace(/\D/g, ""),
              max_size_y: (max_size_y || "").replace(/\D/g, "")
            }
          });
          this.handleAttrValueClick({
            type: "size_z",
            color: "#F17851",
            value: {
              min_size_z: (min_size_z || "").replace(/\D/g, ""),
              max_size_z: (max_size_z || "").replace(/\D/g, "")
            }
          });
          break;
        }
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

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
    overflow: hidden;
    .scroll-section {
      width: calc(100% + 15px);
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
          padding-bottom: 0;
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
                &.active {
                  color: @primaryColor;
                }
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
    .price-wrapper {
      .price-content {
        padding: 15px 10px;
      }
      .price-list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 15px;
        .price-item {
          padding: 5px;
          font-size: 12px;
          line-height: 1;
          color: #111;
          background: #f4f4f4;
          cursor: pointer;
          & + .price-item {
            margin-left: 10px;
          }
        }
      }
      .price-input-wrapper {
        display: flex;
        align-items: center;
        .price-input {
          flex: 1;
          width: 5px;
          margin-right: 10px;
        }
        .price-order {
          width: 74px;
          /deep/.el-select {
            position: relative;
            &::before,
            &::after {
              position: absolute;
              left: 7px;
              width: 0px;
              height: 0px;
              border-left: 4px solid transparent;
              border-right: 5px solid transparent;
              font-size: 0px;
              line-height: 0px;
              content: "";
              z-index: 1;
            }
            &::before {
              top: 8px;
              border-bottom: 4px solid #cccccc;
            }
            &::after {
              bottom: 8px;
              border-top: 4px solid #cccccc;
            }
            .el-input__inner {
              padding: 0 5px 0 20px;
              height: 27px;
              line-height: 27px;
              font-size: 12px;
              color: #666666;
              border-color: #efefef;
            }
            .el-input__suffix {
              display: none;
            }
          }
        }
      }
    }
    .number-input {
      display: flex;
      align-items: center;
      border: 1px solid #efefef;
      background: #fafafa;
      .border {
        display: inline-block;
        width: 8px;
        height: 1px;
        background: #666;
      }
      /deep/.el-input {
        flex: 1;
        line-height: 27px;
        .el-input__inner {
          height: 27px;
          line-height: 27px;
          border: unset;
          background: #fafafa;
          text-align: center;
          &::placeholder {
            color: #999;
          }
        }
      }
    }
    .operate-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      height: 34px;
      background: #fff;
      border-top: 1px solid #efefef;
      label {
        flex: 1;
        display: block;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
      }
      .reset-btn {
        color: #666;
        border-right: 1px solid #efefef;
      }
      .confirm-btn {
        color: @primaryColor;
      }
    }
    .size-wrapper {
      width: 100%;
      .size-content {
        width: 100%;
        padding: 15px 10px;
        display: flex;
        align-items: center;
        img {
          display: inline-block;
          width: 95px;
          height: 85px;
          margin-right: 15px;
        }
        .size-input-wrapper {
          flex: 1;
          width: 5px;
          .size-input {
            & + .size-input {
              margin-top: 10px;
            }
          }
        }
      }
    }
    .system-attr-wrapper {
      padding: 15px 10px 0;
      .value-list {
        display: flex;
        flex-wrap: wrap;
        .value-item {
          margin-right: 10px;
          margin-bottom: 15px;
          padding: 5px;
          font-size: 12px;
          color: #111;
          background: #f4f4f4;
          cursor: pointer;
        }
        .value-color {
          display: flex;
          align-items: center;
          margin-right: 10px;
          margin-bottom: 15px;
          font-size: 12px;
          color: #111;
          cursor: pointer;
          span {
            position: relative;
            display: inline-block;
            margin-right: 4px;
            width: 16px;
            height: 16px;
          }
          &.active {
            span {
              &::before {
                position: absolute;
                top: -2px;
                left: -2px;
                width: 18px;
                height: 18px;
                content: "";
                border: 1px solid #d6d6d6;
              }
            }
          }
        }
      }
    }
    .filter-wrapper {
      padding: 15px 10px 0;
      .attr-list {
        .attr-name {
          display: block;
          margin-bottom: 10px;
          line-height: 1;
          font-size: 12px;
          color: #666666;
        }
        .value-list {
          display: flex;
          flex-wrap: wrap;
          .value-item {
            margin-right: 10px;
            margin-bottom: 15px;
            padding: 5px;
            line-height: 1;
            font-size: 12px;
            color: #111;
            background: #f4f4f4;
            cursor: pointer;
            &.active {
              color: #9f8164;
              background: #fbf5f0;
            }
          }
        }
      }
    }
  }
}
</style>

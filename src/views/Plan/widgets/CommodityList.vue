<template>
  <div class="list-wrapper">
    <div class="brief" v-if="!full_screen">
      <div class="list-header">
        <label class="price" v-if="!up">¥{{ totalPrice }}</label>
        <label v-else class="header-title">已选商品清单</label>
        <div class="operate-wrapper">
          <label
            class="full_screen-icon bgImg"
            @click="toggleFullScreen"
          ></label>
          <label
            :class="['bgImg', up ? 'down-icon' : 'up-icon']"
            @click="toggleUp"
          ></label>
        </div>
      </div>
      <div class="list-content">
        <div class="scroll-section">
          <div
            class="list-section"
            v-for="(item, key) of listing.list"
            :key="key"
          >
            <h3 class="list-title">
              {{ item.typeName }}
            </h3>
            <ul class="sku-list">
              <li
                class="sku-item"
                v-for="good of item.softOutfits"
                :key="good.brandGoodId"
              >
                <the-loading-image
                  :width="50"
                  :height="50"
                  :url="good.sku.img_id"
                />
                <div class="sku-content">
                  <label class="sku-name ellipsis">
                    {{ good.sku.name }}
                  </label>
                  <label class="sku-size">
                    {{
                      `${good.sku.size_x}*${good.sku.size_y}*${good.sku.size_z} mm`
                    }}
                  </label>
                </div>
                <div class="sku-footer">
                  <label class="sku-price">
                    {{ `¥${good.sku.unit_price}` }}
                  </label>
                  <label class="sku-number"> ×{{ good.number }} </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="list-footer">
        <label class="price">¥{{ totalPrice }}</label>
      </div>
    </div>
    <div :class="['full', headerUnfold ? 'unfold' : '']" v-else>
      <div class="container-1200"></div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import { mapState } from "vuex";

export default {
  name: "CommodityList",
  components: { TheLoadingImage },
  props: {
    up: {
      type: Boolean,
      default: false
    },
    full_screen: {
      type: Boolean,
      default: false
    },
    listingBrief: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["headerUnfold"]),
    listing() {
      const res = JSON.parse(JSON.stringify(this.listingBrief));
      const list = res.list;
      const skus = res.skus;
      const goods = res.goods;
      list.map(item => {
        item.softOutfits.map(good => {
          const sku = skus.find(sku => sku.kjl_sku_id === good.brandGoodId);
          good.sku = sku;
        });
      });
      goods.map(good => {
        const sku = skus.find(sku => sku.kjl_sku_id === good.brandGoodId);
        good.sku = sku;
      });
      return res;
    },
    totalPrice() {
      const goods = this.listing.goods;
      let total = 0;
      goods.map(good => {
        total += good.sku.unit_price * good.number;
      });
      return total.toFixed(2);
    }
  },
  methods: {
    toggleUp() {
      this.$emit("update:up", !this.up);
    },
    toggleFullScreen() {
      this.$emit("update:full_screen", !this.full_screen);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@padding: 10px;
.list-wrapper {
  width: 100%;
  height: 100%;
  .brief {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #fff;
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 10px;
      width: 100%;
      height: 48px;
      background: @primaryColor;
      .price {
        line-height: 30px;
        font-weight: 600;
        font-size: 30px;
        color: #fff;
      }
      .header-title {
        line-height: 1;
        font-size: 16px;
        color: #fff;
      }
      .operate-wrapper {
        display: flex;
        align-items: center;
        .bgImg {
          width: 24px;
          height: 24px;
          cursor: pointer;
          & + .bgImg {
            margin-left: 10px;
          }
        }
        .full_screen-icon {
          background-image: url("~images/commodity/full_screen.svg");
        }
        .up-icon,
        .down-icon {
          background-image: url("~images/commodity/up.svg");
        }
        .down-icon {
          transform: rotate(180deg);
        }
      }
    }
    .list-content {
      flex: 1;
      width: 100%;
      height: 5px;
      overflow: hidden;
      .scroll-section {
        width: calc(100% + 15px);
        height: 100%;
        padding: 0 @padding @padding;
        overflow-y: scroll;
      }
      .list-section {
        .list-title {
          padding: @padding 0;
          line-height: 1;
          font-weight: 600;
          font-size: 14px;
          color: #000;
        }
        .sku-list {
          display: flex;
          flex-direction: column;
          .sku-item {
            display: flex;
            align-items: center;
            height: 50px;
            .sku-content {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              flex-direction: column;
              flex: 1;
              width: 5px;
              height: 100%;
              margin: 0 10px;
              .sku-name {
                width: 100%;
                font-size: 14px;
                color: #111111;
              }
              .sku-size {
                padding: 6px 8px;
                line-height: 1;
                font-size: 12px;
                color: #666666;
                background: #f4f4f4;
              }
            }
            .sku-footer {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              justify-content: space-between;
              height: 100%;
              .sku-price {
                line-height: 1;
                font-weight: 600;
                font-size: 14px;
                color: @primaryColor;
              }
              .sku-number {
                line-height: 1;
                font-size: 14px;
                color: #111111;
              }
            }
            & + .sku-item {
              margin-top: 20px;
            }
          }
        }
      }
    }
    .list-footer {
      width: 100%;
      height: 48px;
      border-top: 1px solid #efefef;
      padding: 0 @padding;
      .price {
        line-height: 48px;
        font-weight: 600;
        font-size: 30px;
        color: @primaryColor;
      }
    }
  }
  .full {
    position: fixed !important;
    top: 14px !important;
    left: 0;
    width: 100%;
    height: calc(100vh - 14px);
    background: #e5e5e5;
    z-index: 20;
    &.unfold {
      top: 52px !important;
      height: calc(100vh - 52px);
    }
    width: 100%;
    height: 100%;
    .container-1200 {
      height: 100%;
      background: red;
    }
  }
}
</style>

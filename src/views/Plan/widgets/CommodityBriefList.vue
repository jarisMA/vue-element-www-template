<template>
  <div :class="['list-wrapper']">
    <div :class="['brief', briefTheme]">
      <div class="list-header">
        <label class="price-wrapper">
          <template v-if="!refreshing">
            <label class="price"
              ><span class="price-unit">¥</span>{{ totalPrice }}</label
            >
            <label
              class="refresh-price ellipsis"
              @click="!refreshing ? handleRefreshPrice() : null"
            >
              <i :class="['refresh-icon', refreshing ? 'refreshing' : '']"></i
              >更新总价
            </label>
          </template>
          <div class="refreshing-wrapper animation" v-else>
            <div class="refreshing-icon icon-1"></div>
            <div class="refreshing-icon icon-2"></div>
            <div class="refreshing-icon icon-3"></div>
            <div class="refreshing-icon icon-4"></div>
          </div>
        </label>
        <div class="operate-wrapper">
          <label
            class="full_screen-icon bgImg"
            @click="toggleFullScreen"
          ></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { goRoute } from "utils/routes";
export default {
  name: "CommodityBriefList",
  props: {
    full_screen: {
      type: Boolean,
      default: false
    },
    listingBrief: {
      type: Object,
      required: true
    },
    refreshing: {
      type: Boolean,
      default: false
    },
    briefTheme: {
      type: String,
      default: "primary"
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["headerUnfold", "userInfo"]),
    listing() {
      const res = JSON.parse(JSON.stringify(this.listingBrief));
      const { list, skus, goods } = res;

      let listArr = [];
      let goodsArr = [];
      list.map(item => {
        let flag = false;
        item.softOutfits.map(good => {
          const sku = skus.find(
            sku =>
              sku.kjl_sku_id === good.brandGoodId &&
              this.purchase_url(sku.purchase_url)
          );
          good.sku = sku;
          sku && (flag = true);
        });
        item.softOutfits = item.softOutfits.filter(good => !!good.sku);
        flag && listArr.push(item);
      });

      goods.map(good => {
        const sku = skus.find(
          sku =>
            sku.kjl_sku_id === good.brandGoodId &&
            this.purchase_url(sku.purchase_url)
        );
        good.sku = sku;
        sku && goodsArr.push(good);
      });
      return {
        goods: goodsArr,
        list: listArr,
        skus
      };
    },
    totalPrice() {
      const goods = this.listing.goods;
      let total = 0;
      goods.map(good => {
        if (good.sku) {
          total += good.sku.unit_price * good.number;
        }
      });
      return total.toFixed(2);
    },
    purchase_url() {
      return url => {
        if (!url) {
          return false;
        }
        url = JSON.parse(url);
        if (url.length > 0) {
          return url[0].url;
        }
        return false;
      };
    }
  },
  created() {},
  methods: {
    goRoute,
    toggleFullScreen() {
      this.$emit("update:full_screen", !this.full_screen);
    },
    handleRefreshPrice() {
      this.$emit("refreshPrice");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@padding: 10px;
@refreshingDuration: 0.8s;
@keyframes refreshing {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
.list-wrapper {
  width: 100%;
  height: 100%;
  &.full_screen {
    transform: unset !important;
  }
  .refreshing-wrapper {
    margin-left: 20px;
    .refreshing-icon {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #fff;
      & + .refreshing-icon {
        margin-left: 10px;
      }
      &.icon-1 {
        animation: refreshing @refreshingDuration ease-out infinite;
      }
      &.icon-2 {
        animation: refreshing @refreshingDuration @refreshingDuration / 4 * 1
          ease-out infinite;
      }
      &.icon-3 {
        animation: refreshing @refreshingDuration @refreshingDuration / 4 * 2
          ease-out infinite;
      }
      &.icon-4 {
        animation: refreshing @refreshingDuration @refreshingDuration / 4 * 3
          ease-out infinite;
      }
    }
  }
  .brief {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #fff;
    &.white {
      .refreshing-wrapper {
        .refreshing-icon {
          background: @primaryColor;
        }
      }
      .list-header {
        border-top: 1px solid #efefef;
        background: #fff;
        .price-wrapper {
          .price {
            color: @primaryColor;
          }
          .refresh-price {
            color: @primaryColor;
            .refresh-icon {
              background: @primaryColor;
            }
          }
        }
        .operate-wrapper {
          .full_screen-icon {
            background: @primaryColor;
          }
        }
      }
    }
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 10px;
      width: 100%;
      height: 48px;
      background: @primaryColor;
      .price-wrapper {
        flex: 1;
        display: flex;
        align-items: flex-end;
        .refresh-price {
          flex: 1;
          display: flex;
          align-items: center;
          margin-left: 8px;
          margin-bottom: 3px;
          font-size: 12px;
          color: #ffffff;
          cursor: pointer;
          .refresh-icon {
            display: inline-block;
            margin-right: 2px;
            width: 16px;
            height: 16px;
            background: #fff;
            mask: url("~images/common/refresh.svg") no-repeat center;
            // &.refreshing {
            //   animation: refreshing @refreshingDuration linear infinite;
            // }
          }
        }
      }
      .price {
        flex: none;
        line-height: 30px;
        font-weight: 600;
        font-size: 30px;
        color: #fff;
        .price-unit {
          display: inline-block;
          margin-right: 4px;
          margin-bottom: 3px;
          font-weight: 600;
          font-size: 16px;
          line-height: 16px;
          vertical-align: baseline;
        }
      }
      .header-title {
        line-height: 1;
        font-size: 16px;
        color: #fff;
      }
      .operate-wrapper {
        flex: none;
        display: flex;
        align-items: center;
        margin-left: 4px;
        .bgImg {
          width: 24px;
          height: 24px;
          cursor: pointer;
          & + .bgImg {
            margin-left: 10px;
          }
        }
        .full_screen-icon {
          mask: url("~images/commodity/pull.svg") center no-repeat;
          background: #fff;
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
  }
}
</style>

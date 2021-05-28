<template>
  <div :class="['list-wrapper', full_screen ? 'full_screen' : '']">
    <div class="brief" v-show="!full_screen">
      <div class="list-header">
        <label class="price-wrapper" v-if="!up">
          <label class="price">¥{{ totalPrice }}</label>
          <label
            class="refresh-price ellipsis"
            @click="!refreshing ? handleRefreshPrice() : null"
          >
            <i :class="['refresh-icon', refreshing ? 'refreshing' : '']"></i
            >更新总价
          </label>
        </label>
        <label v-else class="header-title">已选商品清单</label>
        <div class="operate-wrapper">
          <label
            v-if="up"
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
              <template v-for="good of item.softOutfits">
                <li class="sku-item" v-if="good.sku" :key="good.brandGoodId">
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
                        `${good.sku.size_x || 0}*${good.sku.size_y || 0}*${good
                          .sku.size_z || 0} mm`
                      }}
                    </label>
                  </div>
                  <div class="sku-footer">
                    <label class="sku-price">
                      {{ `¥${good.sku.unit_price || "-"}` }}
                    </label>
                    <label class="sku-number"> ×{{ good.number }} </label>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <div class="list-footer">
        <label class="price-wrapper">
          <label class="price">¥{{ totalPrice }}</label>
          <label
            class="refresh-price ellipsis"
            @click="!refreshing ? handleRefreshPrice() : null"
          >
            <i :class="['refresh-icon', refreshing ? 'refreshing' : '']"></i
            >更新总价
          </label>
        </label>
      </div>
    </div>
    <div :class="['full', headerUnfold ? 'unfold' : '']" v-show="full_screen">
      <div class="container-1200-wrapper">
        <div class="container-1200">
          <div class="list-content">
            <h3 class="list-title">
              已选商品清单
              <label
                class="full_screen-icon bgImg"
                @click="toggleFullScreen"
              ></label>
            </h3>
            <div class="plan-desc">
              <label class="plan-name">
                方案名称 <span>{{ design.name || "-" }}</span>
              </label>
              <label class="plan-aulabelor">
                设计师 <span>{{ userInfo.nickname }}</span>
              </label>
              <label class="plan-type">
                房型信息
                <span class="plan-spec">{{ design.srcArea || "-" }}㎡</span
                >|<span>{{ design.specName || "-" }}</span>
              </label>
            </div>
            <div class="list-desc">
              <div
                class="list-section"
                v-for="(item, key) of listing.list"
                :key="key"
              >
                <h3 class="list-spec">
                  {{ item.typeName }}
                </h3>
                <ul class="table">
                  <li class="table-header">
                    <label class="order-label">序号</label>
                    <label class="img-label">产品图</label>
                    <label class="name-label">产品名称</label>
                    <label class="brand-label">品牌</label>
                    <label class="size-label">尺寸(mm)</label>
                    <label class="unit-label">单位</label>
                    <label class="number-label">数量</label>
                    <label class="code-label">SKU编码</label>
                    <label class="amount-label">返现/个</label>
                    <label class="price-label">单价</label>
                    <label class="total-label">总价</label>
                    <label class="link-label">购买</label>
                    <label class="remark-label">通用备注</label>
                  </li>
                  <template v-for="(good, gid) of item.softOutfits">
                    <li
                      class="table-tr"
                      v-if="good.sku"
                      :key="good.brandGoodId"
                    >
                      <label class="order-label">{{
                        `${key + 1}-${gid + 1}`
                      }}</label>
                      <label class="img-label">
                        <the-loading-image
                          :width="50"
                          :height="50"
                          :url="good.sku.img_id"
                        />
                      </label>
                      <label class="name-label">{{ good.sku.name }}</label>
                      <label class="brand-label">{{
                        (good.sku.brand && good.sku.brand.name) || "-"
                      }}</label>
                      <label class="size-label">{{
                        `${good.sku.size_x || 0}*${good.sku.size_y || 0}*${good
                          .sku.size_z || 0}`
                      }}</label>
                      <label class="unit-label">{{ good.unit }}</label>
                      <label class="number-label">{{ good.number }}</label>
                      <label class="code-label">{{
                        good.sku.product_number
                      }}</label>
                      <label class="amount-label"
                        >¥{{ good.sku.cashback_amount || "-" }}</label
                      >
                      <label class="price-label"
                        >¥{{ good.sku.unit_price || "-" }}</label
                      >
                      <label class="total-label"
                        >¥{{
                          (good.sku.unit_price * good.number).toFixed(2)
                        }}</label
                      >
                      <label
                        :class="[
                          'link-label',
                          purchase_url(good.sku.purchase_url) ? 'bgImg' : ''
                        ]"
                        @click="
                          purchase_url(good.sku.purchase_url)
                            ? goRoute(
                                purchase_url(good.sku.purchase_url),
                                '_blank'
                              )
                            : ''
                        "
                      >
                        {{ good.sku.tb_purchase_url ? "" : "-" }}
                      </label>
                      <label class="remark-label">{{
                        good.sku.remark || "-"
                      }}</label>
                    </li>
                  </template>
                </ul>
                <div class="section-footer">
                  <label class="number">
                    {{ number(item.softOutfits) }}件商品
                  </label>
                  <label class="total">
                    小计：¥{{ price(item.softOutfits) }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-footer">
        <div class="footer-content">
          <label class="price-wrapper">
            <label class="price">¥{{ totalPrice }}</label>
            <label
              class="refresh-price ellipsis"
              @click="!refreshing ? handleRefreshPrice() : null"
            >
              <i :class="['refresh-icon', refreshing ? 'refreshing' : '']"></i
              >更新总价
            </label>
          </label>
          <label class="number"> 共{{ totalNumber }}件商品 </label>
        </div>
        <div class="footer-operate" @click="download">
          <label class="export-icon bgImg"></label>导出Excel
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import { mapState } from "vuex";
import { goRoute } from "utils/routes";
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
    },
    design: {
      type: Object,
      required: true
    },
    refreshing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["headerUnfold", "userInfo"]),
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
    number() {
      return arr => {
        let count = 0;
        arr.map(item => {
          if (item.sku) {
            count += item.number;
          }
        });
        return count;
      };
    },
    price() {
      return arr => {
        let price = 0;
        arr.map(item => {
          if (item.sku) {
            price += item.number * item.sku.unit_price;
          }
        });
        return price.toFixed(2);
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
    totalNumber() {
      const goods = this.listing.goods;
      let total = 0;
      goods.map(good => {
        if (good.sku) {
          total += good.number;
        }
      });
      return total;
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
    toggleUp() {
      this.$emit("update:up", !this.up);
    },
    toggleFullScreen() {
      this.$emit("update:full_screen", !this.full_screen);
    },
    download() {
      // 列标题
      let str = `<tr>
                  <td colspan="13">
                    <label>方案名称: ${this.design.name}</label><br />
                    <label>设计师: ${this.userInfo.nickname}</label><br />
                    <label>
                      房型信息: ${this.design.srcArea || "-"}㎡ | ${this.design
        .specName || "-"}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td colspan="13"></td>
                </tr>
                <tr>
                  <td>区域</td>
                  <td width="120">产品图</td>
                  <td>产品名称</td>
                  <td>品牌</td>
                  <td>尺寸(mm)</td>
                  <td>单位</td>
                  <td>数量</td>
                  <td>SKU编码</td>
                  <td>返现/个</td>
                  <td>单价</td>
                  <td>购买</td>
                  <td>通用备注</td>
                  <td>总价</td>
                </tr>`;
      // 循环遍历，每行加入tr标签，每个单元格加td标签
      this.listing.list.map(list => {
        list.softOutfits.map(good => {
          if (good.sku) {
            str += `<tr>
                    <td>${list.typeName}\t</td>
                    <td height="120">
                      <img width="60" height="60" src="${good.sku.img_id}" />\t
                    </td>
                    <td>${good.sku.name}\t</td>
                    <td>${(good.sku.brand && good.sku.brand.name) || "-"}\t</td>
                    <td>
                      ${`${good.sku.size_x || 0}*${good.sku.size_y || 0}*${good
                        .sku.size_z || 0}`}\t
                    </td>
                    <td>${good.unit}\t</td>
                    <td>${good.number}\t</td>
                    <td>${good.sku.product_number || "-"}\t</td>
                    <td>¥${good.sku.cashback_amount || "-" + ""}\t</td>
                    <td>¥${good.sku.unit_price || "-" + ""}\t</td>
                    <td>
                      ${
                        this.purchase_url(good.sku.purchase_url)
                          ? `<a href='${this.purchase_url(
                              good.sku.purchase_url
                            )}'>
                        ${this.purchase_url(good.sku.purchase_url)}
                        </a>`
                          : "-"
                      }\t
                    </td>
                    <td>${good.sku.remark || "-"}\t</td>
                    <td>
                      ¥${(good.sku.unit_price * good.number).toFixed(2)}\t
                    </td>
                  </tr>`;
          }
        });
      });
      str += `<tr>
                <td colspan="13" align="right">
                  总价: ¥${this.totalPrice}
                </td>
              </tr>`;
      // Worksheet名
      const worksheet = "Sheet1";
      const uri = "data:application/vnd.ms-excel;base64,";

      // 下载的表格模板数据
      const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
        xmlns:x="urn:schemas-microsoft-com:office:excel" 
        xmlns="http://www.w3.org/TR/REC-html40">
        <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
      // 下载模板
      const eleLink = document.createElement("a");
      eleLink.download = this.design.name + "-清单";
      eleLink.style.display = "none";
      eleLink.href = uri + window.btoa(unescape(encodeURIComponent(template)));
      eleLink.target = "_new";
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
      window.URL.revokeObjectURL(eleLink.href);
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
@keyframes refreshing {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@refreshingDuration: 0.7s;
.list-wrapper {
  width: 100%;
  height: 100%;
  &.full_screen {
    transform: unset !important;
  }
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
      .price-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        .refresh-price {
          flex: 1;
          display: flex;
          align-items: center;
          margin-left: 8px;
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
            &.refreshing {
              animation: refreshing @refreshingDuration linear infinite;
            }
          }
        }
      }
      .price {
        flex: none;
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
        &::-webkit-scrollbar {
          width: 15px;
        }
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
      .price-wrapper {
        display: flex;
        align-items: center;
        .price {
          line-height: 48px;
          font-weight: 600;
          font-size: 30px;
          color: @primaryColor;
        }
        .refresh-price {
          display: flex;
          align-items: center;
          margin-left: 8px;
          font-size: 12px;
          color: @primaryColor;
          cursor: pointer;
          .refresh-icon {
            display: inline-block;
            margin-right: 2px;
            width: 16px;
            height: 16px;
            background: @primaryColor;
            mask: url("~images/common/refresh.svg") no-repeat center;
            &.refreshing {
              animation: refreshing @refreshingDuration linear infinite;
            }
          }
        }
      }
    }
  }
  .full {
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 14px;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: #fff;
    z-index: 20;
    transition: all 0.5s;
    &.unfold {
      padding-top: 52px;
    }
    .container-1200-wrapper {
      flex: 1;
      width: 100%;
      height: 5px;
      overflow: auto;
    }
    .container-1200 {
      .list-content {
        flex: 1;
        padding: 60px 0;
        .list-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          line-height: 1;
          font-weight: 600;
          font-size: 24px;
          color: #111111;
          .full_screen-icon {
            width: 24px;
            height: 24px;
            background-image: url("~images/commodity/zoom_out.svg");
            cursor: pointer;
          }
        }
        .plan-desc {
          padding-bottom: 12px;
          border-bottom: 1px solid #eeeeee;
          label {
            line-height: 1;
            font-size: 12px;
            color: #666666;
            span {
              display: inline-block;
              margin-left: 10px;
              color: #000;
              &.plan-spec {
                margin-right: 10px;
              }
            }
            & + label {
              margin-left: 20px;
            }
          }
        }
        .list-desc {
          .list-section {
            margin-top: 20px;
            .list-spec {
              margin-bottom: 10px;
              line-height: 1;
              font-weight: 600;
              font-size: 14px;
              color: #111111;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              border-bottom: 1px solid #eee;
              .table-header {
                display: flex;
                border-top: 1px solid #eeeeee;
                border-bottom: 1px solid #eeeeee;
                label {
                  display: inline-block;
                  text-align: left;
                  line-height: 1;
                  font-weight: normal !important;
                  font-size: 12px;
                  color: #666666 !important;
                  padding: 10px 0;
                  & + label {
                    margin-left: 10px;
                  }
                }
              }
              .table-tr {
                display: flex;
                align-items: center;
                padding: 10px 0;
                label {
                  line-height: 21px;
                  font-size: 12px;
                  color: #111;
                  &.link-label {
                    text-align: center;
                    &.bgImg {
                      width: 24px;
                      height: 24px;
                      background-image: url("~images/commodity/shopping_cart.svg");
                      cursor: pointer;
                    }
                  }
                  & + label {
                    margin-left: 10px;
                  }
                }
              }
              label {
                &.order-label {
                  width: 32px;
                  color: #666666;
                }
                &.img-label {
                  width: 50px;
                }
                &.name-label {
                  flex: 1;
                  width: 5px;
                  font-weight: 600;
                }
                &.brand-label {
                  width: 84px;
                }
                &.size-label {
                  width: 110px;
                }
                &.unit-label {
                  width: 24px;
                }
                &.number-label {
                  width: 24px;
                }
                &.code-label {
                  width: 110px;
                }
                &.amount-label {
                  width: 80px;
                }
                &.price-label {
                  width: 80px;
                }
                &.total-label {
                  width: 80px;
                  font-weight: 600;
                  color: @primaryColor;
                }
                &.link-label {
                  width: 24px;
                }
                &.remark-label {
                  width: 175px;
                }
              }
            }
            .section-footer {
              margin-top: 12px;
              text-align: right;
              .number {
                line-height: 16px;
                font-size: 12px;
                color: #111;
              }
              .total {
                display: inline-block;
                margin-left: 20px;
                line-height: 1;
                font-weight: 600;
                font-size: 16px;
                color: @primaryColor;
              }
            }
          }
        }
      }
    }
    .list-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;
      background: @primaryColor;
      .footer-content {
        display: flex;
        align-items: center;
        padding-left: 20px;
        height: 30px;
        font-size: 12px;
        line-height: 12px;
        color: #ffffff;
        .price-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          .price {
            display: inline-block;
            font-weight: 600;
            font-size: 30px;
          }
          .refresh-price {
            flex: 1;
            display: flex;
            align-items: center;
            margin-left: 8px;
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
              &.refreshing {
                animation: refreshing @refreshingDuration linear infinite;
              }
            }
          }
        }

        .number {
          display: inline-block;
          margin-left: 10px;
        }
      }
      .footer-operate {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 118px;
        height: 100%;
        font-size: 12px;
        color: #fff;
        background: #6764ff;
        cursor: pointer;
        .export-icon {
          width: 24px;
          height: 24px;
          background-image: url("~images/commodity/export.svg");
        }
      }
    }
  }
}
</style>

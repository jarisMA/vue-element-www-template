<template>
  <el-drawer
    :class="['list-wrapper']"
    :visible="full_screen"
    :show-close="false"
    :modal-append-to-body="false"
    :before-close="toggleFullScreen"
    direction="ltr"
    size="1260px"
  >
    <div :class="['full-main-wrapper', headerUnfold ? 'unfold' : '']">
      <div class="container-1180-wrapper">
        <div class="container-1180">
          <div class="list-content">
            <div class="list-content-top">
              <h3 class="list-title">
                商品清单
                <label
                  class="close-icon bgImg"
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
                <label class="plan-area">
                  面积
                  <span>{{ design.srcArea || "-" }}㎡ </span>
                </label>
                <label class="plan-type">
                  房型
                  <span>{{ design.specName || "-" }}</span>
                </label>
              </div>
            </div>
            <div class="list-content-main">
              <div class="list-desc">
                <template v-for="(item, key) of listing.list">
                  <div
                    class="list-section"
                    v-if="number(item.softOutfits) > 0"
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
                        <label class="number-label">数量</label>
                        <label class="unit-label">单位</label>
                        <label class="price-label">单价</label>
                        <label class="total-label">总价</label>
                        <label class="link-label">购买</label>
                        <label class="amount-label">返现/个</label>
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
                            `${good.sku.size_x || 0}*${good.sku.size_y ||
                              0}*${good.sku.size_z || 0}`
                          }}</label>
                          <label class="number-label">{{ good.number }}</label>
                          <label class="unit-label">{{ good.unit }}</label>
                          <label class="price-label"
                            >¥{{ good.sku.unit_price || "-" }}</label
                          >
                          <label class="total-label"
                            >¥{{
                              (good.sku.unit_price * good.number).toFixed(2)
                            }}</label
                          >
                          <label
                            :class="['link-label', 'bgImg']"
                            @click="
                              goRoute(
                                purchase_url(good.sku.purchase_url),
                                '_blank'
                              )
                            "
                          >
                          </label>
                          <label class="amount-label"
                            >¥{{ good.sku.cashback_amount || "-" }}</label
                          >
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
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-footer">
        <div class="footer-content">
          <div class="footer-content-left" v-if="!refreshing">
            <label class="price-wrapper">
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
            </label>
          </div>
          <div class="refreshing-wrapper animation" v-else>
            <div class="refreshing-icon icon-1"></div>
            <div class="refreshing-icon icon-2"></div>
            <div class="refreshing-icon icon-3"></div>
            <div class="refreshing-icon icon-4"></div>
          </div>
          <div class="footer-content-right">
            <label class="number"> 共 {{ totalNumber }} 件商品 </label>
          </div>
        </div>
        <div class="footer-operate" @click="download">
          <label class="export-icon bgImg"></label>导出Excel
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import { mapState } from "vuex";
import { goRoute } from "utils/routes";
export default {
  name: "CommodityFullList",
  components: { TheLoadingImage },
  props: {
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
    number() {
      return arr => {
        let count = 0;
        arr.map(item => {
          count += item.number;
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
                  <td>数量</td>
                  <td>单位</td>
                  <td>单价</td>
                  <td>购买</td>
                  <td>返现/个</td>
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
                    <td>${good.number}\t</td>
                    <td>${good.unit}\t</td>
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
                    <td>¥${good.sku.cashback_amount || "-" + ""}\t</td>
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
  /deep/ .el-drawer__container {
    .el-drawer__header {
      display: none;
    }
    .el-drawer__body {
    }
  }
  .full-main-wrapper {
    display: flex;
    flex-direction: column;
    width: 1260px;
    height: 100vh;
    padding-top: 14px;
    background: #fff;
    &.unfold {
      padding-top: 52px;
    }
    .container-1180-wrapper {
      flex: 1;
      width: 100%;
      height: 5px;
      overflow: hidden;
    }
    .container-1180 {
      height: 100%;
      .list-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 40px 0 0;
        .list-content-top {
          flex: none;
          .list-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            line-height: 1;
            font-weight: 600;
            font-size: 24px;
            color: #2c3330;
            .full_screen-icon {
              width: 24px;
              height: 24px;
              background-image: url("~images/commodity/zoom_out.svg");
              cursor: pointer;
            }
            .close-icon {
              width: 24px;
              height: 24px;
              background-image: url("~images/commodity/close.svg");
              cursor: pointer;
            }
          }
          .plan-desc {
            padding-bottom: 20px;
            border-bottom: 1px dashed #ccc;
            label {
              line-height: 24px;
              font-size: 14px;
              color: #81948b;
              span {
                display: inline-block;
                margin-left: 4px;
                color: #2c3330;
                &.plan-spec {
                  margin-right: 10px;
                }
              }
              & + label {
                margin-left: 20px;
              }
            }
          }
        }
        .list-content-main {
          flex: 1;
          height: 5px;
          padding-bottom: 40px;
          overflow: auto;
          &::-webkit-scrollbar {
            width: 0;
          }
          .list-desc {
            .list-section {
              margin-top: 20px;
              .list-spec {
                margin-top: 20px;
                margin-bottom: 24px;
                line-height: 1;
                font-weight: 600;
                font-size: 20px;
                color: #2c3330;
              }
              .table {
                width: 100%;
                border-collapse: collapse;
                .table-header {
                  display: flex;
                  justify-content: center;
                  background: #fafafa;
                  label {
                    display: inline-block;
                    text-align: center;
                    line-height: 24px;
                    font-weight: normal !important;
                    font-size: 14px;
                    color: #606c66 !important;
                    padding: 12px 0;
                    text-align: center;
                    & + label {
                      margin-left: 16px;
                    }
                  }
                }
                .table-tr {
                  display: flex;
                  align-items: center;
                  padding: 16px 12px;
                  border-bottom: 1px solid #efefef;
                  label {
                    line-height: 24px;
                    font-size: 14px;
                    color: #2c3330;
                    text-align: center;
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
                      margin-left: 16px;
                    }
                  }
                }
                label {
                  &.order-label {
                    width: 44px;
                  }
                  &.img-label {
                    width: 50px;
                  }
                  &.name-label {
                    width: 260px;
                  }
                  &.brand-label {
                    width: 112px;
                  }
                  &.size-label {
                    width: 120px;
                  }
                  &.number-label {
                    width: 28px;
                  }
                  &.unit-label {
                    width: 28px;
                  }
                  &.price-label {
                    width: 80px;
                  }
                  &.total-label {
                    width: 80px;
                  }
                  &.link-label {
                    width: 28px;
                  }
                  &.amount-label {
                    width: 60px;
                  }
                  &.remark-label {
                    width: 90px;
                  }
                }
              }
              .section-footer {
                margin-top: 16px;
                text-align: right;
                .number {
                  line-height: 24px;
                  font-size: 14px;
                  color: #606c66;
                }
                .total {
                  display: inline-block;
                  margin-left: 23px;
                  line-height: 24px;
                  font-weight: 600;
                  font-size: 14px;
                  color: @primaryColor;
                }
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
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px 0 20px;
        height: 30px;
        font-size: 12px;
        line-height: 12px;
        color: #ffffff;
        .price-wrapper {
          flex: 1;
          display: flex;
          align-items: flex-end;
          height: 30px;
          .price {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            font-weight: 600;
            font-size: 30px;
            .price-unit {
              display: inline-block;
              margin-right: 4px;
              font-weight: 600;
              font-size: 16px;
              line-height: 16px;
              vertical-align: baseline;
            }
          }
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
        .number {
          display: inline-block;
          font-size: 14px;
          color: #fff;
        }
      }
      .footer-operate {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140px;
        height: 100%;
        font-size: 14px;
        color: #fff;
        background: #6764ff;
        cursor: pointer;
        .export-icon {
          width: 24px;
          height: 24px;
          margin-right: 4px;
          background-image: url("~images/commodity/export.svg");
        }
      }
    }
  }
}
</style>

<template>
  <div class="page" v-loading="loading">
    <div class="page-header">
      <div class="page-header-left">
        <i class="page-header-logo" @click="goHome('_blank')"></i>
        <h4 class="page-header-title">结算台</h4>
      </div>
      <div class="page-header-right">
        <the-avatar
          @click.native="goMyCourse('_blank')"
          :size="32"
          :url="userInfo.avatar_url"
        />
      </div>
    </div>
    <div class="page-content">
      <div class="container-1180">
        <div class="page-content-commodity">
          <h4 class="page-content-title">商品信息</h4>
          <ul class="commodity-table">
            <li class="table-th">
              <label class="tb-pic" v-if="order.resource.cover_url"
                >商品图</label
              >
              <label class="tb-name">商品名称</label>
              <label class="tb-type">类型</label>
              <label class="tb-price">单价</label>
              <label class="tb-count">数量</label>
              <label class="tb-sum">小计</label>
            </li>
            <li class="table-tr">
              <the-loading-image
                class="tb-pic"
                v-if="order.resource.cover_url"
                :width="80"
                :height="80"
                :url="order.resource.cover_url"
              />
              <label class="tb-name">
                <span class="commodity-name">{{ order.resource.name }}</span>
                <!-- <span class="commodity-time"
                      v-if=" order.type === ORDER_TYPE_COURSE">开课时间：2021年5月21日</span> -->
              </label>
              <label class="tb-type">{{
                order.type === ORDER_TYPE_COURSE
                  ? "视频课"
                  : order.type === ORDER_TYPE_COURSE_SERIES
                  ? "系列课"
                  : order.type === ORDER_TYPE_VIP
                  ? "VIP"
                  : "其他"
              }}</label>
              <label class="tb-price">¥{{ order.resource.price }}</label>
              <label class="tb-count">1</label>
              <label class="tb-sum">¥{{ order.total_amount }}</label>
            </li>
          </ul>
        </div>
        <div class="page-content-pay">
          <h4 class="page-content-title">支付方式</h4>
          <div class="pay-list">
            <el-radio
              class="pay-item"
              v-model="payment"
              :label="PAY_METHOD_ALIPAY"
            >
              <div class="pay-item-left">
                <i class="alipay-icon"></i>
                <span class="pay-item-name">支付宝</span>
              </div>
            </el-radio>
            <el-radio
              class="pay-item"
              v-model="payment"
              :label="PAY_METHOD_WECHAT"
            >
              <div class="pay-item-left">
                <i class="wechat-icon"></i>
                <span class="pay-item-name">微信</span>
              </div>
            </el-radio>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <div class="page-footer-price">
        <span class="total">¥{{ order.total_amount }}</span>
        <span class="unit">元</span>
      </div>
      <div class="page-footer-btn" @click="handlePay">
        立即支付
      </div>
    </div>
    <el-dialog
      width="360px"
      :visible.sync="showWechatQrcode"
      :show-close="false"
    >
      <img :src="wechatQrcode" />
    </el-dialog>
    <el-dialog
      class="status-dialog"
      width="380px"
      :visible.sync="showStatus"
      :show-close="false"
    >
      <div class="status-dialog-top">
        <i
          :class="[
            status === PAY_STATUS_SUCCESS
              ? 'success-icon'
              : status === PAY_STATUS_FAILED
              ? 'fail-icon'
              : 'pending-icon'
          ]"
        ></i>
        <h4 class="status-title">
          {{
            status === PAY_STATUS_SUCCESS
              ? "支付成功"
              : status === PAY_STATUS_FAILED
              ? "支付失败"
              : "等待支付中..."
          }}
        </h4>
        <p class="status-tips" v-if="status !== PAY_STATUS_PENDING">
          {{
            PAY_STATUS_SUCCESS
              ? routeCountDown + "s 后跳转"
              : "请检查订单支付状态"
          }}
        </p>
      </div>
      <div
        :class="['status-btn', status === PAY_STATUS_FAILED ? 'fail' : '']"
        @click="handleStatusClick"
      >
        {{
          status === PAY_STATUS_SUCCESS
            ? "手动跳转"
            : status === PAY_STATUS_FAILED
            ? "返回结算台"
            : "我已支付"
        }}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import { mapMutations, mapState } from "vuex";
import {
  goHome,
  goMyCourse,
  goAcademyCourseDetail,
  goAcademySeriesDetail,
  goMySetting
} from "utils/routes";
import TheLoadingImage from "components/TheLoadingImage";
import orderService from "service/order";
import {
  PAY_STATUS_PENDING,
  PAY_STATUS_SUCCESS,
  PAY_STATUS_FAILED,
  ORDER_TYPE_COURSE,
  ORDER_TYPE_COURSE_SERIES,
  ORDER_TYPE_VIP,
  PAY_METHOD_WECHAT,
  PAY_METHOD_ALIPAY
} from "utils/const";
import userService from "service/user";

export default {
  name: "Payment",
  components: { TheAvatar, TheLoadingImage },
  data() {
    return {
      ORDER_TYPE_COURSE,
      ORDER_TYPE_COURSE_SERIES,
      ORDER_TYPE_VIP,
      PAY_METHOD_WECHAT,
      PAY_METHOD_ALIPAY,
      PAY_STATUS_PENDING,
      PAY_STATUS_SUCCESS,
      PAY_STATUS_FAILED,
      loading: true,
      payment: null,
      order: {
        resource: {}
      },
      showWechatQrcode: false,
      showStatus: false,
      routeCountDown: 5,
      status: PAY_STATUS_PENDING,
      wechatQrcode: null
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.getData();
  },
  methods: {
    goHome,
    goMyCourse,
    ...mapMutations(["USERINFO"]),
    getData() {
      this.loading = true;
      orderService
        .order(this.$route.params.no)
        .then(order => {
          this.order = order;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handlePay() {
      if (!this.payment) {
        this.$notice({
          type: "warning",
          title: "请选择支付方式"
        });
        return;
      }
      switch (this.payment) {
        case PAY_METHOD_WECHAT:
          this.loading = true;
          orderService
            .payByWechat(this.$route.params.no)
            .then(res => {
              this.wechatQrcode = res.qrcode;
              this.showWechatQrcode = true;
              this.handlePayCheck();
            })
            .finally(() => {
              this.loading = false;
            });
          break;
        case PAY_METHOD_ALIPAY:
          orderService.payByAlipay(this.$route.params.no, {
            return_url: this.getAlipayReturnUrl()
          });
          this.handlePayCheck(true);
          break;
        default:
          break;
      }
    },
    handlePayCheck(show = false) {
      orderService.orderCheck(this.$route.params.no).then(res => {
        if (res.status === PAY_STATUS_SUCCESS) {
          this.showWechatQrcode = false;
          this.status = PAY_STATUS_SUCCESS;
          this.showStatus = true;
          this.routeCountDown = 5;
          const timer = setInterval(() => {
            this.routeCountDown--;
            if (this.routeCountDown <= 0) {
              this.handleSucess();
              clearInterval(timer);
            }
          }, 1000);
        } else if (res.status === PAY_STATUS_FAILED) {
          this.showWechatQrcode = false;
          this.status = PAY_STATUS_FAILED;
          this.showStatus = true;
        } else {
          if (show) {
            this.status = PAY_STATUS_PENDING;
            this.showStatus = true;
          }
          const timer = setTimeout(() => {
            this.handlePayCheck();
            clearTimeout(timer);
          }, 1000 * 1);
        }
      });
    },
    handleStatusClick() {
      if (this.status === PAY_STATUS_FAILED) {
        this.showStatus = false;
        this.status = PAY_STATUS_PENDING;
      } else if (this.status === PAY_STATUS_SUCCESS) {
        this.handleSucess();
      } else {
        this.handlePayCheck();
      }
    },
    handleSucess() {
      switch (this.order.type) {
        case ORDER_TYPE_COURSE:
          goAcademyCourseDetail(this.order.resource.id);
          break;
        case ORDER_TYPE_COURSE_SERIES:
          goAcademySeriesDetail(this.order.resource.id);
          break;
        case ORDER_TYPE_VIP:
          userService.getUserInfo().then(userInfo => {
            this.USERINFO({ ...userInfo });
          });
          goMySetting();
          break;
        default:
          break;
      }
    },
    getAlipayReturnUrl() {
      const { type } = this.order;
      let url = window.location.protocol + "//" + window.location.host;
      switch (type) {
        case ORDER_TYPE_COURSE:
          url += this.$router.resolve({
            name: "AcademyCourseDetail",
            params: {
              id: this.order.resource.id
            }
          }).href;
          break;
        case ORDER_TYPE_COURSE_SERIES:
          url += this.$router.resolve({
            name: "AcademySeriesDetail",
            params: {
              id: this.order.resource.id
            }
          }).href;
          break;
        case ORDER_TYPE_VIP:
          url += this.$router.resolve({
            name: "MySetting"
          }).href;
          break;
        default:
          break;
      }
      return url;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  .page-header {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 80px;
    border-bottom: 1px solid #efefef;
    .page-header-left {
      display: flex;
      align-items: center;
      .page-header-logo {
        display: inline-block;
        width: 168px;
        height: 60px;
        background: url("~images/order/logo.svg") no-repeat center;
        cursor: pointer;
      }
      .page-header-title {
        margin-left: 16px;
        line-height: 20px;
        font-weight: 600;
        font-size: 20px;
        color: #2c3330;
      }
    }
    .page-header-right {
      cursor: pointer;
    }
  }
  .page-content {
    flex: 1;
    padding: 80px 0;
    .page-content-title {
      margin-bottom: 24px;
      line-height: 34px;
      font-weight: 600;
      font-size: 24px;
      color: #2c3330;
    }
    .commodity-table {
      .table-th {
        display: flex;
        align-items: center;
        text-align: left;
        padding-bottom: 24px;
        line-height: 20px;
        font-size: 14px;
        color: #81948b;
        border-bottom: 1px solid #efefef;
      }
      .table-tr {
        display: flex;
        align-items: center;
        text-align: left;
        padding: 24px 0;
        line-height: 22px;
        font-size: 16px;
        color: #2c3330;
        border-bottom: 1px solid #efefef;
        .tb-name {
          display: flex;
          flex-direction: column;
          .commodity-name {
            line-height: 22px;
            font-weight: 600;
            font-size: 16px;
            color: #2c3330;
          }
          .commodity-time {
            display: inline-block;
            margin-top: 4px;
            line-height: 17px;
            font-size: 12px;
            color: #81948b;
          }
        }
      }
      .tb-pic {
        width: 80px;
        margin-right: 40px;
      }
      .tb-name {
        width: 460px;
        margin-right: 40px;
      }
      .tb-type,
      .tb-price {
        width: 120px;
        margin-right: 40px;
      }
      .tb-count {
        width: 80px;
        margin-right: 40px;
      }
      .tb-sum {
        width: 120px;
      }
    }
    .page-content-pay {
      margin-top: 40px;
      .pay-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /deep/ .pay-item {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-between;
          width: 580px;
          padding: 19px 29px 19px 19px;
          border: 1px solid #efefef;
          .el-radio__label {
            padding: unset;
          }
          .el-radio__input {
            &:not(.is_checked) {
              border-color: #cccccc;
            }
          }
          .el-radio__inner {
            width: 20px;
            height: 20px;
            border-width: 2px;
            &::after {
              width: 6px;
              height: 6px;
            }
          }
          .pay-item-left {
            display: flex;
            align-items: center;
            .alipay-icon,
            .wechat-icon {
              display: inline-block;
              width: 40px;
              height: 40px;
              margin-right: 16px;
              background-size: cover;
              background-repeat: no-repeat;
            }
            .alipay-icon {
              background-image: url("~images/payment/alipay.svg");
            }
            .wechat-icon {
              background-image: url("~images/payment/wechat.svg");
            }
            .pay-item-name {
              line-height: 22px;
              font-size: 16px;
              color: #2c3330;
            }
          }
        }
        /deep/ .is-focus,
        .is-checked {
          background-color: #eff9f4;
          border: 1px solid #14af64;
        }
      }
    }
  }

  .page-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 80px;
    background: @primaryColor;
    .page-footer-price {
      margin-right: 20px;
      color: #fff;
      .total {
        line-height: 50px;
        font-weight: 600;
        font-size: 36px;
      }
      .unit {
        display: inline-block;
        margin-left: 8px;
        line-height: 22px;
        font-size: 16px;
      }
    }
    .page-footer-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 370px;
      height: 100%;
      line-height: 34px;
      font-weight: 600;
      font-size: 24px;
      color: #ffffff;
      background: #7a55ff;
      cursor: pointer;
    }
  }
  /deep/ .el-dialog {
    .el-dialog__header {
      display: none;
    }
  }
  /deep/ .status-dialog {
    .el-dialog__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 269px;
      padding: 40px 0;
      .status-dialog-top {
        display: flex;
        flex-direction: column;
        align-items: center;
        .pending-icon,
        .success-icon,
        .fail-icon {
          display: inline-block;
          width: 40px;
          height: 40px;
          margin-top: 8px;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .pending-icon {
          width: 48px;
          height: 48px;
          margin-top: 0;
          background-image: url("~images/order/pending.svg");
        }
        .success-icon {
          background-image: url("~images/order/success.svg");
        }
        .fail-icon {
          background-image: url("~images/order/fail.svg");
        }
        .status-title {
          margin-top: 16px;
          line-height: 24px;
          font-weight: 600;
          font-size: 24px;
          color: #2c3330;
        }
        .status-tips {
          margin-top: 8px;
          line-height: 17px;
          font-size: 12px;
          color: #81948b;
        }
      }
      .status-btn {
        padding: 7px 23px;
        line-height: 20px;
        font-weight: 600;
        font-size: 14px;
        color: @primaryColor;
        border: 1px solid @primaryColor;
        cursor: pointer;
        &.fail {
          color: #2c3330;
          border-color: #2c3330;
        }
      }
    }
  }
}
</style>

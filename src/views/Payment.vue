<template>
  <div class="page">
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
              <label class="tb-pic">商品图</label>
              <label class="tb-name">商品名称</label>
              <label class="tb-type">类型</label>
              <label class="tb-price">单价</label>
              <label class="tb-count">数量</label>
              <label class="tb-sum">小计</label>
            </li>
            <li class="table-tr">
              <the-loading-image class="tb-pic" :width="80" :height="80" />
              <label class="tb-name">
                <span class="commodity-name">户型大改造 二期班</span>
                <span class="commodity-time">开课时间：2021年5月21日</span>
              </label>
              <label class="tb-type">课程</label>
              <label class="tb-price">¥4499.00</label>
              <label class="tb-count">1</label>
              <label class="tb-sum">¥4499.00</label>
            </li>
          </ul>
        </div>
        <div class="page-content-pay">
          <h4 class="page-content-title">支付方式</h4>
          <div class="pay-list">
            <el-radio class="pay-item" v-model="payment" label="1">
              <div class="pay-item-left">
                <i class="alipay-icon"></i>
                <span class="pay-item-name">支付宝</span>
              </div>
            </el-radio>
            <el-radio class="pay-item" v-model="payment" label="2">
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
        <span class="total">¥4499.00</span>
        <span class="unit">元</span>
      </div>
      <div class="page-footer-btn">
        立即支付
      </div>
    </div>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import { mapState } from "vuex";
import { goHome, goMyCourse } from "utils/routes";
import TheLoadingImage from "components/TheLoadingImage";
export default {
  name: "Payment",
  components: { TheAvatar, TheLoadingImage },
  data() {
    return {
      payment: null
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    goHome,
    goMyCourse
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
        background: url("~images/logo_1.svg") no-repeat center;
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
}
</style>

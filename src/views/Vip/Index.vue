<template>
  <div class="page" v-loading="loading">
    <div class="container-1180">
      <div class="page-header">
        <i class="page-badge-icon"></i>
        <h3 class="page-header-title">家计划·会员</h3>
        <p class="page-header-desc">让每个人都能拥有好设计</p>
      </div>
      <div class="page-content">
        <ul class="page-content-list">
          <li class="page-content-item" v-for="item of vips" :key="item.id">
            <div class="content-item-top">
              <h4 class="content-item-title">{{ item.name }}</h4>
              <label class="content-item-price">
                <span class="unit">¥</span>
                <span class="primary">{{ item.current_price }}</span>
              </label>
              <div class="content-item-desc">
                <p v-for="(desc, key) of item.desc" :key="key">{{ desc }}</p>
              </div>
            </div>
            <div class="content-item-bottom">
              <p class="content-item-tips">{{ item.tips }}</p>
              <div class="content-item-btn" @click="handleOrder(item)">
                成为会员
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import vipService from "service/vip";
import orderService from "service/order";
import { ORDER_TYPE_VIP } from "utils/const";
import { goOrder } from "utils/routes";

export default {
  name: "VipIndex",
  data() {
    return {
      loading: true,
      // vips: [
      //   {
      //     id: 1,
      //     title: "1个月会员",
      //     price: 99,
      //     desc: ["付费课程免费看", "PlanGo工具开放使用"],
      //     tips: "约3.3元/天"
      //   },
      //   {
      //     id: 2,
      //     title: "3个月会员",
      //     price: 199,
      //     desc: ["付费课程免费看", "PlanGo工具开放使用"],
      //     tips: "约2.2元/天"
      //   },
      //   {
      //     id: 3,
      //     title: "12个月会员",
      //     price: 699,
      //     desc: ["付费课程免费看", "PlanGo工具开放使用"],
      //     tips: "约1.9元/天"
      //   }
      // ]
      vips: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      vipService
        .vipSkus()
        .then(res => {
          this.vips = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleOrder(resource) {
      this.loading = true;
      orderService
        .addOrder({
          type: ORDER_TYPE_VIP,
          resource_id: resource.id,
          remark: resource.name + "充值"
        })
        .then(res => {
          goOrder(res.no);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.page {
  padding: 60px 0 80px;
  background: #fff !important;
  .container-1180 {
    padding: 0 20px;
    .page-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .page-badge-icon {
        display: inline-block;
        width: 140px;
        height: 140px;
        background: url("~images/vip/badge.svg") no-repeat center;
      }
      .page-header-title {
        margin-top: 20px;
        line-height: 84px;
        font-weight: 600;
        font-size: 60px;
        color: #2c3330;
      }
      .page-header-desc {
        margin-top: 10px;
        line-height: 45px;
        font-size: 32px;
        color: #606c66;
      }
    }
    .page-content {
      margin-top: 60px;
      .page-content-list {
        display: flex;
        .page-content-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 340px;
          height: 445px;
          padding: 60px 0;
          background: #fafafa;
          border: 1px solid #efefef;
          &:nth-child(3n - 1) {
            margin-left: 40px;
            margin-right: 40px;
          }
          .content-item-top {
            display: flex;
            flex-direction: column;
            align-items: center;
            .content-item-title {
              margin-bottom: 32px;
              line-height: 45px;
              font-weight: 600;
              font-size: 32px;
              text-align: center;
              color: #2c3330;
            }
            .content-item-price {
              display: inline-block;
              text-align: center;
              .unit {
                line-height: 18px;
                font-size: 18px;
                color: #2c3330;
                vertical-align: super;
              }
              .primary {
                line-height: 32px;
                font-weight: 600;
                font-size: 32px;
                color: @primaryColor;
                cursor: default;
              }
            }
            .content-item-desc {
              margin-top: 24px;
              line-height: 20px;
              font-size: 14px;
              text-align: center;
              color: #606c66;
              text-align: center;
              p + p {
                margin-top: 8px;
              }
            }
          }
          .content-item-bottom {
            .content-item-tips {
              line-height: 16px;
              font-size: 12px;
              text-align: center;
              color: #81948b;
            }
            .content-item-btn {
              margin-top: 8px;
              padding: 12px 24px;
              line-height: 24px;
              font-weight: 600;
              font-size: 16px;
              color: #fff;
              background: @primaryColor;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>

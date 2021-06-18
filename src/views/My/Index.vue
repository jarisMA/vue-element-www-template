<template>
  <div class="my-page">
    <div class="page-header">
      <div class="container-1180">
        <div class="page-header-left">
          <the-avatar :url="userInfo.avatar_url" :size="100" />
          <div class="page-header-desc">
            <label class="page-header-nickname">
              {{ userInfo.nickname }}
            </label>
            <div class="page-header-identity">
              <template v-if="isVip()">
                <i class="vip-icon"></i>
                <span class="page-header-identity_text">尊贵会员</span>
              </template>
              <template v-else>
                <i class="unvip-icon"></i>
                <span class="page-header-identity_text">一块浮木</span>
              </template>
            </div>
          </div>
        </div>
        <div class="page-header-right">
          <div
            class="page-header-operate"
            @click="handleShowDialog('gainVisible')"
          >
            <div class="operate-left">
              <i class="heart-icon"></i>
              <label class="operate-text"
                >我的暖心<i class="arrow-icon"></i
              ></label>
            </div>
            <div class="operate-right">{{ userInfo.mark_total }}</div>
          </div>
          <div
            class="page-header-operate"
            @click="handleShowDialog('clockVisible')"
          >
            <div class="operate-left">
              <i class="calender-icon"></i>
              <label class="operate-text"
                >连续签到<label class="operte-hover-text"
                  >去签到<i class="arrow-icon"></i></label
              ></label>
            </div>
            <div class="operate-right">{{ getClockCount }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="container-1180">
        <div class="page-content-left">
          <ul class="page-menu-list">
            <li
              :class="[
                'page-menu-item',
                activeTab === 'MySetting' ? 'active' : ''
              ]"
              @click="goMySetting()"
            >
              我的资料
            </li>
            <li
              :class="[
                'page-menu-item',
                activeTab === 'MyQuestion' ? 'active' : ''
              ]"
              @click="goMyQuestion()"
            >
              我的问答
            </li>
            <li
              v-if="false"
              :class="['page-menu-item', activeTab === 'MyVip' ? 'active' : '']"
              @click="goMyVip()"
            >
              会员中心
            </li>
            <li
              v-if="false"
              :class="[
                'page-menu-item',
                activeTab === 'MyPurchase' ? 'active' : ''
              ]"
              @click="goPurchase()"
            >
              我的订单
            </li>
          </ul>
        </div>
        <div class="page-content-right">
          <my-profile
            v-if="activeTab === 'MySetting'"
            :loading.sync="loading"
          />
          <my-question
            v-if="activeTab === 'MyQuestion'"
            :loading.sync="loading"
          />
          <vip-center v-if="activeTab === 'MyVip'" :loading.sync="loading" />
          <purchase v-if="activeTab === 'MyPurchase'" :loading.sync="loading" />
        </div>
      </div>
    </div>
    <gain-dialog
      :visible.sync="gainVisible"
      :weekClocks="weekClocks"
      :shineCount="shineCount"
      @showClock="handleShowDialog('clockVisible')"
    />
    <clock-dialog
      :visible.sync="clockVisible"
      :weekClocks="weekClocks"
      @clock="handleClock"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { isVip } from "utils/function";
import TheAvatar from "components/TheAvatar";
import MyProfile from "./widgets/Profile";
import MyQuestion from "./widgets/Question";
import Purchase from "./widgets/Purchase";
import ClockDialog from "./widgets/ClockDialog";
import GainDialog from './widgets/GainDialog';
import userService from "service/user";
import { goMySetting, goMyQuestion, goPurchase, goMyVip } from "utils/routes";
import VipCenter from './widgets/VipCenter';
const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export default {
  name: "MyCenter",
  components: {
    TheAvatar,
    MyProfile,
    MyQuestion,
    Purchase,
    ClockDialog,
    GainDialog,
    VipCenter
  },
  data () {
    return {
      dataLoading: true,
      loading: true,
      activeTab: "MySetting",
      weekClocks: [],
      shineCount: 0,
      gainVisible: false,
      clockVisible: false,
      clocking: false
    };
  },
  created () {
    this.activeTab = this.$route.name;
  },
  watch: {
    ["$route"] (val) {
      this.activeTab = val.name;
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    clocks () {
      const now = new Date();
      const index = now.getDay();
      let clocks = [];
      for (let i = index - 1; i >= 0; i--) {
        const date = new Date().setDate(now.getDate() - (i + 1));
        clocks.push({
          created_at:
            new Date(date).getFullYear() +
            "-" +
            ("0" + (new Date(date).getMonth() + 1)).substr(-2) +
            "-" +
            ("0" + new Date(date).getDate()).substr(-2),
          dayName: week[index - 1 - i]
        });
      }
      for (let i = index; i < 7; i++) {
        const date = new Date().setDate(now.getDate() + (i - index));
        clocks.push({
          created_at:
            new Date(date).getFullYear() +
            "-" +
            ("0" + (new Date(date).getMonth() + 1)).substr(-2) +
            "-" +
            ("0" + new Date(date).getDate()).substr(-2),
          dayName: week[i]
        });
      }

      let clocks_copy = clocks.map(item => item.created_at);
      this.weekClocks.map(item => {
        const index = clocks_copy.indexOf(item.created_at);
        if (index > -1) {
          clocks[index].is_clock = true;
          clocks[index].number = item.number;
        }
      });
      return clocks;
    },
    getClockCount () {
      const clocks = this.clocks;
      if (clocks.length < 1) {
        return 0;
      }
      let count = 0;
      let index = new Date().getDay();
      for (let i = index - 1; i >= 0; i--) {
        if (clocks[i] && clocks[i].is_clock) {
          count += 1;
        } else {
          break;
        }
      }
      if (clocks[index] && clocks[index].is_clock) {
        count += 1;
      }
      return count;
    }
  },
  methods: {
    ...mapMutations(['USERINFO']),
    isVip,
    goMySetting,
    goMyQuestion,
    goPurchase,
    goMyVip,
    getData () {
      this.dataLoading = true;
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate();
      const date = year + '-' + ('0' + month).substr(-2, 2) + '-' + ('0' + day).substr(-2, 2);
      Promise.all([userService.weekClock(), userService.getShineCount({
        start_at: date + ' 00:00:00',
        end_at: date + ' 23:59:59',
      })])
        .then(([weekClocks, shineCount]) => {
          this.weekClocks = weekClocks;
          this.shineCount = shineCount;
        }).finally(() => {
          this.dataLoading = false
        })
    },
    handleClock () {
      if (this.clocking) {
        return;
      }
      this.clocking = true;
      userService
        .clock()
        .then(res => {
          const { weekClocks } = this;
          this.clockVisible = false;
          this.$notice({
            type: "success",
            title: `暖心+${res.number}`
          });
          this.USERINFO({ ...this.userInfo, mark_total: this.userInfo.mark_total + res.number });
          weekClocks.push({
            created_at:
              new Date().getFullYear() +
              "-" +
              ("0" + (new Date().getMonth() + 1)).substr(-2) +
              "-" +
              ("0" + new Date().getDate()).substr(-2),
            ...res
          });
          this.weekClocks = weekClocks;
        })
        .finally(() => {
          this.clocking = false;
        });
    },
    handleShowDialog (param) {
      this.gainVisible = false;
      this.clockVisible = false;
      this.[param] = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.my-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background: #f4f6f8 !important;
  .page-header {
    flex: none;
    width: 100%;
    height: 160px;
    background: #fff;
    .container-1180 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      .page-header-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .page-header-desc {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          margin-left: 26px;
          .page-header-nickname {
            line-height: 130%;
            font-weight: 500;
            font-size: 24px;
            color: #2c3330;
          }
          .page-header-identity {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-top: 12px;
            .page-header-identity_text {
              margin-left: 6px;
              line-height: 16px;
              font-size: 12px;
              color: #81948b;
            }
          }
        }
      }
      .page-header-right {
        display: flex;
        height: 100%;
        .page-header-operate {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 200px;
          height: 100%;
          cursor: pointer;
          user-select: none;
          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            content: "";
            background: @primaryColor;
            transition: width 0.5s;
          }
          &:hover {
            &::after {
              width: 100%;
            }
            .operte-hover-text {
              display: inline-flex !important;
            }
            .arrow-icon {
              display: inline-block !important;
            }
          }
          & + .page-header-operate {
            margin-left: 120px;
          }
          .operate-left {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            .operate-text {
              display: inline-flex;
              align-items: center;
              margin-top: 4px;
              line-height: 24px;
              font-size: 16px;
              color: #2c3330;
              cursor: pointer;
              .operte-hover-text {
                // display: inline-flex;
                display: none;
                align-items: center;
                margin-left: 4px;
                line-height: 1;
                font-size: 12px;
                color: #8ea098;
                cursor: pointer;
              }
            }
            .arrow-icon {
              // display: inline-block;
              display: none;
              width: 24px;
              height: 24px;
              background-image: url("~images/my/arrow.svg");
              background-size: cover;
            }
          }
          .operate-right {
            line-height: 48px;
            font-weight: bold;
            font-size: 48px;
            text-align: right;
            color: @primaryColor;
          }
        }
      }
    }
  }
  .page-content {
    flex: 1;
    margin-top: 16px;
    width: 100%;
    padding: 40px 0;
    height: 5px;
    background: #fff;
    .container-1180 {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      height: 100%;
    }
    .page-content-left {
      width: 180px;
      height: 100%;
      border-right: 1px solid #efefef;
      .page-menu-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .page-menu-item {
          line-height: 28px;
          font-weight: 500;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          & + .page-menu-item {
            margin-top: 24px;
          }
          &.active {
            color: @primaryColor;
            border-color: @primaryColor;
          }
          &:hover {
            color: @primaryColor;
          }
        }
      }
    }
    .page-content-right {
      flex: 1;
      margin-left: 20px;
      width: 5px;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>

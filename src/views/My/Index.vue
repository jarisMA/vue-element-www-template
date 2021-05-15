<template>
  <div class="my-page" v-loading="loading">
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
          <div class="page-header-operate">
            <div class="operate-left">
              <i class="heart-icon"></i>
              <label class="operate-text">我的暖心</label>
            </div>
            <div class="operate-right">97</div>
          </div>
          <div class="page-header-operate" @click="clockVisible = true">
            <div class="operate-left">
              <i class="calender-icon"></i>
              <label class="operate-text">连续签到</label>
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
                activeTab === 'MyCourse' ? 'active' : ''
              ]"
              @click="goMyCourse()"
            >
              我的课程
            </li>
            <li
              :class="[
                'page-menu-item',
                activeTab === 'MyQuestion' ? 'active' : ''
              ]"
            >
              我的提问
            </li>
          </ul>
        </div>
        <div class="page-content-right">
          <my-profile
            v-if="activeTab === 'MySetting'"
            :loading.sync="loading"
          />
          <my-course v-if="activeTab === 'MyCourse'" :loading.sync="loading" />
        </div>
      </div>
    </div>
    <clock-dialog
      :visible.sync="clockVisible"
      :weekClocks="weekClocks"
      @clock="handleClock"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { isVip } from "utils/function";
import TheAvatar from "components/TheAvatar";
import MyProfile from "./widgets/Profile";
import MyCourse from "./widgets/Course";
import ClockDialog from "./widgets/ClockDialog";

import { goMySetting, goMyCourse } from "utils/routes";
import userService from "service/user";
const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export default {
  name: "MyIndex",
  components: {
    TheAvatar,
    MyProfile,
    MyCourse,
    ClockDialog
  },
  data() {
    return {
      loading: true,
      activeTab: "MySetting",
      weekClocks: [],
      clockVisible: false,
      clocking: false
    };
  },
  created() {
    this.activeTab = this.$route.name;
    this.getData();
  },
  watch: {
    ["$route"](val) {
      this.activeTab = val.name;
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    clocks() {
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
    getClockCount() {
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
    isVip,
    goMySetting,
    goMyCourse,
    getData() {
      userService.weekClock().then(res => {
        this.weekClocks = res;
      });
    },
    handleClock() {
      console.log("enter");
      if (this.clocking) {
        return;
      }
      this.clocking = true;
      userService
        .clock()
        .then(res => {
          console.log(res);

          const { weekClocks } = this;
          this.clockVisible = false;
          this.$notice({
            type: "success",
            title: `暖心+${res.number}`
          });
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
              display: inline-block;
              margin-top: 4px;
              line-height: 24px;
              font-size: 16px;
              color: #2c3330;
              cursor: pointer;
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

<template>
  <div>
    <div class="dialog-wrapper" v-if="visible" @click="handleClose">
      <div class="dialog" @click.stop>
        <div class="dialog-content">
          <div class="content-header">
            <div class="header-left">
              <the-avatar :size="60" :url="userInfo.avatar_url" />
            </div>
            <div class="header-right">
              <span class="title">每日签到</span>
              <div class="desc">
                已连续签到 <span class="count">{{ getCount(clocks) }}</span> 天
              </div>
            </div>
          </div>
          <div class="content-progress">
            <div
              :class="[
                'progress-item',
                item.is_clock ? 'active' : '',
                (index < 6 &&
                  indexHasClock(clocks, index + 1) &&
                  indexHasClock(clocks, index)) ||
                (index === 6 &&
                  indexHasClock(clocks, index) &&
                  indexHasClock(clocks, index - 1))
                  ? 'next'
                  : ''
              ]"
              v-for="(item, index) of clocks"
              :key="index"
            >
              <div class="heart-wrapper">
                <template v-if="item.is_clock">
                  <span class="count-span">{{ item.number || 1 }}</span>
                  <i class="heart-icon"></i>
                </template>
              </div>
              <div class="progress">
                <div class="point-wrapper">
                  <div class="point"></div>
                </div>
                <div class="rect"></div>
              </div>
              <span class="span">{{ item.dayName }}</span>
            </div>
          </div>
        </div>
        <div
          :class="['dialog-footer', isClock(clocks) ? 'not-allowed' : '']"
          @click="!isClock(clocks) ? handleClock() : null"
        >
          <span v-if="!isClock(clocks)">签到</span>
          <span v-else>已签到</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TheAvatar from "../../../../../homeplan-admin/src/components/TheAvatar.vue";
const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export default {
  components: { TheAvatar },
  name: "MyClockDialog",
  props: {
    weekClocks: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      clocks: []
    };
  },
  created() {
    this.initClocks();
  },
  watch: {
    weekClocks() {
      this.initClocks();
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    getCount() {
      return clocks => {
        if (clocks.length < 1) {
          return 0;
        }
        let count = 0;
        let index = new Date().getDay();
        for (let i = index - 1; i >= 0; i--) {
          if (clocks[i].is_clock) {
            count += 1;
          } else {
            break;
          }
        }
        if (clocks[index].is_clock) {
          count += 1;
        }
        return count;
      };
    },
    indexHasClock() {
      return (clocks, index) => {
        if (clocks.length < 1) {
          return false;
        }
        if (clocks[index] && clocks[index].is_clock) {
          return true;
        }
        return false;
      };
    },
    isClock() {
      return clocks => {
        var index = new Date().getDay();
        if (clocks[index].is_clock) {
          return true;
        }
        return false;
      };
    }
  },
  methods: {
    initClocks() {
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
      this.clocks = clocks;
    },
    handleClock() {
      this.$emit("clock");
    },
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="less" scoped>
.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 11;
  .dialog {
    width: 408px;
    background: #fff;
    .dialog-content {
      width: 100%;
      padding: 40px 35px 60px;
      .content-header {
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        .header-left {
          margin-right: 16px;
          height: 60px;
        }
        .header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          .title {
            line-height: 28px;
            font-weight: 600;
            font-size: 20px;
            color: #2c3330;
          }
          .desc {
            line-height: 20px;
            font-size: 14px;
            color: #606c66;
          }
        }
      }
      .content-progress {
        display: flex;
        .progress-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          &.next {
            .rect {
              background: linear-gradient(
                  0deg,
                  rgba(20, 175, 100, 0.2),
                  rgba(20, 175, 100, 0.2)
                ),
                #ffffff !important;
            }
          }
          &:first-child {
            .rect {
              border-top-left-radius: 4px;
              border-top-right-radius: 4px;
            }
          }
          &:last-child {
            align-items: flex-end;
            .point-wrapper {
              right: 0;
              left: unset !important;
            }
          }
          &:not(:last-child) {
            flex: 1;
            .rect {
              position: absolute;
              left: 15px;
            }
          }
          &.active {
            .point-wrapper {
              background: #14af64 !important;
            }
          }
          .heart-wrapper {
            display: flex;
            align-items: center;
            height: 12px;
            margin-bottom: 5px;
            .count-span {
              line-height: 1;
              font-size: 12px;
              color: #606c66;
            }
            .heart-icon {
              margin-left: 4px;
              width: 12px;
              height: 12px;
            }
          }
          .progress {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 5px;
            width: 100%;
            height: 14px;
            .point-wrapper {
              position: absolute;
              left: 0;
              top: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 14px;
              height: 14px;
              background: #c9c9c9;
              border-radius: 50%;
              z-index: 2;
              .point {
                width: 4px;
                height: 4px;
                content: "";
                background: #fff;
                border-radius: 50%;
              }
            }
            .rect {
              width: 100%;
              height: 8px;
              background: #f4f4f4;
            }
          }
          .span {
            line-height: 1;
            font-size: 12px;
            color: #606c66;
          }
        }
      }
    }
    .dialog-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 55px;
      background: #14af64;
      font-size: 17px;
      line-height: 24px;
      color: #ffffff;
      cursor: pointer;
      &.not-allowed {
        color: #81948b;
        background: #e4e4e4;
        cursor: default;
      }
    }
  }
}

.count {
  color: #14af64;
}
</style>

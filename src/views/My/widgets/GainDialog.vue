<template>
  <div class="gain-dialog-wrapper" v-if="visible" @click="handleClose">
    <div class="gain-dialog" @click.stop>
      <div class="dialog" v-if="!showGain">
        <div class="dialog-left">
          <div class="dialog-header">
            <div class="dialog-header-title">我的暖心</div>
            <div class="dialog-header-content">
              <div class="dialog-header-content_left">
                <span class="dialog-header-total">{{
                  userInfo.mark_total
                }}</span>
                <i class="heart-icon"></i>
              </div>
              <div class="dialog-header-content_right" @click="showGain = true">
                <span class="dialog-header-navigate">查看记录</span>
                <i class="dialog-header-arrow_icon"></i>
              </div>
            </div>
          </div>
          <div class="dialog-desc">
            <div class="dialog-desc-title">
              什么是暖心
            </div>
            <div class="dialog-desc-content">
              <span class="dialog-desc-span"
                >赠人玫瑰，手留余香。助人为乐，温暖人心。</span
              >
              <span class="dialog-desc-span"
                >如果你的回复被求助人采纳，或帮求助人「擦亮」问题，提升关注度，都可以获得「暖心」。</span
              >
              <span class="dialog-desc-span"
                >暖心也可以用来发起求助，未来还可以用作兑换斗西周边哦。</span
              >
            </div>
          </div>
        </div>
        <div class="dialog-right">
          <div class="dialog-content">
            <div class="dialog-content-title">
              如何获取暖心
            </div>
            <div class="dialog-content-list">
              <div class="dialog-content-item disabled">
                <div class="dialog-content-item-content">
                  <img class="item-content-img" src="~images/my/douxi.svg" />
                  <div class="item-content-desc">
                    <div class="item-content-title">
                      用户注册
                    </div>
                    <div class="item-content-detail">
                      新用户注册赠送 80 暖心
                    </div>
                  </div>
                </div>
                <div class="dialog-content-item-footer">
                  <div class="item-footer-content">
                    <span class="item-footer-total">80</span>
                    <i class="heart-icon item-footer-heart_icon "></i>
                  </div>
                  <div class="item-footer-status">已获得</div>
                </div>
              </div>
              <div :class="['dialog-content-item', isClock ? 'disabled' : '']">
                <div class="dialog-content-item-content">
                  <img
                    class="item-content-img"
                    src="~images/my/calender_active.svg"
                  />
                  <div class="item-content-desc">
                    <div class="item-content-title">
                      每日签到
                    </div>
                    <div class="item-content-detail">
                      连续签到一周可获取 28 暖心
                    </div>
                  </div>
                </div>
                <div class="dialog-content-item-footer">
                  <div class="item-footer-content">
                    <span class="item-footer-total">28</span>
                    <i class="heart-icon item-footer-heart_icon"> </i>
                  </div>
                  <div
                    class="item-footer-status pointer"
                    v-if="!isClock"
                    @click="handleShowClock"
                  >
                    去签到
                    <i class="dialog-header-arrow_icon"></i>
                  </div>
                  <div class="item-footer-status" v-else>
                    已签到
                  </div>
                </div>
              </div>
              <!-- <div :class="['dialog-content-item', shineCount >4 ? 'disabled' : '' ]">
                <div class="dialog-content-item-content">
                  <img class="item-content-img"
                       src="~images/my/brighten_active.svg" />
                  <div class="item-content-desc">
                    <div class="item-content-title">
                      帮擦亮
                    </div>
                    <div class="item-content-detail">
                      帮助别人「擦亮」问题，每次可获取 2 暖心，每天上限可获取 10 暖心
                    </div>
                  </div>
                </div>
                <div class="dialog-content-item-footer">
                  <div class="item-footer-content">
                    <span class="item-footer-total">10</span>
                    <i class="heart-icon item-footer-heart_icon">
                    </i>
                  </div>
                  <div class="item-footer-status">已擦亮 {{ shineCount }}/5</div>
                </div>
              </div>
              <div class="dialog-content-item">
                <div class="dialog-content-item-content">
                  <img class="item-content-img"
                       src="~images/my/accepted.svg" />
                  <div class="item-content-desc">
                    <div class="item-content-title">
                      回答被采纳
                    </div>
                    <div class="item-content-detail">
                      回答被题主采纳可获取 30 暖心
                    </div>
                  </div>
                </div>
                <div class="dialog-content-item-footer">
                  <div class="item-footer-content">
                    <span class="item-footer-total">30</span>
                    <i class="heart-icon item-footer-heart_icon">
                    </i>
                  </div>
                  <div class="item-footer-status pointer" @click="goQuestion()">
                    去首页
                    <i class="dialog-header-arrow_icon"></i>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-2" v-else>
        <gain-history @back="showGain = false" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { goQuestion } from "utils/routes";
import GainHistory from "./GainHistory";
export default {
  components: { GainHistory },
  name: "MyGainDialog",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    weekClocks: {
      type: Array,
      required: true
    },
    shineCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showGain: false
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    isClock() {
      const clocks = this.weekClocks;
      var date =
        new Date().getFullYear() +
        "-" +
        ("0" + (new Date().getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + new Date().getDate()).slice(-2);
      return clocks.some(function(clock) {
        if (clock.created_at === date) {
          return true;
        }
      });
    }
  },
  methods: {
    goQuestion,
    handleClose() {
      this.$emit("update:visible", false);
    },
    handleShowClock() {
      this.$emit("showClock");
    }
  }
};
</script>

<style lang="less" scoped>
.gain-dialog-wrapper {
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
  .gain-dialog {
    width: 780px;
    min-height: 468px;
    background: #ffffff;
    .dialog {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 40px;
    }
    .dialog-header-arrow_icon {
      display: inline-block;
      margin-left: 2px;
      width: 12px;
      height: 12px;
      background-image: url("~images/my/arrow1.svg");
      background-repeat: no-repeat;
      background-size: cover;
      vertical-align: bottom;
    }
    .dialog-left {
      flex: none;
      width: 340px;
      margin-right: 20px;
      .dialog-header {
        padding-bottom: 24px;
        border-bottom: 1px dashed #efefef;
        .dialog-header-title {
          line-height: 28px;
          font-weight: 600;
          font-size: 20px;
          color: #2c3330;
        }
        .dialog-header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
        }
        .dialog-header-total {
          line-height: 1;
          font-size: 36px;
          color: #2c3330;
        }

        .heart-icon {
          margin-left: 8px;
          width: 24px;
          height: 24px;
        }
        .dialog-header-content_right {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .dialog-header-navigate {
          line-height: 1;
          font-size: 12px;
          color: #14af64;
        }
      }

      .dialog-desc {
        padding: 24px 0;
        .dialog-desc-title {
          margin-bottom: 16px;
          line-height: 28px;
          font-weight: 600;
          font-size: 20px;
          color: #2c3330;
        }

        .dialog-desc-content {
          line-height: 24px;
          font-size: 14px;
          color: #606c66;
        }
        .dialog-desc-span {
          display: block;
        }

        .dialog-desc-span + .dialog-desc-span {
          margin-top: 7px;
        }
      }
    }
    .dialog-right {
      flex: 1;
      width: 340px;
      .dialog-content {
        .dialog-content-title {
          line-height: 28px;
          font-weight: 600;
          font-size: 20px;
          color: #2c3330;
        }
        .dialog-content-list {
          margin-top: 16px;
        }
        .dialog-content-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px;
          background: #fafafa;
        }
        .dialog-content-item.disabled {
          filter: grayscale(1);
          opacity: 0.5;
        }
        .dialog-content-item + .dialog-content-item {
          margin-top: 8px;
        }
        .dialog-content-item-content {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .dialog-content-item-footer {
          flex: none;
          margin-left: 8px;
        }

        .item-content-img {
          flex: none;
          margin-right: 16px;
          width: 24px;
          height: 24px;
        }
        .item-content-title {
          line-height: 24px;
          font-weight: 600;
          font-size: 16px;
          color: #2c3330;
        }
        .item-content-detail {
          margin-top: 4px;
          line-height: 16px;
          font-size: 12px;
          color: #606c66;
        }
        .item-footer-total {
          line-height: 24px;
          font-weight: 600;
          font-size: 20px;
          color: #2c3330;
        }
        .item-footer-heart_icon {
          margin-left: 4px;
          width: 24px;
          height: 24px;
          vertical-align: top;
        }
        .item-footer-status {
          position: relative;
          margin-top: 6px;
          line-height: 1;
          font-size: 12px;
          text-align: right;
          color: #14af64;
        }
      }
    }
    .dialog-2 {
      width: 100%;
      min-height: 520px;
      padding: 40px;
    }
  }
}
</style>

<template>
  <header
    :class="[
      'page-header',
      theme,
      theme === 'primary' && visible ? 'primary_active' : ''
    ]"
  >
    <div :class="['header-content', theme]">
      <div class="header-hd">
        <span class="header-logo_img" @click="goHome()">
          <img
            v-if="theme === 'primary'"
            class="header-logo"
            src="~images/layout/logo2.svg"
            @click="visible = !visible"
          />
          <img v-else class="header-logo" src="~images/logo_1.svg" />
        </span>
        <!-- <span :class="['header-more', visible ? 'active' : '']"
              v-if="theme === 'primary'"
              @click="visible = !visible">
          <icon-svg svg-class="more-icon"
                    svg-name="more" />
        </span> -->
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <nav class="header-nav" v-show="theme !== 'primary' || visible">
            <!-- <span
            class="header-nav-item My"
            @click="(visible || theme !== 'primary') && loginDialogVisible(6)"
            >斗西学社</span
          > -->
            <label
              :class="[
                'header-nav-item',
                'My',
                ['Academy'].indexOf($route.name) > -1 ? 'active' : ''
              ]"
              @click="(visible || theme !== 'primary') && goAcademy()"
            >
              
            </label>
            <label
              :class="[
                'header-nav-item',
                'Notes',
                ['Bible', 'BibleDetail', 'BiblePreview'].indexOf($route.name) >
                -1
                  ? 'active'
                  : ''
              ]"
              @click="(visible || theme !== 'primary') && goBible()"
            >
              
            </label>
            <label
              :class="[
                'header-nav-item',
                'Question',
                ['Question'].indexOf($route.name) > -1 ? 'active' : ''
              ]"
              @click="(visible || theme !== 'primary') && goQuestion()"
            >
            
            </label>
          </nav>
        </transition>
      </div>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div class="header-ft" v-show="theme !== 'primary' || visible">
          <div class="plan-go-enter" v-if="userInfo" @click="goMyPlan()"></div>

          <div v-if="userInfo" @click="goNotification()">
            <div
              class="notification-active"
              v-if="userInfo.notification_count > 0"
            ></div>
            <img src="~images/noti_inactive.svg" class="notification-icon" />
          </div>
          <div class="user-handle-container">
            <el-button
              class="login-button"
              type="primary"
              v-if="!userInfo"
              @click="wxLogin"
            >
              登录 / 注册
            </el-button>
            <template v-if="userInfo">
              <the-avatar
                class="el-avatar-border"
                :size="48"
                :url="userInfo.avatar_url"
                @click.native="goMySetting()"
              ></the-avatar>
              <div class="user-handle_show">
                <div class="show-container landing">
                  <div class="login-content">
                    <p class="login-title">
                      <span class="ellipsis">
                        {{ userInfo.nickname }}
                      </span>
                      <img
                        v-if="userInfo && isVip()"
                        class="user-icon"
                        src="~images/vip.png"
                      />
                      <img v-else class="user-icon" src="~images/user.png" />
                    </p>
                  </div>
                  <ul class="login-operation">
                    <li @click="goMyClasses()" class="workbench">
                      <span>学习中心</span>
                    </li>
                    <li @click="goMySetting()" class="setting">
                      <span>个人中心</span>
                    </li>
                  </ul>
                  <div class="logout" @click="handleLogout">
                    <span>退出登录</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div
            class="vip-btn"
            @click="goVip()"
            v-if="userInfo && !isVip() && false"
          >
            <span class="vip-btn-span">成为会员</span>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>
<script type="text/javascript">
import { mapMutations, mapState } from "vuex";
import {
  goHome,
  goMyPlan,
  goMyClasses,
  goMySetting,
  goBible,
  goQuestion,
  goAcademy,
  goVip,
  goNotification
} from "utils/routes";
import TheAvatar from "../TheAvatar.vue";
import { isVip } from "utils/function";

export default {
  name: "BasicLayoutHeader",
  components: {
    TheAvatar
  },
  props: {
    theme: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      visible: false,
      userLogo: require("images/user_logo.svg")
    };
  },
  watch: {
    visible(val) {
      this.updateHeaderUnfold(val);
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["updateHeaderUnfold"]),
    isVip,
    goVip,
    goNotification,
    goAcademy() {
      if (this.theme === "primary") {
        this.$confirm(`是否确认离开当前页面?`).then(() => {
          goAcademy();
        });
      } else {
        goAcademy();
      }
    },
    goBible() {
      if (this.theme === "primary") {
        this.$confirm(`是否确认离开当前页面?`).then(() => {
          goBible();
        });
      } else {
        goBible();
      }
    },
    goQuestion() {
      if (this.theme === "primary") {
        this.$confirm(`是否确认离开当前页面?`).then(() => {
          goQuestion();
        });
      } else {
        goQuestion();
      }
    },
    goHome() {
      if (this.theme === "primary") {
        return;
      } else {
        goHome();
      }
    },
    goMyPlan() {
      if (this.theme === "primary") {
        goMyPlan("_blank");
      } else {
        goMyPlan();
      }
    },
    goMyClasses() {
      if (this.theme === "primary") {
        goMyClasses("_blank");
      } else {
        goMyClasses();
      }
    },
    goMySetting() {
      if (this.theme === "primary") {
        goMySetting("_blank");
      } else {
        goMySetting();
      }
    },
    loginDialogVisible(index) {
      if (!this.userInfo) {
        return this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
      }
      this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", index);
    },
    wxLogin() {
      this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
    },
    handleLogout() {
      this.$store.commit("LOGOUT");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";

.page-header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  z-index: 3;
  .user-icon {
    margin-left: 10px;
    width: 18px;
    height: 18px;
    vertical-align: -2px;
  }

  .notification-icon {
    width: 24px;
    height: 24px;
    margin-right: 20px;
    cursor: pointer;
  }

  .notification-active {
    position: relative;
    top: 11px;
    left: 16px;
    width: 3px;
    height: 3px;
    background-color: #15ae65;
    border-radius: 50%;
    box-shadow: 0 0 0 2px white;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    font-size: 0;
    width: calc(100vw - 88px);
    min-width: 1200px;
    // max-width: 1920px;
    margin: 0 auto;
    .header-hd,
    .header-bd,
    .header-ft {
      display: flex;
      align-items: center;
      height: 100%;
    }
    .header-logo_img {
      width: 164px;
      margin-right: 58px;
      cursor: pointer;
      .header-logo {
        width: 164px;
        height: 46px;
        vertical-align: middle;
      }
    }
    .header-nav {
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;
      .header-nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
 
        cursor: pointer;
        &::before {
          content: "";
          background-repeat: no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
        }
        & + .header-nav-item {
          margin-left: 65px;
        }
        .header-nav-item_name {
          position: absolute;
          right: 13px;
          font-weight: 600;
          line-height: 31px;
          font-size: 14px;
          color: #000000;
          z-index: 2;
        }
        &:hover,
        &.active {
          .header-nav-item_name {
            color: #fff;
          }
        }
        &:active {
          .header-nav-item_name {
            color: @primaryColor;
          }
        }
      }
      .My {
        &::before {
          width: 160px;
          height: 60px;
          background-image: url("~images/xs_normal.svg");
        }
        &:hover,
        &.active {
          &::before {
            background-image: url("~images/xs_hover.svg");
          }
        }
        &:active {
          &::before {
            background-image: url("~images/xs_pressing.svg");
          }
        }
<<<<<<< HEAD
=======
        &.active {
          &::before {
            background-image: url("~images/xs_normal.svg");
          }
          .header-nav-item_name {
            color: @primaryColor;
          }
        }
>>>>>>> hotfix-header
      }
      .Notes {
        &:before {
          width: 160px;
          height: 60px;
          background-image: url("~images/bd_normal.svg");
        }
        &:hover,
        &.active {
          &::before {
            background-image: url("~images/bd_hover.svg");
          }
        }
        &:active {
          &::before {
            background-image: url("~images/bd_pressing.svg");
          }
        }
<<<<<<< HEAD
=======
        &.active {
          &::before {
            background-image: url("~images/bd_normal.svg");
          }
          .header-nav-item_name {
            color: @primaryColor;
          }
        }
>>>>>>> hotfix-header
      }
      .Question {
        width: 160px;
        height: 60px;
        &:before {
          width: 160px;
          height: 60px;
          background-image: url("~images/gc_normal.svg");
        }
        &:hover,
        &.active {
          &::before {
            background-image: url("~images/gc_hover.svg");
          }
        }
        &:active {
          &::before {
            background-image: url("~images/gc_pressing.svg");
          }
        }
<<<<<<< HEAD
=======
        &.active {
          &::before {
            background-image: url("~images/gc_normal.svg");
          }
          .header-nav-item_name {
            color: @primaryColor;
          }
        }
>>>>>>> hotfix-header
        .header-nav-item_name {
          top: 5px;
          line-height: 31px;
        }
      }
    }
  }
  .header-ft {
    display: flex;
    align-items: center;
    .plan-go-enter {
      width: 142px;
      height: 34px;
      margin-right: 20px;
      background-image: url("~images/plango.svg");
      background-size: 100%;
      background-repeat: no-repeat;
      cursor: pointer;
      &:active {
        height: 30px;
        background-image: url("~images/plango-active.svg");
      }
    }
    .user-handle-container {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      .login-button {
        width: 96px;
        height: 32px;
        padding: 0;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        border-radius: unset;
      }
      .el-avatar-border {
        border: 2px solid @primaryColor;
        background-color: transparent;
        :hover {
          cursor: pointer;
        }
      }
      .user-image {
        width: 40px;
        height: 40px;
        background: rgba(177, 177, 177, 1);
        border-radius: 50%;
      }
      .user-handle_show {
        position: absolute;
        top: 60px;
        right: 0;
        width: 170px;
        display: none;
        padding-top: 9px;
        z-index: 9999;
        .show-container {
          position: relative;
          background-color: #fff;
          box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.06);
          &:after {
            position: absolute;
            top: -9px;
            right: 8%;
            content: "";
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #fff;
            z-index: 999;
            filter: drop-shadow(0px -3px 4px rgba(0, 0, 0, 0.12));
          }
          .login-content {
            padding: 24px 20px;
            text-align: left;
            border-bottom: 1px solid #e6e6e6ff;
            .login-title {
              line-height: 14px;
              font-size: 14px;
              font-weight: 500;
              text-align: center;
              color: #333333;
              span {
                display: inline-block;
                max-width: calc(100% - 28px);
              }
            }
          }
          .login-operation {
            line-height: 1;
            font-size: 12px;
            font-weight: 500;
            color: #333333;
            border-bottom: 1px solid #e6e6e6ff;
            li {
              display: flex;
              align-items: center;
              padding: 9px 20px;
              cursor: pointer;
              &.workbench {
                span {
                  position: relative;
                  &::before {
                    content: "";
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    background: url("~images/header/workbench.svg") no-repeat
                      center;
                    vertical-align: -7px;
                    margin-right: 12px;
                  }
                }
              }
              &.setting {
                span {
                  position: relative;
                  &::before {
                    content: "";
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    background: url("~images/header/setting.svg") no-repeat
                      center;
                    vertical-align: -7px;
                    margin-right: 12px;
                  }
                }
              }
              &:hover {
                color: #fff;
                background: @primaryColor;
                &.workbench {
                  span {
                    &::before {
                      background-image: url("~images/header/workbench_hover.svg");
                    }
                  }
                }
                &.setting {
                  span {
                    &::before {
                      background-image: url("~images/header/setting_hover.svg");
                    }
                  }
                }
              }
            }
          }
          .logout {
            display: flex;
            align-items: center;
            padding: 9px 20px;
            line-height: 1;
            font-size: 12px;
            font-weight: 500;
            color: #333333;
            cursor: pointer;
            span {
              position: relative;
              &::before {
                content: "";
                display: inline-block;
                width: 24px;
                height: 24px;
                background: url("~images/header/logout.svg") no-repeat center;
                background-size: cover;
                vertical-align: -7px;
                margin-right: 12px;
              }
            }
            &:hover {
              color: @primaryColor;
              span {
                &::before {
                  background-image: url("~images/header/logout_hover.png");
                }
              }
            }
          }
        }
      }
      &:hover {
        .user-handle_show {
          display: inline-block;
        }
      }
    }
    .vip-btn {
      margin-left: 16px;
      width: 96px;
      height: 23px;
      background-image: url("~images/member.svg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      cursor: pointer;
    }
  }
}
.page-header.primary {
  height: 14px;
  background-color: @primaryColor;
  overflow: hidden;
  transition: all 0.5s ease;
  &.primary_active {
    height: 54px;
    overflow: visible;
    .header-ft {
      .user-handle_show {
        top: 50px;
      }
    }
  }
  .header-logo_img {
    height: 100%;
    width: 44px;
    overflow: hidden;
    margin-right: 8px;
    .header-logo {
      width: 44px;
      height: 52px;
    }
    &:hover {
      background: #38ca83;
    }
  }
  .header-more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 60px;
    cursor: pointer;
    &.active {
      background: #38ca83;
    }
    .more-icon {
      font-size: 30px;
    }
  }
}
</style>

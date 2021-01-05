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
        <nav class="header-nav">
          <span
            class="header-nav-item My"
            @click="(visible || theme !== 'primary') && loginDialogVisible(6)"
            >斗西学社</span
          >
          <span
            class="header-nav-item Notes"
            @click="(visible || theme !== 'primary') && loginDialogVisible(5)"
            >斗西宝典</span
          >
        </nav>
      </div>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div class="header-ft" v-show="theme !== 'primary' || visible">
          <div class="user-handle-container">
            <el-button
              class="login-button"
              type="primary"
              v-if="!userInfo"
              @click="wxLogin"
            >
              登录 / 注册
            </el-button>

            <the-avatar
              v-if="userInfo"
              class="el-avatar-border"
              :size="48"
              :url="userInfo.avatar_url"
            ></the-avatar>
            <div class="user-handle_show" v-if="userInfo">
              <div class="show-container landing">
                <div class="login-content">
                  <p class="login-title">
                    {{ userInfo.nickname }}
                    <img
                      v-if="userInfo && isVip()"
                      class="user-icon"
                      src="~images/vip.png"
                    />
                    <img v-else class="user-icon" src="~images/user.png" />
                  </p>
                </div>
                <ul class="login-operation">
                  <li @click="goMy()" class="workbench">
                    <span>工作台</span>
                  </li>
                  <li @click="goProfile()" class="setting">
                    <span>我的资料</span>
                  </li>
                </ul>
                <div class="logout" @click="handleLogout">
                  <span>退出登录</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>
<script type="text/javascript">
import { mapMutations, mapState } from "vuex";
import { goHome, goMy, goProfile } from "utils/routes";
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
    goHome() {
      if (this.theme === "primary") {
        return;
      } else {
        goHome();
      }
    },
    goMy() {
      if (this.theme === "primary") {
        goMy("_blank");
      } else {
        goMy();
      }
    },
    goProfile() {
      if (this.theme === "primary") {
        goProfile("_blank");
      } else {
        goProfile();
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
  z-index: 2;
  .user-icon {
    margin-left: 10px;
    width: 18px;
    height: 18px;
    vertical-align: -2px;
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
      display: flex;
      height: 100%;
      .header-nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 170px;
        line-height: 24px;
        font-size: 16px;
        color: #333333;
        font-weight: 500;
        cursor: pointer;
        &:hover {
          color: @primaryColor;
        }
      }
      .My {
        &:before {
          content: "";
          display: inline-block;
          width: 34px;
          height: 24px;
          background: url("~images/link_logo-2.svg") no-repeat center;
          vertical-align: middle;
          margin-right: 2px;
        }
      }
      .Notes {
        &:before {
          content: "";
          display: inline-block;
          width: 30px;
          height: 24px;
          background: url("~images/link_logo-3.svg") no-repeat center;
          vertical-align: middle;
          margin-right: 4px;
        }
      }
    }
  }
  .header-ft {
    display: flex;
    align-items: center;
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
                    background: url("~images/workbench.svg") no-repeat center;
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
                    background: url("~images/setting.svg") no-repeat center;
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
                      background-image: url("~images/workbench_hover.svg");
                    }
                  }
                }
                &.setting {
                  span {
                    &::before {
                      background-image: url("~images/setting_hover.svg");
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
                background: url("~images/logout.svg") no-repeat center;
                background-size: cover;
                vertical-align: -7px;
                margin-right: 12px;
              }
            }
            &:hover {
              color: @primaryColor;
              span {
                &::before {
                  background-image: url("~images/logout_hover.png");
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
  }
}
.page-header.primary {
  height: 14px;
  background-color: @primaryColor;
  overflow: hidden;
  transition: all 0.5s ease;
  &.primary_active {
    height: 52px;
    overflow: visible;
    .header-nav {
      .header-nav-item {
        cursor: pointer;
        &:hover {
          background-color: #38ca83;
          color: #fff;
          &.My {
            &::before {
              background-image: url("~images/link_logo-2_white.svg");
            }
          }
          &.Notes {
            &::before {
              background-image: url("~images/link_logo-3_white.svg");
            }
          }
        }
      }
    }
    .header-nav {
      .header-nav-item {
        cursor: pointer;
        &:hover {
          background-color: #38ca83;
          color: #fff;
          &.My {
            &::before {
              background-image: url("~images/link_logo-2_white.svg");
            }
          }
          &.Notes {
            &::before {
              background-image: url("~images/link_logo-3_white.svg");
            }
          }
        }
      }
    }
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
  .header-nav {
    height: 100%;
    overflow: hidden;
    .header-nav-item {
      // padding: 20px 0;
      height: 52px;
      color: #fff;
      cursor: auto;
      &.My {
        &::before {
          background-image: url("~images/link_logo-2_white.svg");
        }
      }
      &.Notes {
        &::before {
          background-image: url("~images/link_logo-3_white.svg");
        }
      }
    }
  }
}
</style>

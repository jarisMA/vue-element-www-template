<template>
  <header class="page-header">
    <div class="header-content">
      <div class="header-hd">
        <span class="header-logo_img" @click="goHome()">
          <img class="header-logo" src="~images/logo_1.svg" />
        </span>
        <nav class="header-nav">
          <span class="header-nav-item Home" v-if="false">
            家灵感
          </span>
          <span class="header-nav-item My" @click="loginDialogVisible(6)"
            >斗西学社</span
          >
          <!-- <span class="header-nav-item Notes" @click="loginDialogVisible(5)">愿望笔记</span> -->
        </nav>
      </div>
      <div class="header-ft">
        <div class="user-handle-container">
          <el-button
            class="login-button"
            type="primary"
            v-if="!userInfo"
            @click="wxLogin"
          >
            登录 / 注册
          </el-button>
          <el-avatar
            v-else
            class="el-avatar-border"
            :src="userInfo.avatar_url"
          ></el-avatar>
          <div class="user-handle_show" v-if="userInfo">
            <div class="show-container landing">
              <div class="login-content">
                <p class="login-title">{{ userInfo.nickname }}</p>
              </div>
              <ul class="login-operation">
                <li @click="goMy()">
                  <icon-svg svg-name="my" svg-class="operation-icon" />
                  <span>我的</span>
                </li>
                <li @click="goProfile()">
                  <icon-svg svg-name="setting" svg-class="operation-icon" />
                  <span>设置</span>
                </li>
              </ul>
              <div class="logout" @click="handleLogout">
                <icon-svg svg-name="logout" svg-class="operation-icon" />
                <span>退出</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script type="text/javascript">
import { mapState } from "vuex";
import { goHome, goMy, goProfile } from "utils/routes";

export default {
  data() {
    return {
      visible: true,
      userLogo: require("images/user_logo.svg")
    };
  },
  created() {},
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    goHome,
    goMy,
    goProfile,
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
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  z-index: 2;
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    font-size: 0;
    width: 1200px;
    min-width: 1200px;
    max-width: 1920px;
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
      margin-right: 40px;
      cursor: pointer;
      .header-logo {
        width: 164px;
        height: 46px;
        vertical-align: middle;
      }
    }
    .header-nav {
      display: flex;
      .header-nav-item {
        font-size: 16px;
        line-height: 40px;
        color: #000000;
        margin-right: 80px;
        text-decoration: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        cursor: pointer;
        &.router-link-exact-active {
          color: #35b558;
        }
        &:hover {
          color: #35b558;
        }
      }
      .Home {
        &:before {
          content: "";
          display: inline-block;
          width: 24px;
          height: 24px;
          background: url("./../../assets/images/link_logo-1.svg") no-repeat
            center;
          vertical-align: middle;
          margin-right: 6px;
        }
        &.router-link-exact-active {
          transition: all 0.1s;
          &:before {
            margin-right: 6px;
            background: url("./../../assets/images/link_logo-1_1.svg") no-repeat
              center;
            vertical-align: middle;
          }
        }
        &:hover {
          transition: all 0.1s;
          &:before {
            margin-right: 6px;
            background: url("./../../assets/images/link_logo-1_1.svg") no-repeat
              center;
            vertical-align: middle;
          }
        }
      }
      .My {
        &:before {
          content: "";
          display: inline-block;
          width: 24px;
          height: 24px;
          background: url("./../../assets/images/link_logo-2.svg") no-repeat
            center;
          vertical-align: middle;
          margin-right: 6px;
        }
        &:after {
          content: "";
          display: inline-block;
          width: 18px;
          height: 18px;
          background: url("./../../assets/images/link_logo-2_star.svg")
            no-repeat center;
          position: relative;
          bottom: 12px;
        }
        &.router-link-exact-active {
          transition: all 0.1s;
          &:before {
            background: url("./../../assets/images/link_logo-2_1.svg") no-repeat
              center;
            vertical-align: middle;
          }
        }
        &:hover {
          transition: all 0.1s;
          &:before {
            background: url("./../../assets/images/link_logo-2_1.svg") no-repeat
              center;
            background-size: contain;
            vertical-align: middle;
          }
        }
      }
      .Notes {
        &:before {
          content: "";
          display: inline-block;
          width: 24px;
          height: 24px;
          background: url("./../../assets/images/link_logo-3.svg") no-repeat
            center;
          vertical-align: middle;
          margin-right: 6px;
        }
        &.router-link-exact-active {
          transition: all 0.1s;
          &:before {
            background: url("./../../assets/images/link_logo-3_1.svg") no-repeat
              center;
            vertical-align: middle;
          }
        }
        &:hover {
          transition: all 0.1s;
          &:before {
            background: url("./../../assets/images/link_logo-3_1.svg") no-repeat
              center;
            vertical-align: middle;
          }
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
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
          // padding: 10px 10px 0;
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
            padding: 32px 24px 24px;
            text-align: left;
            border-bottom: 1px solid #e6e6e6ff;
            .login-title {
              line-height: 14px;
              font-size: 14px;
              font-weight: 500;
              color: #333333;
            }
          }
          .login-operation {
            line-height: 1;
            font-size: 12px;
            font-weight: 400;
            color: #333333;
            border-bottom: 1px solid #e6e6e6ff;
            li {
              display: flex;
              align-items: center;
              padding: 12px 24px;
              cursor: pointer;
            }
            .operation-icon {
              margin-right: 14px;
              font-size: 16px;
            }
          }
          .logout {
            display: flex;
            align-items: center;
            padding: 12px 24px;
            line-height: 1;
            font-size: 12px;
            font-weight: 400;
            color: #333333;
            cursor: pointer;
            .operation-icon {
              margin-right: 14px;
              font-size: 16px;
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
</style>

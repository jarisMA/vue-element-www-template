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
          <span class="header-nav-item Notes" @click="loginDialogVisible(5)"
            >愿望笔记</span
          >
        </nav>
      </div>
      <div class="header-ft">
        <p
          class="PLAN-link"
          @click="
            planLinkVisible('https://seller.shejijia.com/decoration/user/login')
          "
        >
          PLAN
        </p>
        <div class="user-handle-container" @click="wxLogin">
          <el-avatar
            class="el-avatar-border"
            :src="userInfo.id ? userInfo.avatar_url : userLogo"
          ></el-avatar>
          <div class="user-handle_show" v-if="userInfo.id">
            <div class="show-container landing">
              <div class="login-content">
                <el-avatar
                  :size="60"
                  class="login-user-image"
                  :src="userInfo.avatar_url"
                  @click.native="goMy"
                ></el-avatar>
                {{ userInfo.vip_expired }}
                <p class="login-title">{{ userInfo.name }}</p>
                <p class="user-logo">
                  {{ userInfo.vip_expired ? "vip会员" : "普通会员" }}
                </p>
                <p class="user-vip_time" v-if="userInfo.vip_expired">
                  <span @click="goHome()">会员到期时间: </span
                  >{{ userInfo.vip_expired }}
                </p>
              </div>
              <div class="new-el-divider"></div>
              <div class="handle-button">
                <el-button size="mini" @click="handleLogout" type="text"
                  >退出登录</el-button
                >
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
import { goHome, goRoute } from "utils/routes";

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
    goMy() {
      this.$router.push({
        name: "My"
      });
    },
    planLinkVisible(link) {
      // if (
      //   this.$store.state.userInfo.id &&
      //   !this.$store.state.userInfo.vip_expired
      // ) {
      //   return this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 7);
      // }
      goRoute(link, "_blank");
    },
    loginDialogVisible(index) {
      if (!this.$store.state.userInfo.id) {
        return this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
      }
      this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", index);
    },
    handleGoMy() {
      this.$router.push({ name: "My" });
    },
    wxLogin() {
      if (!this.userInfo.avatar_url) {
        this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
      }
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
    .PLAN-link {
      text-decoration: none;
      color: #396efe;
      background-color: #fff;
      width: 104px;
      height: 36px;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      line-height: 32px;
      margin-right: 74px;
      border: 2px solid #396efe;
      &:hover {
        color: #fff;
        background-color: #396efe;
        cursor: pointer;
      }
      &:active {
        color: #fff;
        background-color: #396efe;
        cursor: pointer;
      }
    }
    .user-handle-container {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
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
        width: 196px;
        height: 196px;
        display: none;
        padding-top: 9px;
        z-index: 9999;
        .show-container {
          position: relative;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
          padding: 10px 10px 0;
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
            text-align: center;
            .login-title {
              font-size: 18px;
              font-weight: 400;
              line-height: 31px;
            }
            .user-logo {
              display: inline-block;
              padding: 2px 5px;
              background: #f49672;
              border-radius: 8px;
              font-size: 12px;
              line-height: 16px;
              color: #ffffff;
              margin: 5px 0 8px;
            }
            .user-vip_time {
              font-size: 12px;
              font-weight: 400;
              line-height: 20px;
              margin-bottom: 10px;
              color: #c4c4c4;
              span {
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
          .new-el-divider {
            width: 100%;
            height: 1px;
            background: #ededed;
            margin-top: 25px;
          }
          .handle-button {
            text-align: center;
          }
          .login-user-image {
            border: 2px solid @primaryColor;
            background-color: transparent;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .landing {
          .new-el-divider {
            margin-top: 0;
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

<template>
  <header class="page-header">
    <div class="header-content container-1200">
      <div class="header-hd">
        <router-link class="header-logo_img" :to="{ name: 'Home' }">
          <img class="header-logo" src="~@/assets/images/logo_1.svg" />
        </router-link>
        <nav class="header-nav">
          <router-link :to="{ name: 'Home' }" class="header-nav-item Home">
            家灵感
          </router-link>
          <router-link :to="{ name: 'My' }" class="header-nav-item My"
            >斗西学院</router-link
          >
          <router-link :to="{ name: 'Note' }" class="header-nav-item Notes"
            >愿望笔记</router-link
          >
        </nav>
      </div>
      <div class="header-ft">
        <router-link :to="{ name: 'Note' }" class="PLAN-link">
          PLAN GO
        </router-link>
        <div class="user-handle-container">
          <el-avatar
            class="el-avatar-border"
            icon="el-icon-user-solid"
            :src="userInfo.avatar_url"
          ></el-avatar>
          <div class="user-handle_show">
            <div class="show-container" v-if="!userInfo.avatar_url">
              <div class="login-content">
                <el-avatar
                  :size="60"
                  class="login-user-image"
                  icon="el-icon-user-solid"
                ></el-avatar>
                <p style="" class="login-title">您还没登录</p>
                <p class="login-desc">登陆后即可体验更多功能</p>
              </div>
              <div class="new-el-divider"></div>
              <div class="handle-button">
                <el-button size="mini" @click="wxLogin" type="text"
                  >登陆 / 注册</el-button
                >
              </div>
            </div>
            <div class="show-container landing" v-if="userInfo.avatar_url">
              <div class="login-content">
                <el-avatar
                  :size="60"
                  class="login-user-image"
                  icon="el-icon-user-solid"
                  :src="userInfo.avatar_url"
                ></el-avatar>
                <p style="" class="login-title">{{ userInfo.name }}</p>
                <p class="user-logo">会员</p>
                <p class="login-desc">会员到期时间:2020-02-02</p>
              </div>
              <div class="new-el-divider"></div>
              <div class="handle-button">
                <el-button size="mini" @click="handleLogout" type="text"
                  >退出登陆</el-button
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
import DataStore from "@/globals/storage/index";
import cookies from "js-cookie";
import userService from "@/globals/service/user.js";

export default {
  data() {
    return {
      visible: true
    };
  },
  created() {
    this.getUserData();
  },
  watch: {
    $route: "getUserData"
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    getUserData() {
      const token = cookies.get("web_token");
      if (token) {
        userService.getUserInfo().then(res => {
          this.$store.commit("SET_WC_USER", res);
        });
      }
    },
    handleGoMy() {
      this.$router.push({ name: "My" });
    },
    wxLogin() {
      this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
      this.$store.commit("DIALOG_SHOW", true);
    },
    handleLogout() {
      cookies.remove("web_token", { path: "/", domain: ".home-plan.cn" });
      DataStore.removeToken();
      window.location.reload();
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
.page-header {
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    font-size: 0;
    .header-hd,
    .header-bd,
    .header-ft {
      display: flex;
      align-items: center;
      height: 100%;
    }
    .header-logo_img {
      width: 104px;
      margin-right: 65px;
      .header-logo {
        width: 104px;
        height: 36px;
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
        font-weight: 500;
        display: flex;
        align-items: center;
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
          background-size: contain;
          vertical-align: middle;
          margin-right: 6px;
        }
        &.router-link-exact-active {
          transition: all 0.1s;
          &:before {
            margin-right: 6px;
            background: url("./../../assets/images/link_logo-1_1.svg") no-repeat
              center;
            background-size: contain;
            vertical-align: middle;
          }
        }
        &:hover {
          transition: all 0.1s;
          &:before {
            margin-right: 6px;
            background: url("./../../assets/images/link_logo-1_1.svg") no-repeat
              center;
            background-size: contain;
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
          background-size: contain;
          vertical-align: middle;
          margin-right: 6px;
        }
        &:after {
          content: "";
          display: inline-block;
          width: 17.79px;
          height: 17.79px;
          background: url("./../../assets/images/link_logo-2_star.svg")
            no-repeat center;
          background-size: contain;
          position: relative;
          bottom: 12px;
        }
        &.router-link-exact-active {
          transition: all 0.1s;
          &:before {
            background: url("./../../assets/images/link_logo-2_1.svg") no-repeat
              center;
            background-size: contain;
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
          background-size: contain;
          vertical-align: middle;
          margin-right: 6px;
        }
        &.router-link-exact-active {
          transition: all 0.1s;
          &:before {
            background: url("./../../assets/images/link_logo-3_1.svg") no-repeat
              center;
            background-size: contain;
            vertical-align: middle;
          }
        }
        &:hover {
          transition: all 0.1s;
          &:before {
            background: url("./../../assets/images/link_logo-3_1.svg") no-repeat
              center;
            background-size: contain;
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
      color: #14af64;
      background-color: #fff;
      width: 104px;
      height: 36px;
      font-size: 16px;
      font-family: Noto Sans S Chinese;
      font-weight: 500;
      text-align: center;
      line-height: 36px;
      margin-right: 74px;
      border: 1px solid #14af64;
      &:hover {
        color: #fff;
        background-color: #14af64;
      }
    }
    .user-handle-container {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      .el-avatar-border {
        border: 1px solid #14af64;
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
              font-family: Noto Sans S Chinese;
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
            }
            .login-desc {
              font-size: 12px;
              font-family: Noto Sans S Chinese;
              font-weight: 400;
              line-height: 20px;
              color: #c4c4c4;
              padding: 10px 0;
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
            border: 1px solid #14af64;
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

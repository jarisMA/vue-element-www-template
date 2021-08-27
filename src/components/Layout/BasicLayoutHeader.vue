<template>
  <header class="page-header">
    <img src="~images/common/logo.svg" alt="logo" />
    <el-dropdown v-if="userInfo">
      <div class="user-dropdown">
        <the-avatar :url="userInfo.avatar_url" :size="40"></the-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleLogout"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <div class="login-btn" v-else @click="handleLogin">登录</div>
  </header>
</template>
<script type="text/javascript">
import { mapState, mapMutations } from "vuex";
import TheAvatar from "components/TheAvatar";

export default {
  name: "BasicLayoutHeader",
  components: {
    TheAvatar
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["updateLoginDialogVisible", "logout"]),
    handleLogin() {
      this.updateLoginDialogVisible(1);
    },
    wxLogin() {
      this.updateLoginDialogVisible(1);
    },
    handleLogout() {
      this.logout();
    }
  }
};
</script>

<style lang="less" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 40px;
  background: #fff;
  box-shadow: 0 1px 10px rgba(8, 7, 7, 0.447);
  .user-dropdown {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .login-btn {
    padding: 5px 20px;
    background: @primaryColor;
    color: #fff;
    cursor: pointer;
  }
}
</style>

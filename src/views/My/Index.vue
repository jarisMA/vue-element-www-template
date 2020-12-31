<template>
  <div class="my-container" v-loading="loading">
    <div class="container-1200">
      <div class="left-container">
        <div class="login-user-wrapper">
          <the-avatar
            :size="80"
            class="login-user-image"
            :url="userInfo && userInfo.avatar_url"
          ></the-avatar>
          <span class="nickname">{{ userInfo && userInfo.nickname }}</span>
          <el-tooltip
            v-if="userInfo && userInfo.kujiale_type === 1"
            popper-class="vip-popper"
            effect="light"
            content="您已是尊柜会员啦！"
            placement="bottom"
            :visible-arrow="false"
          >
            <img class="user-icon" src="~images/vip.png" />
          </el-tooltip>
          <el-tooltip
            v-else
            popper-class="vip-popper"
            effect="light"
            content="您仍旧是一棵浮木……"
            placement="bottom"
          >
            <img class="user-icon" src="~images/user.png" />
          </el-tooltip>
        </div>
        <el-menu :default-active="currentMenu" @select="handleSelectMenu">
          <el-menu-item index="plan">我的方案</el-menu-item>
          <el-menu-item index="term">我的班级</el-menu-item>
        </el-menu>
      </div>
      <div class="right-container">
        <!-- <el-scrollbar class="scrollbar-section"> -->
        <my-plan
          v-if="currentMenu === 'plan'"
          :loading.sync="loading"
          :pardon="pardon"
        />
        <my-term v-if="currentMenu === 'term'" :loading.sync="loading" />
        <!-- </el-scrollbar> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MyPlan from "./widgets/Plan";
import MyTerm from "./widgets/Term";
import TheAvatar from "components/TheAvatar";

export default {
  name: "My",
  components: {
    MyPlan,
    MyTerm,
    TheAvatar
  },
  data() {
    return {
      loading: true,
      currentMenu: "plan",
      pardon: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (["EditPlan", "DrawPlan"].indexOf(from.name) > -1) {
        vm.pardon = true;
      }
    });
  },
  created() {
    const { tab } = this.$route.query;
    if (tab && ["plan", "term"].indexOf(tab) > -1) {
      this.currentMenu = tab;
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    handleSelectMenu(menu) {
      this.currentMenu = menu;
      this.$router.push({
        query: {
          tab: menu
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";

@leftWidth: 224px;
.my-container {
  .container-1200 {
    display: flex;
  }
  .left-container {
    width: @leftWidth;
    margin-right: 20px;
  }
  .login-user-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    width: @leftWidth;
    height: @leftWidth;
    background: #fff;
    .nickname {
      display: inline-block;
      line-height: 30px;
      font-size: 20px;
      font-weight: 500;
      color: #333333;
    }
    .login-user-image {
      margin-bottom: 20px;
      // border: 2px solid @primaryColor;
      background-color: transparent;
      cursor: auto;
    }

    .user-icon {
      margin-top: 10px;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }
  .el-menu {
    width: @leftWidth;
    border: unset;
  }
  .el-menu-item {
    position: relative;
    height: 42px;
    line-height: 42px;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    background: #fff;
    &:not(:last-child) {
      border-bottom: 1px solid #e6e6e6ff;
    }
    &.is-active {
      &::before {
        position: absolute;
        left: 0;
        top: 50%;
        width: 4px;
        height: 30px;
        transform: translateY(-50%);
        content: "";
        background: @primaryColor;
      }
    }
  }
  .right-container {
    flex: 1;
  }
  .scrollbar-section {
    height: calc(100vh - 120px);
  }
}
</style>
<style lang="less">
.vip-popper {
  position: relative;
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
  border: unset !important;
  box-shadow: 0px 0px 4px 0px rgba(180, 180, 180, 0.5);
  z-index: 1;
  &::before {
    position: absolute;
    top: 0;
    left: 50%;
    width: 8px;
    height: 8px;
    content: "";
    transform: translate(-50%, -50%) rotate(45deg);
    background: white;
    z-index: 0;
    box-shadow: -2px -2px 3px 0px rgba(180, 180, 180, 0.5);
  }
}
</style>

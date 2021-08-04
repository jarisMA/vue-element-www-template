<template>
  <div class="page-content" v-loading="loading">
    <div class="container-1180">
      <div class="page-left">
        <div class="page-user">
          <div class="user-avatar">
            <the-avatar :url="userInfo.avatar_url" :size="100" />
          </div>
          <div class="user-nickname">{{ userInfo.nickname }}</div>
          <div class="user-identity">
            <template v-if="isVip()">
              <i class="vip-icon"></i>
              <span class="identity-text">尊柜会员</span>
            </template>
            <template v-else>
              <i class="unvip-icon"></i>
              <span class="identity-text">一块浮木</span>
            </template>
          </div>
        </div>
        <div class="page-menu">
          <div
            @click="goMyClasses()"
            :class="activeTab === 'MyClasses' ? 'menu-active' : 'menu-inactive'"
          >
            <img class="menu-icon" src="~/images/term/class.svg" />
            <span>我的训练营</span>
          </div>
          <div
            v-if="false"
            @click="goMyCourses()"
            :class="activeTab === 'MyCourses' ? 'menu-active' : 'menu-inactive'"
          >
            <img class="menu-icon" src="~/images/term/course.svg" />
            <span>我的课程</span>
          </div>
          <div
            v-if="false"
            @click="goMySystems()"
            :class="activeTab === 'MySystems' ? 'menu-active' : 'menu-inactive'"
          >
            <img class="menu-icon" src="~/images/term/system.svg" />
            <span>我的体系课</span>
          </div>
        </div>
      </div>
      <div class="page-right">
        <classes v-if="activeTab === 'MyClasses'" :loading.sync="loading" />
        <courses v-if="activeTab === 'MyCourses'" :loading.sync="loading" />
        <systems v-if="activeTab === 'MySystems'" :loading.sync="loading" />
      </div>
    </div>
  </div>
</template>

<script>
import { isVip } from "utils/function";
import TheAvatar from "components/TheAvatar";
import { mapMutations, mapState } from "vuex";
import Classes from "./widgets/Classes";
import Courses from "./widgets/Courses";
import Systems from "./widgets/Systems";
import { goMyClasses, goMyCourses, goMySystems } from "utils/routes";

export default {
  name: "MyTerm",
  components: {
    TheAvatar,
    Classes,
    Courses,
    Systems
  },

  data() {
    return {
      activeTab: "Classes",
      dataLoading: true,
      loading: true
    };
  },

  created() {
    this.activeTab = this.$route.name;
  },

  watch: {
    ["$route"](val) {
      this.activeTab = val.name;
    }
  },

  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["USERINFO"]),
    isVip,
    goMyClasses,
    goMyCourses,
    goMySystems
  }
};
</script>

<style lang="less" scoped>
.page-content {
  height: 5px;
  padding-top: 20px;
  padding-bottom: 20px;

  .container-1180 {
    display: flex;
    width: 1180px;
    height: 100%;
    background-color: #fff;

    .page-left {
      width: 224px;
      height: 100%;
      padding: 40px 20px;
      border-right: 1px solid #efefef;

      .user-avatar {
        display: flex;
        justify-content: center;
      }
      .user-nickname {
        margin-top: 16px;
        margin-bottom: 16px;
        text-align: center;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #2c3330;
      }

      .user-identity {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        line-height: 16px;
        color: #81948b;

        .identity-text {
          margin-left: 6px;
        }
      }
      .page-menu {
        width: 184px;
        margin-top: 44px;
        text-align: center;
        line-height: 48px;
        font-weight: 600;
        font-size: 20px;

        .menu-active {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          color: #14af64;
          background-color: #eff9f4;
          filter: none;
          cursor: pointer;
        }

        .menu-inactive {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          color: #81948b;
          filter: grayscale(1) opacity(0.8);
          cursor: pointer;
          &:hover {
            background: #fafafa;
          }
        }

        .menu-icon {
          width: 24px;
          height: 24px;
          margin-left: 27px;
          margin-right: 10px;
        }
      }
    }

    .page-right {
      width: 955px;
      height: 100%;
      padding: 40px 0 0 40px;

      .pagination {
        margin-top: 80px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: #606c66;
      }
    }
  }
}
</style>

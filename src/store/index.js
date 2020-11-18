import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import cookies from "js-cookie";
// import moment from "@/utils/moment.js";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    loginDialogVisible: 0,
    userInfo: {
      id: null,
      phone: null,
      name: null,
      realname: null,
      sex: null,
      birthday: null,
      introduction: null,
      avatar_url: null,
      unionid: null,
      vip_expired: null
    }
  },
  mutations: {
    USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    UPDATA_LOGINDIAL_VISIBLE(state, loginDialogVisible) {
      state.loginDialogVisible = loginDialogVisible;
    },
    UPDATA_PHONE(state, phone) {
      state.userInfo.phone = phone;
    },

    ROUTER_PUSH(state, name) {
      if (state.userInfo.id) {
        router.push({ name });
      } else {
        state.loginDialogVisible = 1;
      }
    },
    WINDOW_OPEN(state, path) {
      if (state.userInfo.id) {
        window.open(path, "_blank");
      } else {
        state.loginDialogVisible = 1;
      }
    },
    END_DIALOG_SHOW(state) {
      state.loginDialogVisible = 0;
    },
    LOGOUT() {
      cookies.remove("web_token", {
        path: "/",
        domain: process.env.VUE_APP_DOMAIN
      });
      window.location.reload();
    }
  },
  actions: {},
  modules: {}
});

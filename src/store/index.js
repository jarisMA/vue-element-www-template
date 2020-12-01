import Vue from "vue";
import Vuex from "vuex";
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

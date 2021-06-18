import Vue from "vue";
import Vuex from "vuex";
import cookies from "js-cookie";
import { goHome } from "utils/routes";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    loginDialogVisible: 0,
    userInfo: null,
    headerTheme: "default",
    headerUnfold: false
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
      goHome();
    },
    updateHeaderTheme(state, theme) {
      state.headerTheme = theme;
    },
    updateHeaderUnfold(state, unfold) {
      state.headerUnfold = unfold;
    }
  },
  actions: {},
  modules: {}
});

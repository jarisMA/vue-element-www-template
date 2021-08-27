import Vue from "vue";
import Vuex from "vuex";
import cookies from "js-cookie";
import { goHome } from "utils/routes";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    loginDialogVisible: 0,
    userInfo: null
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateLoginDialogVisible(state, loginDialogVisible) {
      state.loginDialogVisible = loginDialogVisible;
    },
    logout(state) {
      cookies.remove(process.env.VUE_APP_TOKEN, {
        path: "/",
        domain: process.env.VUE_APP_DOMAIN
      });
      state.userInfo = null;
      goHome();
    }
  },
  actions: {},
  modules: {}
});

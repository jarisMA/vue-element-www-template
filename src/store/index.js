import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    loginDialogVisible: 0,
    userInfo: {
      id: 2,
      phone: null,
      name: null,
      real_name: null,
      sex: null,
      birthday: null,
      introduction: null,
      avatar_url: null,
      unionid: null
    }
  },
  mutations: {
    UPDATA_LOGINDIAL_VISIBLE(state, loginDialogVisible) {
      state.loginDialogVisible = loginDialogVisible;
    },
    USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    UPDATA_UNIONID(state, unionid) {
      state.userInfo.unionid = unionid;
    },
    UPDATA_PHONE(state, phone) {
      state.userInfo.phone = phone;
    }
  },
  actions: {},
  modules: {}
});

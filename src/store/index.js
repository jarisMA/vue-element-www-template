import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    dialogShow: true,
    loginDialogVisible: 3,
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
    DIALOG_SHOW(state, value) {
      state.dialogShow = value;
    },
    UPDATA_LOGINDIAL_VISIBLE(state, loginDialogVisible) {
      console.log(loginDialogVisible);
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
    },
    SET_WC_USER(state, userInfo) {
      state.userInfo.name = userInfo.nickname;
      state.userInfo.avatar_url = userInfo.avatar_url;
      state.userInfo.sex = userInfo.gender;
      state.userInfo.unionid = userInfo.unionid;
      state.loginDialogVisible = 2;
    }
  },
  actions: {},
  modules: {}
});

import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import moment from "@/utils/moment.js";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: null,
    loginDialogVisible: 0,
    temporaryUserInfo: {
      id: null,
      name: null,
      sex: null,
      avatar_url: null,
      unionid: null
    },
    userInfo: {
      id: null,
      phone: null,
      name: null,
      real_name: null,
      sex: null,
      birthday: null,
      introduction: null,
      avatar_url: null,
      unionid: null,
      code: null,
      codeKey: null,
      vip_expired: null
    }
  },
  mutations: {
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
    UPDATA_LOGINDIAL_VISIBLE(state, loginDialogVisible) {
      state.loginDialogVisible = loginDialogVisible;
    },
    USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    UPDATA_UNIONID(state, unionid) {
      state.userInfo.unionid = unionid;
    },
    SET_PHONE_CODE_KEY(state, data) {
      state.userInfo.phone = data.phone;
      state.userInfo.code = data.code;
      state.userInfo.codeKey = data.codeKey;
    },
    SET_TEMPORARY_USER(state, userInfo) {
      state.temporaryUserInfo.id = userInfo.id;
      state.temporaryUserInfo.name = userInfo.nickname;
      state.temporaryUserInfo.avatar_url = userInfo.avatar_url;
      state.temporaryUserInfo.sex = userInfo.gender;
      state.temporaryUserInfo.unionid = userInfo.unionid;
    },
    SET_WC_USER(state, userInfo) {
      state.userInfo.id = userInfo.id;
      state.userInfo.name = userInfo.nickname;
      state.userInfo.avatar_url = userInfo.avatar_url;
      state.userInfo.sex = userInfo.gender;
      state.userInfo.unionid = userInfo.unionid;
      if (userInfo.phone_number) state.userInfo.phone = userInfo.phone_number;
      const vip_expired = moment.methods.getDate(userInfo.vip_expired);
      const newDate = new Date().getTime();
      const beforeDate = new Date(vip_expired).getTime();
      if (beforeDate > newDate) state.userInfo.vip_expired = vip_expired;
    },
    DEL_DIALOG_SHOW(state) {
      state.loginDialogVisible = 0;
      state.userInfo = {
        id: null,
        phone: null,
        name: null,
        real_name: null,
        sex: null,
        birthday: null,
        introduction: null,
        avatar_url: null,
        unionid: null,
        code: null,
        codeKey: null
      };
      state.temporaryUserInfo = {
        id: null,
        name: null,
        sex: null,
        avatar_url: null,
        unionid: null
      };
    },
    END_DIALOG_SHOW(state) {
      state.loginDialogVisible = 0;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {},
  modules: {}
});

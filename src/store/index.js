import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import moment from "@/utils/moment.js";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    data_url: {
      0: "http://www.daylab.cn/",
      1: "Home",
      2: "My",
      3: "Note",
      4: "Blog"
    },
    token: null,
    dialogShow: false,
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
      unionid: null,
      code: null,
      codeKey: null,
      vip_expired: null
    }
  },
  mutations: {
    LINK_ROUTER(state, index) {
      if (state.userInfo.avatar_url) {
        const name = state.data_url[index];
        if (index == 0) {
          return window.open(name, "_blank");
        }
        router.push({ name });
      } else {
        state.loginDialogVisible = 1;
        state.dialogShow = true;
      }
    },
    DIALOG_SHOW(state, value) {
      state.dialogShow = value;
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
    UPDATA_PHONE(state, phone) {
      state.userInfo.phone = phone;
    },
    SET_PHONE_CODE_KEY(state, data) {
      state.userInfo.phone = data.phone;
      state.userInfo.code = data.code;
      state.userInfo.codeKey = data.codeKey;
    },
    SET_WC_USER(state, userInfo) {
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
      state.dialogShow = false;
      state.loginDialogVisible = 0;
      state.userInfo = {
        id: 2,
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
    },
    END_DIALOG_SHOW(state) {
      state.dialogShow = false;
      state.loginDialogVisible = 0;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {},
  modules: {}
});

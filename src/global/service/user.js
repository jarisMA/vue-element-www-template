import request from "request/axios.js";
import API from "request/api.js";

const userService = {
  devLogin() {
    return request.get(API.devLogin);
  },
  getUserInfo() {
    return request.get(
      API.userInfo,
      {},
      {
        withCredentials: true
      }
    );
  },
  updateUserInfo(params) {
    return request.put(API.userInfo, params);
  }
};

export default userService;

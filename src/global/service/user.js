import request from "@/global/request/axios.js";
import API from "@/global/request/api.js";

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

import request from "@/global/request/axios.js";
import API from "@/global/request/api.js";

const userService = {
  getUserInfo: function() {
    return request.get(
      API.userInfo,
      {},
      {
        withCredentials: true
      }
    );
  },
  updateUserInfo: function(params) {
    return request.put(API.userInfo, params);
  }
};

export default userService;

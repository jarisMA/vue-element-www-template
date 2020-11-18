import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

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
  updateUserInfo: function({ nickname, avatar_url, gender, identity, remark }) {
    return request.put(API.userInfo, {
      nickname,
      avatar_url,
      gender,
      identity,
      remark
    });
  }
};

export default userService;

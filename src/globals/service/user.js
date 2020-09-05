import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const userService = {
  create: function({
    phone_number,
    verification_key,
    verification_code,
    unionid,
    nickname,
    avatar_url,
    gender,
    identity,
    remark
  }) {
    return request.post(
      API.users,
      {
        phone_number,
        verification_key,
        verification_code,
        unionid,
        nickname,
        avatar_url,
        gender,
        identity,
        remark
      },
      {
        withCredentials: true
      }
    );
  },
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

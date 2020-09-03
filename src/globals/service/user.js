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
    study_title,
    study_objective,
    study_objective_display
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
        study_title,
        study_objective,
        study_objective_display
      },
      {
        withCredentials: true
      }
    );
  },
  getUserInfo: function() {
    return request.get(API.userInfo,{},{
      withCredentials: true
    });
  },
  updateUserInfo: function({
    nickname,
    avatar_url,
    gender,
    study_title,
    study_objective,
    study_objective_display
  }) {
    return request.put(API.userInfo, {
      nickname,
      avatar_url,
      gender,
      study_title,
      study_objective,
      study_objective_display
    });
  }
};

export default userService;

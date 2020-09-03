import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const AuthService = {
  wechatAuth: code => {
    return request.get(
      API.wechatAuth,
      { code },
      {
        withCredentials: true
      }
    );
  }
};

export default AuthService;

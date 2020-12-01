import request from "@/global/request/axios.js";
import API from "@/global/request/api.js";

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

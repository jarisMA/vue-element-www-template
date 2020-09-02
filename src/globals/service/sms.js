import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const smsService = {
  smsRegisterCode: ({ phone_number }) => {
    return request.get(API.wechatAuth, { phone_number });
  },
  smsVerify: ({ verification_key, verification_code, verification_phone }) => {
    return request.post(API.smsVerify, {
      verification_key,
      verification_code,
      verification_phone
    });
  }
};

export default smsService;

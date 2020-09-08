import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const smsService = {
  smsRegisterCode: ({ phone_number }) => {
    return request.post(API.smsRegisterCode, { phone_number });
  },
  smsVerify: ({ verification_key, verification_code, phone_number }) => {
    return request.post(API.smsVerify, {
      verification_key,
      verification_code,
      phone_number
    });
  },
  bindingPhone: ({
    verification_key,
    verification_code,
    phone_number,
    unionid,
    nickname,
    avatar_url,
    gender
  }) => {
    return request.post(API.bindingPhone, {
      verification_key,
      verification_code,
      phone_number,
      unionid,
      nickname,
      avatar_url,
      gender
    });
  }
};

export default smsService;

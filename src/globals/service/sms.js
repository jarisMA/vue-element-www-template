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
  }
};

export default smsService;

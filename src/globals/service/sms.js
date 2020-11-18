import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const smsService = {
  smsRegisterCode: ({ phone }) => {
    return request.post(API.smsRegisterCode, { phone });
  },
  smsBindPhone: ({ key, code, phone }) => {
    return request.post(API.bindPhone, {
      key,
      code,
      phone
    });
  }
};

export default smsService;

import request from "request/axios.js";
import API from "request/api.js";

const orderService = {
  addOrder(params = {}) {
    return request.post(API.orders, params);
  },
  order(no) {
    return request.get(API.order(no));
  },
  orderCheck(no) {
    return request.get(API.orderCheck(no));
  },
  payByWechat(no) {
    return request.get(API.payByWechat(no));
  },
  payByAlipay(no, params = {}) {
    return request.get(API.payByAlipay(no), params);
  }
};

export default orderService;

import request from "request/axios.js";
import API from "request/api.js";

const orderService = {
  addOrder(params = {}) {
    return request.post(API.orders, params);
  },
  order($no) {
    return request.get(API.order($no));
  }
};

export default orderService;

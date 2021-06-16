import axios from "@/global/request/axios";
import API from "@/global/request/api";
import request from "request/axios.js";

const vipService = {
  vipSkus(params = {}) {
    return axios.get(API.vipSkus, params);
  },

  myHistory(params = {}) {
    return request.get(API.myHistory, params);
  }
};

export default vipService;

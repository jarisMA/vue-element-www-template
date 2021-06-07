import axios from "@/global/request/axios";
import API from "@/global/request/api";

const vipService = {
  vipSkus(params = {}) {
    return axios.get(API.vipSkus, params);
  }
};

export default vipService;

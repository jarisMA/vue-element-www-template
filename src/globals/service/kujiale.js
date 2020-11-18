import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const KujialeService = {
  getFloorPlan: params => {
    return request.post(API.gothrough, {
      api: "/v2/floorplan/standard",
      method: "GET",
      message: "搜索酷家乐标准户型图",
      params
    });
  }
};

export default KujialeService;

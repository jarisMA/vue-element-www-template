import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const KujialeService = {
  getCommunity: params => {
    return request.get(API.kujialeCommunity, params);
  },
  getFloorPlan: params => {
    return request.get(API.kujialeFloorplan, params);
  },
  createDesign: params => {
    return request.post(API.kujialeDesignCreate, params);
  },
  iframe: (dest, params) => {
    return request.get(API.kujialeIframe(dest), params);
  },
  designList: params => {
    return request.get(API.kujialeDesignList, params);
  },
  deleteDesign: params => {
    return request.post(API.kujialeDeleteDesign, params);
  }
};

export default KujialeService;

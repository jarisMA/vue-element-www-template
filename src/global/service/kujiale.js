import request from "request/axios.js";
import API from "request/api.js";

const KujialeService = {
  register: () => {
    return request.post(API.kujialeRegister);
  },
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
  adminIframe: (dest, params) => {
    return request.get(API.kjlAdminIframe(dest), params);
  },
  designList: params => {
    return request.get(API.kujialeDesignList, params);
  },
  deleteDesign: params => {
    return request.post(API.kujialeDeleteDesign, params);
  },
  designBasic: designId => {
    return request.get(API.kujialeDesignBasic(designId));
  },
  updateDesignName: (designId, params) => {
    return request.post(API.kujialeDesignBasic(designId), params);
  },
  copyDesign: (designId, params) => {
    return request.post(API.kujialeCopyDesign(designId), params);
  },
  listingState: listingId => {
    return request.get(API.kujialeListState(listingId));
  },
  listingSync: listingId => {
    return request.post(API.kujialeListSync(listingId));
  },
  listingBrief: listingId => {
    return request.get(API.kujialeListingBrief(listingId));
  }
};

export default KujialeService;

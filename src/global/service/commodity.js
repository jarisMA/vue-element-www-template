import request from "request/axios.js";
import API from "request/api.js";

const commodityService = {
  cats: () => {
    return request.get(API.commodityCats);
  },
  cat: id => {
    return request.get(API.commodityCat(id));
  },
  brands: (params = {}) => {
    return request.get(API.commodityBrands, params);
  },
  commodities: (params = {}) => {
    return request.get(API.commodities, params);
  },
  catCommodities: (catId, params = {}) => {
    return request.get(API.commodityCatCommodities(catId), params);
  },
  attrs: () => {
    return request.get(API.commodityAttrs);
  },
  catAttrs: catId => {
    return request.get(API.commodityCatAttrs(catId));
  },
  skuFeedback: (id, params) => {
    return request.post(API.commoditySkuFeedback(id), params);
  }
};

export default commodityService;

import request from "request/axios.js";
import API from "request/api.js";

const commodityService = {
  cats: () => {
    return request.get(API.commodityCats);
  },
  cat: id => {
    return request.get(API.commodityCat(id));
  },
  brands: () => {
    return request.get(API.commodityBrands);
  },
  commodities: (params = {}) => {
    return request.post(API.commodities, params);
  },
  attrs: () => {
    return request.get(API.commodityAttrs);
  }
};

export default commodityService;

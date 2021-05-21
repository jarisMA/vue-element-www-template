import request from "request/axios.js";
import API from "request/api.js";

const commonService = {
  districts: () => {
    return request.get(API.districts);
  }
};

export default commonService;

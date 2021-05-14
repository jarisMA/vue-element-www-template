import request from "request/axios.js";
import API from "request/api.js";

const campService = {
  camps(params = {}) {
    return request.get(API.camps, params);
  },
  camp(id) {
    return request.get(API.camp(id));
  }
};

export default campService;

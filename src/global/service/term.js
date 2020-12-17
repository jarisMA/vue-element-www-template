import request from "request/axios.js";
import API from "request/api.js";

const termRequest = {
  campTerms(params = {}) {
    return request.get(API.campTerms, params);
  }
};

export default termRequest;

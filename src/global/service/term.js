import request from "request/axios.js";
import API from "request/api.js";

const termRequest = {
  campTerms(params = {}) {
    return request.get(API.campTerms, params);
  },
  campTerm(id) {
    return request.get(API.campTerm(id));
  },
  campHomework(campId, termId, homeworkId, params = {}) {
    return request.post(API.campHomework(campId, termId, homeworkId), params);
  }
};

export default termRequest;

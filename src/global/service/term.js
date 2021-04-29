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
  },
  updateCampHomework(id, params = {}) {
    return request.put(API.campHomeworkUpdate(id), params);
  },
  checkTerm(id = process.env.VUE_APP_TERM_ID) {
    return request.get(API.checkTerm(id));
  },
  campAttach(termId) {
    return request.get(API.campAttaches(termId));
  },
  termFeedback(id, params = {}) {
    return request.put(API.campTermFeedback(id), params);
  }
};

export default termRequest;

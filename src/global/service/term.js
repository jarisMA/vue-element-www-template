import request from "request/axios.js";
import API from "request/api.js";

const termService = {
  myCampTerms(params = {}) {
    return request.get(API.myCampTerms, params);
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
  },
  termLike(campId, termId, params = {}) {
    return request.post(API.campTermLike(campId, termId), params);
  },
  termWidgetFeedbacks(params = {}) {
    return request.get(API.campTermWidgetFeedbacks, params);
  },
  addTermWidgetFeedback(params = {}) {
    return request.post(API.campTermWidgetFeedbacks, params);
  },
  deleteTermWidgetFeedback(id) {
    return request.delete(API.campTermWidgetFeedback(id));
  },
  campTermVideoCat(termId) {
    return request.get(API.campTermVideoCat(termId));
  }
};

export default termService;

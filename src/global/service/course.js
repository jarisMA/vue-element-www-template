import request from "request/axios.js";
import API from "request/api.js";

const courseService = {
  course(id) {
    return request.get(API.course(id));
  },
  setLessonRecord(courseId, lessonId, params = {}) {
    return request.post(API.lessonRecord(courseId, lessonId), params);
  }
};

export default courseService;

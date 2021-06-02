import request from "request/axios.js";
import API from "request/api.js";

const courseService = {
  courses(params = {}) {
    return request.get(API.courses, params);
  },
  course(id) {
    return request.get(API.course(id));
  },
  setLessonRecord(courseId, lessonId, params = {}) {
    return request.post(API.lessonRecord(courseId, lessonId), params);
  },
  courseCategory() {
    return request.get(API.courseCategory);
  }
};

export default courseService;

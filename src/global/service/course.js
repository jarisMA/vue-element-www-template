import request from "request/axios.js";
import API from "request/api.js";

const courseService = {
  courses(params = {}) {
    return request.get(API.courses, params);
  },
  course(id) {
    return request.get(API.course(id));
  },
  courseDetail(id) {
    return request.get(API.courseDetail(id));
  },
  setLessonRecord(courseId, lessonId, params = {}) {
    return request.post(API.lessonRecord(courseId, lessonId), params);
  },
  courseCategories() {
    return request.get(API.courseCategories);
  },
  courseCategory(id) {
    return request.get(API.courseCategory(id));
  },
  seriesCategory() {
    return request.get(API.courseSeriesCategory);
  },
  series(params = {}) {
    return request.get(API.courseSeries, params);
  },
  set(id) {
    return request.get(API.courseSet(id));
  }
};

export default courseService;

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
    return request.get(API.courseSetDetail(id));
  },
  setCourse(id, courseId) {
    return request.get(API.courseSetCourse(id, courseId));
  },
  setSeriesLessonRecord(id, courseId, lessonId, params = {}) {
    return request.post(
      API.courseSetLessonRecord(id, courseId, lessonId),
      params
    );
  }
};

export default courseService;

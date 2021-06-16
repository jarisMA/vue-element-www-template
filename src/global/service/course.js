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
  setChapter(id, chapterId) {
    return request.get(API.courseSetChapter(id, chapterId));
  },
  setSeriesSectionRecord(id, chapterId, sectionId, params = {}) {
    return request.post(
      API.courseSetSectionRecord(id, chapterId, sectionId),
      params
    );
  },
  myCourses(params = {}) {
    return request.get(API.myCourses, params);
  },
  mySeries(params = {}) {
    return request.get(API.mySeries, params);
  }
};

export default courseService;

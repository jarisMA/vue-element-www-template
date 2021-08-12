import request from "request/axios.js";
import API from "request/api.js";

const taskService = {
  industryJobsRoots() {
    return request.get(API.industryJobsRoots);
  },
  taskList(params) {
    return request.get(API.tasks, params);
  },
  taskId(uuid) {
    return request.get(API.taskId(uuid));
  },
  taskApply(uuid) {
    return request.post(API.taskApply(uuid));
  },
  taskIsFull(uuid) {
    return request.get(API.taskIsFull(uuid));
  },
  taskUserJoin(params) {
    return request.post(API.taskUserJoin, params);
  }
};
export default taskService;

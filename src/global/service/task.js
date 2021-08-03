import request from "request/axios.js";
import API from "request/api.js";

const taskService = {
  industryJobsRoots() {
    return request.get(API.industryJobsRoots);
  },
  taskId(uuid) {
    return request.get(API.taskId(uuid));
  },
  taskUserJoin(params) {
    return request.post(API.taskUserJoin, params);
  }
};
export default taskService;

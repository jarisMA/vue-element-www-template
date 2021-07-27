import request from "request/axios.js";
import API from "request/api.js";

const taskService = {
  taskId(uuid) {
    return request.get(API.taskId(uuid));
  }
};
export default taskService;

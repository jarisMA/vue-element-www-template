import request from "request/axios.js";
import API from "request/api.js";

const courseService = {
  course(id) {
    return request.get(API.course(id));
  }
};

export default courseService;

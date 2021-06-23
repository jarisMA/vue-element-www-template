import request from "request/axios.js";
import API from "request/api.js";

const notificationService = {
  notifications(params = {}) {
    return request.get(API.notifications, params);
  },

  notification(id) {
    return request.put(API.notification(id));
  }
};

export default notificationService;

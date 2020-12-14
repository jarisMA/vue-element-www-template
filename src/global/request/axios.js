import axios from "axios";
import { Message } from "element-ui";
import cookies from "js-cookie";
import Store from "@/store/index.js";

const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 20000;

axiosInstance.interceptors.request.use(
  config => {
    const newConfig = { ...config };
    const TOKEN = cookies.get("web_token");
    if (TOKEN) {
      newConfig["headers"]["Authorization"] = "Bearer " + TOKEN;
    }
    return newConfig;
  },
  error => Promise.reject(error)
);

const handleErrorRequest = error => {
  const { response } = error;
  const status = response ? response.status : 408;
  if (response) {
    const { data } = response;
    const message = data.msg || "服务器发送错误，请稍后再试";
    if (status === 401) {
      Message.error("未登录，请登录重试");
      Store.commit("LOGOUT");
    } else if (status === 403) {
      Message.error("没有权限，联系管理员");
    } else {
      Message.error(message);
    }
  } else {
    Message.error("网络超时");
  }
};

const successRes = res => {
  switch (true) {
    case res.data.error_code === 0:
      return res.data.data;
    case res.data.error_code === 1:
      Message.error(res.data.msg || "服务器发送错误，请稍后再试");
      return Promise.reject(res.data);
    default:
      return res.data;
  }
};

const errorRes = error => {
  handleErrorRequest(error);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(successRes, errorRes);

export default {
  post(url = "", data = {}, config = {}) {
    return axiosInstance.post(url, data, config);
  },
  put(url = "", data = {}, config = {}) {
    return axiosInstance.put(url, data, config);
  },
  get(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.get(url, OPTIONS);
  },
  delete(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.delete(url, OPTIONS);
  }
};

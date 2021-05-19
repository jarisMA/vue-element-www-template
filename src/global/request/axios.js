import axios from "axios";
import { Message } from "element-ui";
import cookies from "js-cookie";
import Store from "@/store/index.js";
import { goRoute } from "utils/routes";

const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 20000;

axiosInstance.interceptors.request.use(
  config => {
    const newConfig = {
      ...config,
      params: {
        ...config.params,
        app_id: 1
      }
    };
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
      // this.$notice({
      //   type: 'danger',
      //   title: '未登录，请登录重试'
      // });
      Message.error("未登录，请登录重试");
      Store.commit("LOGOUT");
    } else if (status === 403) {
      // this.$notice({
      //   type: 'danger',
      //   title: '没有权限，联系管理员'
      // });
      Message.error("没有权限，联系管理员");
    } else {
      // this.$notice({
      //   type: 'danger',
      //   title: message
      // });
      Message.error(message);
    }
  } else {
    // this.$notice({
    //   type: 'danger',
    //   title: '网络超时'
    // });
    Message.error("网络超时");
  }
};

const successRes = res => {
  switch (true) {
    case res.data.error_code === 0:
      return res.data.data;
    case res.data.error_code === 404:
      goRoute({
        name: "NotFound"
      });
      return Promise.reject(res.data);
    default:
      // this.$notice({
      //   type: 'danger',
      //   title: res.data.msg || "服务器发送错误，请稍后再试"
      // });
      Message.error(res.data.msg || "服务器发送错误，请稍后再试");
      return Promise.reject(res.data);
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

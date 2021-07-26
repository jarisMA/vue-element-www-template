import axios from "@/global/request/axios";
import API from "@/global/request/api";

const vodService = {
  ossVideoToken(params = {}) {
    return axios.post(API.ossVideoToken, params);
  },
  ossRefreshVideoToken(params = {}) {
    return axios.get(API.ossRefreshVideoToken, params);
  },
  ossVideoAuth(videoId, params = {}) {
    return axios.get(API.ossVideoAuth(videoId), params);
  },
  ossVideoStatus(videoId, params = {}) {
    return axios.get(API.ossVideoStatus(videoId), params);
  },
  ossVideoPreview(videoId, params = {}) {
    return axios.get(API.ossVideoPreview(videoId), params);
  }
};

export default vodService;

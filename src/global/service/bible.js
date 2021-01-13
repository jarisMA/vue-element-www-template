import request from "request/axios.js";
import API from "request/api.js";

const bibleService = {
  bibles: () => {
    return request.get(API.bibles);
  },
  bible: id => {
    return request.get(API.bible(id));
  }
};

export default bibleService;

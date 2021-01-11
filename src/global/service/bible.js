import request from "request/axios.js";
import API from "request/api.js";

const bibleService = {
  bible: id => {
    return request.get(API.bible(id));
  }
};

export default bibleService;

import request from "request/axios.js";
import API from "request/api.js";

const bibleService = {
  bibles: () => {
    return request.get(API.bibles);
  },
  bible: id => {
    return request.get(API.bible(id));
  },
  bibleNode: (bibleId, id) => {
    return request.get(API.bibleNode(bibleId, id));
  },
  biblePreview: id => {
    return request.get(API.biblePreview(id));
  }
};

export default bibleService;

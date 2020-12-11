import request from "@/global/request/axios.js";
import API from "@/global/request/api.js";
import OSS from "ali-oss";

const ossService = {
  token: () => {
    return request.get(API.ossToken);
  },
  put: ({ file }) => {
    return new Promise((resolve, reject) => {
      ossService
        .token()
        .then(param => {
          const {
            region,
            accessKeyId,
            accessKeySecret,
            stsToken,
            bucket
          } = param;
          const ossParam = {
            region,
            accessKeyId,
            accessKeySecret,
            stsToken,
            bucket,
            timeout: 1800000
          };
          const client = new OSS(ossParam);
          client
            .put("tmp/" + file.name, file)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(true, err);
            });
        })
        .catch(() => {
          reject(false);
        });
    });
  }
};

export default ossService;

import request from "@/global/request/axios.js";
import API from "@/global/request/api.js";
import OSS from "ali-oss";

const ossService = {
  /** 
   *  获取token授权
   *  'file_name' => 'required|string', // 文件名
      'bucket' => 'string', // bucket名
      'space' => 'string', // 空间名，例如avatar
      'folder' => 'string' // 文件夹名
   */
  token: (params = {}) => {
    return request.post(API.ossToken, params);
  },
  /**
   * 上传文件
   */
  put: ({ file, title = null, bucket = null, space = null, folder = null }) => {
    return new Promise((resolve, reject) => {
      ossService
        .token({
          file_name: file.name,
          bucket,
          space,
          folder
        })
        .then(params => {
          const {
            region,
            accessKeyId,
            accessKeySecret,
            stsToken,
            bucket,
            key
          } = params;
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
            .put(key, file)
            .then(res => {
              ossService.storeCallback({
                file_name: space,
                path: key,
                bucket,
                title
              });
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
  },
  /** 
   *  上传成功后回调
   *  'file_name' => 'required|string', // 文件类型，例如avatar
      'path' => 'required|string', // token返回的bucket存储位置
      'bucket' => 'required|string', // bucket名
      'title' => 'string' // 文件展示名称
   */
  storeCallback: params => {
    return request.post(API.ossStore, params);
  }
};

export default ossService;

import axios from "request/axios";
import API from "request/api";
import OSS from "ali-oss";

const ossService = {
  /**
   * 上传单个文件
   */
  upload: async (
    { file, title = null, bucket = null, space = null, folder = null },
    callback,
    error,
    end
  ) => {
    const ossParams = await ossService
      .token({
        file_name: file.name,
        bucket,
        space,
        folder
      })
      .catch(err => {
        console.log(err);
        end && end();
      });

    const uploadRes = await ossService
      .put(file, ossParams)
      .catch(err => error && error(err));
    callback(uploadRes);
    end && end();

    await ossService.storeCallback({
      file_name: space,
      path: ossParams.key,
      bucket: ossParams.bucket,
      title
    });
  },
  /** 
   *  获取token授权
   *  'file_name' => 'required|string', // 文件名
      'bucket' => 'string', // bucket名
      'space' => 'string', // 空间名，例如avatar
      'folder' => 'string' // 文件夹名
   */
  token: (params = {}) => {
    return axios.post(API.ossToken, params);
  },

  put: (file, params) => {
    const {
      region,
      accessKeyId,
      accessKeySecret,
      stsToken,
      bucket,
      key
    } = params;
    const client = new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      stsToken,
      bucket,
      timeout: 1800000
    });
    return client.put(key, file);
  },

  /** 
   *  上传成功后回调
   *  'file_name' => 'required|string', // 文件类型，例如avatar
      'path' => 'required|string', // token返回的bucket存储位置
      'bucket' => 'required|string', // bucket名
      'title' => 'string' // 文件展示名称
   */
  storeCallback: params => {
    return axios.post(API.ossStore, params);
  }
};

export default ossService;

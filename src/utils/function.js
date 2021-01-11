import store from "@/store/index";

// 判断当前是否为vip用户
export const isVip = () => {
  const date = store.state.userInfo.vip_expired;
  if (!date) {
    return false;
  }
  return new Date(date).valueOf() > new Date().valueOf();
};

// 格式化size
export const sizeFormat = (size, decimal = 2) => {
  if (Math.floor(size / 1024 / 1024) > 0) {
    return (size / 1024 / 1024).toFixed(decimal) + "MB";
  } else if (Math.floor(size / 1024) > 0) {
    return (size / 1024).toFixed(decimal) + "KB";
  } else {
    return size + "B";
  }
};

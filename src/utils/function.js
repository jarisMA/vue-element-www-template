import store from "@/store/index";

// 判断当前是否为vip用户
export const isVip = () => {
  const date = store.state.userInfo.vip_expired;
  if (!date) {
    return false;
  }
  return new Date(date).valueOf() > new Date().valueOf();
};

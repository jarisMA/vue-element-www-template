import request from "@/global/request/axios.js";
import API from "@/global/request/api.js";

const statisticService = {
  // 点击 家灵感
  clickBlog: () => {
    return request.get(API.statisticLog, { slug: "click-blog" });
  },
  // 点击 斗西学社
  clickCourse: () => {
    return request.get(API.statisticLog, { slug: "click-course" });
  },
  // 点击 愿望笔记
  clickNote: () => {
    return request.get(API.statisticLog, { slug: "click-note" });
  },
  // 点击 设计工作台 没有登陆
  clickPlanGust: () => {
    return request.get(API.statisticLog, { slug: "click-plan-gust" });
  },
  // 点击 设计工作台 已经登陆
  clickPlanAuth: () => {
    return request.get(API.statisticLog, { slug: "click-plan-auth" });
  },
  // 点击 banner 1 按钮
  clickBanner1: () => {
    return request.get(API.statisticLog, { slug: "click-banner-1" });
  },
  // 点击 banner 2 按钮
  clickBanner2: () => {
    return request.get(API.statisticLog, { slug: "click-banner-2" });
  },
  // 点击右上角登陆
  clickUserLogin: () => {
    return request.get(API.statisticLog, { slug: "click-user-login" });
  }
};

export default statisticService;

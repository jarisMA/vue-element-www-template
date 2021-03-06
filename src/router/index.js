import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import userService from "service/user.js";
import Store from "@/store/index";
import cookies from "js-cookie";
import { isChrome } from "utils/browser-support";

Vue.use(VueRouter);

const appRouter = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
    return { x: 0, y: 0 };
  }
});

appRouter.firstInit = false;
appRouter.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (to.meta.title) document.title = to.meta.title;
  const TOKEN = cookies.get(process.env.VUE_APP_TOKEN);
  if (TOKEN && !appRouter.firstInit) {
    try {
      const userInfo = await userService.getUserInfo();
      Store.commit("updateUserInfo", userInfo);
      if (!userInfo.phone && isChrome()) {
        Store.commit("updateLoginDialogVisible", 2);
      } else if (!userInfo.identity && isChrome()) {
        Store.commit("updateLoginDialogVisible", 3);
      }
      appRouter.firstInit = true;
    } catch (e) {
      next();
    }
  }
  if (!Store.state.userInfo && to.meta.auth) {
    next({
      name: "Home"
    });
  }
  next();
});

// eslint-disable-next-line
appRouter.afterEach((to, from) => {
  NProgress.done();
});

export default appRouter;

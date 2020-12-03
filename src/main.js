import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import IconSvg from "./plugins/icons";
import ElementUI from "element-ui";
import "styles/reset.less";
import "styles/common.less";
import "../theme/index.css";
import animate from "animate.css";
import MessageBox from "components/MessageBox/index";
import Notification from "components/Notification/index";

Vue.use(animate);
Vue.use(IconSvg);
Vue.use(ElementUI);
Vue.use(MessageBox);
Vue.use(Notification);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

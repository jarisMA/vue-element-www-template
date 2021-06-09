import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import IconSvg from "./plugins/icons";
import "./element";
import "swiper/dist/css/swiper.css";
import "styles/reset.less";
import "styles/common.less";
import "../theme/index.css";
import animate from "animate.css";
import MessageBox from "components/MessageBox/index";
import Notification from "components/Notification/index";
import VueAwesomeSwiper from "vue-awesome-swiper";
import waterfall from "vue-waterfall2";
import VueTypedJs from "vue-typed-js";
import VueCarousel from "vue-carousel";

Vue.use(VueAwesomeSwiper);
Vue.use(waterfall);
Vue.use(animate);
Vue.use(IconSvg);
Vue.use(MessageBox);
Vue.use(Notification);
Vue.use(VueTypedJs);
Vue.use(VueCarousel);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

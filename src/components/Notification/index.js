import NotificationVue from "./index.vue";

const Notification = {};

Notification.install = function(Vue) {
  const NotificationInstance = Vue.extend(NotificationVue);
  let currentNotification;
  const initInstance = () => {
    currentNotification = new NotificationInstance();
    let notificationEl = currentNotification.$mount().$el;
    document.body.appendChild(notificationEl);
  };
  Vue.prototype.$notice = options => {
    if (!currentNotification) {
      initInstance();
    }
    if (typeof options === "string") {
      currentNotification.title = options;
    } else if (typeof options === "object") {
      Object.assign(currentNotification, options);
    }
    return currentNotification.show();
  };
};

export default Notification;

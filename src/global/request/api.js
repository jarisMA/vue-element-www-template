export default {
  users: "/api/web/users",
  logout: "/api/web/logout",
  userInfo: "/api/web/users/user-info",
  wechatAuth: "/api/web/wechat/auth",
  smsRegisterCode: "/api/web/sms/register-code",
  bindPhone: "/api/web/sms/bind-phone",
  statisticLog: "/api/web/statistic/log",
  gothrough: "/api/web/kujiale/gothrough",
  kujialeCommunity: "/api/web/kujiale/community",
  kujialeFloorplan: "/api/web/kujiale/floorplan/standard",
  kujialeDesignCreate: "/api/web/kujiale/design/creation",
  kujialeIframe: dest => `/api/web/kujiale/${dest}/iframe`,
  kujialeDesignList: "/api/web/kujiale/design/list",
  kujialeDeleteDesign: "/api/web/kujiale/design/deletion"
};

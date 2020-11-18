// const PREFIX_API = process.env.VUE_APP_HOST;
const PREFIX_API = "";

export default {
  users: `${PREFIX_API}/api/web/users`,
  logout: `${PREFIX_API}/api/web/logout`,
  userInfo: `${PREFIX_API}/api/web/users/user-info`,
  wechatAuth: `${PREFIX_API}/api/web/wechat/auth`,
  smsRegisterCode: `${PREFIX_API}/api/web/sms/register-code`,
  bindPhone: `${PREFIX_API}/api/web/sms/bind-phone`,
  statisticLog: `${PREFIX_API}/api/web/statistic/log`,
  gothrough: "/api/web/kujiale/gothrough"
};

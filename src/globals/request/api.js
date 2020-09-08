const PREFIX_API = process.env.VUE_APP_HOST;

export default {
  users: `${PREFIX_API}/api/web/users`,
  logout: `${PREFIX_API}/api/web/logout`,
  userInfo: `${PREFIX_API}/api/web/users/user-info`,
  wechatAuth: `${PREFIX_API}/api/web/wechat/auth`,
  smsRegisterCode: `${PREFIX_API}/api/web/sms/register-code`,
  smsVerify: `${PREFIX_API}/api/web/sms/verify`,
  bindingPhone: `${PREFIX_API}/api/web/users/bind-phone`
};

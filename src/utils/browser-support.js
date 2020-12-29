export const isChrome = () => {
  const userAgent = navigator.userAgent;
  return userAgent.indexOf("Chrome") > -1;
};

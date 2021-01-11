export const isChrome = () => {
  const userAgent = navigator.userAgent.toLocaleLowerCase();
  if (userAgent.indexOf("edge") > -1) {
    return false;
  }
  return userAgent.indexOf("chrome") > -1;
};

import * as moment from "moment";
moment.locale("zh-cn");
export const formatDate = (date, format = "YYYY/MM/DD") => {
  return moment(date)
    .utcOffset(480)
    .format(format);
};

export const formNowFormatDay = date => {
  const end = new Date(date).valueOf();
  const now = new Date().valueOf();
  if (end <= now) {
    return -1;
  }
  return Math.floor((end - now) / 1000 / 60 / 60 / 24);
};

export const fromNow = (date, format = "YYYY年MM月DD日 HH:mm") => {
  return moment(date, format).fromNow();
};

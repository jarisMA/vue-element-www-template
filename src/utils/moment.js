import * as dayjs from "dayjs";
dayjs.locale("zh-cn");
export const formatDate = (date, format = "YYYY/MM/DD") => {
  return dayjs(date).format(format);
};

export const formNowFormatDay = date => {
  const end = new Date(date).valueOf();
  const now = new Date().valueOf();
  if (end <= now) {
    return -1;
  }
  return Math.floor((end - now) / 1000 / 60 / 60 / 24);
};

export const formatSeconds = second => {
  if (!second) return "00:00";
  let secondTime = parseInt(second); // 秒
  let minuteTime = 0; // 分
  var hourTime = 0; // 小时
  if (secondTime > 60) {
    minuteTime = parseInt(secondTime / 60);
    secondTime = parseInt(secondTime % 60);
    if (minuteTime > 60) {
      hourTime = parseInt(minuteTime / 60);
      minuteTime = parseInt(minuteTime % 60);
    }
  }

  let result =
    ("0" + minuteTime).substr(-2, 2) + ":" + ("0" + secondTime).substr(-2, 2);
  if (hourTime > 0) {
    result = ("0" + hourTime).substr(-2, 2) + ":" + result;
  }
  return result;
};

// 计算指定日期加减天数后的日期
export const getCalDate = (start, day) => {
  let date = new Date(start);
  date.setDate(new Date(start).getDate() + day);
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).substr(-2, 2) +
    "-" +
    ("0" + date.getDate()).substr(-2, 2)
  );
};

// 判断两个日期时间戳相差多少天,参数为时间戳
export const dateCompare = (dateTime1, dateTime2) => {
  const dateTimeStamp1 = new Date(dateTime1).valueOf();
  const dateTimeStamp2 = new Date(dateTime2).valueOf();
  return Math.ceil((dateTimeStamp1 - dateTimeStamp2) / (1000 * 60 * 60 * 24));
};

export const formatDateTime = dateTime => {
  // dateTime = dateTime.replace('年', '-').replace('月', '-').replace('日','');
  let oneYear = 1000 * 60 * 60 * 24 * 365;
  const now = new Date().valueOf();
  const date = new Date(dateTime);
  const dateValue = date.valueOf();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let result = "";
  if (now - dateValue > oneYear) {
    result += year + "-";
  }
  result +=
    ("0" + month).substr(-2, 2) +
    "-" +
    ("0" + day).substr(-2, 2) +
    " " +
    ("0" + hour).substr(-2, 2) +
    ":" +
    ("0" + minute).substr(-2, 2);
  return result;
};

export const diffDayType = (dateTime1, dateTime2) => {
  const dateTimeStamp1 = new Date(dateTime1).valueOf();
  const dateTimeStamp2 = new Date(dateTime2).valueOf();
  if (dateTimeStamp1 < dateTimeStamp2) {
    return "isTimeout";
  }
  const aDay = 24 * 60 * 60 * 1000;
  const diffDay = (dateTimeStamp1 - dateTimeStamp2) / aDay;
  return diffDay > 1 ? "isOneDayOver" : "isOneDayleft";
};

import * as moment from "moment";

export const formatDate = (date, format = "YYYY/MM/DD") => {
  console.log(date);
  return moment(date).format(format);
};

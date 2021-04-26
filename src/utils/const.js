import SImg from "images/S.png";
import A1Img from "images/A+.png";
import A2Img from "images/A.png";
import B1Img from "images/B+.png";
import B2Img from "images/B.png";
import C2Img from "images/C.png";
import D2Img from "images/D.png";

export const GENDER = [
  {
    value: 0,
    label: "保密"
  },
  {
    value: 1,
    label: "男"
  },
  {
    value: 2,
    label: "女"
  }
];

export const IDENTITY = {
  1: "家居爱好者",
  2: "设计师",
  3: "装修机构"
};

// 班级状态
export const TERM_STATUS = {
  0: "未开课",
  1: "进行中",
  2: "已结课"
};

// 作业评分 0:未打分,10:D,20:D+,30:C,40:C+,50:B,60:B+,70:A,80:A+,100:S
export const USER_HOMEWORK_SCORE = {
  10: D2Img,
  // 20: D1Img,
  30: C2Img,
  // 40: C1Img,
  50: B2Img,
  60: B1Img,
  70: A2Img,
  80: A1Img,
  100: SImg
};

// 班级绑定课程类型
export const COURSE_TYPE_COURSE = 1;
export const COURSE_TYPE_BIBLE = 3;
export const COURSE_TYPE_LIVE = 2;

export const COURSE_TYPE = {
  [COURSE_TYPE_COURSE]: {
    value: COURSE_TYPE_COURSE,
    label: "课程"
  },
  [COURSE_TYPE_BIBLE]: {
    value: COURSE_TYPE_BIBLE,
    label: "宝典"
  },
  [COURSE_TYPE_LIVE]: {
    value: 2,
    label: "直播"
  }
};

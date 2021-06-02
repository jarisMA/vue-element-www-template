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

// 问题类型
export const QUESTION_TYPE_QUESTION = 1;
export const QUESTION_TYPE_HELP = 2;
export const QUESTION_TYPE_VOTE = 3;

export const QUESTION_TYPE = {
  QUESTION: {
    value: QUESTION_TYPE_QUESTION,
    label: "图文求助"
  },
  HELP: {
    value: QUESTION_TYPE_HELP,
    label: "布局求助"
  },
  VOTE: {
    value: QUESTION_TYPE_VOTE,
    label: "投票"
  }
};

// 问题发布类型
export const QUESTION_SAVE_STATUS = 1; // 保存草稿
export const QUESTION_PUBLISH_STATUS = 2; // 发布问题

// 投票类型
export const VOTE_TYPE_SINGLE = 0; // 单选
export const VOTE_TYPE_MULTI = 1; // 多选

// 投票选项类型
export const VOTE_RESOURCE_TYPE_WORD = 1; // 文字投票
export const VOTE_RESOURCE_TYPE_PIC = 2; // 图文投票

// 投票选项序号
export const VOTE_OPTION_INDEX = ["A", "B", "C", "D", "E", "F"];

// 回复/评论的格式类型
export const REPLY_TYPE_SIMPLE = 1; // 普通图文
export const REPLY_TYPE_COMPLEX = 2; // 复杂富文本

// 类型
export const TYPE_QUESTION = 1;
export const TYPE_ANSWER = 2;
export const TYPE_COMMENT = 3;

// 课程付费类型
export const COURSE_PRICE_TYPE_FREE = 1;
export const COURSE_PRICE_TYPE_PAY = 2;

// 课程阶段
export const COURSE_LEVEL = {
  1: "入门",
  2: "初阶",
  3: "进阶",
  4: "高阶"
};

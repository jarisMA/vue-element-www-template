const userObjectice = [
  {
    id: 1,
    name: "家居爱好者",
    question: "你的学习目的是",
    children: [
      {
        id: 1,
        name: "学装修 DIY自己的家",
        image: require("images/profession_3-1.svg"),
        image_select: require("images/profession_3-2.svg")
      },
      {
        id: 2,
        name: "想转行 成为设计师",
        image: require("images/profession_1-1.svg"),
        image_select: require("images/profession_1-2.svg")
      }
    ],
    select: 0
  },
  {
    id: 2,
    name: "设计师",
    question: "你目前的状态是",
    children: [
      {
        id: 3,
        name: "独立设计师",
        image: require("images/profession_1-1.svg"),
        image_select: require("images/profession_1-2.svg")
      },
      {
        id: 4,
        name: "在职设计师",
        image: require("images/profession_5-1.svg"),
        image_select: require("images/profession_5-2.svg")
      }
    ],
    select: 0
  },
  {
    id: 3,
    name: "装修机构",
    question: "你所在的机构是",
    children: [
      {
        id: 5,
        name: "纯设计工作室",
        image: require("images/profession_2-1.svg"),
        image_select: require("images/profession_2-2.svg")
      },
      {
        id: 6,
        name: "装修公司",
        image: require("images/profession_4-1.svg"),
        image_select: require("images/profession_4-2.svg")
      }
    ],
    select: 0
  }
];

export default userObjectice;

const userObjectice = [
  {
    id: 1,
    name: "家居爱好者",
    question: "你的学习目的是",
    children: [
      {
        id: 1,
        name: "学装修 DIY自己的家",
        image: require("@/assets/images/tc-jjahz-diy-wxz@2x.png"),
        image_select: require("@/assets/images/tc-jjahz-diy-xz@2x.png")
      },
      {
        id: 2,
        name: "想转行 成为设计师",
        image: require("@/assets/images/tc-jjahz-sjs-wxz@2x.png"),
        image_select: require("@/assets/images/tc-jjahz-sjs-xz@2x.png")
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
        image: require("@/assets/images/tc-jjahz-sjs-wxz@2x.png"),
        image_select: require("@/assets/images/tc-jjahz-sjs-xz@2x.png")
      },
      {
        id: 4,
        name: "在职设计师",
        image: require("@/assets/images/tc-sjs-zz-wxz@2x.png"),
        image_select: require("@/assets/images/tc-sjs-zz-xz@2x.png")
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
        image: require("@/assets/images/tc-zxjg-sj-wxz@2x.png"),
        image_select: require("@/assets/images/tc-zxjg-sj-xz@2x.png")
      },
      {
        id: 6,
        name: "装修公司",
        image: require("@/assets/images/tc-zxjg-zx-wxz@2x.png"),
        image_select: require("@/assets/images/tc-zxjg-zx-wxz@2x.png")
      }
    ],
    select: 0
  }
];

export default userObjectice;

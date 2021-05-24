import QuestionDetail from "@/views/Question/Detail";
import QuestionList from "@/views/Question/List";

const routes = [
  {
    path: "/question",
    name: "Question",
    component: QuestionList,
    meta: {
      auth: false
    }
  },
  {
    path: "/question/:id",
    name: "QuestionDetail",
    component: QuestionDetail,
    meta: {
      auth: false
    }
  }
];

export default routes;

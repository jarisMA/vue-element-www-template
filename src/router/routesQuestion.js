import QuestionDetail from "@/views/Question/Detail";

const routes = [
  {
    path: "/question/:id",
    name: "QuestionDetail",
    component: QuestionDetail,
    meta: {
      auth: true
    }
  }
];

export default routes;

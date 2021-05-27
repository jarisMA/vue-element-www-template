import MyPlan from "@/views/My/Plan";
import Index from "@/views/My/Index";

const routes = [
  {
    path: "my/plan",
    name: "MyPlan",
    component: MyPlan,
    meta: {
      auth: true
    }
  },
  {
    path: "my/setting",
    name: "MySetting",
    component: Index,
    meta: {
      auth: true
    }
  },
  {
    path: "my/course",
    name: "MyCourse",
    component: Index,
    meta: {
      auth: true
    }
  },
  {
    path: "my/question",
    name: "MyQuestion",
    component: Index,
    meta: {
      auth: true
    }
  }
];

export default routes;

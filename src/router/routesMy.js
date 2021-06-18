import MyPlan from "@/views/My/Plan";
import Index from "@/views/My/Index";
import StudyCenter from "@/views/My/StudyCenter";

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
    path: "my/question",
    name: "MyQuestion",
    component: Index,
    meta: {
      auth: true
    }
  },
  {
    path: "study/classes",
    name: "MyClasses",
    component: StudyCenter,
    meta: {
      auth: true
    }
  },
  {
    path: "study/courses",
    name: "MyCourses",
    component: StudyCenter,
    meta: {
      auth: true
    }
  },
  {
    path: "study/systems",
    name: "MySystems",
    component: StudyCenter,
    meta: {
      auth: true
    }
  },
  {
    path: "my/profile",
    name: "MyProfile",
    component: Index,
    meta: {
      auth: true
    }
  },
  {
    path: "my/vip",
    name: "MyVip",
    component: Index,
    meta: {
      auth: true
    }
  },
  {
    path: "my/purchase",
    name: "MyPurchase",
    component: Index,
    meta: {
      auth: true
    }
  }
];

export default routes;

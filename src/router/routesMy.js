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
    path: "my/classes",
    name: "Classes",
    component: StudyCenter,
    meta: {
      auth: true
    }
  },
  {
    path: "my/courses",
    name: "Courses",
    component: StudyCenter,
    meta: {
      auth: true
    }
  },
  {
    path: "my/systems",
    name: "Systems",
    component: StudyCenter,
    meta: {
      auth: true
    }
  },
  {
    path: "my/profile",
    name: "Profile",
    component: Index,
    meta: {
      auth: true
    }
  },
  {
    path: "my/vip",
    name: "Vip",
    component: Index,
    meta: {
      auth: true
    }
  },
  {
    path: "my/purchase",
    name: "Purchase",
    component: Index,
    meta: {
      auth: true
    }
  }
];

export default routes;

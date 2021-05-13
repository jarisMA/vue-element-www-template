import MyPlan from "@/views/My/Plan";

const routes = [
  {
    path: "my/plan",
    name: "MyPlan",
    component: MyPlan,
    meta: {
      auth: true
    }
  }
];

export default routes;

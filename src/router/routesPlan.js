import AddPlan from "@/views/Plan/Add";

const routes = [
  {
    path: "/plan/add",
    name: "AddPlan",
    component: AddPlan,
    meta: {
      auth: true
    }
  }
];

export default routes;

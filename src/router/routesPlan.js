import AddPlan from "@/views/Plan/Add";
import EditPlan from "@/views/Plan/Edit";

const routes = [
  {
    path: "/plan/add",
    name: "AddPlan",
    component: AddPlan
  },
  {
    path: "/plan/edit/:designId",
    name: "EditPlan",
    component: EditPlan
  }
];

export default routes;

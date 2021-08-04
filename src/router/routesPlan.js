// import AddPlan from "@/views/Plan/Add";
import EditPlan from "@/views/Plan/Edit";

const routes = [
  // {
  //   path: "/plan/add",
  //   name: "AddPlan",
  //   component: AddPlan,
  //   meta: {
  //     auth: true
  //   }
  // },
  {
    path: "/plan/edit/:designId",
    name: "EditPlan",
    component: EditPlan,
    meta: {
      auth: true
    }
  },
  {
    path: "/admin/plan/:designId",
    name: "AdminEditPlan",
    component: EditPlan,
    meta: {
      auth: true
    }
  },
  {
    path: "/plan/draw",
    name: "DrawPlan",
    component: EditPlan,
    meta: {
      auth: true
    }
  }
];

export default routes;

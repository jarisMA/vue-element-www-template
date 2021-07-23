import Index from "@/views/Task/Index";
import Join from "@/views/Task/Join";

const routes = [
  {
    path: "task",
    name: "Task",
    component: Index,
    meta: {
      auth: false
    }
  },
  {
    path: "task/join",
    name: "",
    component: Join,
    meta: {
      auth: false
    }
  }
];

export default routes;

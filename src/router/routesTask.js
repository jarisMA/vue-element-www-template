import Index from "@/views/Task/Index";

const routes = [
  {
    path: "task",
    name: "Task",
    component: Index,
    meta: {
      auth: true
    }
  }
];

export default routes;

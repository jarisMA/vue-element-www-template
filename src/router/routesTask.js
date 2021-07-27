import Index from "@/views/Task/Index";
import Detail from "@/views/Task/Detail";
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
    name: "TaskJoin",
    component: Join
  },
  {
    path: "task/:id",
    name: "TaskDetail",
    component: Detail
  }
];

export default routes;

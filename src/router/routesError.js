import NotFound from "@/views/Error/NotFound";

const routes = [
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
    meta: {
      auth: false
    }
  }
];

export default routes;

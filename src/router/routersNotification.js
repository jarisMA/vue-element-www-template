import Index from "@/views/Notification/Index";

const routes = [
  {
    path: "notification",
    name: "Notification",
    component: Index,
    meta: {
      auth: true
    }
  }
];

export default routes;

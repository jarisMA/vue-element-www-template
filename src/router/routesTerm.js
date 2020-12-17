import Term from "@/views/Term/Index";

const routes = [
  {
    path: "/term/:id",
    name: "Term",
    component: Term,
    meta: {
      auth: true
    }
  }
];

export default routes;

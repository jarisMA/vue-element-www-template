import BibleDetail from "@/views/Bible/Detail";

const routes = [
  {
    path: "/bible/:id",
    name: "BibleDetail",
    component: BibleDetail,
    meta: {
      auth: true
    }
  }
];

export default routes;

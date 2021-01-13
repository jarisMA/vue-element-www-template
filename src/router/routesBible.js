import BibleDetail from "@/views/Bible/Detail";
import BibleIndex from "@/views/Bible/Index";

const routes = [
  {
    path: "bible",
    name: "Bible",
    component: BibleIndex,
    meta: {
      auth: true
    }
  },
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

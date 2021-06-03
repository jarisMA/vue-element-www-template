import VipIndex from "@/views/Vip/Index";

const routes = [
  {
    path: "/vip",
    name: "VipIndex",
    component: VipIndex,
    meta: {
      auth: true
    }
  }
];

export default routes;

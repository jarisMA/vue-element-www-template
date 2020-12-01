import routesPlan from "./routesPlan";

import BasicLayout from "@/components/Layout/BasicLayout.vue";
import Home from "@/views/Home.vue";
import My from "@/views/My.vue";
import Protocol from "@/views/Protocol.vue";

const routes = [
  {
    path: "/",
    name: "Root",
    component: BasicLayout,
    redirect: { name: "Home" },
    children: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/my",
        name: "My",
        component: My
      },
      ...routesPlan
    ]
  },
  {
    path: "/protocol",
    name: "Protocol",
    component: Protocol
  }
];

export default routes;

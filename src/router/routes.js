import routesPlan from "./routesPlan";

import BasicLayout from "components/Layout/BasicLayout";
import Home from "@/views/Home";
import My from "@/views/My";
import Protocol from "@/views/Protocol";
import Profile from "@/views/Profile";

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
        component: My,
        meta: {
          auth: true
        }
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
          auth: true
        }
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

import routesPlan from "./routesPlan";
import routesTerm from "./routesTerm";
import routesBible from "./routesBible";
import routesQuestion from "./routesQuestion";
import routesError from "./routesError";
import routesAcademy from "./routesAcademy";

import BasicLayout from "components/Layout/BasicLayout";
import Home from "@/views/Home";
import My from "@/views/My/Index";
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
      ...routesPlan,
      ...routesTerm,
      ...routesBible,
      ...routesQuestion,
      ...routesAcademy,
      ...routesError
    ]
  },
  {
    path: "/protocol",
    name: "Protocol",
    component: Protocol
  },
  {
    path: "/*",
    redirect: { name: "Home" }
  }
];

export default routes;

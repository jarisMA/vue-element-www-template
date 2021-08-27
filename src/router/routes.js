import routesError from "./routesError";

import BasicLayout from "components/Layout/BasicLayout";
import Home from "views/Home";

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
      ...routesError
    ]
  },
  {
    path: "/*",
    redirect: { name: "Home" }
  }
];

export default routes;

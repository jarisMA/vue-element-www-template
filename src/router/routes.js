import routesPlan from "./routesPlan";
import routesTerm from "./routesTerm";
import routesBible from "./routesBible";
import routesQuestion from "./routesQuestion";
import routesError from "./routesError";
import routesAcademy from "./routesAcademy";
import routesMy from "./routesMy";
import routesVip from "./routesVip";

import BasicLayout from "components/Layout/BasicLayout";
import Home from "@/views/Home";
import Protocol from "@/views/Protocol";
import Course from "@/views/Term/Course";
import SeriesCourse from "@/views/Academy/SeriesCourse";
import Order from "@/views/Order";

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
      ...routesPlan,
      ...routesTerm,
      ...routesBible,
      ...routesQuestion,
      ...routesAcademy,
      ...routesMy,
      ...routesVip,
      ...routesError
    ]
  },
  {
    path: "/protocol",
    name: "Protocol",
    component: Protocol
  },
  {
    path: "/course/:courseId/lesson/:lessonIndex",
    name: "Course",
    component: Course,
    meta: {
      auth: true
    }
  },
  {
    path: "/series/:seriesId/course/:courseId/section/:lessonIndex",
    name: "SeriesCourse",
    component: SeriesCourse,
    meta: {
      auth: true
    }
  },
  {
    path: "/order/:no",
    name: "Order",
    component: Order,
    meta: {
      auth: true
    }
  },
  {
    path: "/*",
    redirect: { name: "Home" }
  }
];

export default routes;

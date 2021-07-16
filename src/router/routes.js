import routesPlan from "./routesPlan";
import routesTerm from "./routesTerm";
import routesBible from "./routesBible";
import routesQuestion from "./routesQuestion";
import routesError from "./routesError";
import routesAcademy from "./routesAcademy";
import routesMy from "./routesMy";
import routesVip from "./routesVip";
import routersNotification from "./routersNotification";

import BasicLayout from "components/Layout/BasicLayout";
import Home from "@/views/Home";
import Protocol from "@/views/Protocol";
import AcademyCourseVideo from "@/views/Academy/CourseVideo";
import CampTermVideo from "@/views/Term/Video";
import AcademySeriesVideo from "@/views/Academy/SeriesVideo";
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
      ...routersNotification,
      ...routesError
    ]
  },
  {
    path: "/protocol",
    name: "Protocol",
    component: Protocol
  },
  {
    path: "/play/course/:courseId/lesson/:lessonId",
    name: "AcademyCourseVideo",
    component: AcademyCourseVideo,
    meta: {
      auth: true
    }
  },
  {
    path:
      "/play/camp/:campId/term/:termId/widget/:widgetId/resource/:resourceId",
    name: "CampTermVideo",
    component: CampTermVideo,
    meta: {
      auth: true
    }
  },
  {
    path: "/play/series/:seriesId/chapter/:chapterId/section/:sectionId",
    name: "AcademySeriesVideo",
    component: AcademySeriesVideo,
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

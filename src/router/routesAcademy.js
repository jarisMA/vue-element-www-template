import AcademyIndex from "@/views/Academy/Index";
import AcademyCamp from "@/views/Academy/Camp";
import AcademyCourseList from "@/views/Academy/CourseList";
import AcademySeriesList from "@/views/Academy/SeriesList";
import AcademyCourseDetail from "@/views/Academy/CourseDetail";
import AcademySeriesDetail from "@/views/Academy/SeriesDetail";

const routes = [
  {
    path: "academy",
    name: "Academy",
    component: AcademyIndex
  },
  {
    path: "academy/camp/:id",
    name: "AcademyCamp",
    component: AcademyCamp
  },
  {
    path: "academy/course",
    name: "AcademyCourseList",
    component: AcademyCourseList
  },
  {
    path: "academy/series",
    name: "AcademySeriesList",
    component: AcademySeriesList
  },
  {
    path: "academy/course/:id",
    name: "AcademyCourseDetail",
    component: AcademyCourseDetail
  },
  {
    path: "academy/series/:id",
    name: "AcademySeriesDetail",
    component: AcademySeriesDetail
  }
];

export default routes;

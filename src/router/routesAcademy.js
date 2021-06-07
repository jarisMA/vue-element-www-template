import AcademyIndex from "@/views/Academy/Index";
import AcademyCourseList from "@/views/Academy/CourseList";
import AcademySeriesList from "@/views/Academy/SeriesList";
import AcademyCourseDetail from "@/views/Academy/CourseDetail";
import AcademySeriesDetail from "@/views/Academy/SeriesDetail";
import AcademyCampList from "@/views/Academy/CampList";
import AcademyCampDetail from "@/views/Academy/CampDetail";

const routes = [
  {
    path: "academy",
    name: "Academy",
    component: AcademyIndex
  },
  {
    path: "academy/camp",
    name: "AcademyCampList",
    component: AcademyCampList
  },
  {
    path: "academy/camp/:id",
    name: "AcademyCampDetail",
    component: AcademyCampDetail
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

import AcademyIndex from "@/views/Academy/Index";
import AcademyCamp from "@/views/Academy/Camp";
import AcademyCourseList from "@/views/Academy/CourseList";
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
  }
];

export default routes;

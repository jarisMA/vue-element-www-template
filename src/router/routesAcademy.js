import AcademyIndex from "@/views/Academy/Index";
import AcademyCamp from "@/views/Academy/Camp";

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
  }
];

export default routes;

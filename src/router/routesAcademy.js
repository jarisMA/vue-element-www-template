import AcademyIndex from "@/views/Academy/Index";
import AcademyCategory from "@/views/Academy/Category";

const routes = [
  {
    path: "academy",
    name: "Academy",
    component: AcademyIndex
  },
  {
    path: "academy/:id",
    name: "AcademyCategory",
    component: AcademyCategory
  }
];

export default routes;

import BasicLayout from "@/components/Layout/BasicLayout.vue";
import Home from "@/views/Home.vue";
import My from "@/views/My.vue";
import Notes from "@/views/notes.vue";
import InspirationImg from "@/views/InspirationImg.vue";

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
        component: My
      },
      {
        path: "/notes",
        name: "Notes",
        component: Notes
      },
      {
        path: "/inspiration/img",
        name: "InspirationImg",
        component: InspirationImg
      }
    ]
  }
];

export default routes;

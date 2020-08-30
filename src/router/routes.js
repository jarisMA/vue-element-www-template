import BasicLayout from "@/components/Layout/BasicLayout.vue";
import Home from "@/views/Home.vue";
import My from "@/views/My.vue";
import Notes from "@/views/notes.vue";
import InspirationImage from "@/views/InspirationImage.vue";

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
        path: "/inspiration/image",
        name: "InspirationImage",
        component: InspirationImage
      }
    ]
  }
];

export default routes;

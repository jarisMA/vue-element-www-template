import BasicLayout from "@/components/Layout/BasicLayout.vue";
import Home from "@/views/Home.vue";
import My from "@/views/My.vue";
import Note from "@/views/Note.vue";
import Blog from "@/views/Blog.vue";
import Protocol from "@/views/Protocol.vue";
import Policy from "@/views/Policy.vue";

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
        path: "/note",
        name: "Note",
        component: Note
      },
      {
        path: "/blog",
        name: "Blog",
        component: Blog
      }
    ]
  },
  {
    path: "/protocol",
    name: "Protocol",
    component: Protocol
  },
  {
    path: "/policy",
    name: "Policy",
    component: Policy
  }
];

export default routes;

import BasicLayout from "@/components/Layout/BasicLayout.vue";
import Home from "@/views/Home.vue";
import My from "@/views/My.vue";
import AddPlan from "@/views/AddPlan.vue";
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
        path: "/add-plan",
        name: "AddPlan",
        component: AddPlan
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

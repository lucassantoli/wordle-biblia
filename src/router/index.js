import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Bible",
    component: () => import("@/views/Bible.vue"),
  },
  {
    path: "/infinito",
    name: "Infinite",
    component: () => import("@/views/Infinite.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

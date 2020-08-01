import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/sign-in",
    component: () => import("@/views/SignInPage.vue")
  },
  {
    path: "/sign-up",
    component: () => import("@/views/SignUpPage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

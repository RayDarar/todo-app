import VueRouter from "vue-router";

export function routeTo(router: VueRouter, path: string) {
  if (router.currentRoute.path === path) return;
  router.push(path);
}

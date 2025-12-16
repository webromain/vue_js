import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Accueil" },
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
    meta: { title: "Products" },
  },
  {
    path: "/about",
    name: "about",
    meta: { title: "About" },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} | Mon application Vue`
    : "Mon application Vue";
});

export default router;

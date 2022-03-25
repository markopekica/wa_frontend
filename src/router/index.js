import Vue from "vue";
import VueRouter from "vue-router";
import Stats from "../views/stats.vue";
import { Auth } from "@/services";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "stats",
    component: Stats,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/about.vue"),
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: () => import("../views/signin.vue"),
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => import("../views/signup.vue"),
  },
  {
    path: "/activity",
    name: "Activity",
    component: () => import("../views/activity.vue"),
  },
  {
    path: "/clock",
    name: "Clock",
    component: () => import("../views/clock.vue"),
  },
  {
    path: "/options",
    name: "/Options",
    component: () => import("../views/options.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicSites = ["/signIn", "/signUp", "/about"];
  const loginRequired = !publicSites.includes(to.path);
  const user = Auth.getUser();

  if (loginRequired && !user) {
    next("/signIn");
    return;
  }

  next();
});

export default router;

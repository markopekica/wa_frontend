import Vue from 'vue'
import VueRouter from 'vue-router'
import Stats from '../views/Stats.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Stats',
    component: Stats
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import(/* webpackChunkName: "about" */ '../views/Activity.vue')
  },
  {
    path: '/clock',
    name: 'Clock',
    component: () => import(/* webpackChunkName: "about" */ '../views/Clock.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

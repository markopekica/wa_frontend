import Vue from 'vue'
import VueRouter from 'vue-router'
import Stats from '../views/Stats.vue'
import { Auth } from '@/services'

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
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('../views/Activity.vue')
  },
  {
    path: '/clock',
    name: 'Clock',
    component: () => import('../views/Clock.vue'),
  },
  {
    path: '/challenge',
    name: '/Challenge',
    component: () => import('../views/Challenge.vue')
  },
  {
    path: '/options',
    name: '/Options',
    component: () => import('../views/Options.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to, from, next) => {
  const publicSites = ['/signIn', '/signUp', '/about']
  const loginRequired = !publicSites.includes(to.path)
  const user = Auth.getUser()

  if( loginRequired && !user ){
    next('/signIn')
    return
  }
  
  next( )

})

export default router

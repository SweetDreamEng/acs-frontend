import Vue from 'vue'
import Router from 'vue-router'

// Routes
import ACSMachines from './acs-machines.routes'
import PagesRoutes from './pages.routes'
import UsersRoutes from './users.routes'

Vue.use(Router)

export const routes = [{
  path: '/',
  redirect: '/dashboard/analytics'
}, {
  path: '/dashboard/analytics',
  name: 'dashboard-analytics',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard/DashboardPage.vue'),
  meta: {
    layout: 'dashboard',
    userAuth: true
  }
}, {
  path: '/dashboard/product/:id',
  name: 'dashboard-product',
  component: () => import(/* webpackChunkName: "dashboard-product" */ '@/pages/dashboard/DashboardProduct.vue'),
  meta: {
    userAuth: true
  }
}, {
  path: '/dashboard/:location',
  name: 'location-dashboard',
  component: () => import(/* webpackChunkName: "location-dashboard" */ '@/pages/dashboard/LocationDashboard.vue'),
  meta: {
    layout: 'dashboard',
    userAuth: true
  }
}, {
  path: '/dashboard/:location/:zone',
  name: 'zone-dashboard',
  component: () => import(/* webpackChunkName: "zone-dashboard" */ '@/pages/dashboard/ZoneDashboard.vue'),
  meta: {
    layout: 'dashboard',
    userAuth: true
  }
},
...ACSMachines,
...PagesRoutes,
...UsersRoutes,
{
  path: '/blank',
  name: 'blank',
  component: () => import(/* webpackChunkName: "blank" */ '@/pages/BlankPage.vue')
},
{
  path: '*',
  name: 'error',
  component: () => import(/* webpackChunkName: "error" */ '@/pages/error/NotFoundPage.vue'),
  meta: {
    layout: 'error'
  }
}]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
  return next()
})

/**
 * After each route update
 */
router.afterEach((to, from) => {
})

export default router

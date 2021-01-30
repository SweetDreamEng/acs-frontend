import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import bootstrap from './bootstrap'

// Routes

import AppSettingsRoutes from './app-settings.routes'
import ACSMachines from './acs-machines.routes'
import PagesRoutes from './pages.routes'
import UsersRoutes from './users.routes'
import CustomersRoutes from './customers.routes'

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
    customerAdmin: true
  }
}, {
  path: '/dashboard/analytics/:location/:zone/:configurationId/:productId',
  name: 'dashboard-product',
  component: () => import(/* webpackChunkName: "dashboard-product" */ '@/pages/dashboard/DashboardProduct.vue'),
  meta: {
    layout: 'dashboard',
    userAuth: true
  }
}, {
  path: '/dashboard/analytics/:location',
  name: 'location-dashboard',
  component: () => import(/* webpackChunkName: "location-dashboard" */ '@/pages/dashboard/LocationDashboard.vue'),
  meta: {
    layout: 'dashboard',
    customerAdmin: true
  }
}, {
  path: '/dashboard/analytics/:location/:zone',
  name: 'zone-dashboard',
  component: () => import(/* webpackChunkName: "zone-dashboard" */ '@/pages/dashboard/ZoneDashboard.vue'),
  meta: {
    layout: 'dashboard',
    customerAdmin: true
  }
}, {
  path: '/products/:configurationId/:productId',
  name: 'product-details',
  component: () => import(/* webpackChunkName: "product-details" */ '@/pages/dashboard/DashboardProduct.vue'),
  meta: {
  }
},
...AppSettingsRoutes,
...ACSMachines,
...PagesRoutes,
...UsersRoutes,
...CustomersRoutes,
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

let firstRoute = true

/**
 * Before each route update
 */
router.beforeEach(async (to, from, next) => {
  if (firstRoute) {
    firstRoute = false

    await bootstrap()
  }

  const { role } = store.state.auth.user

  const requiresAuth =
    (to.matched.some((record) => record.meta.superAdmin)) ||
    (to.matched.some((record) => record.meta.userAuth)) ||
    (to.matched.some((record) => record.meta.acsAdmin)) ||
    (to.matched.some((record) => record.meta.customerAdmin))

  if (requiresAuth) {
    if (role) {
      if (to.matched.some((record) => record.meta.userAuth)) {
        return next()
      } else if (role !== 'acs_admin' && to.matched.some((record) => record.meta.userAuth)) {
        return next({
          name: 'auth-signin'
        })
      } else if (role !== 'customer_admin' && to.matched.some((record) => record.meta.userAuth)) {
        return next({
          name: 'auth-signin'
        })
      }

      return next()
    } else {
      return next({
        name: 'auth-signin'
      })
    }
  } else {
    if (role && (to.matched.some((record) => record.meta.userNotAuth))) {
      if (role === 'acs_admin') {
        return next({
          name: 'acs-machines'
        })
      } else if (role === 'customer_admin' && role === 'customer_manager' || role === 'customer_operator') {
        return next({
          name: 'dashboard-analytics'
        })
      }
    }
  }

  return next()
})
export default router

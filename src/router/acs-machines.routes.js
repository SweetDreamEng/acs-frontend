export default [
  {
    path: '/acs-machines',
    name: 'acs-machines',
    component: () => import(/* webpackChunkName: "acs-machines" */ '@/pages/dashboard/DashboardPage.vue'),
    meta: {
    	layout: 'dashboard',
      acsAdmin: true
    }
  }, {
    path: '/acs-machines/alarms',
    name: 'acs-machines-alarms',
    component: () => import(/* webpackChunkName: "acs-machines-alarms" */ '@/pages/acs-machines/Alarms.vue'),
    meta: {
      acsAdmin: true
    }
  }, {
    path: '/acs-machines/:location',
    name: 'location-acs-dashboard',
    component: () => import(/* webpackChunkName: "location-acs-dashboard" */ '@/pages/dashboard/LocationDashboard.vue'),
    meta: {
      layout: 'dashboard',
      acsAdmin: true
    }
  }, {
    path: '/acs-machines/:location/:zone',
    name: 'zone-acs-dashboard',
    component: () => import(/* webpackChunkName: "zone-acs-dashboard" */ '@/pages/dashboard/ZoneDashboard.vue'),
    meta: {
      layout: 'dashboard',
      acsAdmin: true
    }
  }, {
    path: '/acs-machines/:location/:zone/:configurationId/:productId',
    name: 'product-acs-dashboard',
    component: () => import(/* webpackChunkName: "product-acs-dashboard" */ '@/pages/dashboard/ProductDashboard.vue'),
    meta: {
      layout: 'dashboard',
      acsAdmin: true
    }
  }
]

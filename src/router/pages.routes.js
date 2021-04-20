export default [{
  path: '/auth/signin',
  name: 'auth-signin',
  component: () => import(/* webpackChunkName: "auth-signin" */ '@/pages/auth/SigninPage.vue'),
  meta: {
    layout: 'auth',
    userNotAuth: true
  }
},
//{
//  path: '/auth/signup',
//  name: 'auth-signup',
//  component: () => import(/* webpackChunkName: "auth-signup" */ '@/pages/auth/SignupPage.vue'),
//  meta: {
//    layout: 'auth',
//    userNotAuth: true
//  }
//},
{
  path: '/profile',
  name: 'profile',
  component: () => import(/* webpackChunkName: "profile" */ '@/pages/profile/ProfilePage.vue'),
  meta: {
    userAuth: true
  }
}, {
  path: '/auth/verify-email',
  name: 'auth-verify-email',
  component: () => import(/* webpackChunkName: "auth-verify-email" */ '@/pages/auth/VerifyEmailPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/auth/forgot-password',
  name: 'auth-forgot',
  component: () => import(/* webpackChunkName: "auth-forgot" */ '@/pages/auth/AuthForgotPasswordPage.vue'),
  meta: {
    layout: 'auth',
    userNotAuth: true
  }
}, {
  path: '/auth/reset-password',
  name: 'auth-reset',
  component: () => import(/* webpackChunkName: "auth-reset" */ '@/pages/auth/AuthPasswordResetPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/error/not-found',
  name: 'error-not-found',
  component: () => import(/* webpackChunkName: "error-not-found" */ '@/pages/error/NotFoundPage.vue'),
  meta: {
    layout: 'error'
  }
}, {
  path: '/error/unexpected',
  name: 'error-unexpected',
  component: () => import(/* webpackChunkName: "error-unexpected" */ '@/pages/error/UnexpectedPage.vue'),
  meta: {
    layout: 'error'
  }
}, {
  path: '/utility/maintenance',
  name: 'utility-maintenance',
  component: () => import(/* webpackChunkName: "utility-maintenance" */ '@/pages/utility/MaintenancePage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/utility/coming-soon',
  name: 'utility-soon',
  component: () => import(/* webpackChunkName: "utility-soon" */ '@/pages/utility/SoonPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/utility/help',
  name: 'utility-help',
  component: () => import(/* webpackChunkName: "utility-help" */ '@/pages/utility/HelpPage.vue')
}, {
  path: '/threshold/list',
  name: 'threshold-list',
  component: () => import(/* webpackChunkName: "threshold-list" */ '@/pages/threshold/ThresholdsPage.vue'),
  meta: {
    userAuth: true
  }
}, {
  path: '/threshold/add',
  name: 'threshold-add',
  component: () => import(/* webpackChunkName: "threshold-add" */ '@/pages/threshold/AddThresholdPage.vue'),
  meta: {
    userAuth: true
  }
}, {
  path: '/threshold/edit',
  name: 'threshold-edit',
  component: () => import(/* webpackChunkName: "threshold-edit" */ '@/pages/threshold/EditThresholdPage.vue'),
  meta: {
    userAuth: true
  }
}, {
  path: '/machine-mapping',
  name: 'machine-mapping',
  component: () => import(/* webpackChunkName: "machine-mapping" */ '@/pages/machine-mapping/MachineMappingPage.vue'),
  meta: {
    customerAdmin: true
  }
}, {
  path: '/customer-assign',
  name: 'customer-assign',
  component: () => import(/* webpackChunkName: "customer-assign" */ '@/pages/machine-mapping/CustomerAssignPage.vue'),
  meta: {
    acsAdmin: true
  }
}, {
  path: '/locations-zones',
  name: 'locations-zones',
  component: () => import(/* webpackChunkName: "locations-zones" */ '@/pages/locations-zones/LocationsZonesPage.vue'),
  meta: {
    customerAdmin: true
  }
}, {
  path: '/materials/material-locations',
  name: 'materials',
  component: () => import(/* webpackChunkName: "materials" */ '@/pages/materials/MaterialLocationsPage.vue'),
  meta: {
    customerAdmin: true
  }
}, {
  path: '/materials/job-inventory-report',
  name: 'materials-job-inventory-report',
  component: () => import(/* webpackChunkName: "materials-report" */ '@/pages/materials/JobInventoryReport.vue'),
  meta: {
    customerAdmin: true
  }
}, {
  path: '/materials/system-inventory-report',
  name: 'materials-system-inventory-report',
  component: () => import(/* webpackChunkName: "materials-report" */ '@/pages/materials/SystemInventoryReport.vue'),
  meta: {
    customerAdmin: true
  }
}
// {
//   path: '/reports',
//   name: 'machines-report',
//   component: () => import(/* webpackChunkName: "machines-report" */ '@/pages/reports/ReportsPage.vue'),
//   meta: {
//     customerAdmin: true
//   }
// }
]

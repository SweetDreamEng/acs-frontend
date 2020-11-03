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
  component: () => import(/* webpackChunkName: "profile" */ '@/pages/profile/Index.vue')
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
  component: () => import(/* webpackChunkName: "auth-forgot" */ '@/pages/auth/ForgotPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/auth/reset-password',
  name: 'auth-reset',
  component: () => import(/* webpackChunkName: "auth-reset" */ '@/pages/auth/ResetPage.vue'),
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
  component: () => import(/* webpackChunkName: "threshold-list" */ '@/pages/threshold/ListThreshold.vue')
}, {
  path: '/threshold/add',
  name: 'threshold-add',
  component: () => import(/* webpackChunkName: "threshold-add" */ '@/pages/threshold/AddThreshold.vue')
}, {
  path: '/threshold/edit',
  name: 'threshold-edit',
  component: () => import(/* webpackChunkName: "threshold-edit" */ '@/pages/threshold/EditThreshold.vue')
}, {
  path: '/machine-mapping',
  name: 'machine-mapping',
  component: () => import(/* webpackChunkName: "machine-mapping" */ '@/pages/machine-mapping/index.vue')
}, {
  path: '/customer-assign',
  name: 'customer-assign',
  component: () => import(/* webpackChunkName: "customer-assign" */ '@/pages/machine-mapping/CustomerAssign.vue')
}, {
  path: '/customers/list',
  name: 'customers-list',
  component: () => import(/* webpackChunkName: "customers-list" */ '@/pages/customers/Index.vue'),
  meta: {
    userAuth: true
  }
}, {
  path: '/customers/add',
  name: 'customers-add',
  component: () => import(/* webpackChunkName: "customers-add" */ '@/pages/customers/AddCustomer.vue'),
  meta: {
    userAuth: true
  }
}, {
  path: '/customers/edit/:id',
  name: 'customers-edit',
  component: () => import(/* webpackChunkName: "customers-edit" */ '@/pages/customers/EditCustomer.vue'),
  meta: {
    userAuth: true
  }
}, {
  path: '/division-zones',
  name: 'division-zones',
  component: () => import(/* webpackChunkName: "division-zones" */ '@/pages/division-zones/DivisionZones.vue')
}]

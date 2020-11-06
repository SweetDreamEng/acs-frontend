export default [
  {
    path: '/acs-machines',
    name: 'acs-machines',
    component: () => import(/* webpackChunkName: "acs-machines" */ '@/pages/acs-machines/Index.vue'),
    meta: {
      userAuth: true
    }
  }
]

export default [{
  path: '/app-settings/customize-application',
  name: 'app-settings-customize-application',
  component: () => import(/* webpackChunkName: "app-settings-logo" */ '@/pages/app-settings/Customization.vue'),
  meta: {
    superAdmin: true
  }
}]

export default [{
  path: '/app-settings/choose-logo',
  name: 'app-settings-choose-logo',
  component: () => import(/* webpackChunkName: "app-settings-logo" */ '@/pages/app-settings/ChooseLogo.vue'),
  meta: {
    superAdmin: true
  }
}]

export default [{
  path: '/app-settings/color',
  name: 'app-settings-color',
  component: () => import(/* webpackChunkName: "app-settings-color" */ '@/pages/app-settings/ChooseColor.vue'),
  meta: {
    superAdmin: true
  }
}]

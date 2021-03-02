export default [{
  path: '/app-settings/customize-application',
  name: 'app-settings-customize-application',
  component: () => import(/* webpackChunkName: "app-settings-logo" */ '@/pages/app-settings/AppSettingsCustomizationPage.vue'),
  meta: {
    superAdmin: true
  }
}, {
  path: '/app-settings/configurations',
  name: 'app-settings-configurations',
  component: () => import(/* webpackChunkName: "app-settings-configurations" */ '@/pages/app-settings/configurations/AppSettingConfiguration.vue'),
  meta: {
    superAdmin: true
  }
}, {
  path: '/app-settings/configurations/:id',
  name: 'app-settings-configurations-edit',
  component: () => import(/* webpackChunkName: "app-settings-configurations-edit" */ '@/pages/app-settings/configurations/AppSettingEdit.vue'),
  meta: {
    superAdmin: true
  }
}]

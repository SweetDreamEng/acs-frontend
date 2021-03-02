export default [{
  path: '/companies/list',
  name: 'companies-list',
  component: () => import(/* webpackChunkName: "companies-list" */ '@/pages/companies/Index.vue'),
  meta: {
    acsAdmin: true
  }
}, {
  path: '/companies/add',
  name: 'companies-add',
  component: () => import(/* webpackChunkName: "companies-add" */ '@/pages/companies/AddCompany.vue'),
  meta: {
    acsAdmin: true
  }
}, {
  path: '/companies/edit/:id',
  name: 'companies-edit',
  component: () => import(/* webpackChunkName: "companies-edit" */ '@/pages/companies/EditCompany.vue'),
  meta: {
    acsAdmin: true
  }
}, {
  path: '/companies/alarms',
  name: 'companies-alarms',
  component: () => import(/* webpackChunkName: "companies-alarms" */ '@/pages/companies/Alarms.vue'),
  meta: {
    acsAdmin: true
  }
}]

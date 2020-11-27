export default [{
  path: '/acs-admin/users/list',
  name: 'acs-users-list',
  component: () => import(/* webpackChunkName: "acs-users-list" */ '@/pages/acs-users/UsersPage.vue'),
  meta: {
    acsAdmin: true
  }
}, {
  path: '/acs-admin/users/edit/:id',
  name: 'acs-users-edit',
  component: () => import(/* webpackChunkName: "acs-users-edit" */ '@/pages/acs-users/EditUserPage.vue'),
  meta: {
    acsAdmin: true
  }
}, {
  path: '/acs-admin/users/add',
  name: 'acs-users-add',
  component: () => import(/* webpackChunkName: "acs-users-add" */ '@/pages/acs-users/CreateUserPage.vue'),
  meta: {
    acsAdmin: true
  }
}]

export default [{
  path: '/users',
  name: 'users-list',
  component: () => import(/* webpackChunkName: "users-list" */ '@/pages/users/UsersPage.vue'),
  meta: {
    customerAdmin: true
  }
}, {
  path: '/users/edit/:id',
  name: 'users-edit',
  component: () => import(/* webpackChunkName: "users-edit" */ '@/pages/users/EditUserPage.vue'),
  meta: {
    customerAdmin: true
  }
}, {
  path: '/users/add',
  name: 'users-add',
  component: () => import(/* webpackChunkName: "users-add" */ '@/pages/users/CreateUserPage.vue'),
  meta: {
    customerAdmin: true
  }
}, {
  path: '/acs-admin/users',
  name: 'acs-users-list',
  component: () => import(/* webpackChunkName: "acs-users-list" */ '@/pages/users/UsersPage.vue'),
  meta: {
    acsAdmin: true
  }
}, {
  path: '/acs-admin/users/edit/:id',
  name: 'acs-users-edit',
  component: () => import(/* webpackChunkName: "acs-users-edit" */ '@/pages/users/EditUserPage.vue'),
  meta: {
    acsAdmin: true
  }
}, {
  path: '/acs-admin/users/add',
  name: 'acs-users-add',
  component: () => import(/* webpackChunkName: "acs-users-add" */ '@/pages/users/CreateUserPage.vue'),
  meta: {
    acsAdmin: true
  }
}]

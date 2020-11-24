export default [{
  path: '/users',
  redirect: 'users-list'
}, {
  path: '/users/list',
  name: 'users-list',
  component: () => import(/* webpackChunkName: "users-list" */ '@/pages/users/UsersPage.vue'),
  meta: {
    userAuth: true
  }
}, {
  path: '/users/edit/:id',
  name: 'users-edit',
  component: () => import(/* webpackChunkName: "users-edit" */ '@/pages/users/EditUserPage.vue'),
  meta: {
    userAuth: true
  }
}, {
  path: '/users/add',
  name: 'users-add',
  component: () => import(/* webpackChunkName: "users-add" */ '@/pages/users/CreateUserPage.vue'),
  meta: {
    userAuth: true
  }
}]

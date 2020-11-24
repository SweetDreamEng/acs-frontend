import Vue from 'vue'
import App from './App.vue'

// packages
import Auth from './packages/Auth'
Vue.use(Auth)

import VueMask from 'v-mask'
Vue.use(VueMask)

// VUEX - https://vuex.vuejs.org/
import store from './store'

// VUE-ROUTER - https://router.vuejs.org/
import router from './router'

// PLUGINS
import vuetify from './plugins/vuetify'
import i18n from './plugins/vue-i18n'
import './plugins/vue-google-maps'
import './plugins/vue-shortkey'
import './plugins/vue-head'
import './plugins/vue-gtag'
import './plugins/apexcharts'
import './plugins/echarts'
import './plugins/animate'
import './plugins/clipboard'
import './plugins/moment'
import './plugins/echarts'

// FILTERS
import './filters/initials'
import './filters/capitalize'
import './filters/lowercase'
import './filters/uppercase'
import './filters/formatCurrency'
import './filters/formatDate'
import './filters/percentableLabel'

// STYLES
// Main Theme SCSS
import './assets/scss/theme.scss'

// Animation library - https://animate.style/
import 'animate.css/animate.min.css'

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.userNotAuth)) {
    return Vue.auth.check().then((response) => {
      if (response) {
        return next({
          name: 'dashboard-analytics'
        })
      }

      return next()
    })
  } else if (to.matched.some((record) => record.meta.userAuth)) {
    return Vue.auth.check().then((response) => {
      if (!response) {
        return next({
          name: 'auth-signin'
        })
      }

      return next()
    })
  } else {
    return next()
  }
})

store.commit('app/resetToast', { root: true })
store.commit('customers/CLEAR_ERROR', { root: true })

// Set this to false to prevent the production tip on Vue startup.
Vue.config.productionTip = false

/*
|---------------------------------------------------------------------
| Main Vue Instance
|---------------------------------------------------------------------
|
| Render the vue application on the <div id="app"></div> in index.html
|
| https://vuejs.org/v2/guide/instance.html
|
*/
export default new Vue({
  i18n,
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

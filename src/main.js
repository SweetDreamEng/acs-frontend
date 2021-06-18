import Vue from 'vue'
import App from './App.vue'

import VueMask from 'v-mask'
Vue.use(VueMask)

// VUEX - https://vuex.vuejs.org/
import store from './store'

// VUE-ROUTER - https://router.vuejs.org/
import router from './router'

// PLUGINS
import vuetify from './plugins/vuetify'
import './plugins/apexcharts'
import './plugins/animate'
import './plugins/clipboard'
import './plugins/rules'
import './plugins/sentry'
import './plugins/download'

// FILTERS
import './filters/initials'
import './filters/capitalize'
import './filters/lowercase'
import './filters/uppercase'
import './filters/formatDate'
import './filters/percentableLabel'

// GLOBAL VARIABLES
// TODO: instead of having a VUE_APP_SERVER_API_ENDPOINT a VUE_APP_SERVER_BASE_URL would be more suitable (without the /api)
const BASE_URL = process.env.VUE_APP_SERVER_API_ENDPOINT.slice(0, -3)

Vue.prototype.$BASE_URL = BASE_URL
Vue.prototype.$REPORTS_URL = `${BASE_URL}assets/app/reports/`

// STYLES
// Main Theme SCSS
import './assets/scss/theme.scss'

// Animation library - https://animate.style/
import 'animate.css/animate.min.css'

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
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

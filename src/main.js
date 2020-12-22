import Vue from 'vue'
import App from './App.vue'

// packages
import Auth from './packages/Auth'
Vue.use(Auth)

import VueMask from 'v-mask'
Vue.use(VueMask)

// import Echo from 'laravel-echo'
// window.Pusher = require('pusher-js')
// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: 'ce4734b07a1e03416f4c',
//   cluster: 'mt1',
//   encrypted: true
// })

// VUEX - https://vuex.vuejs.org/
import store from './store'

// VUE-ROUTER - https://router.vuejs.org/
import router from './router'

// PLUGINS
import vuetify from './plugins/vuetify'
import { mapState, mapActions } from 'vuex'
import './plugins/vue-head'
import './plugins/apexcharts'
import './plugins/animate'
import './plugins/clipboard'
import './plugins/moment'
import './plugins/rules'
import './plugins/channel'

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
  computed: {
    ...mapState({
      privateColors: (state) => state.settings.private_colors
    })
  },
  mounted() {
    this.setInitialSetting().then(() => {
      this.$vuetify.theme.themes.light.primary = this.privateColors[0]
      if (this.privateColors.length >= 2) {
        this.$vuetify.theme.themes.light.accent = this.privateColors[1]
        this.$vuetify.theme.themes.light.background = this.privateColors[2]
      } 
    })
  },
  methods: {
    ...mapActions({
      setInitialSetting: 'settings/setInitialSetting'
    })
  },
  render: (h) => h(App)
}).$mount('#app')

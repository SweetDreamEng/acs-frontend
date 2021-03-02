import Vue from 'vue'
import * as Icons from './mdi-icons'

// For a-la-carte components - https://vuetifyjs.com/en/customization/a-la-carte/
import Vuetify from 'vuetify/lib'

import * as directives from 'vuetify/lib/directives'
import config from '../configs'

/**
 * Vuetify Plugin
 * Main components library
 *
 * https://vuetifyjs.com/
 *
 */
Vue.use(Vuetify, {
  directives
})

const icons = {}

for (const key in Icons) {
  // Create values for icons => { 'mdi-cog': mdiCog }
  icons[key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()] = Icons[key]
}

export default new Vuetify({
  rtl: config.theme.isRTL,
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      dark: config.theme.dark,
      light: config.theme.light
    }
  },
  icons: {
    iconfont: 'mdiSvg',
    values: icons
  }
})

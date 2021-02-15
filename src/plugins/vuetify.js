import Vue from 'vue'

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
  }
})

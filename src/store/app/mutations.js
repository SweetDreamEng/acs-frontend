import Vuetify from '../../plugins/vuetify'

export default {
  /**
   * Main Toast
   */
  showToast: (state, toast) => {
    const { icon, color, timeout, message } = toast

    state.toast = {
      icon,
      message,
      color,
      timeout,
      show: true
    }
  },
  hideToast: (state) => {
    state.toast.show = false
  },
  resetToast: (state) => {
    state.toast = {
      icon: '',
      show: false,
      color: 'black',
      message: '',
      timeout: 3000
    }
  },

  /**
   * Theme and Layout
   */
  setGlobalTheme: (state, theme) => {
    Vuetify.framework.theme.dark = theme === 'dark'
    state.globalTheme = theme
  },
  setRTL: (state, isRTL) => {
    Vuetify.framework.rtl = isRTL
    state.isRTL = isRTL
  },
  setContentBoxed: (state, isBoxed) => {
    state.isContentBoxed = isBoxed
  },
  setMenuTheme: (state, theme) => {
    state.menuTheme = theme
  },
  setToolbarTheme: (state, theme) => {
    state.toolbarTheme = theme
  },
  setTimeZone: (state, zone) => {
    state.time.zone = zone
  },
  setTimeFormat: (state, format) => {
    state.time.format = format
  },
  setCurrency: (state, currency) => {
    state.currency = currency
  },
  setToolbarDetached: (state, isDetached) => {
    state.isToolbarDetached = isDetached
  },
  PAGE_LOADING: (state) => {
    state.isPageLoading = true
  },
  PAGE_LOADED: (state) => {
    state.isPageLoading = false
  }
}

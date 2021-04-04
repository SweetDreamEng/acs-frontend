import configs from '../../configs'
import actions from './actions'
import mutations from './mutations'

const { product, time, theme } = configs

const { globalTheme, menuTheme, toolbarTheme, isToolbarDetached, isContentBoxed, isRTL, light } = theme

// state initial values
const state = {
  product,

  time,

  light,

  // themes and layout configurations
  globalTheme,
  menuTheme,
  toolbarTheme,
  isToolbarDetached,
  isContentBoxed,
  isRTL,

  // App.vue main toast
  toast: {
    show: false,
    icon: '',
    color: 'black',
    message: '',
    timeout: 3000
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

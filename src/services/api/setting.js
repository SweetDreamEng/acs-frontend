import api from '@/api.js'
export default {
  grabColors(data) {
    return api.post('/app-settings/grab-colors', data).then((response) => {
      return response
    })
  },

  setPrivateColors(data) {
    return api.post('/app-settings/set-private-colors', data).then((response) => {
      return response
    })
  },

  getSetting(data) {
    return api.post('/app-settings/get-setting', data).then((response) => {
      return response
    })
  },

  updateAuthBackground() {
    return api.post('/app-settings/update-auth-background').then((response) => {
      return response
    })
  },

  uploadLogo(data) {
    return api.post('/app-settings/upload-logo', data).then((response) => {
      return response
    })
  }
}
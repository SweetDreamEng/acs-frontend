import api from '@/api.js'
export default {
  appSettings() {
    return api.get('/settings/app-settings')
  },
  
  grabColors(data) {
    return api.post('/app-settings/grab-colors', data)
  },

  applyWebsiteColors(data) {
    return api.post('/app-settings/website-colors', data)
  },

  getSetting(data) {
    return api.post('/app-settings/get-setting', data)
  },

  updateAuthBackground() {
    return api.post('/app-settings/update-auth-background')
  },

  uploadLogo(data) {
    return api.post('/app-settings/upload-logo', data)
  },

  resetSettings() {
    return api.post('/app-settings/reset')
  }
}

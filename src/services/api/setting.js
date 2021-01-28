import api from '@/api.js'
export default {
  async appSettings() {
    return api.get('/settings/app-settings')
  },
  
  async grabColors(data) {
    return api.post('/app-settings/grab-colors', data)
  },

  async setPrivateColors(data) {
    return api.post('/app-settings/set-private-colors', data)
  },

  async getSetting(data) {
    return api.post('/app-settings/get-setting', data)
  },

  async updateAuthBackground() {
    return api.post('/app-settings/update-auth-background')
  },

  async uploadLogo(data) {
    return api.post('/app-settings/upload-logo', data)
  },

  async resetSettings() {
    return api.post('/app-settings/reset')
  }
}

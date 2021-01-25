import api from '@/api.js'
export default {
  async appSettings() {
    return await api.get('/settings/app-settings')
  },
  
  async grabColors(data) {
    return await api.post('/app-settings/grab-colors', data)
  },

  async setPrivateColors(data) {
    return await api.post('/app-settings/set-private-colors', data)
  },

  async getSetting(data) {
    return await api.post('/app-settings/get-setting', data)
  },

  async updateAuthBackground() {
    return await api.post('/app-settings/update-auth-background')
  },

  async uploadLogo(data) {
    return await api.post('/app-settings/upload-logo', data)
  },

  async resetSettings() {
    return await api.post('/app-settings/reset')
  }
}

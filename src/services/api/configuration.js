import api from '@/api.js'
export default {
  async getConfigurations() {
    return api.get('/configurations')
  },

  async getConfiguration(id) {
    return api.get(`/configurations/${id}`)
  },

  async saveConfiguration(configuration) {
    return api.post(`/configurations/${configuration.id}`, configuration)
  }
}
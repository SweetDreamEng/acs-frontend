import api from '@/api.js'
export default {
  async getConfigurations() {
    return await api.get('/configurations')
  },

  async getConfiguration(id) {
    return await api.get(`/configurations/${id}`)
  },

  async saveConfiguration(configuration) {
    return await api.post(`/configurations/${configuration.id}`, configuration)
  }
}
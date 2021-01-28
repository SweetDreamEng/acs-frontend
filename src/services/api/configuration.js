import api from '@/api.js'
export default {
  getConfigurations() {
    return api.get('/configurations')
  },

  getConfiguration(id) {
    return api.get(`/configurations/${id}`)
  },

  saveConfiguration(configuration) {
    return api.post(`/configurations/${configuration.id}`, configuration)
  }
}
import api from '@/api.js'
export default {
  getConfigurations() {
    return api.get('/configurations').then((response) => {
      return response
    })
  },
  getConfiguration(id) {
    return api.get(`/configurations/${id}`).then((response) => {
      return response
    })
  },
  saveConfiguration(configuration) {
    return api.post(`/configurations/${configuration.id}`, configuration).then((response) => {
      return response
    })
  }
}
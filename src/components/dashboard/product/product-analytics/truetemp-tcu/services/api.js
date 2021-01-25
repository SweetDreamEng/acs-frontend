import api from '@/api.js'
export default {
  async getActTgtTemperatures(id) {
    return await api.get(`/analytics/tcu/actual-target-temperature/${id}`)
  },

  async getOverview(data) {
    return await api.post('/analytics/product-overview', data)
  },
  
  async getSystemStates(data) {
    return await api.post('/analytics/product-system-states', data)
  }
}
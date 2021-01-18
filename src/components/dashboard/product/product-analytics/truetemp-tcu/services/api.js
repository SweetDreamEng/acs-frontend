import api from '@/api.js'
export default {
  getActTgtTemperatures(id) {
    return api.get(`/analytics/tcu/actual-target-temperature/${id}`).then((response) => {
      return response
    })
  },
  getOverview(data) {
    return api.post('/analytics/product-overview', data).then((response) => {
      return response
    })
  },
  getSystemStates(data) {
    return api.post('/analytics/product-system-states', data).then((response) => {
      return response
    })
  }
}
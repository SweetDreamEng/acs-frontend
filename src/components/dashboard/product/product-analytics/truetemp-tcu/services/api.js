import api from '@/api.js'
export default {
  getActTgtTemperatures(id) {
    return api.get(`/analytics/tcu/actual-target-temperature/${id}`)
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
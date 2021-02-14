import api from '@/api.js'
export default {
  getActTgtTemperatures(payload) {
    return api.post('/analytics/tcu/actual-target-temperature', payload)
  },

  getSystemStates(data) {
    return api.post('/analytics/product-system-states', data)
  }
}
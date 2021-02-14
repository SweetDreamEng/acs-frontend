import api from '@/api.js'
export default {
  getOverview(data) {
    return api.post('/analytics/product-overview', data)
  },

  getUtilization(data) {
    return api.post('/analytics/product-utilization', data)
  },

  getEnergyConsumption(data) {
    return api.post('/analytics/product-energy-consumption', data)
  },

  getProductAlarms(data) {
    return api.$post('/alarms', data)
  }
}
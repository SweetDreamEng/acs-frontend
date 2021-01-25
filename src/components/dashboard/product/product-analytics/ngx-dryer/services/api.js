import api from '@/api.js'
export default {
  async getDryingHopperStats(id) {
    return await api.get(`/analytics/product-drying-hopper-states/${id}`)
  },

  getHopperTemperatures(id) {
    return api.get(`/analytics/product-hopper-temperatures/${id}`)
  },

  async getBedStates(id) {
    return await api.get(`/analytics/ngx-dryer/bed-states/${id}`)
  },

  getDhOnlineHours(data) {
    return api.post('/analytics/ngx-dryer/dh-online-hours', data)
  },

  getDewPointTemperature(data) {
    return api.post('/analytics/ngx-dryer/dew-point-temperature', data)
  },

  getDryerOnlineHours(data) {
    return api.post('/analytics/ngx-dryer/dryer-online-hours', data)
  },

  getBlowerRunHours(data) {
    return api.post('/analytics/ngx-dryer/blower-run-hours', data)
  }
}
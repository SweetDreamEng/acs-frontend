import api from '@/api.js'
export default {
  async getDryingHopperStats(id) {
    return await api.get(`/analytics/product-drying-hopper-states/${id}`)
  },
  async getHopperTemperatures(id) {
    return await api.get(`/analytics/product-hopper-temperatures/${id}`)
  },
  async getBedStates(id) {
    return await api.get(`/analytics/ngx-dryer/bed-states/${id}`)
  },
  async getDhOnlineHours(data) {
    return await api.post('/analytics/ngx-dryer/dh-online-hours', data)
  },
  async getDewPointTemperature(data) {
    return await api.post('/analytics/ngx-dryer/dew-point-temperature', data)
  },
  async getDryerOnlineHours(data) {
    return await api.post('/analytics/ngx-dryer/dryer-online-hours', data)
  },
  async getBlowerRunHours(data) {
    return await api.post('/analytics/ngx-dryer/blower-run-hours', data)
  }
}
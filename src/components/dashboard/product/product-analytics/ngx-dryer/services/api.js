import api from '@/api.js'
export default {
  async getDryingHopperStats(payload) {
    return await api.post('/analytics/product-drying-hopper-states', payload)
  },

  getHopperTemperatures(payload) {
    return api.post('/analytics/product-hopper-temperatures', payload)
  },

  getBedStates(payload) {
    return api.post('/analytics/ngx-dryer/bed-states', payload)
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
  },

  getRegionAirTemperature(data) {
    return api.post('/analytics/ngx-dryer/region-air-temperature', data)
  }
}
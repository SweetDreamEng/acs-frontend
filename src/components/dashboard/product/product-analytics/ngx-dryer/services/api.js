import api from '@/api.js'
export default {
  getDryingHopperStats(payload) {
    return api.post('/analytics/product-drying-hopper-states', payload)
  },

  getHopperTemperatures(payload) {
    return api.post('/analytics/product-hopper-temperatures', payload)
  },

  getBedStates(payload) {
    return api.post('/analytics/ngx-dryer/bed-states', payload)
  },

  getDewPointTemperature(data) {
    return api.post('/analytics/ngx-dryer/dew-point-temperature', data)
  },

  getRegionAirTemperature(data) {
    return api.post('/analytics/ngx-dryer/region-air-temperature', data)
  },

  getOnlineHours(payload) {
    return api.post('/analytics/ngx-dryer/online-hours', payload)
  }
}
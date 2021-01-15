import api from '@/api.js'
export default {
  getDryingHopperStats(id) {
    return api.get(`/analytics/product-drying-hopper-states/${id}`).then((response) => {
      return response
    })
  },
  getHopperTemperatures(id) {
    return api.get(`/analytics/product-hopper-temperatures/${id}`).then((response) => {
      return response
    })
  },
  getBedStates(id) {
    return api.get(`/analytics/ngx-dryer/bed-states/${id}`).then((response) => {
      return response
    })
  },
  getDhOnlineHours(data) {
    return api.post('/analytics/ngx-dryer/dh-online-hours', data).then((response) => {
      return response
    })
  },
  getDryerOnlineHours(data) {
    return api.post('/analytics/ngx-dryer/dryer-online-hours', data).then((response) => {
      return response
    })
  },
  getBlowerRunHours(data) {
    return api.post('/analytics/ngx-dryer/blower-run-hours', data).then((response) => {
      return response
    })
  }
}
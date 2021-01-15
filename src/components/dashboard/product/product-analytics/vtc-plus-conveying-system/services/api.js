import api from '@/api.js'
export default {
  getPumpHoursOil(id) {
    return api.get(`/analytics/product-pump-hours-oil/${id}`).then((response) => {
      return response
    })
  },
  getPumpHours(id) {
    return api.get(`/analytics/product-pump-hours/${id}`).then((response) => {
      return response
    })
  },
  getPumpOnlines(id) {
    return api.get(`/analytics/vtc-plus/pump-onlines/${id}`).then((response) => {
      return response
    })
  },
  getPumpBlowBacks(id) {
    return api.get(`/analytics/vtc-plus/pump-blowbacks/${id}`).then((response) => {
      return response
    })
  }
}
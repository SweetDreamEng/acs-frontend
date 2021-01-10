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
  }
}
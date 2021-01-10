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
  }
}
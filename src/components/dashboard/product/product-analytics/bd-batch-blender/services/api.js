import api from '@/api.js'
export default {
  getRecipe(id) {
    return api.get(`/analytics/product-pump-hours-oil/${id}`).then((response) => {
      return response
    })
  },
  getWeight(id) {
    return api.get(`/analytics/product-weight/${id}`).then((response) => {
      return response
    })
  },
  getInventory(id) {
    return api.get(`/analytics/product-inventory/${id}`).then((response) => {
      return response
    })
  },
  getStationConveyings(id) {
    return api.get(`/analytics/product-station-conveyings/${id}`).then((response) => {
      return response
    })
  }
}
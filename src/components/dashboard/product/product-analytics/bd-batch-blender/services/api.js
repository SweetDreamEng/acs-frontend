import api from '@/api.js'
export default {
  getRecipe(id) {
    return api.get(`/analytics/product-current-recipe/${id}`).then((response) => {
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
  },
  getHopperStables(id) {
    return api.get(`/analytics/product-hopper-stables/${id}`).then((response) => {
      return response
    })
  },
  getFeederCalibrationFactors(id) {
    return api.get(`/analytics/product-calibration-factors/${id}`).then((response) => {
      return response
    })
  }
}
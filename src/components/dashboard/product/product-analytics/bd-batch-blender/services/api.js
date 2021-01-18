import api from '@/api.js'
export default {
  getRecipe(id) {
    return api.get(`/analytics/product-current-recipe/${id}`).then((response) => {
      return response
    })
  },
  getWeight(id) {
    return api.get(`/analytics/product-weight/${id}`)
  },
  getInventory(id) {
    return api.get(`/analytics/product-inventory/${id}`).then((response) => {
      return response
    })
  },
  getStationConveyings(id) {
    return api.get(`/analytics/product-station-conveyings/${id}`)
  },
  getHopperStables(id) {
    return api.get(`/analytics/product-hopper-stables/${id}`).then((response) => {
      return response
    })
  },
  getFeederCalibrationFactors(data) {
    return api.post('/analytics/blender/calibration-factors', data).then((response) => {
      return response
    })
  },
  getProcessRate(data) {
    return api.post('/analytics/blender/process-rate', data).then((response) => {
      return response
    })
  }
}
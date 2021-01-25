import api from '@/api.js'
export default {
  async getRecipe(id) {
    return await api.get(`/analytics/product-current-recipe/${id}`)
  },

  getWeight(id) {
    return api.get(`/analytics/product-weight/${id}`)
  },

  async getInventory(id) {
    return await api.get(`/analytics/product-inventory/${id}`)
  },

  getStationConveyings(id) {
    return api.get(`/analytics/product-station-conveyings/${id}`)
  },

  async getHopperStables(id) {
    return await api.get(`/analytics/product-hopper-stables/${id}`)
  },

  async getFeederCalibrationFactors(data) {
    return await api.post('/analytics/blender/calibration-factors', data)
  },

  getProcessRate(data) {
    return api.post('/analytics/blender/process-rate', data)
  }
}
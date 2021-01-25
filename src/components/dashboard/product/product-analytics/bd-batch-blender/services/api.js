import api from '@/api.js'
export default {
  async getRecipe(id) {
    return api.get(`/analytics/product-current-recipe/${id}`)
  },

  async getWeight(id) {
    return await api.get(`/analytics/product-weight/${id}`)
  },

  async getInventory(id) {
    return await api.get(`/analytics/product-inventory/${id}`)
  },

  async getStationConveyings(id) {
    return await api.get(`/analytics/product-station-conveyings/${id}`)
  },

  async getHopperStables(id) {
    return await api.get(`/analytics/product-hopper-stables/${id}`)
  },

  async getFeederCalibrationFactors(data) {
    return await api.post('/analytics/blender/calibration-factors', data)
  },

  async getProcessRate(data) {
    return await api.post('/analytics/blender/process-rate', data)
  }
}
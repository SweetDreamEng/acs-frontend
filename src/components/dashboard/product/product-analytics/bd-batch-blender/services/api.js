import api from '@/api.js'
export default {
  getRecipe(payload) {
    return api.post('/analytics/product-current-recipe', payload)
  },

  getWeight(payload) {
    return api.post('/analytics/product-weight', payload)
  },

  getInventory(payload) {
    return api.post('/analytics/product-inventory', payload)
  },

  getStationConveyings(payload) {
    return api.post('/analytics/product-station-conveyings', payload)
  },

  getHopperStables(payload) {
    return api.post('/analytics/product-hopper-stables', payload)
  },

  getFeederCalibrationFactors(payload) {
    return api.post('/analytics/blender/calibration-factors', payload)
  },

  getProcessRate(payload) {
    return api.post('/analytics/blender/process-rate', payload)
  },

  getBlenderCapability(payload) {
    return api.post('/analytics/blender/capability', payload)
  },

  updateInventoryMaterial(payload) {
    return api.$post('/analytics/blender/inventory-material', payload)
  }
}
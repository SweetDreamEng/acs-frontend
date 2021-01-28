import api from '@/api.js'
export default {
  async getRecipe(id) {
    return await api.get(`/analytics/accumeter/recipe/${id}`)
  },

  async getSystemStates(data) {
    return await api.post('/analytics/product-system-states', data)
  },

  async getFeederStables(id) {
    return await api.get(`/analytics/product-feeder-stables/${id}`)
  },

  getProductionRate(data) {
    return api.post('/analytics/product-production-rate', data)
  },

  getBlenderCapabilities(data) {
    return api.post('/analytics/accumeter/blender-capabilities', data)
  },

  getFeederCalibrations(data) {
    return api.post('/analytics/accumeter/feeder-calibrations', data)
  },

  getFeederSpeeds(data) {
    return api.post('/analytics/accumeter/feeder-speeds', data)
  },

  getTargetRates(data) {
    return api.post('/analytics/accumeter/target-rate', data)
  }
}
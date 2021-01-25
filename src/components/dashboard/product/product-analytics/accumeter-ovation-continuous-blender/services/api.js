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

  async getProductionRate(data) {
    return await api.post('/analytics/product-production-rate', data)
  },

  async getBlenderCapabilities(data) {
    return await api.post('/analytics/accumeter/blender-capabilities', data)
  },

  async getFeederCalibrations(data) {
    return await api.post('/analytics/accumeter/feeder-calibrations', data)
  },

  async getFeederSpeeds(data) {
    return await api.post('/analytics/accumeter/feeder-speeds', data)
  },

  async getTargetRates(data) {
    return await api.post('/analytics/accumeter/target-rate', data)
  }
}
import api from '@/api.js'
export default {
  getRecipe(payload) {
    return api.post('/analytics/accumeter/recipe', payload)
  },

  getSystemStates(payload) {
    return api.post('/analytics/product-system-states', payload)
  },

  getFeederStables(payload) {
    return api.post('/analytics/product-feeder-stables', payload)
  },

  getProductionRate(payload) {
    return api.post('/analytics/product-production-rate', payload)
  },

  getBlenderCapabilities(payload) {
    return api.post('/analytics/accumeter/blender-capabilities', payload)
  },

  getFeederCalibrations(payload) {
    return api.post('/analytics/accumeter/feeder-calibrations', payload)
  },

  getFeederSpeeds(payload) {
    return api.post('/analytics/accumeter/feeder-speeds', payload)
  },

  getTargetRates(payload) {
    return api.post('/analytics/accumeter/target-rate', payload)
  }
}
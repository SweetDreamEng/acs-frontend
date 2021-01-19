import api from '@/api.js'
export default {
  getRecipe(id) {
    return api.get(`/analytics/accumeter/recipe/${id}`)
  },

  getSystemStates(data) {
    return api.post('/analytics/product-system-states', data).then((response) => {
      return response
    })
  },

  getFeederStables(id) {
    return api.get(`/analytics/product-feeder-stables/${id}`).then((response) => {
      return response
    })
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
import api from '@/api.js'
export default {
  getRecipe(id) {
    return api.get(`/analytics/product-actual-target-recipe/${id}`).then((response) => {
      return response
    })
  },

  getSystemStates(id) {
    return api.get(`/analytics/product-system-states/${id}`).then((response) => {
      return response
    })
  },

  getFeederStables(id) {
    return api.get(`/analytics/product-feeder-stables/${id}`).then((response) => {
      return response
    })
  },

  getProductionRate(data) {
    return api.post('/analytics/product-production-rate', data).then((response) => response)
  }
}
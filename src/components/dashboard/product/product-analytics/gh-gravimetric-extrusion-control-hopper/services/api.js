import api from '@/api.js'
export default {
  getMachineStates(payload) {
    return api.post('/analytics/product-system-states-3', payload)
  },

  getHopperInventories(payload) {
    return api.post('/analytics/product-hopper-inventories', payload)
  },

  getHauloffLengths(payload) {
    return api.post('/analytics/product-hauloff-lengths', payload)
  }
}
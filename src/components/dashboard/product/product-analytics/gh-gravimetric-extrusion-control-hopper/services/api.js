import api from '@/api.js'
export default {
  async getMachineStates(id) {
    return await api.get(`/analytics/product-system-states-3/${id}`)
  },

  getHopperInventories(data) {
    return api.post('/analytics/product-hopper-inventories', data)
  },

  getHauloffLengths(data) {
    return api.post('/analytics/product-hauloff-lengths', data)
  }
}
import api from '@/api.js'
export default {
  async getMachineStates(id) {
    return await api.get(`/analytics/product-system-states-3/${id}`)
  },

  async getHopperInventories(data) {
    return await api.post('/analytics/product-hopper-inventories', data)
  },

  async getHauloffLengths(data) {
    return await api.post('/analytics/product-hauloff-lengths', data)
  }
}
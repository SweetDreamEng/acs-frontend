import api from '@/api.js'
export default {
  getMachineStates(id) {
    return api.get(`/analytics/product-system-states-3/${id}`).then((response) => {
      return response
    })
  },
  getHopperInventories(data) {
    return api.post('/analytics/product-hopper-inventories', data)
  },
  getHauloffLengths(data) {
    return api.post('/analytics/product-hauloff-lengths', data)
  }
}
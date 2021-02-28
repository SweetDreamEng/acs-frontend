import api from '@/api.js'
export default {
  getDryingHopperStates(payload) {
    return api.post('/analytics/ngx-nomad-dryer/hopper-states', payload)
  }
}
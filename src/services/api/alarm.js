import api from '@/api.js'
export default {
  getAlarms(data) {
    return api.post('/alarms', data).then((response) => {
      return response
    })
  }
}
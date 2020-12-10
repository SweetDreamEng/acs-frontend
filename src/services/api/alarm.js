import api from '@/api.js'
export default {
  getAlarms(data) {
    return api.post('/alarms', data).then((response) => {
      return response
    })
  },

  getCorrespondingAlarmTypes(machine_id) {
    return api.get(`/alarms/alarm-types/${machine_id}`).then((response) => {
      return response
    })
  }
}
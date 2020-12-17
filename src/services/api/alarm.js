import api from '@/api.js'
export default {
  getProductAlarms(productId) {
    return api.post(`/alarms/${productId}`).then((response) => {
      return response
    })
  },

  getAlarmsByMachine() {
    return api.post('/alarms/alarms-for-customer-devices').then((response) => {
      return response
    })
  },

  getAlarms(data) {
    return api.post('/alarms', data).then((response) => {
      return response
    })
  },

  getCorrespondingAlarmTypes(machine_id) {
    return api.get(`/alarms/alarm-types/${machine_id}`).then((response) => {
      return response
    })
  },

  getAlarmsByCompanyId(company_id) {
    return api.get(`/alarms/alarms-by-company-id/${company_id}`).then((response) => {
      return response
    })
  },
  
  getSeverityByCompanyId(data) {
    return api.post('/alarms/severity-by-company-id', data).then((response) => {
      return response
    })
  },

  getAlarmsPerTypeByMachine(data) {
    return api.post('/alarms/alarms-per-type-by-machine', data).then((response) => {
      return response
    })
  },

  getAlarmsDistributionByMachine(data) {
    return api.post('/alarms/alarms-distribution-by-machine', data).then((response) => {
      return response
    })
  },

  getAlarmsAmountPerMachineByCompanyId(data) {
    return api.post('/alarms/alarms-amount-per-machine-by-company-id', data).then((response) => {
      return response
    })
  }
}
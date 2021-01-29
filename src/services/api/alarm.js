import api from '@/api.js'
export default {
  getProductAlarms(productId) {
    return api.post(`/alarms/${productId}`)
  },

  getAlarmsByMachine() {
    return api.post('/alarms/alarms-for-customer-devices')
  },

  getAlarms(data) {
    return api.post('/alarms', data)
  },

  getCorrespondingAlarmTypes(machine_id) {
    return api.get(`/alarms/alarm-types/${machine_id}`)
  },

  getAlarmsByCompanyId(company_id) {
    return api.get(`/alarms/alarms-by-company-id/${company_id}`)
  },
  
  getSeverityByCompanyId(data) {
    return api.post('/alarms/severity-by-company-id', data)
  },

  getAlarmsPerTypeByMachine(data) {
    return api.post('/alarms/alarms-per-type-by-machine', data)
  },

  getAlarmsDistributionByMachine(data) {
    return api.post('/alarms/alarms-distribution-by-machine', data)
  },

  getAlarmsAmountPerMachineByCompanyId(data) {
    return api.post('/alarms/alarms-amount-per-machine-by-company-id', data)
  }
}
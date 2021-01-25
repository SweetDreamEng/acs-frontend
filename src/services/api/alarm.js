import api from '@/api.js'
export default {
  async getProductAlarms(productId) {
    return await api.post(`/alarms/${productId}`)
  },

  async getAlarmsByMachine() {
    return await api.post('/alarms/alarms-for-customer-devices')
  },

  async getAlarms(data) {
    return await api.post('/alarms', data)
  },

  async getCorrespondingAlarmTypes(machine_id) {
    return api.get(`/alarms/alarm-types/${machine_id}`)
  },

  async getAlarmsByCompanyId(company_id) {
    return api.get(`/alarms/alarms-by-company-id/${company_id}`)
  },
  
  async getSeverityByCompanyId(data) {
    return await api.post('/alarms/severity-by-company-id', data)
  },

  async getAlarmsPerTypeByMachine(data) {
    return await api.post('/alarms/alarms-per-type-by-machine', data)
  },

  async getAlarmsDistributionByMachine(data) {
    return await api.post('/alarms/alarms-distribution-by-machine', data)
  },

  async getAlarmsAmountPerMachineByCompanyId(data) {
    return await api.post('/alarms/alarms-amount-per-machine-by-company-id', data)
  }
}
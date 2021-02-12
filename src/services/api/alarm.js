import api from '@/api.js'
export default {
  /**
  * Get alarms of specified device
  *
  * @param {string} productId The serial number of device
  * @example
  *
  *     getProductAlarms('1106338390')
  */
  getProductAlarms(productId) {
    return api.$post(`/alarms/${productId}`)
  },

  /**
  * Get alarms for customer device
  *
  * @example
  *
  *     getAlarmsByMachine()
  */
  getAlarmsByMachine() {
    return api.$post('/alarms/alarms-for-customer-devices')
  },

  getAlarms(data) {
    return api.$post('/alarms', data)
  },

  getCorrespondingAlarmTypes(machineId) {
    return api.$get(`/alarms/alarm-types/${machineId}`)
  },

  getAlarmsByCompanyId(company_id) {
    return api.$get(`/alarms/alarms-by-company-id/${company_id}`)
  },

  /**
  * Get severity by company id
  *
  * @param {Object} data The data to send server
  * @example
  *
  *     getSeverityByCompanyId(data)
  */
  getSeverityByCompanyId(data) {
    return api.$post('/alarms/severity-by-company-id', data)
  },

  /**
  * Get alarms per types by machine
  *
  * @param {Object} data The data to send server
  * @example
  *
  *     getAlarmsPerTypeByMachine(data)
  */
  getAlarmsPerTypeByMachine(data) {
    return api.$post('/alarms/alarms-per-type-by-machine', data)
  },

  /**
  * Get alarms distribution by machine
  *
  * @param {Object} data The data to send server
  * @example
  *
  *     getAlarmsDistributionByMachine(data)
  */
  getAlarmsDistributionByMachine(data) {
    return api.$post('/alarms/alarms-distribution-by-machine', data)
  },

  /**
  * Get alarms amount per machine by company id
  *
  * @param {Object} data The data to send server
  * @example
  *
  *     getAlarmsAmountPerMachineByCompanyId(data)
  */
  getAlarmsAmountPerMachineByCompanyId(data) {
    return api.$post('/alarms/alarms-amount-per-machine-by-company-id', data)
  }
}

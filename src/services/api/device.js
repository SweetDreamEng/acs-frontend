import api from '@/api.js'
export default {
  /**
  * Query SIM Status
  *
  * @param {string} iccid Device iccid
  * @example
  *
  *     querySIM('8901260882276399075')
  */
  querySIM(iccid) {
    return api.get(`/devices/query-sim/${iccid}`)
  },

  /**
  * Suspend SIM Status
  *
  * @param {string} iccid Device iccid
  * @example
  *
  *     suspendSIM('8901260882276399075')
  */
  suspendSIM(iccid) {
    return api.get(`/devices/suspend-sim/${iccid}`)
  },

  /**
  * Get remote webui url
  *
  * @param {string} device_id The id of device
  * @example
  *
  *     remoteWeb(221881)
  */
  remoteWeb(device_id) {
    return api.get(`/devices/remote-web/${device_id}`)
  },

  /**
  * Get remote cli url
  *
  * @param {string} device_id The id of device
  * @example
  *
  *     remoteCli(221881)
  */
  remoteCli(device_id) {
    return api.get(`/devices/remote-cli/${device_id}`)
  },

  /**
  * Get devices in customer assign page
  *
  * @param {Object} filterForm The filter data
  * @param {string[]} filterForm.filters The filter array
  * @param {string} filterForm.searchQuery
  * @param {number} page for pagination
  * @example
  *
  *     getDevices({
  *       filterForm: {
  *         filters: ['active', 'PLCLink', 'registered'],
  *         searchQuery: 'Blender'
  *       },
  *       page: 1
  *     })
  */
  getDevices(filterForm, page) {
    const data = {
      filterForm,
      page
    }

    return api.post('/devices', data)
  },

  /**
  * Get device configuration
  *
  * @param {number} serial_number Device serial number
  * @example
  *
  *     getDeviceConfiguration(1106550521)
  */
  getDeviceConfiguration(serial_number) {
    return api.get(`/devices/${serial_number}/configuration`)
  },

  /**
  * Get all devices
  *
  * @example
  *
  *     getAllDevices()
  */
  getAllDevices() {
    return api.get('/devices/all')
  },

  /**
  * Simulate device configuration from iot hub to device
  *
  * @param {Object} data object
  * @param {string} data.device_id Device id
  * @param {Object} data.device_configuration_form The configuration data
  * @example
  *
  *     submitDeviceConfig({
  *       device_id: 1,
  *       device_configuration_form: {
  *         plc_ip: '192.168.5.5',
  *         plc_modbus_tcp_port: 502,
  *         plc_serial_number: 0,
  *         tcu_serial_number: 0,
  *         tcu_port: '/dev/rs232',
  *         tcu_base_addr: 1,
  *         tcu_baud: 9600,
  *         tcu_parity: 'none',
  *         tcu_data_bits: 8,
  *         tcu_stop_bits: 1,
  *         tcu_bype_timeout: 4,
  *         tcu_resp_timeout: 100
  *       },
  *     })
  */
  submitDeviceConfig(data) {
    return api.post('/devices/device-configuration', data)
  },

  /**
  * Assign device configuration and customer in customer assign page
  *
  * @param {Object} data Data for device assign
  * @param {string} data.device_id The id of device
  * @param {string} data.company_id The id of company
  * @param {string} data.machine_id The id of machine
  * @param {string} data.plc_ip Plc ip
  * @example
  *
  *     deviceAssigned({
  *       device_id: 1,
  *       company_id: 1,
  *       machine_id: 1,
  *       plc_ip: 127.0.0.5,
  *     })
  */
  deviceAssigned(data) {
    return api.post('/devices/device-assigned', data)
  },

  getDowntimePlans() {
    return api.get('/downtime-plans')
  },

  updateDowntimePlan(data, id) {
    return api.post(`/downtime-plans/update/${id}`, data)
  },

  addDowntimePlan(data) {
    return api.post('/downtime-plans/store', data)
  },

  /**
  * Import devices from teltonika
  *
  * @return {Object}
  *       numAdded: Number
  *       numDuplicates: Number
  * @example
  *
  *     importDevices()
  */
  importDevices() {
    return api.post('/devices/import')
  },

  /**
  * Get devices for a company
  *
  * @example
  *
  *     getCustomerDevices()
  */
  getCustomerDevices() {
    return api.get('/devices/customer-devices')
  },

  /**
  * Get devices with analytics for machines table in dashboard
  *
  * @param {Object} data object
  * @param {number} data.location_id string
  * @param {number} data.itemsPerPage The limit num per page
  * @example
  *
  *     getDevicesAnalytics({
  *       location_id: 1,
  *       itemsPerPage: 10
  *     })
  */
  getDevicesAnalytics(data) {
    return api.post('/devices/devices-analytics', data)
  },

  /**
  * Get devices with analytics for saved machines table in dashboard
  *
  * @param {Object} data object
  * @param {number} data.itemsPerPage The limit num per page
  * @example
  *
  *     getDevicesAnalytics({
  *       itemsPerPage: 10
  *     })
  */

  getSavedMachines(data) {
    return api.post('devices/saved-machines', data)
  },

  /**
  * Update enabled properties for user in product page
  *
  * @param {Object} payload Update data
  * @param {string} payload.serial_number The serial number
  * @param {Boolean} payload.isImportant The value to decide if important data
  * @param {number[]} payload.enabled_properties Array of enable properties
  * @example
  *
  *     updateEnabledProperties({
  *       serial_number: 687931403,
  *       isImportant: true,
  *       enabled_properties: [1, 2]
  *     })
  */
  updateEnabledProperties(payload) {
    return api.post('/devices/enabled-properties', payload)
  },

  /**
  * Assing zone to the device in machine mapping page
  *
  * @param {Object} data object
  * @param {string} data.customer_assigned_name The name of customer
  * @param {number} data.id Zone id
  * @example
  *
  *     assignZoneToDevice({
  *       customer_assigned_name: 'Almesri Bd Blender',
  *       id: 1
  *     })
  */
  assignZoneToDevice(data) {
    return api.post('/devices/assign-zone', data)
  },

  /**
  * Hide/Show inactive devices
  *
  * @example
  *
  *     toggleActiveDevices()
  */
  toggleActiveDevices() {
    return api.post('devices/toggle-active-devices', {})
  },

  /**
   * Get data for the downtime graph
   * 
   * @example
   * 
   *    getDowntimeGraphData()
   */
  getDowntimeGraphData(data) {
    return api.post('devices/get-downtime-graph-data', data)
  },
  
  /**
   * Get data for the downtime by type graph
   * 
   * @example
   * 
   *    getDowntimeByTypeSeries()
   */
  getDowntimeByTypeGraphSeries(data) {
    return api.post('devices/get-downtime-by-type-graph-data', data)
  },

  /**
   * Get data for the downtime by reason graph
   * 
   * @example
   * 
   *    getDowntimeByReasonGraphSeries()
   */
  getDowntimeByReasonGraphSeries(data) {
    return api.post('devices/get-downtime-by-reason-graph-data', data)
  }
}

import api from '@/api.js'
export default {
  /**
  * Query SIM Status
  *
  * @param {string} device iccid
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
  * @param {string} device iccid
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
  * @param {string} device_id
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
  * @param {string} device_id
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
  * @param {Object} filterForm
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
  * @param {number} device serial number
  * @example
  *
  *     getDeviceConfiguration(1106335254)
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
  * Register device and simulate iothub message to device
  *
  * @param {Object} form object
  * @example
  *
  *     updateRegistered({
  *       register: true,
  *       device_id: 1,
  *     })
  */
  updateRegistered(data) {
    return api.post('/devices/device-register-update', data)
  },

  /**
  * Simulate device configuration from iot hub to device
  *
  * @param {Object} form object
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
  * @param {Object} form object
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
  * @param {Object} form object
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
  * Assing zone to the device in machine mapping page
  *
  * @param {Object} form object
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
  }
}
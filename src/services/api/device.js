import api from '@/api.js'
export default {

  querySIM(device) {
    return api.post('/devices/query-sim/' + device.iccid)
  },

  suspendSIM(device) {
    return api.post('/devices/suspend-sim/' + device.iccid)
  },

  remoteWeb(device) {
    return api.post('/devices/remote-web/' + device.device_id)
  },

  remoteCli(device) {
    return api.post('/devices/remote-cli/' + device.device_id)
  },

  getDevices(filterForm, page) {
    const data = {
      filterForm,
      page
    }

    return api.post('/devices', data)
  },

  getDeviceConfiguration(id) {
    return api.get(`/devices/${id}/configuration`)
  },

  /*
    Get all devices for acs users
  */
  getAllDevices() {
    return api.get('/devices/all')
  },

  updateRegistered(data) {
    return api.post('/devices/device-register-update', data)
  },

  submitDeviceConfig(data) {
    return api.post('/devices/device-configuration', data)
  },

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

  /*
    Import devices from teltonika API
  */
  importDevices() {
    return api.post('/devices/import')
  },

  /*
    Get devices for a certain customer
  */
  getCustomerDevices() {
    return api.get('/devices/customer-devices')
  },

  /*
    Get devices with analytics for a certain customer in customer dashboard pages
  */
  getDevicesAnalytics(data) {
    return api.post('/devices/devices-analytics', data)
  },

  assignZoneToDevice(data) {
    return api.post('/devices/assign-zone', data)
  },

  /*
    Assign zone to device in machine mapping page
  */

  toggleActiveDevices() { return api.post('devices/toggle-active-devices', {}) }
}
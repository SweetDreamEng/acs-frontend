import api from '@/api.js'
export default {

  async querySIM(device) {
    return await api.post('/devices/query-sim/' + device.iccid)
  },

  async suspendSIM(device) {
    return await api.post('/devices/suspend-sim/' + device.iccid)
  },

  async remoteWeb(device) {
    return await api.post('/devices/remote-web/' + device.device_id)
  },

  async remoteCli(device) {
    return await api.post('/devices/remote-cli/' + device.device_id)
  },

  async getDevices(filterForm, page) {
    const data = {
      filterForm,
      page
    }

    return await api.post('/devices', data)
  },

  async getDeviceConfiguration(id) {
    return await api.get(`/devices/${id}/configuration`)
  },

  /*
    Get all devices for acs users
  */
  async getAllDevices() {
    return await api.get('/devices/all')
  },

  async updateRegistered(data) {
    return await api.post('/devices/device-register-update', data)
  },

  async deviceAssigned(data) {
    return await api.post('/devices/device-assigned', data)
  },

  async getDowntimePlans() {
    return await api.get('/downtime-plans')
  },

  async updateDowntimePlan(data, id) {
    return await api.post(`/downtime-plans/update/${id}`, data)
  },

  async addDowntimePlan(data) {
    return await api.post('/downtime-plans/store', data)
  },

  /*
    Import devices from teltonika API
  */
  async importDevices() {
    return await api.post('/devices/import')
  },

  /*
    Get devices for a certain customer
  */
  async getCustomerDevices() {
    return await api.get('/devices/customer-devices')
  },

  /*
    Get devices with analytics for a certain customer in customer dashboard pages
  */
  async getDevicesAnalytics(data) {
    return await api.post('/devices/devices-analytics', data)
  },

  /*
    Assign zone to device in machine mapping page
  */
  async assignZoneToDevice(data) {
    return await api.post('/devices/assign-zone', data)
  }
}
import api from '@/api.js'
export default {

  querySIM(device) {
    return api.post('/devices/query-sim/' + device.iccid).then((response) => {
      return response
    })
  },
  suspendSIM(device) {
    return api.post('/devices/suspend-sim/' + device.iccid).then((response) => {
      return response
    })
  },
  remoteWeb(device) {
    return api.post('/devices/remote-web/' + device.device_id).then((response) => {
      return response
    })
  },
  remoteCli(device) {
    return api.post('/devices/remote-cli/' + device.device_id).then((response) => {
      return response
    })
  },
  getDevices(pageNum) {
    return api.get(`/devices/${pageNum}`).then((response) => {
      return response
    })
  },
  updateRegistered(data) {
    return api.post('/devices/device-register-update', data).then((response) => {
      return response
    })
  },
  deviceAssigned(data) {
    return api.post('/devices/device-assigned', data).then((response) => {
      return response
    })
  },

  getDowntimePlans() {
    return api.get('/downtime-plans').then((response) => {
      return response
    })
  },

  updateDowntimePlan(data, id) {
    return api.post(`/downtime-plans/update/${id}`, data).then((response) => {
      return response
    })
  },

  addDowntimePlan(data) {
    return api.post('/downtime-plans/store', data).then((response) => {
      return response
    })
  },

  /*
    Import devices from teltonika API
  */
  importDevices() {
    return api.post('/devices/import').then((response) => {
      return response
    })
  },

  /*
    Get devices for a certain customer
  */
  getCustomerDevices() {
    return api.get('/devices/customer-devices').then((response) => {
      return response
    })
  },

  /*
    Get devices with analytics for a certain customer
  */
  getCustomerDevicesAnalytics() {
    return api.get('/devices/customer-devices-analytics').then((response) => {
      return response
    })
  },

  /*
    Assign zone to device in machine mapping page
  */
  assignZoneToDevice(data) {
    return api.post('/devices/assign-zone', data).then((response) => {
      return response
    })
  }
}
import axios from 'axios'
export default {
  querySIM(device) {
    return axios.post('/devices/query-sim/' + device.iccid).then((response) => {
      return response
    })
  },
  suspendSIM(device) {
    return axios.post('/devices/suspend-sim/' + device.iccid).then((response) => {
      return response
    })
  },
  getDevices(pageNum) {
    return axios.get(`/devices/${pageNum}`).then((response) => {
      return response
    })
  },
  updateRegistered(data) {
    return axios.post('/devices/device-register-update', data).then((response) => {
      return response
    })
  },
  deviceAssigned(data) {
    return axios.post('/devices/device-assigned', data).then((response) => {
      return response
    })
  },
  importDevices() {
    return axios.post('/devices/import').then((response) => {
      return response
    })
  }
}
import axios from 'axios'
export default {
  getDeviceStatus(device) {
    return axios.post('https://cors-anywhere.herokuapp.com/https://prismproapi.koretelematics.com/4/TransactionalAPI.svc/json/queryDevice', {
      deviceNumber: device.iccid.slice(0, -1)
    }, {
      auth: {
        username: process.env.VUE_APP_PRISMPROAPI_USERNAME,
        password: process.env.VUE_APP_PRISMPROAPI_PASSWORD
      }
    }).then((response) => {
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
  uploadDevices(data) {
    return axios.post('/devices/upload', data).then((response) => {
      return response
    })
  }
}
import api from '@/api.js'
export default {
  /*
    
    Query SIM Status
    params:
      {
        device: Object,
      }
    return: device: Object
  */
  querySIM(device) {
    return api.post('/devices/query-sim/' + device.iccid)
  },

  /*
    
    Suspend SIM Status
    params:
      {
        device: Object,
      }
    return: result body: Object
  */
  suspendSIM(device) {
    return api.post('/devices/suspend-sim/' + device.iccid)
  },

  /*
    
    Get remote webui url
    params:
      {
        device: Object,
      }
    return: webui url: String
  */
  remoteWeb(device) {
    return api.post('/devices/remote-web/' + device.device_id)
  },

  /*
    
    Get remote cli url
    params:
      {
        device: Object,
      }
    return: cli url: String
  */
  remoteCli(device) {
    return api.post('/devices/remote-cli/' + device.device_id)
  },

  /*
    
    Get devices in customer assign page
    params:
      {
        filterForm: Object,
        page: Number
      }
    return: devices: Array
  */
  getDevices(filterForm, page) {
    const data = {
      filterForm,
      page
    }

    return api.post('/devices', data)
  },

  /*
    
    Get device configuration
    params:
      {
        id: Number
      }
    return: configuration: Object
  */
  getDeviceConfiguration(id) {
    return api.get(`/devices/${id}/configuration`)
  },

  /*
    
    Get all devices
    params:
    return: devices: Array
  */
  getAllDevices() {
    return api.get('/devices/all')
  },

  /*
    
    Register device and simulate iothub message to device
    params:
      {
        register: Boolean,
        device_id: Number
      }
  */
  updateRegistered(data) {
    return api.post('/devices/device-register-update', data)
  },

  /*
    
    Simulate device configuration from iot hub to device
    params:
      {
        device_id: Number,
        device_configuration_form: Object
      }
  */
  submitDeviceConfig(data) {
    return api.post('/devices/device-configuration', data)
  },

  /*
    
    Assign device configuration and customer in customer assign page
    params:
      {
        device_id: Number,
        company_id: Number,
        machine_id: Number,
        plc_ip: Number,
      }
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

  /*
    
    Import devices from teltonika
    result: {
      numAdded: Number,
      numDuplicates: Number
    }
  */
  importDevices() {
    return api.post('/devices/import')
  },
  /*
    
    Get devices for a company
    params:
    result: devices: Array
  */
  getCustomerDevices() {
    return api.get('/devices/customer-devices')
  },

  /*
    
    Get devices with analytics for machines table in dashboard
    params:
      {
        location_id: Number,
        itemsPerPage: Number
      }
    result: devices: Array
  */
  getDevicesAnalytics(data) {
    return api.post('/devices/devices-analytics', data)
  },

  /*
    
    Assing zone to the device in machine mapping page
    params:
      {
        customer_assigned_name: String,
        id: Number
      }
  */
  assignZoneToDevice(data) {
    return api.post('/devices/assign-zone', data)
  },

  /*
    
    Hide/Show inactive devices
    params:
  */
  toggleActiveDevices() { return api.post('devices/toggle-active-devices', {}) }
}
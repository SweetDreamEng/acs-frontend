import axios from 'axios'
export default {
  getCustomers() {
    return axios.get('/customers').then((response) => {
      return response
    })
  },
  addCustomer(data) {

    Object.assign(data, {
      company_name: data.companyName,
      administrator_name: data.administratorName,
      administrator_email: data.administratorEmail
    })

    return axios.post('/customers/add', data).then((response) => {
      return response
    })
  },
  getCustomer(id) {
    return axios.get(`/customers/${id}`).then((response) => {
      return response
    })
  },
  updateAccount(accountInfo) {
    return axios.post(`/customers/update-account/${accountInfo.id}`, {
      name: accountInfo.name,
      administrator_name: accountInfo.administratorName,
      administrator_email: accountInfo.administratorEmail
    }).then((response) => {
      return response
    })
  },
  updateProfile(data) {
    return axios.post(`/customers/update-profile/${data.id}`, {
      address_1: data.address_1,
      address_2: data.address_2,
      zip: data.zip,
      state: data.state,
      city: data.city,
      country: data.country,
      phone: data.phone
    }).then((response) => {
      return response
    })
  }
}
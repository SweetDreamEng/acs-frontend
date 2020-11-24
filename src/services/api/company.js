import axios from 'axios'
export default {
  initAddCompany() {
    return axios.get('/customers/init-add-company').then((response) => {
      return response
    })
  },
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
      name: accountInfo.companyName,
      administrator_name: accountInfo.name,
      administrator_email: accountInfo.email
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
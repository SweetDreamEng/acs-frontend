import api from '@/api.js'
export default {
  async getCustomers() {
    return await api.get('/customers')
  },

  async getCompanies() {
    return await api.get('/companies')
  },

  async addCustomer(data) {

    Object.assign(data, {
      company_name: data.companyName,
      administrator_name: data.administratorName,
      administrator_email: data.administratorEmail
    })

    return await api.post('/customers/add', data)
  },

  async getCustomer(id) {
    return await api.get(`/customers/${id}`)
  },

  async updateAccount(accountInfo) {
    return await api.post(`/customers/update-account/${accountInfo.id}`, {
      name: accountInfo.companyName,
      administrator_name: accountInfo.name,
      administrator_email: accountInfo.email
    })
  },

  async updateProfile(data) {
    return await api.post(`/customers/update-profile/${data.id}`, {
      address_1: data.address_1,
      address_2: data.address_2,
      zip: data.zip,
      state: data.state,
      city: data.city,
      country: data.country,
      phone: data.phone
    })
  }
}
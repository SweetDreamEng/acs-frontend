import api from '@/api.js'
export default {
  /**
  * Get company admins
  *
  * @param {}
  * @example
  *
  *     getCompanyAdmins()
  */
  getCompanyAdmins() {
    return api.get('/companies/admins')
  },

  /**
  * Get companies
  *
  * @param {}
  * @example
  *
  *     getCompanies()
  */
  getCompanies() {
    return api.get('/companies')
  },

  /**
  * Add a new customer and/or company
  * The company can be a new or an existing one 
  *
  * @param {Object} user object for a new user
  * @example
  *
  *     addCustomer({
  *       company_name: 'Microsoft'
  *       administrator_name: 'Al Mesri'
  *       administrator_email: 'almesri@machinecdn.com'
  *       address_1: 'Address Name'
  *       zip: '53151'
  *       state: 'Wisconsin'
  *       city: 'New Berlin'
  *       country: 'US'
  *       phone: '123-456-6789'
  *     })
  */
  addCustomer(data) {

    Object.assign(data, {
      company_name: data.companyName,
      administrator_name: data.administratorName,
      administrator_email: data.administratorEmail
    })

    return api.post('/customers/add', data)
  },

  /**
  * Get customer user and his company
  *
  * @param {number}
  * @example
  *
  *     getCustomer(2)
  */
  getCustomer(id) {
    return api.get(`/customers/${id}`)
  },

  /**
  * Update an existing company/customer account info
  *
  * @param {Object}
  * @example
  *
  *     updateAccount({
  *       name: 'Microsoft'
  *       administrator_name: 'Al Mesri'
  *       administrator_email: 'almesri@machinecdn.com'
  *     })
  */
  
  updateAccount(accountInfo) {
    return api.post(`/customers/update-account/${accountInfo.id}`, {
      name: accountInfo.companyName,
      administrator_name: accountInfo.name,
      administrator_email: accountInfo.email
    })
  },

  /**
  * Update an existing customer profile info
  *
  * @param {Object}
  * @example
  *
  *     updateProfile({
  *       address_1: 'Address Name'
  *       zip: '53151'
  *       state: 'Wisconsin'
  *       city: 'New Berlin'
  *       country: 'US'
  *       phone: '123-456-6789'
  *     })
  */
  updateProfile(data) {
    return api.post(`/customers/update-profile/${data.id}`, {
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
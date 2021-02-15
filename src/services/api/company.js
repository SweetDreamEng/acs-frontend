import api from '@/api.js'
export default {
  /**
  * Get company admins
  *
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
  * @param {Object} data object for a new user
  * @param {string} data.company_name The name of company
  * @param {string} data.administrator_name The name of administrator
  * @param {string} data.administrator_email The email of administrator
  * @param {string} data.address_1 The address
  * @param {string} data.zip The zip code
  * @param {string} data.state The name of state
  * @param {string} data.city The name of city
  * @param {string} data.country The name of country
  * @param {string} data.phone The phone number
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
  * @param {number} id The id of customer
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
  * @param {Object} accountInfo object data for account
  * @param {string} accountInfo.id The id of account
  * @param {string} accountInfo.name The name of company
  * @param {string} accountInfo.administrator_name The name of administrator
  * @param {string} accountInfo.administrator_email The email of administrator
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
  * @param {Object} data object data for new profile
  * @param {string} data.id The id of profile
  * @param {string} data.address_1 The address of customer
  * @param {string} data.address_2 The address of customer
  * @param {string} data.zip The zip code of customer
  * @param {string} data.state The state name of customer
  * @param {string} data.city The city name of customer
  * @param {string} data.country The country name of customer
  * @param {string} data.phone The phone number of customer
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

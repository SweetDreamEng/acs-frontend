import api from '@/api.js'
export default {

  async initCreateAccount() {
    return api.get('/company-users/init-create-account')
  },

  async openEditCompanyUser(id) {
    return api.get('/company-users/init-edit-account/' + id)
  },
  /*
    Get users
    response: {
      users: Array
    }
  */
  async getCompanyUsers() {
    return api.get('/company-users')
  },

  async addCompanyUser(data) {
    return api.post('/company-users/store', data)
  },

  async updateCompanyUserAccount(data) {
    return api.post('/company-users/update-account/' + data.id, data)
  },

  async updateCompanyUserInformation(data) {
    return api.post('/company-users/update-information/' + data.id, data)
  },

  // init acs users page
  async initAcsUsers() {
    return api.get('/acs-users')
  },

  // init acs user create page
  async initCreateAcsUser() {
    return api.get('/acs-users/init-create')
  },

  async initAcsUserEdit(id) {
    return api.get('/acs-users/init-edit/' + id)
  },
  
  async addAcsUser(data) {
    return api.post('/acs-users/store', data)
  },

  async updateAcsUserAccount(data) {
    return api.post('/acs-users/update-account/' + data.id, data)
  },

  async updateAcsUserInformation(data) {
    return api.post('/acs-users/update-information/' + data.id, data)
  }
}
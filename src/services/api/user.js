import api from '@/api.js'
export default {

  async initCreateAccount() {
    return await api.get('/company-users/init-create-account')
  },

  async openEditCompanyUser(id) {
    return await api.get('/company-users/init-edit-account/' + id)
  },
  /*
    Get users
    response: {
      users: Array
    }
  */
  async getCompanyUsers() {
    return await api.get('/company-users')
  },

  async addCompanyUser(data) {
    return await api.post('/company-users/store', data)
  },

  async updateCompanyUserAccount(data) {
    return await api.post('/company-users/update-account/' + data.id, data)
  },

  async updateCompanyUserInformation(data) {
    return await api.post('/company-users/update-information/' + data.id, data)
  },

  // init acs users page
  async initAcsUsers() {
    return await api.get('/acs-users')
  },

  // init acs user create page
  async initCreateAcsUser() {
    return await api.get('/acs-users/init-create')
  },

  async initAcsUserEdit(id) {
    return await api.get('/acs-users/init-edit/' + id)
  },
  
  async addAcsUser(data) {
    return await api.post('/acs-users/store', data)
  },

  async updateAcsUserAccount(data) {
    return await api.post('/acs-users/update-account/' + data.id, data)
  },

  async updateAcsUserInformation(data) {
    return await api.post('/acs-users/update-information/' + data.id, data)
  }
}
import api from '@/api.js'
export default {

  initCreateAccount() {
    return api.get('/company-users/init-create-account')
  },

  openEditCompanyUser(id) {
    return api.get('/company-users/init-edit-account/' + id)
  },
  /*
    Get users
    response: {
      users: Array
    }
  */
  getCompanyUsers() {
    return api.get('/company-users')
  },

  addCompanyUser(data) {
    return api.post('/company-users/store', data)
  },

  updateCompanyUserAccount(data) {
    return api.post('/company-users/update-account/' + data.id, data)
  },

  updateCompanyUserInformation(data) {
    return api.post('/company-users/update-information/' + data.id, data)
  },

  // init acs users page
  initAcsUsers() {
    return api.get('/acs-users')
  },

  // init acs user create page
  initCreateAcsUser() {
    return api.get('/acs-users/init-create')
  },

  initAcsUserEdit(id) {
    return api.get('/acs-users/init-edit/' + id)
  },
  
  addAcsUser(data) {
    return api.post('/acs-users/store', data)
  },

  updateAcsUserAccount(data) {
    return api.post('/acs-users/update-account/' + data.id, data)
  },

  updateAcsUserInformation(data) {
    return api.post('/acs-users/update-information/' + data.id, data)
  }
}
import api from '@/api.js'
export default {
  getUsers() {
    return api.get('/users')
  },

  openEditUser(id) {
    return api.get(`/users/${id}/edit`)
  },
  
  addUser(data) {
    return api.post('/users', data)
  },

  updateUserAccount(data) {
    return api.put(`/users/${data.id}`, data)
  }
}
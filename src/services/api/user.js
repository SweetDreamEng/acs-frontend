import api from '@/api.js'
export default {
  /**
  * Get acs users or customer users depending on auth user.
  *
  * @example
  *
  *     getUsers()
  */
  getUsers() {
    return api.get('/users')
  },

  /**
  * Get existing user to edit page
  *
  * @param {number} id The id of user
  * @example
  *
  *     openEditUser(2)
  */
  openEditUser(id) {
    return api.get(`/users/${id}/edit`)
  },

  /**
  * Add a new user
  *
  * @param {Object} user object for a new user
  * @example
  *
  *     addUser(user)
  */
  addUser(data) {
    return api.post('/users', data)
  },

  /**
  * Update a user
  *
  * @param {Object} user object
  * @example
  *
  *     updateUserAccount(user)
  */
  updateUserAccount(data) {
    return api.put(`/users/${data.id}`, data)
  },

  /**
  * Delete a user
  *
  * @param {Object} user object
  * @example
  *
  *     updateUserAccount(user)
  */
  deleteUser(data) {
    return api.$post('/users/delete', data)
  }
}

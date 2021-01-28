import api from '@/api.js'
export default {
  async signIn(email, password) {
    const data = {
      email,
      password
    }

    return api.post('/auth/signin', data)
  },

  async getUser() {
    return api.get('/auth/user')
  },

  async updatePassword(currentPassword, newPassword) {
    const data = {
      current_password: currentPassword,
      new_password: newPassword
    }

    return api.post('/auth/update-password', data)
  },

  async requestForgotPassword(email) {
    const data = {
      email: email
    }

    return api.post('/auth/password-reset', data)
  },

  async getTimezoneNames(timezone) {
    return api.get('/profile/timezones')
  },

  async updateTimezone(timezone) {
    return api.post('/profile/timezone', { timezone })
  },

  async signOut() {
    return api.get('/auth/logout')
  },

  async check() {
    return api.post('/auth/check')
  }
}
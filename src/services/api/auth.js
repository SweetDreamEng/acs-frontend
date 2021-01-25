import api from '@/api.js'
export default {
  async signIn(email, password) {
    const data = {
      email,
      password
    }

    return await api.post('/auth/signin', data)
  },

  async getUser() {
    return await api.get('/auth/user')
  },

  async updatePassword(currentPassword, newPassword) {
    const data = {
      current_password: currentPassword,
      new_password: newPassword
    }

    return await api.post('/auth/update-password', data)
  },

  async requestForgotPassword(email) {
    const data = {
      email: email
    }

    return await api.post('/auth/password-reset', data)
  },

  async getTimezoneNames(timezone) {
    return await api.get('/profile/timezones')
  },

  async updateTimezone(timezone) {
    return await api.post('/profile/timezone', { timezone })
  },

  async signOut() {
    return await api.get('/auth/logout')
  },

  async check() {
    return await api.post('/auth/check')
  }
}
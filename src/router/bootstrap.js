import store from '../store'
import api from '../api'

async function bootstrap() {
  const token = localStorage.getItem('token')
  let user = null

  if (token) {
    try {
      const response = await api.post('/auth/check', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      user = response.data
    } catch (error) {
      localStorage.removeItem('token')
      window.location = '/auth/signin'
    }
  }

  store.commit('auth/BOOTSTRAP', {
    user,
    token
  }, { root: true })
}

export default bootstrap
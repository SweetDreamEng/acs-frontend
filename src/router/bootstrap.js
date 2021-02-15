import store from '../store'
import api from '../api'

const elemLoading = document.getElementById('loading')

function hideLoading() {
  elemLoading.style.display = 'none'
}

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

  await store.dispatch('settings/setInitialSetting')

  store.commit('auth/BOOTSTRAP', {
    user,
    token
  }, { root: true })

  setTimeout(hideLoading, 100)
}

export default bootstrap

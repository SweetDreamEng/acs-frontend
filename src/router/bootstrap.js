import store from '../store'
import api from '../api'
import vuetify from '../plugins/vuetify'

const elemLoading = document.getElementById('loading')

function hideLoading() {
  elemLoading.style.display = 'none'
}

async function bootstrap() {
  const token = localStorage.getItem('token')
  const p1 = new Promise((resolve, reject) => {
    api.post('/auth/check', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      store.commit('auth/BOOTSTRAP', {
        user: response.data,
        token
      }, { root: true })

      resolve(response)
    }).catch ((err) => {
      localStorage.removeItem('token')
      window.location = '/auth/signin'

      reject(err)
    })
  })

  const p2 = new Promise((resolve, reject) => {
    store.dispatch('settings/setInitialSetting')
      .then((response) => {
        resolve(response)
      })
  })

  await Promise.all([p1, p2])
  
  setTimeout(hideLoading, 100)
}

export default bootstrap
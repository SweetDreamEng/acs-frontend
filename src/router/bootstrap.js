import store from '../store'
import api from '../api'
import vuetify from '../plugins/vuetify'

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

  try {
    let response = await api.post('/app-settings/get-setting')

    response = response.data.value
    const private_colors = response.filter((data) => data.type.includes('private_color'))

    if (private_colors.length) {
      const colors = []

      for (let i = 0; i < private_colors.length; i++) {
        colors.push(private_colors[i]['value'])
      }
      store.commit('settings/SET_PRIVATE_COLORS', colors, { root: true })
      vuetify.framework.theme.themes.light.primary = colors[0]
      if (colors.length >= 2) {
        vuetify.framework.theme.themes.light.accent = colors[1]
        vuetify.framework.theme.themes.light.background = colors[2]
      }
    } else {
      store.commit('settings/SET_PRIVATE_COLORS', ['#092954'], { root: true })
    }
    let auth_background_file = response.filter((data) => data.type.includes('auth_background_filepath'))

    if (auth_background_file.length) {
      auth_background_file = auth_background_file[0]['value']
      store.commit('settings/SET_AUTH_BACKGROUND_FILE', auth_background_file, { root: true })
    } else {
      store.commit('settings/SET_AUTH_BACKGROUND_FILE', false, { root: true })
    }

    let logo_file = response.filter((data) => data.type.includes('logo_filepath'))

    if (logo_file.length) {
      logo_file = logo_file[0]['value']
      store.commit('settings/SET_LOGO_FILE', logo_file, { root: true })
    } else {
      store.commit('settings/SET_LOGO_FILE', false, { root: true })
    }
  } catch (error) {
    console.log(error)
  }

  store.commit('auth/BOOTSTRAP', {
    user,
    token
  }, { root: true })

  setTimeout(hideLoading, 100)
}

export default bootstrap
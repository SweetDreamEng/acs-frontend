import Vue from 'vue'
import router from '../../router'
import settingAPI from '@/services/api/setting'
import { first, inRange } from 'lodash'

const module = {
  namespaced: true,
  state: {
    private_colors: null,
    colors: [],
    error: null,
    loading: true,
    button_loading: null,
    logo_file: null,
    auth_background_file: null,

    logoFilePath: ''
  },

  actions: {
    async getAppSettings({ commit }) {
      try {
        const response = await settingAPI.appSettings()

        commit('SET_APP_SETTINGS', response.data)
      } catch (error) {
        console.log(error)
      }
    },

    async grabColors({
      commit
    }, {
      url
    }) {
      commit('BUTTON_LOAD', 'SUBMIT')
      try {
        const response = await settingAPI.grabColors({ url })

        commit('SET_COLORS', response.data.colors)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async resetSettings({
      commit
    }) {
      commit('BUTTON_LOAD', 'RESET')

      try {
        const response = await settingAPI.resetSettings()
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async setInitialSetting({
      commit
    }) {
      try {
        let response = await settingAPI.getSetting()

        response = response.data.value
        const private_colors = response.filter((data) => data.type.includes('private_color'))

        if (private_colors.length) {
          const colors = []

          for (let i = 0; i < private_colors.length; i++) {
            colors.push(private_colors[i]['value'])
          }
          commit('SET_PRIVATE_COLORS', colors)
        } else {
          commit('SET_PRIVATE_COLORS', ['#092954'])
        }
        let auth_background_file = response.filter((data) => data.type.includes('auth_background_filepath'))

        if (auth_background_file.length) {
          auth_background_file = auth_background_file[0]['value']
          commit('SET_AUTH_BACKGROUND_FILE', auth_background_file)
        } else {
          commit('SET_AUTH_BACKGROUND_FILE', false)
        }

        let logo_file = response.filter((data) => data.type.includes('logo_filepath'))

        if (logo_file.length) {
          logo_file = logo_file[0]['value']
          commit('SET_LOGO_FILE', logo_file)
        } else {
          commit('SET_LOGO_FILE', false)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async applyPrivateColors({
      commit
    }, {
      colors
    }) {
      commit('BUTTON_LOAD', 'APPLY')
      try {
        const response = await settingAPI.setPrivateColors({ colors })

        commit('SET_PRIVATE_COLORS', response.data.private_colors)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async uploadLogo({
      commit
    }, {
      formData
    }) {
      try {
        const response = await settingAPI.uploadLogo(formData)

        commit('SET_LOGO_FILE', response.data.filepath)
      } catch (error) {
        console.log(error.response)
      }
    },
    async updateAuthBackground({
      commit
    }) {
      try {
        const response = await settingAPI.updateAuthBackground()

        commit('SET_AUTH_BACKGROUND_FILE', response.data.filepath)
      } catch (error) {
        console.log('error', error)
      }
    }
  },

  mutations: {
    // Set basic app settings
    SET_APP_SETTINGS(state, data) {
      state.logoFilePath = data.logo
    },

    BUTTON_LOAD(state, button) {
      state.button_loading = button
    },
    BUTTON_CLEAR(state) {
      state.button_loading = false
    },
    SET_COLORS(state, colors) {
      state.colors = colors
    },
    SET_PRIVATE_COLORS(state, private_colors) {
      state.private_colors = private_colors
    },
    SET_LOGO_FILE(state, filepath) {
      state.logo_file = filepath
    },
    SET_AUTH_BACKGROUND_FILE(state, filepath) {
      state.auth_background_file = filepath
    }
  }
}

export default module

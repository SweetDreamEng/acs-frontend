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
    logo_file_name: null
  },

  actions: {
    grabColors({
      commit
    }, {
      url
    }) {
      commit('BUTTON_LOAD', 'SUBMIT')
      settingAPI.grabColors({
        url
      }).then((response) => {
        commit('SET_COLORS', response['data']['colors'])
      })
        .catch((error) => {

        })
        .finally(() => {
          commit('BUTTON_CLEAR')
        })  
    },
    setInitialSetting({
      commit
    }) {
      return settingAPI.getSetting().then((response) => {     
        response = response['data']['value']
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
      })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
        })  
    },
    applyPrivateColors({
      commit
    }, {
      colors
    }) {
      commit('BUTTON_LOAD', 'APPLY')
      settingAPI.setPrivateColors({
        colors
      }).then((response) => {
        commit('SET_PRIVATE_COLORS', response['data']['private_colors'])
      })
        .catch((error) => {

        })
        .finally(() => {
          commit('BUTTON_CLEAR')
        })
    },
    setLogoFileName({
      commit
    }, {
      filename
    }) {
      commit('SET_LOGO_FILE_NAME', filename)
    }
  },

  mutations: {
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
    SET_LOGO_FILE_NAME(state, filename) {
      state.filename = filename
    }
  }
}

export default module

import Vue from 'vue'
import router from '../../router'
import authAPI from '@/services/api/auth'

const module = {
  namespaced: true,
  state: {
    token: null,
    user: {
      role: null,
      email: null,
      username: null
    },
    roles: [
      {
        'key': 'acs_admin',
        'name': 'ACS Administrator'
      }, {
        'key': 'acs_manager',
        'name': 'ACS Manager'
      }, {
        'key': 'customer_admin',
        'name': 'Customer Administrator'
      }, {
        'key': 'customer_manager',
        'name': 'Customer Manager'
      }, {
        'key': 'customer_operator',
        'name': 'Customer Operator'
      }
    ],
    error: null,
    loading: true,
    button_loading: false
  },

  actions: {
    signIn({
      commit
    }, {
      email, password
    }) {
      commit('BUTTON_LOAD')
      authAPI.signIn(email, password).then((response) => {
        commit('SET_TOKEN', response.data.access_token)
        Vue.auth.setToken(response.data.access_token)
        authAPI.check().then((response) => {
          commit('CLEAR_ERROR')
          commit('SET_AUTH_DATA', response.data)
          
          if (response.data.role === 'acs_admin') {
            router.push({
              name: 'acs-machines'
            })
          } else if (response.data.role === 'customer_admin') {
            router.push({
              name: 'dashboard-analytics'
            })
          }
        })
          .catch((error) => {
            console.log(error)
          })
      })
        .catch((error) => {
          if (error.response.status === 401) {
            commit('SET_ERROR', {
              'error': 'Email and password incorrect.'
            })
          }
        })
        .finally(() => {
          commit('BUTTON_CLEAR')
        })
    },

    /**
     *
     * Logout
     *
     * @param {*} param0
     */
    signOut({ commit }) {
      authAPI.signOut().then((response) => {
        if (response.status === 200) {
          commit('SET_LOGOUT_ATUH')
          router.push({
            name: 'auth-signin'
          })
        }
      })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('token')
          }
        })
    },
    updatePassword({
      commit, dispatch
    }, {
      currentPassword, newPassword
    }) {
      commit('BUTTON_LOAD')
      authAPI.updatePassword(currentPassword, newPassword).then((response) => {
        dispatch('app/showSuccess', response.data.message, { root: true })
      })
        .catch((error) => {
          if (error.response.status === 400) {
            commit('SET_ERROR', {
              'error': error.response.data.error
            })
          } else if (error.response.status === 422) {
            const errors = Object.values(error.response.data.error).flat()

            commit('SET_ERROR', {
              'error': errors[0]
            })
          }
        })
        .finally(() => {
          commit('BUTTON_CLEAR')
        })
    },
    requestForgotPassword({
      commit
    }, email) {
      commit('BUTTON_LOAD')
      authAPI.requestForgotPassword(email).then((response) => {
      })
        .catch((error) => {
          if (error.response.status === 404) {
            commit('SET_ERROR', {
              'error': error.response.data
            })
          }
        })
        .finally(() => {
          commit('BUTTON_CLEAR')
        })
    },
    clearAuthData({
      commit
    }) {
      commit('SET_LOGOUT_ATUH')
    },
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    }
  },

  mutations: {
    SET_ERROR(state, error) {
      state.error = error.error
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_AUTH_DATA(state, user) {
      state.user.email = user.email
      state.user.username = 'Jone Doe'
      state.user.role = user.role
    },
    SET_LOGOUT_ATUH(state) {
      state.token = null
      state.user.role = null
      state.user.email = null
      state.user.username = null

      localStorage.removeItem('token')
    },
    BUTTON_LOAD(state) {
      state.button_loading = true
    },

    BUTTON_CLEAR(state) {
      state.button_loading = false
    }
  },
  getters: {
    hasToken: (state) => {
      return state.token
    },
    profile: (state) => {
      return state.user
    },
    roleName: (state) => (role_key) => {
      return state.roles.find((role) => role.key === role_key).name
    }
  }
}

export default module
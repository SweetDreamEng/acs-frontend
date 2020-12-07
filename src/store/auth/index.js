import Vue from 'vue'
import router from '../../router'
import authAPI from '@/services/api/auth'

const module = {
  namespaced: true,
  state: {
    isAppReady: false,
    token: null,
    user: {
      role: null,
      email: null,
      username: null
    },
    roles: [
      {
        'key': 'super_admin',
        'name': 'Super Admin'
      }, {
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
    async signIn({
      commit
    }, {
      email, password
    }) {
      commit('BUTTON_LOAD')

      try {
        const response = await authAPI.signIn(email, password)
        
        commit('SET_TOKEN', response.data.access_token)
        
        Vue.auth.setToken(response.data.access_token)

        authAPI.check().then((response) => {
          commit('CLEAR_ERROR')
          commit('SET_AUTH_DATA', response.data)
          Vue.auth.setUser(response.data)

          if (response.data.role === 'acs_admin' || response.data.role === 'acs_manager' || response.data.role === 'acs_viewer') {
            router.push({
              name: 'acs-machines'
            })
          } else if (response.data.role === 'customer_admin' || response.data.role === 'customer_manager' || response.data.role === 'customer_operator') {
            router.push({
              name: 'dashboard-analytics'
            })
          } else if (response.data.role === 'super_admin') {
            router.push({
              name: 'app-settings-customize-application'
            })
          }
        })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        if (error.response.status === 401) {
          commit('SET_ERROR', {
            'error': 'Email and password incorrect.'
          })
        }
      }
        
      commit('BUTTON_CLEAR')
    },

    /**
     *
     * Logout
     *
     * @param {*} param0
     */
    async signOut({ commit }) {
      const response = await authAPI.signOut()

      if (response.status === 200) {
        commit('SET_LOGOUT_AUTH')
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        router.push({
          name: 'auth-signin'
        })
      }
    },

    async updatePassword({
      commit, dispatch
    }, {
      currentPassword, newPassword
    }) {
      commit('BUTTON_LOAD')
      
      try {
        const response = await authAPI.updatePassword(currentPassword, newPassword)

        dispatch('app/showSuccess', response.data.message, { root: true })
      } catch (error) {
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
      }
      
      commit('BUTTON_CLEAR')
    },
    
    async requestForgotPassword({
      commit
    }, email) {
      commit('BUTTON_LOAD')

      try {
        await authAPI.requestForgotPassword(email)

      } catch (error) {
        if (error.response.status === 404) {
          commit('SET_ERROR', {
            'error': error.response.data
          })
        }
      }
      
      commit('BUTTON_CLEAR')
    },

    clearAuthData({
      commit
    }) {
      commit('SET_LOGOUT_AUTH')
    },
    
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    }
  },

  mutations: {
    BOOTSTRAP(state, { user, token }) {
      if (user && token) {
        state.user.email = user.email
        state.user.username = user.name
        state.user.role = user.role
        state.token = token
      }

      state.isAppReady = true
    },

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
      if (user) {
        state.user.email = user.email
        state.user.username = user.name
        state.user.role = user.role
      }
    },
    SET_LOGOUT_AUTH(state) {
      state.token = null
      state.user.role = null
      state.user.email = null
      state.user.username = null
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
    roleName: (state) => (role_key) => {
      return state.roles.find((role) => role.key === role_key).name
    },
    canCreateAcsUser: (state) => {
      return state.user.role === 'acs_admin'
    },
    canCreateCompanies: (state) => {
      return state.user.role === 'acs_admin' || state.user.role === 'acs_manager'
    },
    canImportDevices: (state) => {
      return state.user.role === 'acs_admin' || state.user.role === 'acs_manager'
    },
    canCreateCustomerUser: (state) => {
      return state.user.role === 'customer_admin'
    }
  }
}

export default module

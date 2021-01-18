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
      username: null,
      companyId: null
    },
    profile: {

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

    updatingTimezone: false,
    loadingTimezone: false,
    userTimeZone: 'America/Belize',
    timeZoneNames: [],

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

    async getUser({
      commit
    }) {
      try {
        const response = await authAPI.getUser()

        commit('SET_AUTH_PROFILE', response.data.user)
      } catch (error) {
        console.log(error)
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

    async getTimezoneNames({
      commit
    }) {
      commit('SET_LOADING_TIME_ZONE', true)

      try {
        const response = await authAPI.getTimezoneNames()

        commit('SET_TIMEZONES', response.data.timezones)
      } catch (error) {
        console.log(error)
      }
      
      commit('SET_LOADING_TIME_ZONE', false)
    },

    async updateTimezone({
      commit, dispatch
    }, timezone) {
      commit('SET_UPDATING_TIME_ZONE', true)

      try {
        const response = await authAPI.updateTimezone(timezone)

        dispatch('app/showSuccess', response.data.message, { root: true })
      } catch (error) {
        console.log(error)
      }
      
      commit('SET_UPDATING_TIME_ZONE', false)
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
        state.user.companyId = user.company_id
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
        state.user.companyId = user.company_id
      }
    },
    SET_LOGOUT_AUTH(state) {
      state.token = null
      state.user.role = null
      state.user.email = null
      state.user.username = null
      state.user.companyId = null
    },
    BUTTON_LOAD(state) {
      state.button_loading = true
    },

    BUTTON_CLEAR(state) {
      state.button_loading = false
    },

    SET_LOADING_TIME_ZONE(state, loading) { state.loadingTimezone = loading },
    SET_UPDATING_TIME_ZONE(state, loading) { state.updatingTimezone = loading },

    SET_TIMEZONES(state, timezones) { state.timeZoneNames = timezones},
    SET_AUTH_PROFILE(state, user) { state.profile = user }
  },
  getters: {
    roleName: (state) => (role_key) => {
      return state.roles.find((role) => role.key === role_key).name
    },
    canCreateAcsUser: (state) => state.user.role === 'acs_admin',
    canCreateCompanies: (state) => ['acs_admin', 'acs_manager'].includes(state.user.role),
    canViewCompanies: (state) => ['acs_admin', 'acs_manager', 'acs_viewer'].includes(state.user.role),
    canImportDevices: (state) => ['acs_admin', 'acs_manager'].includes(state.user.role),
    canCreateCustomerUser: (state) => state.user.role === 'customer_admin'
  }
}

export default module

import Vue from 'vue'
import router from '../../router'
import authAPI from '../../services/api/auth'

const module = {
  namespaced: true,
  state: {
    isAppReady: false,
    token: null,
    user: {
      role: null,
      email: null,
      username: null,
      companyId: null,
      companyName: null,
      phone: null
    },
    profile: {

    },
    roles: [
      {
        'id': 100,
        'key': 'super_admin',
        'name': 'Super Admin'
      }, {
        'id': 1,
        'key': 'acs_admin',
        'name': 'ACS Administrator'
      }, {
        'id': 2,
        'key': 'acs_manager',
        'name': 'ACS Manager'
      }, {
        'id': 3,
        'key': 'acs_viewer',
        'name': 'ACS Viewer'
      }, {
        'id': 4,
        'key': 'customer_admin',
        'name': 'Customer Administrator'
      }, {
        'id': 5,
        'key': 'customer_manager',
        'name': 'Customer Manager'
      }, {
        'id': 6,
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
    buttonLoading: false
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
        commit('machines/SET_SELECTED_COMPANY', { id: 0, name: 'All' }, { root: true })

        localStorage.setItem('token', response.data.access_token)

        try {
          const checkResponse = await authAPI.check()

          commit('CLEAR_ERROR')
          commit('SET_AUTH_DATA', checkResponse.data)

          if (checkResponse.data.role === 'acs_admin' || checkResponse.data.role === 'acs_manager' || checkResponse.data.role === 'acs_viewer') {
            router.push({
              name: 'acs-machines'
            })
          } else if (checkResponse.data.role === 'customer_admin' || checkResponse.data.role === 'customer_manager' || checkResponse.data.role === 'customer_operator') {
            router.push({
              name: 'dashboard-analytics'
            })
          } else if (checkResponse.data.role === 'super_admin') {
            router.push({
              name: 'app-settings-customize-application'
            })
          }
        } catch (error) {
          console.log(error)
        }
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

    async updateProfile({
      commit, dispatch
    }, data ) {
      commit('BUTTON_LOAD')

      try {
        const response = await authAPI.updateProfile(data)

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
        state.user.companyName = user.companyName
        state.user.phone = user.phoneNumber
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
      state.buttonLoading = true
    },

    BUTTON_CLEAR(state) {
      state.buttonLoading = false
    },

    SET_LOADING_TIME_ZONE(state, loading) { state.loadingTimezone = loading },
    SET_UPDATING_TIME_ZONE(state, loading) { state.updatingTimezone = loading },

    SET_TIMEZONES(state, timezones) { state.timeZoneNames = timezones},
    SET_AUTH_PROFILE(state, user) {
      state.profile = user
    }
  },
  getters: {
    roleName: (state) => (role_key) => {
      const currentRole = state.roles.find((role) => role.key === role_key)

      return currentRole ? currentRole.name : ''
    },
    isAcsUser: (state) => ['acs_admin', 'acs_manager', 'acs_viewer'].includes(state.user.role),
    canCreateAcsUser: (state) => state.user.role === 'acs_admin',
    canCreateCompanies: (state) => ['acs_admin', 'acs_manager'].includes(state.user.role),
    canViewCompanies: (state) => ['acs_admin', 'acs_manager', 'acs_viewer'].includes(state.user.role),
    canImportDevices: (state) => ['acs_admin', 'acs_manager'].includes(state.user.role),
    canCreateCustomerUser: (state) => ['customer_admin', 'acs_manager'].includes(state.user.role),
    canViewInventory: (state) => state.user.role === 'acs_admin',
    canGetMaterialsAndLocations: (state) => state.user.role === 'customer_manager',
    canAddAvailabilityPlanTime: (state) => state.user.role === 'customer_manager',
    canViewEquipmentAvailability: (state) => ['customer_admin', 'customer_manager', 'customer_operator'].includes(state.user.role),
    isUserHasPhone: (state) => state.user.phone !== null
  }
}

export default module

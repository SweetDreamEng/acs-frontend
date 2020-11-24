import companyAPI from '@/services/api/company'
import cityAPI from '@/services/api/city'

const module = {
  namespaced: true,
  state: {
    button_loading: false,                    // loading status
    error: null,
    data: [],                                 // companies
    customerAccount: null,                    
    customerProfile: null
  },

  actions: {
    getCustomers({
      commit
    }) {
      companyAPI.getCustomers().then((response) => {
        commit('SET_CUSTOMERS', response.data.companies)
      })
    },
    addCustomer({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')

      companyAPI.addCustomer(data).then((response) => {
        commit('CLEAR_ERROR')
        dispatch('app/showSuccess', response.data, { root: true })
      })
        .catch((error) => {
          if (error.response.status === 422) {
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
    getCustomer({
      commit
    }, id) {
      companyAPI.getCustomer(id).then((response) => {
        commit('SET_CUSTOMER_ACCOUNT', response.data.company)
        commit('SET_CUSTOMER_PROFILE', response.data.profile)
        commit('cities/SET_DATA', response.data.cities)
      })
        .catch((error) => {
          console.log(error.response.data)
        })
    },
    updateAccount({
      commit, dispatch
    }, account) {
      commit('BUTTON_LOAD')
      companyAPI.updateAccount(account).then((response) => {
        dispatch('app/showSuccess', response.data, { root: true })
      })
        .catch((error) => {
          if (error.response.status === 422) {
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
    updateProfile({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')
      companyAPI.updateProfile(data).then((response) => {
        dispatch('app/showSuccess', response.data, { root: true })
      })
        .finally(() => {
          commit('BUTTON_CLEAR')
        })
    },
    getCities({
      commit, dispatch
    }, state) {
      cityAPI.getCities(state).then((response) => {
        commit('cities/SET_DATA', response.data, { root: true })
      })
        .finally(() => {
          // commit('BUTTON_CLEAR')
        })
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

    // BUTTON load
    BUTTON_LOAD(state) {
      state.button_loading = true
    },

    BUTTON_CLEAR(state) {
      state.button_loading = false
    },

    SET_CUSTOMERS(state, customers) {
      state.data = customers
    },

    SET_CUSTOMER_ACCOUNT(state, customerAccount) {
      state.customerAccount = customerAccount
    },
    SET_CUSTOMER_PROFILE(state, customerProfile) {
      state.customerProfile = customerProfile
    }
  },

  getters: {
    extendedCompanies: (state) => {
      const _companies = state.data.slice()

      _companies.unshift({
        id: 0,
        name: 'Not Assigned'
      })

      return _companies
    }
  }
}

export default module
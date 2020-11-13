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
      this.$axios.get('/customers')
        .then((response) => {
          commit('SET_CUSTOMERS', response.data.companies)
        })
        .catch((error) => {
        })
    },
    addCustomer({
      commit, dispatch
    }, {
      companyName, administratorName, administratorEmail
    }) {
      commit('BUTTON_LOAD')
      const data = {
        company_name: companyName,
        administrator_name: administratorName,
        administrator_email: administratorEmail
      }

      this.$axios.post('/customers/add', data)
        .then((response) => {
          commit('BUTTON_CLEAR')
          dispatch('app/showSuccess', response.data, { root: true })
        })
        .catch((error) => {
          commit('BUTTON_CLEAR')
          console.log(error.response.data)
        })
    },
    getCustomer({
      commit
    }, id) {
      this.$axios.get(`/customers/${id}`)
        .then((response) => {
          commit('SET_CUSTOMER_ACCOUNT', response.data.company)
          commit('SET_CUSTOMER_PROFILE', response.data.profile)
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    },
    updateAccount({
      commit, dispatch
    }, account) {
      commit('BUTTON_LOAD')
      this.$axios.post(`/customers/update-account/${account.id}`, {
        name: account.name,
        administrator_name: account.administratorName,
        administrator_email: account.administratorEmail
      })
        .then((response) => {
          dispatch('app/showSuccess', response.data, { root: true })
          commit('BUTTON_CLEAR')
          // commit('SET_CUSTOMER', response.data.company)
        })
        .catch((error) => {
          commit('BUTTON_CLEAR')
          if (error.response.status === 422) {
            const errors = Object.values(error.response.data.error).flat()

            commit('SET_ERROR', {
              'error': errors[0]
            })
          }
        })
    },
    updateProfile({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')
      this.$axios.post(`/customers/update-profile/${data.id}`, {
        address_1: data.address_1,
        address_2: data.address_2,
        zip: data.zip,
        state: data.state,
        city: data.city,
        country: data.country,
        phone: data.phone
      })
        .then((response) => {
          commit('BUTTON_CLEAR')
          dispatch('app/showSuccess', response.data, { root: true })
          // console.log(response.data)
          // commit('SET_CUSTOMER', response.data.company)
        })
        .catch((error) => {
          commit('BUTTON_CLEAR')
          // console.log(error.response.data)
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
    customerNames: (state) => {
      return state.data.map((customer) => customer.name)
    },
    extendedCompanies: (state) => {
      const _companies = state.data

      _companies.unshift({
        id: 0,
        name: 'Not Assigned'
      })

      return _companies
    }
  }
}

export default module
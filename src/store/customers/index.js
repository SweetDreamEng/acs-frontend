const module = {
  namespaced: true,
  state: {
    button_loading: false,
    error: null,
    data: [
      // { id: 1, name: 'Mitsui', created:'2019-08-09T03:14:12Z', lastSignIn:'2019-08-14T20:00:53Z', administratorName: 'Cheryl Jerzycowski' },
      // { id: 2, name: 'Wilmar International', created:'2019-11-07T06:47:53Z', lastSignIn:'2019-09-20T01:11:13Z', administratorName: 'Merline Tuson' },
      // { id: 3, name: 'Sinomach', created:'2020-05-23T06:46:40Z', lastSignIn:'2019-06-05T10:03:10Z', administratorName: 'Hermione Phelp' },
      // { id: 4, name: 'Geely', created:'2020-03-13T08:39:07Z', lastSignIn:'2019-09-21T04:56:23Z', administratorName: 'Gaelan Conaboy' },
      // { id: 5, name: 'ZF Friedrichshafen', created:'2019-11-24T22:18:43Z', lastSignIn:'2020-05-23T15:07:18Z', administratorName: 'Georg Ewart' },
      // { id: 6, name: 'Sanofi', created:'2020-03-21T19:04:42Z', lastSignIn:'2020-05-19T20:12:01Z', administratorName: 'Jenilee Milley' },
      // { id: 7, name: 'Honeywell', created:'2019-07-05T02:44:05Z', lastSignIn:'2019-07-05T11:55:38Z', administratorName: 'Norby Pietrowski' },
      // { id: 8, name: 'Merck & Co.', created:'2019-08-19T11:10:08Z', lastSignIn:'2019-07-03T07:40:23Z', administratorName: 'Lilia McKelvie' },
      // { id: 9, name: 'Mitsubishi Electric', created:'2019-05-31T22:33:05Z', lastSignIn:'2020-02-17T08:31:17Z', administratorName: 'Lolita Bocke' },
      // { id: 10, name: 'SABIC', created:'2020-01-29T13:31:15Z', lastSignIn:'2020-04-08T10:57:40Z', administratorName: 'Heinrick Sandercroft' },
      // { id: 11, name: 'Jardine Matheson', created:'2019-11-25T17:49:07Z', lastSignIn:'2019-12-04T02:08:07Z', administratorName: 'Kerr Hay' },
      // { id: 12, name: 'Pegatron', created:'2019-05-02T21:01:49Z', lastSignIn:'2019-09-03T20:54:17Z', administratorName: 'Dorian Brendeke' },
      // { id: 13, name: 'AB Volvo', created:'2019-12-21T04:53:45Z', lastSignIn:'2020-06-05T19:04:53Z', administratorName: 'Clifford Meron' },
      // { id: 14, name: 'Magna International', created:'2020-03-28T18:59:34Z', lastSignIn:'2019-10-08T13:59:08Z', administratorName: 'Neile Juanes' }
    ],
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
      commit
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
    }
  }
}

export default module
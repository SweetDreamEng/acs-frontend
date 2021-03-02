import companyAPI from '../../services/api/company'
import router from '../../router'

const module = {
  namespaced: true,
  state: {
    button_loading: false,                    // loading status
    isTableLoading: false,

    error: null,

    data: [],                                 // companies
    companyAdmins: [],
    companies: [],

    companyAccount: null,
    companyProfile: null
  },

  actions: {
    async getCompanyAdmins({
      commit
    }) {
      commit('TABLE_LOAD')

      try {
        const response = await companyAPI.getCompanyAdmins()

        commit('SET_CUSTOMER_ADMINS', response.data.customer_admins)
      } catch (error) {
        console.log(error.response)
      }

      commit('TABLE_LOADED')
    },

    /*
      Get all companies
    */
    async getCompanies({
      commit
    }) {
      try {
        const response = await companyAPI.getCompanies()

        commit('SET_COMPANIES', response.data.companies)
      } catch (error) {
        console.log(error.response)
      }
    },

    async addCompany({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')

      try {
        const response = await companyAPI.addCompany(data)

        commit('CLEAR_ERROR')
        dispatch('app/showSuccess', response.data, { root: true })
        router.push({
          name: 'companies-list'
        })
      } catch (error) {
        if (error.response.status === 422) {
          if (error.response.data.error.administrator_email) {
            commit('SET_ERROR', {
              'error': `Customer administrator for company <i>${data.companyName}</i> already exists`
            })
          } else {
            const errors = Object.values(error.response.data.error).flat()

            commit('SET_ERROR', {
              'error': errors[0]
            })
          }
        }
      }

      commit('BUTTON_CLEAR')
    },

    async getCompany({
      commit
    }, id) {
      try {
        const response = await companyAPI.getCompany(id)

        commit('SET_COMPANY_ACCOUNT', response.data.customer)
        commit('SET_COMPANY_PROFILE', response.data.profile)
        commit('cities/SET_DATA', response.data.cities, { root: true } )
      } catch (error) {
        console.log(error.response.data)
      }
    },

    async updateAccount({
      commit, dispatch
    }, account) {
      commit('BUTTON_LOAD')

      try {
        const response = await companyAPI.updateAccount(account)

        dispatch('app/showSuccess', response.data, { root: true })
        router.push({
          name: 'companies-list'
        })
      } catch (error) {
        if (error.response.status === 422) {
          if (error.response.data.error.administrator_email) {
            commit('SET_ERROR', {
              'error': `Customer administrator for company <i>${account.companyName}</i> already exists`
            })
          } else {
            const errors = Object.values(error.response.data.error).flat()

            commit('SET_ERROR', {
              'error': errors[0]
            })
          }
        }
      }

      commit('BUTTON_CLEAR')
    },

    async updateProfile({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')

      try {
        const response = await companyAPI.updateProfile(data)

        dispatch('app/showSuccess', response.data, { root: true })
        router.push({
          name: 'companies-list'
        })
      } finally {
        commit('BUTTON_CLEAR')
      }
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

    TABLE_LOAD(state) {
      state.isTableLoading = true
    },

    TABLE_LOADED(state) {
      state.isTableLoading = false
    },

    SET_CUSTOMERS(state, customers) {
      state.data = customers
    },

    SET_COMPANIES(state, companies) {
      state.companies = companies
    },

    SET_CUSTOMER_ADMINS(state, companyAdmins) { state.companyAdmins = companyAdmins },
    SET_COMPANY_ACCOUNT(state, companyAccount) { state.companyAccount = companyAccount },
    SET_COMPANY_PROFILE(state, companyProfile) { state.companyProfile = companyProfile }
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

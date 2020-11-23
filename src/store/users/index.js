import userAPI from '@/services/api/user'

const module = {
  namespaced: true,
  state: {
    data: [],

    table_loading: false,
    button_loading: false
  },

  actions: {
    openCreateAccount({
      commit
    }) {
      return new Promise((resolve, reject) => {
        userAPI.openCreateAccount()
          .then((response) => {
            commit('locations/SET_DATA', response.data.locations, { root: true })
            commit('zones/SET_DATA', response.data.zones, { root: true })
            commit('roles/SET_DATA', response.data.roles, { root: true })
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
      })
    },
    getCompanyUsers({
      commit
    }) {
      commit('TABLE_LOAD')

      return new Promise((resolve, reject) => {
        userAPI.getCompanyUsers()
          .then((response) => {
            commit('SET_DATA', response.data.users)
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('TABLE_LOADED')
          })
      })
    },
    addCompanyUser({
      commit
    }, data) {
      commit('BUTTON_LOAD')
      
      return new Promise((resolve, reject) => {
        userAPI.addCompanyUser(data)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('BUTTON_CLEAR')
          })
      })
    }
  },

  mutations: {
    SET_DATA(state, users) {
      state.data = users
    },
    TABLE_LOAD(state) {
      state.table_loading = true
    },
    TABLE_LOADED(state) {
      state.table_loading = false
    },
    BUTTON_LOAD(state) {
      state.button_loading = true
    },
    BUTTON_CLEAR(state) {
      state.button_loading = false
    }
  },

  getters: {
  }
}

export default module
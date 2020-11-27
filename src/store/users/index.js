import userAPI from '@/services/api/user'
import router from '../../router'

const module = {
  namespaced: true,
  state: {
    data: [],
    roles: [],

    user: null,
    
    error: null,

    isUsersTableLoading: false,
    button_loading: false
  },

  actions: {
    initCreateAccount({
      commit
    }) {
      return new Promise((resolve, reject) => {
        userAPI.initCreateAccount()
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
    openEditCompanyUser({
      commit
    }, id) {
      return new Promise((resolve, reject) => {
        userAPI.openEditCompanyUser(id)
          .then((response) => {
            commit('locations/SET_DATA', response.data.locations, { root: true })
            commit('zones/SET_DATA', response.data.zones, { root: true })
            commit('roles/SET_DATA', response.data.roles, { root: true })
            commit('SET_USER', response.data.user)
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
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')
      
      userAPI.addCompanyUser(data)
        .then((response) => {
          dispatch('app/showSuccess', response.data, { root: true })
          router.push({
            name: 'users-list'
          })
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
    updateCompanyUserAccount({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')
      
      userAPI.updateCompanyUserAccount(data)
        .then((response) => {
          dispatch('app/showSuccess', response.data, { root: true })
          router.push({
            name: 'users-list'
          })
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
    updateCompanyUserInformation({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')
      
      userAPI.updateCompanyUserInformation(data)
        .then((response) => {
          dispatch('app/showSuccess', response.data, { root: true })
          router.push({
            name: 'users-list'
          })
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

    initAcsUsers({
      commit
    }) {
      commit('TABLE_LOAD')
      userAPI.initAcsUsers()
        .then((response) => {
          commit('SET_DATA', response.data.users)
        })
        .catch((error) => {
          console.log(error.response)
        })
        .finally(() => {
          commit('TABLE_LOADED')
        })
    },
    initCreateAcsUser({
      commit
    }) {
      userAPI.initCreateAcsUser()
        .then((response) => {
          commit('SET_ROLES', response.data.roles)
        })
    },
    initAcsUserEdit({
      commit
    }, id ) {
      userAPI.initAcsUserEdit(id)
        .then((response) => {
          commit('SET_ROLES', response.data.roles)
          commit('SET_USER', response.data.user)
          commit('cities/SET_DATA', response.data.cities, { root: true } )
        })
    },
    
    addAcsUser({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')
      
      userAPI.addAcsUser(data)
        .then((response) => {
          dispatch('app/showSuccess', response.data, { root: true })
          router.push({
            name: 'acs-users-list'
          })
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
    updateAcsUserAccount({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')
      
      userAPI.updateAcsUserAccount(data)
        .then((response) => {
          dispatch('app/showSuccess', response.data, { root: true })
          router.push({
            name: 'acs-users-list'
          })
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
    updateAcsUserInformation({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')
      
      userAPI.updateAcsUserInformation(data)
        .then((response) => {
          dispatch('app/showSuccess', response.data, { root: true })
          router.push({
            name: 'acs-users-list'
          })
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
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    }
  },

  mutations: {
    SET_DATA(state, users) {
      state.data = users
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_ERROR(state, error) {
      state.error = error.error
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    },
    TABLE_LOAD(state) {
      state.isUsersTableLoading = true
    },
    TABLE_LOADED(state) {
      state.isUsersTableLoading = false
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
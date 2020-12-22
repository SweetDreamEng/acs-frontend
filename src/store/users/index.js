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
    async initCreateAccount({
      commit
    }) {
      try {
        const response = await userAPI.initCreateAccount()

        commit('locations/SET_DATA', response.data.locations, { root: true })
        commit('zones/SET_DATA', response.data.zones, { root: true })
        commit('roles/SET_DATA', response.data.roles, { root: true })
      } catch (error) {
        console.log(error)
      }
    },
    async openEditCompanyUser({
      commit
    }, id) {
      try {
        const response = await userAPI.openEditCompanyUser(id)

        commit('locations/SET_DATA', response.data.locations, { root: true })
        commit('zones/SET_DATA', response.data.zones, { root: true })
        commit('roles/SET_DATA', response.data.roles, { root: true })
        commit('SET_USER', response.data.user)
      } catch (error) {
        console.log(error)
      }
    },
    async getCompanyUsers({
      commit
    }) {
      commit('TABLE_LOAD')
      try {
        const response = await userAPI.getCompanyUsers()

        commit('SET_DATA', response.data.users)
      } catch (error) {
        console.log(error)
      } finally {
        commit('TABLE_LOADED')
      }
    },
    async addCompanyUser({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')

      try {
        const response = await userAPI.addCompanyUser(data)

        dispatch('app/showSuccess', response.data, { root: true })
        router.push({
          name: 'users-list'
        })
      } catch (error) {
        if (error.response.status === 422) {
          const errors = Object.values(error.response.data.error).flat()

          commit('SET_ERROR', {
            'error': errors[0]
          })
        }
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async updateCompanyUserAccount({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')

      try {
        const response = await userAPI.updateCompanyUserAccount(data)

        dispatch('app/showSuccess', response.data, { root: true })
        router.push({
          name: 'users-list'
        })
      } catch (error) {
        if (error.response.status === 422) {
          const errors = Object.values(error.response.data.error).flat()

          commit('SET_ERROR', {
            'error': errors[0]
          })
        }
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async updateCompanyUserInformation({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')

      try {
        const response = await userAPI.updateCompanyUserInformation(data)

        dispatch('app/showSuccess', response.data, { root: true })
        router.push({
          name: 'users-list'
        })
      } catch (error) {
        if (error.response.status === 422) {
          const errors = Object.values(error.response.data.error).flat()

          commit('SET_ERROR', {
            'error': errors[0]
          })
        }
      } finally {
        commit('BUTTON_CLEAR')
      }
    },

    async initAcsUsers({
      commit
    }) {
      commit('TABLE_LOAD')
      try {
        const response = await userAPI.initAcsUsers()

        commit('SET_DATA', response.data.users)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('TABLE_LOADED')
      }
    },
    async initCreateAcsUser({
      commit
    }) {
      try {
        const response = await userAPI.initCreateAcsUser()

        commit('SET_ROLES', response.data.roles)
      } catch (error) {
        console.log(error)
      }
    },
    async initAcsUserEdit({
      commit
    }, id) {
      try {
        const response = await userAPI.initAcsUserEdit(id)

        commit('SET_ROLES', response.data.roles)
        commit('SET_USER', response.data.user)
        commit('cities/SET_DATA', response.data.cities, { root: true })
      } catch (error) {
        console.log(error)
      }
    },

    async addAcsUser({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')

      try {
        const response = await userAPI.addAcsUser(data)

        dispatch('app/showSuccess', response.data, { root: true })
        router.push({
          name: 'acs-users-list'
        })
      } catch (error) {
        if (error.response.status === 422) {
          const errors = Object.values(error.response.data.error).flat()

          commit('SET_ERROR', {
            'error': errors[0]
          })
        }
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async updateAcsUserAccount({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')

      try {
        const response = await userAPI.updateAcsUserAccount(data)

        dispatch('app/showSuccess', response.data, { root: true })
        router.push({
          name: 'acs-users-list'
        })
      } catch (error) {
        if (error.response.status === 422) {
          const errors = Object.values(error.response.data.error).flat()

          commit('SET_ERROR', {
            'error': errors[0]
          })
        }
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async updateAcsUserInformation({
      commit, dispatch
    }, data) {
      commit('BUTTON_LOAD')

      try {
        const response = await userAPI.updateAcsUserInformation(data)

        dispatch('app/showSuccess', response.data, { root: true })
        router.push({
          name: 'acs-users-list'
        })
      } catch (error) {
        if (error.response.status === 422) {
          const errors = Object.values(error.response.data.error).flat()

          commit('SET_ERROR', {
            'error': errors[0]
          })
        }
      } finally {
        commit('BUTTON_CLEAR')
      }
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
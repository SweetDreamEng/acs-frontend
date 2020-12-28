import configurationAPI from '@/services/api/configuration'

const module = {
  namespaced: true,
  state: {
    configurations: [],
    configuration: {},

    loadingConfigurations: false,
    savingConfiguration: false
  },

  actions: {
    async getConfigurations ({ commit }) {
      commit('SET_LOADING_CONFIGURATIONS', true)

      try {
        const response = await configurationAPI.getConfigurations()

        commit('SET_CONFIGURATIONS', response.data.configurations)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING_CONFIGURATIONS', false)
    },

    async getConfiguration ({ commit }, id) {
      try {
        const response = await configurationAPI.getConfiguration(id)

        commit('SET_CONFIGURATION', response.data.configuration)
      } catch (error) {
        console.log(error)
      }
    },

    async saveConfiguration ({ commit, dispatch }, configuration) {
      commit('SAVING_CONFIGURATION', true)

      try {
        const response = await configurationAPI.saveConfiguration(configuration)

        dispatch('app/showSuccess', response.data, { root: true })
      } catch (error) {
        console.log(error)
      }

      commit('SAVING_CONFIGURATION', false)
    }
  },

  mutations: {
    SET_CONFIGURATIONS(state, configurations) { state.configurations = configurations },
    SET_CONFIGURATION(state, configuration) { state.configuration = configuration },
    SET_LOADING_CONFIGURATIONS(state, value) { state.loadingConfigurations = value },
    SAVING_CONFIGURATION(state, saving) { state.savingConfiguration = saving }
  },

  getters: {
    extendedConfigurations(state) {
      const _configurations = state.configurations.slice()

      _configurations.unshift({
        id: 0,
        name: 'Not Assigned'
      })

      return _configurations
    },
    configurationName: (state) => (id) => {
      const _configuration = state.configurations.find((configuration) => configuration.id === id)

      return _configuration ? _configuration.name : 'Not Configured'
    }
  }
}

export default module
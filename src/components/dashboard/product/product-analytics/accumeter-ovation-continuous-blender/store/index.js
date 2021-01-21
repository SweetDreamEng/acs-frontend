import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingRecipe: false,
    actualRecipeValues: [],
    targetRecipeValues: [],

    loadingSystemStates: false,
    systemStates: {},

    loadingFeederStables: false,
    feederStables: []
  },

  actions: {
    async getSystemStates({ commit }, { id, isAdditional }) {
      commit('SET_SYSTEM_STATES', {})
      commit('SET_LOADING_SYSTEM_STATES', true)
      
      try {
        const response = await api.getSystemStates({
          id,
          isAdditional
        })

        commit('SET_SYSTEM_STATES', response.data.machine_states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_SYSTEM_STATES', false)
      }
    },
    async getFeederStables({ commit }, id) {
      commit('SET_FEEDER_STABLES', [])
      commit('SET_LOADING_FEEDER_STABLES', true)

      try {
        const response = await api.getFeederStables(id)

        commit('SET_FEEDER_STABLES', response.data.feeders)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_FEEDER_STABLES', false)
      }
    },
    async getRecipe({ state, commit }, id) {
      commit('SET_ACTUAL_RECIPE_TO_VALUES', [])
      commit('SET_TARGET_RECIPE_TO_VALUES', [])
      commit('SET_LOADING_RECIPE', true)

      try {
        const response = await api.getRecipe(id)

        commit('SET_ACTUAL_RECIPE_TO_VALUES', response.data.actuals)
        commit('SET_TARGET_RECIPE_TO_VALUES', response.data.targets)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_RECIPE', false)
      }
    }
  },

  mutations: {
    SET_LOADING_SYSTEM_STATES(state, isLoading) { state.loadingSystemStates = isLoading },
    SET_LOADING_FEEDER_STABLES(state, isLoading) { state.loadingFeederStables = isLoading },
    SET_LOADING_RECIPE(state, isLoading) { state.loadingRecipe = isLoading },
    
    SET_SYSTEM_STATES(state, data) { state.systemStates = data },
    SET_FEEDER_STABLES(state, data) { state.feederStables = data },
    SET_ACTUAL_RECIPE_TO_VALUES(state, data) { state.actualRecipeValues = data },
    SET_TARGET_RECIPE_TO_VALUES(state, data) { state.targetRecipeValues = data }
  }
}

export default module
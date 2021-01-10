import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingInventories: false,
    inventories: [],

    loadingWeight: false,
    actualWeights: [],
    targetWeights: [],

    loadingRecipe: false,
    recipeValues: []
  },

  actions: {
    async getRecipe({ commit }, id) {
      commit('SET_LOADING_RECIPE', true)

      try {
        const response = await api.getRecipe(id)

        commit('SET_RECIPE_VALUES', response.data.recipe_values)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_RECIPE', false)
      }
    },

    async getWeight({ commit }, id) {
      commit('SET_LOADING_WEIGHT', true)

      try {
        const response = await api.getWeight(id)

        commit('SET_ACTUAL_WEIGHTS', response.data.actuals)
        commit('SET_TARGET_WEIGHTS', response.data.targets)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_WEIGHT', false)
      }
    },

    async getInventory({ commit }, id) {
      commit('SET_LOADING_INVENTORIES', true)

      try {
        const response = await api.getInventory(id)

        commit('SET_INVENTORIES', response.data.inventories)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_INVENTORIES', false)
      }
    }
  },

  mutations: {
    SET_LOADING_RECIPE(state, isLoading) { state.loadingRecipe = isLoading },
    SET_LOADING_WEIGHT(state, isLoading) { state.loadingWeight = isLoading },
    SET_LOADING_INVENTORIES(state, isLoading) { state.loadingInventories = isLoading },

    SET_RECIPE_VALUES(state, recipeValues) { state.recipeValues = recipeValues },
    SET_INVENTORIES(state, inventories) { state.inventories = inventories },
    SET_ACTUAL_WEIGHTS(state, actualWeights) { state.actualWeights = actualWeights },
    SET_TARGET_WEIGHTS(state, targetWeights) { state.targetWeights = targetWeights }
  },

  getters: {
  }
}

export default module
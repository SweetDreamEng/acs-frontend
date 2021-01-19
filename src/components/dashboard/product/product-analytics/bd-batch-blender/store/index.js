import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingInventories: false,
    inventories: [],

    loadingRecipe: false,
    recipeValues: [],
    recipeMode: 0,
    ezTypes: [],
    
    loadingHopperStables: false,
    hopperStables: [],

    loadingCellBits: false,
    cellBits: []
  },

  actions: {
    async getRecipe({ commit }, id) {
      commit('SET_RECIPE_VALUES', [])
      commit('SET_LOADING_RECIPE', true)
      commit('SET_EZ_TYPES', [])
      try {
        const response = await api.getRecipe(id)

        commit('SET_RECIPE_VALUES', response.data.recipe_values)
        commit('SET_RECIPE_MODE', response.data.mode)
        commit('SET_EZ_TYPES', response.data.ez_types)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_RECIPE', false)
      }
    },

    async getInventory({ commit }, id) {
      commit('SET_INVENTORIES', [])
      commit('SET_LOADING_INVENTORIES', true)

      try {
        const response = await api.getInventory(id)

        commit('SET_INVENTORIES', response.data.inventories)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_INVENTORIES', false)
      }
    },

    async getHopperStables({ commit }, id) {
      commit('SET_HOPPER_STABLES', [])
      commit('SET_LOADING_HOPPER_STABLES', true)

      try {
        const response = await api.getHopperStables(id)

        commit('SET_HOPPER_STABLES', response.data.stables)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_HOPPER_STABLES', false)
      }
    },

    async getLoadingCellBits({ commit }, id) {
      // commit('SET_LOADING_CELL_BITS', true)

      // try {
      //   const response = await api.getUtilization({
      //     id: id,
      //     timeRange: state.utilizationTimeRange
      //   })

      //   commit('SET_UTILIZATION', response.data.utilizations)
      // } catch (error) {
      //   console.log(error)
      // } finally {
      //   commit('SET_LOADING_CELL_BITS', false)
      // }
    }
  },

  mutations: {
    SET_LOADING_RECIPE(state, isLoading) { state.loadingRecipe = isLoading },
    SET_LOADING_INVENTORIES(state, isLoading) { state.loadingInventories = isLoading },
    SET_LOADING_HOPPER_STABLES(state, isLoading) { state.loadingHopperStables = isLoading },
    SET_LOADING_CELL_BITS(state, isLoading) { state.loadingCellBits = isLoading },

    SET_RECIPE_VALUES(state, recipeValues) { state.recipeValues = recipeValues },
    SET_RECIPE_MODE(state, mode) { state.recipeMode = mode },
    SET_EZ_TYPES(state, types) { state.ezTypes = types },
    SET_INVENTORIES(state, inventories) { state.inventories = inventories },
    SET_HOPPER_STABLES(state, stables) { state.hopperStables = stables }
  },

  getters: {
    timeRangeLabel: (state, getters, rootState) => (timeRange) => {
      const timeRangeOptions = rootState.machines.timeRageOptions

      if (timeRange.timeRangeOption === 'custom') {
        return `${timeRange.dateFrom} ${timeRange.timeFrom} ~ ${timeRange.dateTo} ${timeRange.timeTo}`
      } else {
        return timeRangeOptions.find((item) => item.value === timeRange.timeRangeOption).label
      }
    }
  }
}

export default module
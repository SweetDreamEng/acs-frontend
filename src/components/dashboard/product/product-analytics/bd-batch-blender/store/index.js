import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingInventories: false,
    inventory: [],
    savingMaterial: false,
    togglingInventoryTrack: false,

    loadingRecipe: false,
    recipeValues: [],
    recipeMode: 0,
    ezTypes: [],
    
    loadingHopperStables: false,
    hopperStables: [],

    loadingLoadCell: false,
    loadCells: []
  },

  actions: {
    async getRecipe({ commit }, payload) {
      commit('SET_RECIPE_VALUES', [])
      commit('SET_LOADING_RECIPE', true)
      commit('SET_EZ_TYPES', [])
      try {
        const response = await api.getRecipe(payload)

        commit('SET_RECIPE_VALUES', response.data.recipe_values)
        commit('SET_RECIPE_MODE', response.data.mode)
        commit('SET_EZ_TYPES', response.data.ez_types)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_RECIPE', false)
      }
    },

    async getInventory({ commit }, payload) {
      commit('SET_LOADING_INVENTORIES', true)

      try {
        const response = await api.getInventory(payload)

        commit('SET_INVENTORIES', response.data)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_INVENTORIES', false)
      }
    },

    async updateInventoryMaterial({ commit, dispatch }, payload) {
      commit('SET_LOADING_MATERIAL_INVENTORY', true)

      try {
        const response = await api.updateInventoryMaterial(payload)

        dispatch('app/showSuccess', response, { root: true })
      } catch (error) {
        dispatch('app/showError', {
          error: 'Failed to save material'
        }, { root: true })

        throw error
      } finally {
        commit('SET_LOADING_MATERIAL_INVENTORY', false)
      }
    },

    async getHopperStables({ commit }, payload) {
      commit('SET_HOPPER_STABLES', [])
      commit('SET_LOADING_HOPPER_STABLES', true)

      try {
        const response = await api.getHopperStables(payload)

        commit('SET_HOPPER_STABLES', response.data.stables)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_HOPPER_STABLES', false)
      }
    },

    async getLoadCells({ commit }, payload) {
      commit('SET_LOADING_LOAD_CELLS', true)

      try {
        const response = await api.getLoadCells(payload)

        commit('SET_LOAD_CELLS', response.data.loadCells)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_LOAD_CELLS', false)
      }
    },

    async toggleInventoryTracking({ commit }, payload) {
      commit('SET_LOADING_INVENTORY_TRACK', true)

      try {
        const response = await api.toggleInventoryTracking(payload)

        commit('SET_TARCKING_STATUS', response.data.in_progress)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_INVENTORY_TRACK', false)
      }
    }
  },

  mutations: {
    SET_LOADING_RECIPE(state, isLoading) { state.loadingRecipe = isLoading },
    SET_LOADING_INVENTORIES(state, isLoading) { state.loadingInventories = isLoading },
    SET_LOADING_HOPPER_STABLES(state, isLoading) { state.loadingHopperStables = isLoading },
    SET_LOADING_LOAD_CELLS(state, isLoading) { state.loadingLoadCell = isLoading },

    SET_RECIPE_VALUES(state, recipeValues) { state.recipeValues = recipeValues },
    SET_RECIPE_MODE(state, mode) { state.recipeMode = mode },
    SET_EZ_TYPES(state, types) { state.ezTypes = types },
    SET_INVENTORIES(state, data) {
      state.inventory = data.data
    },
    SET_LOADING_MATERIAL_INVENTORY(state, loading) { state.savingMaterial = loading },
    SET_HOPPER_STABLES(state, stables) { state.hopperStables = stables },

    SET_LOADING_INVENTORY_TRACK(state, isLoading) { state.togglingInventoryTrack = isLoading },
    SET_LOAD_CELLS(state, loadCells) { state.loadCells = loadCells },
    SET_TARCKING_STATUS(state, in_progress) { state.inventory.inventory_material.in_progress = in_progress }
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
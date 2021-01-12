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
    recipeValues: [],
    recipeMode: 0,

    loadingStationConveyings: false,
    stationConveyingSeries: [],

    loadingHopperStables: false,
    hopperStables: [],

    loadingCalibrationFactors: false,
    calibrationFactors: [],

    loadingCellBits: false,
    cellBits: []
  },

  actions: {
    async getRecipe({ commit }, id) {
      commit('SET_RECIPE_VALUES', [])
      commit('SET_LOADING_RECIPE', true)

      try {
        const response = await api.getRecipe(id)

        commit('SET_RECIPE_VALUES', response.data.recipe_values)
        commit('SET_RECIPE_MODE', response.data.mode)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_RECIPE', false)
      }
    },

    async getWeight({ commit }, id) {
      commit('SET_ACTUAL_WEIGHTS', [])
      commit('SET_TARGET_WEIGHTS', [])
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

    async getStationConveyings({ commit }, id) {
      commit('SET_STATION_CONVEYINGS', [])
      commit('SET_LOADING_STATION_CONVEYINGS', true)

      try {
        const response = await api.getStationConveyings(id)

        commit('SET_STATION_CONVEYINGS', response.data.conveyings)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_STATION_CONVEYINGS', false)
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

    async getFeederCalibrationFactors({ commit }, id) {
      commit('SET_CALIBRATION_FACTORS', [])
      commit('SET_LOADING_CALIBRATION_FACTORS', true)

      try {
        const response = await api.getFeederCalibrationFactors(id)

        commit('SET_CALIBRATION_FACTORS', response.data.calibration_factors)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_CALIBRATION_FACTORS', false)
      }
    },

    async getLoadingCellBits({ commit }, id) {
      // commit('SET_LOADING_CELL_BITS', true)

      // try {
      //   const response = await machineAPI.getUtilization({
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
    SET_LOADING_WEIGHT(state, isLoading) { state.loadingWeight = isLoading },
    SET_LOADING_INVENTORIES(state, isLoading) { state.loadingInventories = isLoading },
    SET_LOADING_STATION_CONVEYINGS(state, isLoading) { state.loadingStationConveyings = isLoading },
    SET_LOADING_HOPPER_STABLES(state, isLoading) { state.loadingHopperStables = isLoading },
    SET_LOADING_CALIBRATION_FACTORS(state, isLoading) { state.loadingCalibrationFactors = isLoading },
    SET_LOADING_CELL_BITS(state, isLoading) { state.loadingCellBits = isLoading },

    SET_RECIPE_VALUES(state, recipeValues) { state.recipeValues = recipeValues },
    SET_RECIPE_MODE(state, mode) { state.recipeMode = mode },
    SET_INVENTORIES(state, inventories) { state.inventories = inventories },
    SET_ACTUAL_WEIGHTS(state, actualWeights) { state.actualWeights = actualWeights },
    SET_TARGET_WEIGHTS(state, targetWeights) { state.targetWeights = targetWeights },
    SET_STATION_CONVEYINGS(state, conveyings) { state.stationConveyingSeries = conveyings },
    SET_HOPPER_STABLES(state, stables) { state.hopperStables = stables },
    SET_CALIBRATION_FACTORS(state, factors) { state.calibrationFactors = factors }
  },

  getters: {
  }
}

export default module
import api from '../services/api'

function defaultTimeRange() {
  return {
    timeRangeOption: 'last24Hours',
    dateFrom: new Date().toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    timeFrom: '00:00',
    timeTo: '00:00'
  }
}

const module = {
  namespaced: true,
  state: {
    loadingRecipe: false,
    actualRecipeValues: [],
    targetRecipeValues: [],

    loadingSystemStates: false,
    systemStates: {},

    loadingFeederStables: false,
    feederStables: [],
    loadingBlenderCapabilities: false,
    blenderCapabilities: [],
    blenderCapabilityTimeRange: defaultTimeRange(),

    loadingFeederCalibrations: false,
    feederCalibrations: [],
    feederCalibrationTimeRange: defaultTimeRange(),

    loadingFeederSpeeds: false,
    feederSpeeds: [],
    feederSpeedTimeRange: defaultTimeRange(),

    loadingTargetRates: false,
    targetRates: [],
    targetRateTimeRange: defaultTimeRange(),

    selectedTimeRangeKey: 'blender-capability',
    selectedTimeRange: defaultTimeRange()
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
    },

    async getBlenderCapabilities({ state, commit }, id) {
      commit('SET_LOADING_BLENDER_CAPABILITIES', true)

      try {
        const response = await api.getBlenderCapabilities({
          id: id,
          timeRange: state.blenderCapabilityTimeRange
        })

        commit('SET_BLENDER_CAPABILITIES', response.data.capabilities)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_BLENDER_CAPABILITIES', false)
      }
    },

    async getFeederCalibrations({ state, commit }, id) {
      commit('SET_LOADING_FEEDER_CALIBRATIONS', true)

      try {
        const response = await api.getFeederCalibrations({
          id: id,
          timeRange: state.feederCalibrationTimeRange
        })

        commit('SET_FEEDER_CALIBRATIONS', response.data.calibrations)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_FEEDER_CALIBRATIONS', false)
      }
    },

    async getFeederSpeeds({ state, commit }, id) {
      commit('SET_LOADING_FEEDER_SPEEDS', true)

      try {
        const response = await api.getFeederSpeeds({
          id: id,
          timeRange: state.feederSpeedTimeRange
        })

        commit('SET_FEEDER_SPEEDS', response.data.speeds)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_FEEDER_SPEEDS', false)
      }
    },

    async getTargetRates({ state, commit }, id) {
      commit('SET_LOADING_TARGET_RATES', true)

      try {
        const response = await api.getTargetRates({
          id: id,
          timeRange: state.targetRateTimeRange
        })

        commit('SET_TARGET_RATES', response.data.rates)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_TARGET_RATES', false)
      }
    },

    async selectTimeRange({ commit }, key) {
      commit('SET_CURRENT_TIME_KEY', key)
      commit('SET_CURRENT_TIME', key)
    },

    async onTimeRangeChanged({ commit, dispatch, state }, data) {
      switch (state.selectedTimeRangeKey) {
      case 'blender-capability':
        commit('SET_BLENDER_CAPABIITY_TIME_RANGE', data)
        dispatch('getBlenderCapabilities', data.id)
        break
      case 'feeder-calibration':
        commit('SET_FEEDER_CALIBRATION_TIME_RANGE', data)
        dispatch('getFeederCalibrations', data.id)
        break
      case 'feeder-speed':
        commit('SET_FEEDER_SPEED_TIME_RANGE', data)
        dispatch('getFeederSpeeds', data.id)
        break
      case 'target-rate':
        commit('SET_TARGET_RATE_TIME_RANGE', data)
        dispatch('getTargetRates', data.id)
        break
      default:
        break
      }
    }
  },

  mutations: {
    SET_LOADING_SYSTEM_STATES(state, isLoading) { state.loadingSystemStates = isLoading },
    SET_LOADING_FEEDER_STABLES(state, isLoading) { state.loadingFeederStables = isLoading },
    SET_LOADING_RECIPE(state, isLoading) { state.loadingRecipe = isLoading },
    SET_LOADING_BLENDER_CAPABILITIES(state, isLoading) { state.loadingBlenderCapabilities = isLoading },
    SET_LOADING_FEEDER_CALIBRATIONS(state, isLoading) { state.loadingFeederCalibrations = isLoading },
    SET_LOADING_FEEDER_SPEEDS(state, isLoading) { state.loadingFeederSpeeds = isLoading },
    SET_LOADING_TARGET_RATES(state, isLoading) { state.loadingTargetRates = isLoading },
    
    SET_SYSTEM_STATES(state, data) { state.systemStates = data },
    SET_FEEDER_STABLES(state, data) { state.feederStables = data },
    SET_ACTUAL_RECIPE_TO_VALUES(state, data) { state.actualRecipeValues = data },
    SET_TARGET_RECIPE_TO_VALUES(state, data) { state.targetRecipeValues = data },
    SET_BLENDER_CAPABILITIES(state, data) { state.blenderCapabilities = data },
    SET_FEEDER_CALIBRATIONS(state, data) { state.feederCalibrations = data },
    SET_FEEDER_SPEEDS(state, data) { state.feederSpeeds = data },
    SET_TARGET_RATES(state, data) { state.targetRates = data },

    SET_BLENDER_CAPABIITY_TIME_RANGE(state, data) { state.blenderCapabilityTimeRange = Object.assign({}, data) },
    SET_FEEDER_CALIBRATION_TIME_RANGE(state, data) { state.feederCalibrationTimeRange = Object.assign({}, data) },
    SET_FEEDER_SPEED_TIME_RANGE(state, data) { state.feederSpeedTimeRange = Object.assign({}, data) },
    SET_TARGET_RATE_TIME_RANGE(state, data) { state.targetRateTimeRange = Object.assign({}, data) },

    SET_CURRENT_TIME_KEY(state, key) { state.selectedTimeRangeKey = key },
    SET_CURRENT_TIME(state, key) {
      switch (key) {
      case 'blender-capability':
        state.selectedTimeRange = state.blenderCapabilityTimeRange
        break
      case 'feeder-calibration':
        state.selectedTimeRange = state.feederCalibrationTimeRange
        break
      case 'feeder-speed':
        state.selectedTimeRange = state.feederSpeedTimeRange
        break
      case 'target-rate':
        state.selectedTimeRange = state.targetRateTimeRange
        break
      default:
        break
      }
    }
  }
}

export default module
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
    loadingDryingHoppers: false,
    loadingBedStates: false,

    dryingHoppers: {},
    bedStates: [],

    loadingDHOnlineHours: false,
    dhOnlineHours: [],
    dhOnlineHoursTimeRange: defaultTimeRange(),

    loadingDryerOnlineHours: false,
    dryerOnlineHours: [],
    dryerOnlineHoursTimeRange: defaultTimeRange(),

    loadingBlowerRunHours: false,
    blowerRunHours: [],
    blowerRunHoursTimeRange: defaultTimeRange(),

    selectedTimeRangeKey: 'dh-online-hours',
    selectedTimeRange: defaultTimeRange()
  },

  actions: {
    async getDryingHopperStats({ state, commit }, id) {
      commit('SET_DRYING_HOPPERS', {})
      commit('SET_LOADING_DRYING_HOPPERS', true)

      try {
        const response = await api.getDryingHopperStats(id)

        commit('SET_DRYING_HOPPERS', response.data.states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DRYING_HOPPERS', false)
      }
    },
    async getBedStates ({ state, commit }, id) {
      commit('SET_LOADING_BED_STATES', true)

      try {
        const response = await api.getBedStates(id)

        commit('SET_SET_BED_STATES', response.data.states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_BED_STATES', false)
      }
    },
    async getDhOnlineHours({ state, commit }, id) {
      commit('SET_LOADING_DH_ONLINE_HOURS', true)

      try {
        const response = await api.getDhOnlineHours({
          id: id,
          timeRange: state.dhOnlineHoursTimeRange
        })

        commit('SET_DH_ONLINE_HOURS', response.data.hours)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DH_ONLINE_HOURS', false)
      }
    },
    async getDryerOnlineHours({ state, commit }, id) {
      commit('SET_LOADING_DRYER_ONLINE_HOURS', true)

      try {
        const response = await api.getDryerOnlineHours({
          id: id,
          timeRange: state.dryerOnlineHoursTimeRange
        })

        commit('SET_DRYER_ONLINE_HOURS', response.data.hours)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DRYER_ONLINE_HOURS', false)
      }
    },
    async getBlowerRunHours({ state, commit }, id) {
      commit('SET_LOADING_BLOWER_RUN_HOURS', true)

      try {
        const response = await api.getBlowerRunHours({
          id: id,
          timeRange: state.blowerRunHoursTimeRange
        })

        commit('SET_BLOWER_RUN_HOURS', response.data.hours)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_BLOWER_RUN_HOURS', false)
      }
    },

    async selectTimeRange({ commit }, key) {
      commit('SET_CURRENT_TIME_KEY', key)
      commit('SET_CURRENT_TIME', key)
    },

    async onTimeRangeChanged({ commit, dispatch, state }, data) {
      switch (state.selectedTimeRangeKey) {
      case 'dh-online-hours':
        commit('SET_DH_ONLINE_HOURS_TIME_RANGE', data)
        dispatch('getDhOnlineHours', data.id)
        break
      case 'dryer-online-hours':
        commit('SET_DRYER_ONLINE_HOURS_TIME_RANGE', data)
        dispatch('getDryerOnlineHours', data.id)
        break
      case 'blower-run-hours':
        commit('SET_BLOWER_RUN_HOURS_TIME_RANGE', data)
        dispatch('getBlowerRunHours', data.id)
        break
      default:
        break
      }
    }
  },

  mutations: {
    SET_LOADING_DRYING_HOPPERS(state, isLoading) { state.loadingDryingHoppers = isLoading },
    SET_LOADING_BED_STATES(state, isLoading) { state.loadingBedStates = isLoading },
    SET_LOADING_DH_ONLINE_HOURS(state, isLoading) { state.loadingDHOnlineHours = isLoading },
    SET_LOADING_DRYER_ONLINE_HOURS(state, isLoading) { state.loadingDryerOnlineHours = isLoading },
    SET_LOADING_BLOWER_RUN_HOURS(state, isLoading) { state.loadingBlowerRunHours = isLoading },

    SET_DRYING_HOPPERS(state, values) { state.dryingHoppers = values },
    SET_SET_BED_STATES(state, values) { state.bedStates = values },
    SET_DH_ONLINE_HOURS(state, values) { state.dhOnlineHours = values },
    SET_DRYER_ONLINE_HOURS(state, values) { state.dryerOnlineHours = values },
    SET_BLOWER_RUN_HOURS(state, values) { state.blowerRunHours = values },

    SET_DH_ONLINE_HOURS_TIME_RANGE(state, data) { state.dhOnlineHoursTimeRange = Object.assign({}, data) },
    SET_DRYER_ONLINE_HOURS_TIME_RANGE(state, data) { state.dryerOnlineHoursTimeRange = Object.assign({}, data) },
    SET_BLOWER_RUN_HOURS_TIME_RANGE(state, data) { state.blowerRunHoursTimeRange = Object.assign({}, data) },

    SET_CURRENT_TIME_KEY(state, key) { state.selectedTimeRangeKey = key },
    SET_CURRENT_TIME(state, key) {
      switch (key) {
      case 'dh-online-hours':
        state.selectedTimeRange = state.dhOnlineHoursTimeRange
        break
      case 'dryer-online-hours':
        state.selectedTimeRange = state.dryerOnlineHoursTimeRange
        break
      case 'blower-run-hours':
        state.selectedTimeRange = state.blowerRunHoursTimeRange
        break
      default:
        break
      }
    }
  }
}

export default module
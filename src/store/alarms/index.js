import alarmAPI from '@/services/api/alarm'
const now = new Date('YYYY-MM-DD')

const module = {
  namespaced: true,
  state: {
    alarmTypes: [],
    alarms: [],
    timeRageOptions: [
      {
        label: 'Last 30 minutes',
        value: 'last30Min'
      },
      {
        label: 'Last hour',
        value: 'lastHour'
      },
      {
        label: 'Last 4 hours',
        value: 'last4Hours'
      },
      {
        label: 'Last 12 hours',
        value: 'last12Hours'
      },
      {
        label: 'Last 24 hours',
        value: 'last24Hours'
      },
      {
        label: 'Last 48 hours',
        value: 'last48Hours'
      },
      {
        label: 'Last 3 days',
        value: 'last3Days'
      },
      {
        label: 'Last 7 days',
        value: 'last7Days'
      },
      {
        label: 'Last 24 days',
        value: 'last24Days'
      },
      {
        label: 'Custom',
        value: 'custom'
      }
    ],
    
    timeRange: 'last24Hours',
    dateFrom: new Date().toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    timeFrom: '00:00',
    timeTo: '00:00',

    isLoading: false
  },

  actions: {
    onAlarmParamChanged({
      commit
    }, data) {
      commit('SET_ALARM_PARAMS', data)
      commit('ALARMS_LOADING')
      alarmAPI.getAlarms(data)
        .then((response) => {
          commit('SET_ALARMS', response.data.alarms)
        })
        .catch((error) => {
          console.log(error.response)
        })
        .finally(() => {
          commit('ALARMS_LOADED')
        })
    }
  },

  mutations: {
    // init alarm types
    SET_ALARM_TYPES(state, types) {
      state.alarmTypes = types
    },

    //set alarms
    SET_ALARMS(state, alarms) {
      state.alarms = alarms
    },

    SET_ALARM_PARAMS(state, params) {
      state.timeRange = params.timeRange
      state.dateFrom = params.dateFrom
      state.dateTo = params.dateTo
      state.timeTo = params.timeTo
      state.timeFrom = params.timeFrom
    },
    
    ALARMS_LOADING(state) {
      state.isLoading = true
    },
    ALARMS_LOADED(state) {
      state.isLoading = false
    }
  },

  getters: {
    timeRangeLabel(state) {
      if (state.timeRange !== 'custom') {
        return state.timeRageOptions.find((range) => range.value === state.timeRange).label
      } else {
        return state.dateFrom + ' ' + state.timeFrom + ' ~ ' + state.dateTo + ' ' + state.timeTo
      }
    }
  }
}

export default module

import alarmAPI from '@/services/api/alarm'
const now = new Date('YYYY-MM-DD')

const module = {
  namespaced: true,
  state: {
    alarmTypes: [],
    alarms: [],
    severity: [],
    alarmsPerType: [],
    alarmsDistribution: [],
    alarmsAmountPerMachine: [],
    dateRange: {},
    selectedMachineName: {},
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
    
    loadingAlarmsTable: false,

    loadingAlarmsPerMachine: false,
    alamrsPerMachine: [],

    timeRange: 'last24Hours',
    dateFrom: new Date().toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    timeFrom: '00:00',
    timeTo: '00:00',

    isLoading: false
  },

  actions: {
    /*
      get alarms for product
    */
    async getProductAlarms({ commit }, productId) {
      commit('SET_LOADING_ALARMS', true)

      try {
        const response = await alarmAPI.getProductAlarms(productId)

        commit('SET_ALARMS', response.data.alarms)
        commit('SET_ALARM_TYPES', response.data.alarm_types)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING_ALARMS', false)
    },

    async onNewAlarms({ state, commit }, data) {
      const alarmTypesForTag = state.alarmTypes.filter((alarmType) => {
        return alarmType.tag_id === data.tagId
      })

      alarmTypesForTag.forEach((alarmType) => {
        for (let i = state.alarms.length - 1; i >= 0; i--) {
          if (state.alarms[i].type_id === alarmType.id) {
            commit('UPDATE_ALARMS', { i, data, alarmType })
            break
          }
        }
      })
    },

    /*
      Get alarms by machine
    */
    async getAlarmsByMachine({ commit }) {
      commit('SET_LOADING_ALARMS_PER_MACHINE', true)
      
      try {
        const response = await alarmAPI.getAlarmsByMachine()

        commit('SET_ALARMS_PER_MACHINE', response.data.devices)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING_ALARMS_PER_MACHINE', false)
    },

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
    },
    getCorrespondingAlarmTypes({
      commit
    }, machine_id) {
      return alarmAPI.getCorrespondingAlarmTypes(machine_id)
        .then((response) => {
          commit('SET_ALARM_TYPES', response.data.alarm_types)
        })
        .catch((error) => {
          console.log(error.response)
        })
        .finally(() => {
          
        })
    },
    getAlarmsByCompanyId({
      commit
    }, company_id) {
      return alarmAPI.getAlarmsByCompanyId(company_id)
        .then((response) => {
          commit('SET_ALARMS', response.data.alarms)
        })
    },
    getSeverityByCompanyId({
      commit
    }, data ) {
      return alarmAPI.getSeverityByCompanyId(data)
        .then((response) => {
          commit('SET_SEVERITY', response.data.severity)
        })
    },
    getAlarmsPerTypeByMachine({
      commit,
      state
    }, data ) {
      if (data.machine_name) {
        commit('SET_SELECTED_MACHINE_NAME', {
          type: 'Alarms Per Type',
          selectedMachineName: data.machine_name
        })
      } else {
        data.machine_name = state.selectedMachineName['Alarms Per Type']
      }

      return alarmAPI.getAlarmsPerTypeByMachine(data)
        .then((response) => {
          commit('SET_ALARMS_PER_TYPE', response.data.alarms)
        })
    },
    getAlarmsDistributionByMachine({
      commit,
      state
    }, data ) {
      if (data.machine_name) {
        commit('SET_SELECTED_MACHINE_NAME', {
          type: 'Alarms Distribution',
          selectedMachineName: data.machine_name
        })
      } else {
        data.machine_name = state.selectedMachineName['Alarms Distribution']
      }
      
      return alarmAPI.getAlarmsDistributionByMachine(data)
        .then((response) => {
          commit('SET_ALARMS_DISTRIBUTION', response.data.results)
        })
    },
    getAlarmsAmountPerMachineByCompanyId({
      commit
    }, data ) {
      return alarmAPI.getAlarmsAmountPerMachineByCompanyId(data)
        .then((response) => {
          commit('SET_ALARMS_AMOUNT_PER_MACHINE', response.data.results)
        })
    },
    setDateRange({
      commit
    }, {
      type,
      dates
    }) {
      return commit('SET_DATE_RANGE', {
        type,
        dates
      })
    }
  },

  mutations: {
    SET_ALARMS_PER_MACHINE(state, alamrsPerMachine) {
      state.alamrsPerMachine = alamrsPerMachine
    },

    // init alarm types
    SET_ALARM_TYPES(state, types) {
      state.alarmTypes = types
    },

    //set alarms
    SET_ALARMS(state, alarms) {
      state.alarms = alarms
    },

    UPDATE_ALARMS(state, alarmData) {
      const [value32] = alarmData.data.values

      state.alarms[alarmData.i].timestamp = alarmData.data.timestamp * 1000
      state.alarms[alarmData.i].active = alarmData.alarmType.bytes === 0 ? value32 : (value32 >> alarmData.alarmType.offset) & alarmData.alarmType.bytes
    },

    SET_LOADING_ALARMS(state, data) {
      state.loadingAlarmsTable = data
    },

    SET_LOADING_ALARMS_PER_MACHINE(state, data) {
      state.loadingAlarmsPerMachine = data
    },

    SET_ALARMS_AMOUNT_PER_MACHINE(state, alarmsAmountPerMachine) {
      state.alarmsAmountPerMachine = alarmsAmountPerMachine
    },

    SET_ALARMS_DISTRIBUTION(state, alarmsDistribution) {
      state.alarmsDistribution = alarmsDistribution
    },

    SET_ALARMS_PER_TYPE(state, alarmsPerType) {
      state.alarmsPerType = alarmsPerType
    },

    SET_SEVERITY(state, severity) {
      state.severity = severity
    },

    SET_DATE_RANGE(state, data) {
      state.dateRange[data.type] = data.dates
    },

    SET_SELECTED_MACHINE_NAME(state, data) {
      state.selectedMachineName[data.type] = data.selectedMachineName
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

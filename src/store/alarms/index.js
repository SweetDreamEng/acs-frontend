import alarmAPI from '../../services/api/alarm'
const now = new Date('YYYY-MM-DD')
const dateTimeIsoString = new Date().toISOString().substr(0, 10)

const module = {
  namespaced: true,
  state: {
    severity: [],
    alarmsPerType: [],
    alarmsDistribution: [],
    alarmsAmountPerMachine: [],
    dateRange: {},
    selectedMachineName: {},
    isAlarmsReportLoading: false,
    alarmsReports: {},
    alarmsCount: 0,
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

    alarmsPerCustomerAndMachine: [],
    alarmsOverview: null,

    loadingAlarmsPerMachine: false,
    alamrsPerMachine: [],

    timeRange: 'last24Hours',
    dateFrom: dateTimeIsoString,
    dateTo: dateTimeIsoString,
    timeFrom: '00:00',
    timeTo: '00:00',

    isLoading: false
  },

  actions: {
    async getAlarmsOverview({ commit }, data) {
      try {
        const response = await alarmAPI.getAlarmsOverview(data)

        commit('SET_ALARMS_OVERVIEW', response)
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async getAlarmsByCustomerAndConfiguration({ commit }, data) {
      try {
        const response = await alarmAPI.getAlarmsByCustomerAndConfiguration(data)

        commit('SET_ALARMS_PER_CUSTOMER_CONFIGURATION', response.alarm_types)
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async getAlarmsByMachine({ commit }) {
      commit('SET_LOADING_ALARMS_PER_MACHINE', true)
      
      try {
        const response = await alarmAPI.getAlarmsByMachine()

        commit('SET_ALARMS_PER_MACHINE', response.devices)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING_ALARMS_PER_MACHINE', false)
    },

    async onAlarmParamChanged({ commit }, data) {
      commit('SET_ALARM_PARAMS', data)
      commit('ALARMS_LOADING')
      try {
        const response = await alarmAPI.getAlarms(data)

        commit('SET_ALARMS', response.alarms)
        commit('ALARMS_LOADED')
      } catch (error) {
        console.log(error)
      }
    },

    async getCorrespondingAlarmTypes({ commit }, machine_id) {
      try {
        const response = await alarmAPI.getCorrespondingAlarmTypes(machine_id)

        commit('SET_ALARM_TYPES', response.alarm_types)
      } catch (error) {
        console.log(error)
      }
    },

    async getAlarmsByCompanyId({ commit }, company_id) {
      try {
        const response = await alarmAPI.getAlarmsByCompanyId(company_id)

        commit('SET_ALARMS', response.alarms)
      } catch (error) {
        console.log(error)
      }
    },

    async getSeverityByCompanyId({ commit }, data ) {
      try {
        const response = await alarmAPI.getSeverityByCompanyId(data)

        commit('SET_SEVERITY', response.severity)
      } catch (error) {
        console.log(error)
      }
    },

    async getAlarmsPerTypeByMachine({ commit, state }, data ) {
      if (data.machine_name) {
        commit('SET_SELECTED_MACHINE_NAME', {
          type: 'Alarms Per Type',
          selectedMachineName: data.machine_name
        })
      } else {
        data.machine_name = state.selectedMachineName['Alarms Per Type']
      }

      try {
        const response = await alarmAPI.getAlarmsPerTypeByMachine(data)

        commit('SET_ALARMS_PER_TYPE', response.alarms)
      } catch (error) {
        console.log(error)
      }
    },

    async getAlarmsDistributionByMachine({ commit, state }, data ) {
      if (data.machine_name) {
        commit('SET_SELECTED_MACHINE_NAME', {
          type: 'Alarms Distribution',
          selectedMachineName: data.machine_name
        })
      } else {
        data.machine_name = state.selectedMachineName['Alarms Distribution']
      }
      
      try {
        const response = await alarmAPI.getAlarmsDistributionByMachine(data)

        commit('SET_ALARMS_DISTRIBUTION', response.results)
      } catch (error) {
        console.log(error)
      }
    },

    async getAlarmsAmountPerMachineByCompanyId({ commit }, data ) {
      try {
        const response = await alarmAPI.getAlarmsAmountPerMachineByCompanyId(data)
        
        commit('SET_ALARMS_AMOUNT_PER_MACHINE', response.results)
      } catch (error) {
        console.log(error)
      }
    },

    async getAlarmsReports({ commit }, data) {
      commit('SET_ALARMS_REPORTS_LOADING', true)
      try {
        const response = await alarmAPI.getAlarmsReports(data)

        commit('SET_ALARMS_REPORTS', response)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_ALARMS_REPORTS_LOADING', false)
      }
    },

    setDateRange({ commit }, { type, dates }) {
      return commit('SET_DATE_RANGE', {
        type,
        dates
      })
    }
  },

  mutations: {
    SET_ALARMS_OVERVIEW(state, data) {
      state.alarmsOverview = data
    },

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

    SET_LOADING_ALARMS(state, data) {
      state.loadingAlarmsTable = data
    },

    SET_LOADING_TCU_ALARMS(state, data) {
      state.loadingTcuAlarmsTable = data
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
    },

    SET_ALARMS_PER_CUSTOMER_CONFIGURATION(state, types) { state.alarmsPerCustomerAndMachine = types },

    SET_ALARMS_REPORTS_LOADING(state, status) {
      state.isAlarmsReportLoading = status
    },

    SET_ALARMS_REPORTS(state, data) {
      state.alarmsReports = data.activeAlarms
      state.alarmsCount = data.alarmsCount
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

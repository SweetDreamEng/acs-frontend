export default () => ({
  SET_LOADING: (state, loading) => {
    state.loadingAlarmsTable = loading
  },

  SET_ALARM_TYPES(state, types) {
    state.alarmTypes = types
  },

  SET_ALARMS(state, alarms) {
    state.alarms = alarms
  }
})

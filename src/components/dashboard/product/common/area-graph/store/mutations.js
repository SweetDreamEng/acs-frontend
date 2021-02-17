export default () => ({
  SET_LOADING: (state, loading) => {
    state.isLoading = loading
  },
  LOADED: (state, data) => {
    state.items = data.items
    state.isImperial = data.isImperial
    state.isLoading = false
  },
  SET_TIME_RANGE: (state, payload) => {
    state.timeRange = payload
  }
})

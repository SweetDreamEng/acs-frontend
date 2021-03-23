export default () => ({
  SET_LOADING: (state, loading) => {
    state.isLoading = loading
  },
  LOADED: (state, overview) => {
    state.overview = overview
    state.isLoading = false
    state.isSavedMachine = overview.isSavedMachine
  },
  SET_SAVED_MACHINE_STATUS: (state, status) => {
    state.isSavedMachine = status
  }
})

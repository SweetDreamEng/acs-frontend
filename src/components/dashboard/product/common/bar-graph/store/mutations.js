export default () => ({
  SET_LOADING: (state, loading) => {
    state.isLoading = loading
  },
  LOADED: (state, data) => {
    state.items = data.items
    state.unit = data.unit
    state.isLoading = false
  }
})

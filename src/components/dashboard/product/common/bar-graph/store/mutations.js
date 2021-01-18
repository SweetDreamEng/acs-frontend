export default () => ({
  SET_LOADING: (state, loading) => {
    state.isLoading = loading
  },
  LOADED: (state, items) => {
    state.items = items
    state.isLoading = false
  }
})

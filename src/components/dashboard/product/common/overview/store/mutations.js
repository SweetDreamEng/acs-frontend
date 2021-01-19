export default () => ({
  SET_LOADING: (state, loading) => {
    state.isLoading = loading
  },
  LOADED: (state, overview) => {
    state.overview = overview
    state.isLoading = false
  }
})

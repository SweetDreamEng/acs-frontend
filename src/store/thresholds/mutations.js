export default {
  SET_GET_MACHINE_TAGS_LOADING(state, status) { state.isLoadingMachineTags = status },
  SET_MACHINE_TAGS(state, data) { state.machineTags = data },
  SET_LOADING(state, status) { state.loading = status }
}
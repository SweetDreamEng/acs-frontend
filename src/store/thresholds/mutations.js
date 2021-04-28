export default {
  SET_GET_MACHINE_TAGS_LOADING(state, status) { state.isLoadingMachineTags = status },
  SET_MACHINE_TAGS(state, data) { state.machineTags = data },
  SET_LOADING(state, status) { state.loading = status },
  SET_THRESHOLDS(state, data) { state.thresholds = data },
  SET_CHANGING_STATUS(state, status) { state.buttonLoading = status },
  SET_DELETE_LOADING(state, status) { state.isThresholdDeleting = status },
  SET_UPDATE_LOADING(state, status) { state.isThresholdUpdating = status }
}

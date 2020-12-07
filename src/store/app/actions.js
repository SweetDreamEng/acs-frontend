const showToast = ({ state, commit }, message) => {
  if (state.toast.show) commit('hideToast')

  setTimeout(() => {
    commit('showToast', {
      color: 'black',
      message,
      timeout: 3000
    })
  })
}

const showError = ({ state, commit }, { message = 'Failed!', error }) => {
  if (state.toast.show) commit('hideToast')

  setTimeout(() => {
    commit('showToast', {
      icon: 'mdi-alert',
      color: 'error',
      message: message + ' ' + error.message,
      timeout: 3000
    })
  })
}

const showSuccess = ({ state, commit }, message) => {
  if (state.toast.show) commit('hideToast')

  setTimeout(() => {
    commit('showToast', {
      icon: 'mdi-check-circle',
      color: 'success',
      message,
      timeout: 3000
    })
  })
}

export default {
  showToast,
  showError,
  showSuccess
}

import thresholdAPI from '../../services/api/thresholds'
import machineAPI from '../../services/api/machine'

const getMachineTags = async({ commit }, payload) => {
  commit('SET_GET_MACHINE_TAGS_LOADING', true)
  try {
    const response = await machineAPI.getMachineTags(payload)

    commit('SET_MACHINE_TAGS', response.tags[0].tags)
  } catch (error) {
    throw new Error(error)
  } finally {
    commit('SET_GET_MACHINE_TAGS_LOADING', false)
  }
}

const addThreshold = async({ commit, dispatch }, payload) => {
  commit('SET_LOADING', true)
  try {
    const response = await thresholdAPI.addThreshold(payload)

    if (response.status === 'success') {
      dispatch('app/showSuccess', response.message, { root: true })
    } 

    if (response.status === 'fail') {
      dispatch('app/showError', response.message, { root: true })
    }

  } catch (error) {
    throw new Error(error)
  } finally {
    commit('SET_LOADING', false)
  }
}

const getThresholds = async({ commit }) => {
  commit('SET_LOADING', true)
  try {
    const response = await thresholdAPI.getThresholds()

    commit('SET_THRESHOLDS', response.conditions)
  } catch (error) {
    throw new Error(error)
  } finally {
    commit('SET_LOADING', false)
  }
}

const changeThresholdStatus = async({ commit }, payload) => {
  commit('SET_LOADING', true)
  try {
    const response = await thresholdAPI.changeThresholdStatus(payload)
  } catch (error) {
    throw new Error(error)
  } finally {
    commit('SET_LOADING', false)
  }
}

const deleteThreshold = async({ commit, dispatch }, payload) => {
  commit('SET_DELETE_LOADING', true)
  try {
    const response = await thresholdAPI.deleteThreshold(payload)

    if (response.status) {
      dispatch('app/showSuccess', response.message, { root: true })
    } else {
      dispatch('app/showError', response.message, { root: true })
    }
  } catch (error) {
    throw new Error(error)
  } finally {
    commit('SET_DELETE_LOADING', false)
  }
}

const updateThreshold = async({ commit, dispatch }, payload) => {
  commit('SET_UPDATE_LOADING', true)
  try {
    const response = await thresholdAPI.updateThreshold(payload)

    dispatch('app/showSuccess', response.message, { root: true })

  } catch (error) {
    throw new Error(error)
  } finally {
    commit('SET_UPDATE_LOADING', false)
  }
}

export default {
  getMachineTags,
  addThreshold,
  getThresholds,
  changeThresholdStatus,
  deleteThreshold,
  updateThreshold
}
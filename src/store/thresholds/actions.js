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

    dispatch('app/showSuccess', response.message, { root: true })

  } catch (error) {
    throw new Error(error)
  } finally {
    commit('SET_LOADING', false)
  }
}

export default {
  getMachineTags,
  addThreshold
}
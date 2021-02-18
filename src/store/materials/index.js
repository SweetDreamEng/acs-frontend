import api from '../../services/api/material'

const module = {
  namespaced: true,
  state: {
    loadingMaterials: false,
    savingMaterial: false,
    data: []
  },

  actions: {
    async getMaterials ({ commit }, payload = {} ) {
      commit('SET_LOADING_MATERIALS', true)

      try {
        const response = await api.getMaterials(payload)

        commit('SET_DATA', response.materials)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING_MATERIALS', false)
    },

    async addMaterial ({ commit, dispatch }, payload) {
      commit('SET_SAVING_MATERIAL', true)

      try {
        const response = await api.addMaterial(payload)

        dispatch('app/showSuccess', response.data, { root: true })
      } catch (error) {
        dispatch('app/showError', {
          error
        }, { root: true })

        throw error
      } finally {
        commit('SET_SAVING_MATERIAL', false)
      }
    },

    async updateMaterial ({ commit, dispatch }, payload) {
      commit('SET_SAVING_MATERIAL', true)

      try {
        const response = await api.updateMaterial(payload)

        dispatch('app/showSuccess', response.data, { root: true })
      } catch (error) {
        dispatch('app/showError', {
          error
        }, { root: true })

        throw error
      } finally {
        commit('SET_SAVING_MATERIAL', false)
      }
    },

    async deleteMaterial ({ commit, dispatch }, payload) {
      commit('SET_SAVING_MATERIAL', true)

      try {
        const response = await api.deleteMaterial(payload)

        dispatch('app/showSuccess', response.data, { root: true })
      } catch (error) {
        dispatch('app/showError', {
          error
        }, { root: true })

        throw error
      } finally {
        commit('SET_SAVING_MATERIAL', false)
      }
    }
  },

  mutations: {
    SET_DATA(state, materials) { state.data = materials },
    SET_LOADING_MATERIALS(state, loading) { state.loadingMaterials = loading },
    SET_SAVING_MATERIAL(state, saving) { state.savingMaterial = saving }
  }
}

export default module
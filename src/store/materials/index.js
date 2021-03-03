import api from '../../services/api/material'

const module = {
  namespaced: true,
  state: {
    loadingMaterials: false,
    loadingMaterialLocations: false,
    savingMaterial: false,
    savingMaterialLocation: false,
    data: [],
    materialLocations: [],

    loadingReport: false,
    report: {
      start: 0,
      stop: 0,
      reportItems: []
    },

    loadingTrack: false,
    blenders: [],
    tracks: []
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

        dispatch('app/showSuccess', response, { root: true })
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

        dispatch('app/showSuccess', response, { root: true })
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

        dispatch('app/showSuccess', response, { root: true })
      } catch (error) {
        dispatch('app/showError', {
          error
        }, { root: true })

        throw error
      } finally {
        commit('SET_SAVING_MATERIAL', false)
      }
    },

    async getMaterialLocations ({ commit }, payload = {} ) {
      commit('SET_LOADING_MATERIAL_LOCATIONS', true)

      try {
        const response = await api.getMaterialLocations(payload)

        commit('SET_MATERIAL_LOCATIONS', response.locations)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING_MATERIAL_LOCATIONS', false)
    },

    async addMaterialLocation ({ commit, dispatch }, payload) {
      commit('SET_SAVING_MATERIAL_LOCATION', true)

      try {
        const response = await api.addMaterialLocation(payload)

        dispatch('app/showSuccess', response, { root: true })
      } catch (error) {
        dispatch('app/showError', {
          error
        }, { root: true })

        throw error
      } finally {
        commit('SET_SAVING_MATERIAL_LOCATION', false)
      }
    },

    async updateMaterialLocation ({ commit, dispatch }, payload) {
      commit('SET_SAVING_MATERIAL_LOCATION', true)

      try {
        const response = await api.updateMaterialLocation(payload)

        dispatch('app/showSuccess', response, { root: true })
      } catch (error) {
        dispatch('app/showError', {
          error
        }, { root: true })

        throw error
      } finally {
        commit('SET_SAVING_MATERIAL_LOCATION', false)
      }
    },

    async deleteMaterialLocation ({ commit, dispatch }, payload) {
      commit('SET_SAVING_MATERIAL_LOCATION', true)

      try {
        const response = await api.deleteMaterialLocation(payload)

        dispatch('app/showSuccess', response, { root: true })
      } catch (error) {
        dispatch('app/showError', {
          error
        }, { root: true })

        throw error
      } finally {
        commit('SET_SAVING_MATERIAL_LOCATION', false)
      }
    },

    async getTracks ({ commit, dispatch }, payload) {
      commit('SET_LOADING_TRACKS', true)

      try {
        const response = await api.getTracks(payload)

        commit('SET_TRACKS', response)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit('SET_LOADING_TRACKS', false)
      }
    },

    async getReport ({ commit, dispatch }, payload) {
      commit('SET_LOADING_REPORT', true)

      try {
        const response = await api.getReport(payload)

        commit('SET_REPORT', response.report)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit('SET_LOADING_REPORT', false)
      }
    }
  },

  mutations: {
    SET_DATA(state, materials) { state.data = materials },
    SET_LOADING_MATERIALS(state, loading) { state.loadingMaterials = loading },
    SET_SAVING_MATERIAL(state, saving) { state.savingMaterial = saving },
    SET_LOADING_REPORT(state, loading) { state.loadingReport = loading },
    SET_LOADING_TRACKS(state, loading) { state.loadingTrack = loading },

    SET_MATERIAL_LOCATIONS(state, locations) { state.materialLocations = locations },
    SET_LOADING_MATERIAL_LOCATIONS(state, loading) { state.loadingMaterialLocations = loading },
    SET_SAVING_MATERIAL_LOCATION(state, saving) { state.savingMaterialLocation = saving },
    SET_REPORT(state, report) { state.report = report },
    SET_TRACKS(state, data) {
      state.tracks = data.tracks
      state.blenders = data.devices
    }
  }
}

export default module
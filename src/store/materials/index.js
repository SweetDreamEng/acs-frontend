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

    loadingReports: false,
    reports: [],

    systemInventoryReports: [],

    loadingBlenders: false,
    blenders: [],

    deletingReport: false,
    exportingReport: false
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

    async getBlenders ({ commit, dispatch }, payload) {
      commit('SET_LOADING_BLENDERS', true)

      try {
        const response = await api.getBlenders(payload)

        commit('SET_BLENDERS', response)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit('SET_LOADING_BLENDERS', false)
      }
    },

    async getReport ({ commit, dispatch }, payload) {
      commit('SET_LOADING_REPORTS', true)

      try {
        const response = await api.getReport(payload)

        commit('SET_REPORTS', response.tracks)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit('SET_LOADING_REPORTS', false)
      }
    },

    async deleteReport ({ commit, dispatch }, payload) {
      commit('SET_DELETING_REPORT', true)

      try {
        const response = await api.deleteReport(payload)

        dispatch('app/showSuccess', response, { root: true })
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit('SET_DELETING_REPORT', false)
      }
    },

    async exportReport ({ commit, dispatch }, payload) {
      commit('SET_EXPORTING_REPORT', true)

      try {
        const response = await api.exportReport(payload)

        return response
      } catch (error) {
        dispatch('app/showError', {
          'message': 'Exporting report failed'
        }, { root: true })

        throw error
      } finally {
        commit('SET_EXPORTING_REPORT', false)
      }
    },

    async getSystemInventoryReport ({ commit, dispatch }, payload) {
      commit('SET_LOADING_REPORTS', true)

      try {
        const response = await api.getSystemInventoryReport(payload)

        commit('SET_SYSTEM_INVENTORY_REPORTS', Object.keys(response.keyed_materials).map((r) => response.keyed_materials[r]))
      } catch (error) {
        dispatch('app/showError', {
          message: 'Failed: ',
          error: { message: error }
        }, { root: true })

        console.log(error)
        throw error
      } finally {
        commit('SET_LOADING_REPORTS', false)
      }
    },

    async exportSystemInventoryReport ({ commit, dispatch }, payload) {
      commit('SET_EXPORTING_REPORT', true)

      try {
        const response = await api.exportSystemInventoryReport(payload)

        return response
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit('SET_EXPORTING_REPORT', false)
      }
    }
  },

  mutations: {
    SET_DATA(state, materials) { state.data = materials },
    SET_LOADING_MATERIALS(state, loading) { state.loadingMaterials = loading },
    SET_SAVING_MATERIAL(state, saving) { state.savingMaterial = saving },
    SET_LOADING_REPORTS(state, loading) { state.loadingReports = loading },
    SET_LOADING_BLENDERS(state, loading) { state.loadingBlenders = loading },
    SET_DELETING_REPORT(state, deleting) { state.deletingReport = deleting },
    SET_EXPORTING_REPORT(state, exporting) { state.exportingReport = exporting },

    SET_MATERIAL_LOCATIONS(state, locations) { state.materialLocations = locations },
    SET_LOADING_MATERIAL_LOCATIONS(state, loading) { state.loadingMaterialLocations = loading },
    SET_SAVING_MATERIAL_LOCATION(state, saving) { state.savingMaterialLocation = saving },
    SET_REPORTS(state, reports) { state.reports = reports },
    SET_SYSTEM_INVENTORY_REPORTS(state, reports) { state.systemInventoryReports = reports },
    SET_BLENDERS(state, data) {
      state.blenders = data.blenders
    }
  }
}

export default module

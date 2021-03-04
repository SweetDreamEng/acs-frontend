import api from '@/api.js'
export default {
  /**
  * Get materials
  *
  * @example
  *
  *     getMaterials({})
  */
  getMaterials(payload) {
    const queryString = Object.keys(payload).map((k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(payload[k])
    }).join('&')

    return api.$get(`/materials?${queryString}`)
  },

  /**
  * Add a new material
  *
  * @param {Object} data for a new material
  * @example
  *
  *     addMaterial(user)
  */
  addMaterial(payload) {
    return api.$post('/materials', payload)
  },

  /**
  * Update selected material
  *
  * @param {Object} data for material
  * @example
  *
  *     updateMaterial(payload)
  */
  updateMaterial(payload) {
    return api.$put(`/materials/${payload.id}`, payload)
  },

  /**
  * Delete selected material
  *
  * @param {Object} data for material
  * @example
  *
  *     deleteMaterial(payload)
  */
  deleteMaterial(payload) {
    return api.$delete(`/materials/${payload.id}`)
  },

  /**
  * Get locations
  *
  * @example
  *
  *     getMaterialLocations({})
  */
  getMaterialLocations(payload) {
    const queryString = Object.keys(payload).map((k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(payload[k])
    }).join('&')

    return api.$get(`/material-locations?${queryString}`)
  },

  /**
  * Add a new location
  *
  * @param {Object} data for a new location
  * @example
  *
  *     addMaterialLocation(user)
  */
  addMaterialLocation(payload) {
    return api.$post('/material-locations', payload)
  },

  /**
  * Update selected location
  *
  * @param {Object} data for location
  * @example
  *
  *     updateMaterialLocation(payload)
  */
  updateMaterialLocation(payload) {
    return api.$put(`/material-locations/${payload.id}`, payload)
  },

  /**
  * Delete selected location
  *
  * @param {Object} data for location
  * @example
  *
  *     deleteMaterialLocation(payload)
  */
  deleteMaterialLocation(payload) {
    return api.$delete(`/material-locations/${payload.id}`)
  },

  /**
  * Get all blenders
  *
  * @example
  *
  *     getBlenders(payload)
  */
  getBlenders(payload) {
    return api.$post('/materials/blenders', payload)
  },

  /**
  * Get material report
  *
  * @param {Object} data for location
  * @example
  *
  *     getReport(payload)
  */
  getReport(payload) {
    return api.$post('/materials/report', payload)
  },

  /**
  * Delete report
  *
  * @example
  *
  *     deleteReport(payload)
  */
  deleteReport(payload) {
    return api.$delete(`/materials/report/${payload.id}`, payload)
  },

  /**
  * Export report
  *
  * @example
  *
  *     exportReport(payload)
  */
  exportReport(payload) {
    return api.$post('/materials/export', payload)
  }
}
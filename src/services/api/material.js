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
  }
}
import api from '@/api.js'
export default {
  /**
  * Get all configurations
  * Each configuration has full json
  *
  * @example
  *
  *     getConfigurations()
  */
  getConfigurations() {
    return api.$get('/configurations')
  },

  /**
  * Get existing configuration
  *
  * @param {number} id The configuration id
  * @example
  *
  *     getConfiguration(1)
  */
  getConfiguration(id) {
    return api.$get(`/configurations/${id}`)
  },

  /**
  * Update a configuration - mainly name and full json
  *
  * @param {Object} configuration Configuration object
  * @param {string} configuration.id Configuration id
  * @param {string} configuration.name Configuration name
  * @param {string} configuration.new_json Json data for Configuration
  * @example
  *
  *     saveConfiguration({
  *       name: 'BD Batch Blender',
  *       new_json: ${full_plc_json_for_the_machine}
  *     })
  */
  saveConfiguration(configuration) {
    return api.$patch(`/configurations/${configuration.id}`, configuration)
  }
}

import api from '@/api.js'
export default {
  /**
  * Get colors from www.colorfyit.com
  *
  * @param {string} url
  * @example
  *
  *     grabColors({
  *       url: 'upwork.com'
  *     })
  */
  grabColors(data) {
    return api.$post('/app-settings/grab-colors', data)
  },

  /**
  * Set website colors used in the theme
  *
  * @param {Object} colors
  * @example
  *
  *     applyWebsiteColors(colors)
  */
  applyWebsiteColors(data) {
    return api.$post('/app-settings/website-colors', data)
  },

  /**
  * Get website settings
  *
  * @example
  *
  *     getSetting()
  */
  getSetting(data) {
    return api.$post('/app-settings/get-setting', data)
  },

  /**
  * Update backgraound image in auth page
  *
  * @example
  *
  *     updateAuthBackground()
  */
  updateAuthBackground() {
    return api.$post('/app-settings/update-auth-background')
  },

  /**
  * Upload a new logo
  * @param {Object} form object of logo file
  *
  * @example
  *
  *     uploadLogo({
  *       logo
  *     })
  */
  uploadLogo(data) {
    return api.$post('/app-settings/upload-logo', data)
  },

  /**
  * Reset website settings
  *
  * @example
  *
  *     resetSettings()
  */
  resetSettings() {
    return api.$post('/app-settings/reset')
  }
}

import settingAPI from '../../services/api/setting'
import vuetify from '../../plugins/vuetify'

const module = {
  namespaced: true,
  state: {
    privateColors: null,
    colors: [],
    basicColors: {},
    error: null,
    loading: true,
    buttonLoading: null,
    logoFile: null,
    authBackgroundFile: null,

    logoFilePath: '',
    uploadingLogo: false,
    uploadingImage: false
  },

  actions: {
    async grabColors({
      commit
    }, url) {
      commit('BUTTON_LOAD', 'SUBMIT')
      try {
        const response = await settingAPI.grabColors({ url })

        commit('SET_COLORS', response.colors)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
    },

    async resetSettings({
      commit
    }) {
      commit('BUTTON_LOAD', 'RESET')

      try {
        const response = await settingAPI.resetSettings()
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async setInitialSetting({
      commit
    }) {
      try {
        let response = await settingAPI.getSetting()

        response = response.value

        // const privateColors = response.filter((data) => data.type.includes('private_color'))

        // if (privateColors.length) {
        //   const colors = []

        //   for (let i = 0; i < privateColors.length; i++) {
        //     colors.push(privateColors[i]['value'])
        //   }
        //   commit('SET_PRIVATE_COLORS', colors)
        // } else {
        //   commit('SET_PRIVATE_COLORS', ['#092954'])
        // }
        const primaryColor = response.find((colorItem) => colorItem.type === 'color_primary')
        const secondaryColor = response.find((colorItem) => colorItem.type === 'color_secondary')
        const accentColor = response.find((colorItem) => colorItem.type === 'color_accent')
        const surfaceColor = response.find((colorItem) => colorItem.type === 'color_surface')
        const backgroundColor = response.find((colorItem) => colorItem.type === 'color_background')

        commit('SET_COLOR_SETTINGS', {
          'color_primary': primaryColor ? primaryColor.value : '#ffffff',
          'color_secondary': secondaryColor ? secondaryColor.value : '#ffffff',
          'color_accent': accentColor ? accentColor.value : '#ffffff',
          'color_surface': surfaceColor ? surfaceColor.value : '#ffffff',
          'color_background': backgroundColor ? backgroundColor.value : '#ffffff'
        })

        vuetify.framework.theme.themes.light.background = backgroundColor ? backgroundColor.value : '#ffffff'
        vuetify.framework.theme.themes.light.primary = primaryColor ? primaryColor.value : '#ffffff'
        vuetify.framework.theme.themes.light.secondary = secondaryColor ? secondaryColor.value : '#ffffff'
        vuetify.framework.theme.themes.light.accent = accentColor ? accentColor.value : '#ffffff'
        vuetify.framework.theme.themes.light.surface = surfaceColor ? surfaceColor.value : '#ffffff'

        let authBackgroundFile = response.filter((data) => data.type.includes('auth_background_filepath'))

        if (authBackgroundFile.length) {
          authBackgroundFile = authBackgroundFile[0]['value']
          commit('SET_AUTH_BACKGROUND_FILE', authBackgroundFile)
        } else {
          commit('SET_AUTH_BACKGROUND_FILE', false)
        }

        let logoFile = response.filter((data) => data.type.includes('logo_filepath'))
        let imageFile = response.filter((data) => data.type.includes('image_filepath'))

        if (logoFile.length) {
          logoFile = logoFile[0]['value']
          commit('SET_LOGO_FILE', logoFile)
        } else {
          commit('SET_LOGO_FILE', false)
        }

        if (imageFile.length) {
          imageFile = imageFile[0]['value']
          commit('SET_IMAGE_FILE', imageFile)
        } else {
          commit('SET_IMAGE_FILE', false)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async applyWebsiteColors({
      commit, dispatch
    }, {
      colors
    }) {
      commit('BUTTON_LOAD', 'APPLY')
      try {
        const response = await settingAPI.applyWebsiteColors({ colors })

        vuetify.framework.theme.themes.light.background = colors[0].color
        vuetify.framework.theme.themes.light.primary = colors[1].color
        vuetify.framework.theme.themes.light.secondary = colors[2].color
        vuetify.framework.theme.themes.light.accent = colors[3].color
        vuetify.framework.theme.themes.light.surface = colors[4].color

        dispatch('app/showSuccess', response.message, { root: true })
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async uploadLogo({
      commit
    }, {
      formData
    }) {
      commit('SET_LOGO_UPLOADING', true)

      try {
        const response = await settingAPI.uploadLogo(formData)

        commit('SET_LOGO_FILE', response.filepath)
      } catch (error) {
        console.log(error.response)
      }

      commit('SET_LOGO_UPLOADING', false)
    },
    async uploadImage({
      commit
    }, {
      formData
    }) {
      commit('SET_IMAGE_UPLOADING', true)

      try {
        const response = await settingAPI.uploadImage(formData)

        commit('SET_IMAGE_FILE', response.filepath)
      } catch (error) {
        console.log(error.response)
      }

      commit('SET_IMAGE_UPLOADING', false)
    },
    async setPageTitle({
      commit
    }, pageTitle
    ) {
      // commit('BUTTON_LOAD', 'PAGE_TITLE')
      console.log(pageTitle)
      // try {
      //   const response = await settingAPI.setPageTitle({ pageTitle })

      // } catch (error) {
      //   console.log(error.response)
      // } finally {
      //   commit('BUTTON_CLEAR')
      // }
    },
    async setProductInfo({
      commit
    }, { productName, productVersion }
    ) {
      console.log(productName, productVersion)
    },

    async updateAuthBackground({
      commit
    }) {
      try {
        const response = await settingAPI.updateAuthBackground()

        commit('SET_AUTH_BACKGROUND_FILE', response.filepath)
      } catch (error) {
        console.log('error', error)
      }
    }
  },

  mutations: {
    // Set basic app settings
    SET_APP_SETTINGS(state, data) {
      state.logoFilePath = data.logo
    },

    BUTTON_LOAD(state, button) {
      state.buttonLoading = button
    },
    BUTTON_CLEAR(state) {
      state.buttonLoading = false
    },
    SET_COLORS(state, colors) {
      state.colors = colors
    },
    SET_PRIVATE_COLORS(state, privateColors) {
      state.privateColors = privateColors
    },
    SET_COLOR_SETTINGS(state, colors) {
      state.basicColors = colors
    },
    SET_LOGO_FILE(state, filepath) {
      state.logoFile = filepath
    },
    SET_IMAGE_FILE(state, filepath) {
      state.imageFile = filepath
    },
    SET_AUTH_BACKGROUND_FILE(state, filepath) {
      state.authBackgroundFile = filepath
    },
    SET_LOGO_UPLOADING(state, value) {
      state.uploadingLogo = value
    },
    SET_IMAGE_UPLOADING(state, value) {
      state.uploadingImage = value
    }
  }
}

export default module

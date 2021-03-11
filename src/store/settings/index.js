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
    uploadingImage: false,
    productName: '',
    productVersion: '',
    pageTitle: ''
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

        if (logoFile.length) {
          logoFile = logoFile[0]['value']
          commit('SET_LOGO_FILE', logoFile)
        } else {
          commit('SET_LOGO_FILE', false)
        }

        let pageTitle = response.filter((data) => data.type.includes('page_title'))

        if (pageTitle.length) {
          pageTitle = pageTitle[0]['value']
          commit('SET_PAGE_TITLE', pageTitle)
        } else {
          commit('SET_PAGE_TITLE', false)
        }

        document.title = pageTitle

        let productName = response.filter((data) => data.type.includes('product_name'))

        if (productName.length) {
          productName = productName[0]['value']
          commit('SET_PRODUCT_NAME', productName)
        } else {
          commit('SET_PRODUCT_NAME', 'ACS Group')
        }

        let productVersion = response.filter((data) => data.type.includes('product_version'))

        if (productVersion.length) {
          productVersion = productVersion[0]['value']
          commit('SET_PRODUCT_VERSION', productVersion)
        } else {
          commit('SET_PRODUCT_VERSION', '1.0.0')
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

        dispatch('app/showSuccess', response.message, { root: true })
        commit('SET_LOGO_FILE', response.filepath)
      } catch (error) {
        console.log(error.response)
      }

      commit('SET_LOGO_UPLOADING', false)
    },
    async uploadImage({
      commit, dispatch
    }, {
      formData
    }) {
      commit('SET_IMAGE_UPLOADING', true)

      try {
        const response = await settingAPI.uploadImage(formData)

        dispatch('app/showSuccess', response.message, { root: true })
        commit('SET_IMAGE_FILE', response.filepath)
      } catch (error) {
        console.log(error.response)
      }

      commit('SET_IMAGE_UPLOADING', false)
    },
    async setPageTitle({
      commit, dispatch
    }, pageTitle
    ) {
      commit('BUTTON_LOAD', 'PAGE_TITLE')
      try {
        const response = await settingAPI.setPageTitle(pageTitle)

        document.title = pageTitle
        dispatch('app/showSuccess', response.message, { root: true })
        commit('SET_PAGE_TITLE', response.page_title)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async setProductInfo({
      commit, dispatch
    }, { productName, productVersion }
    ) {
      commit('BUTTON_LOAD', 'PRODUCT_VERSION')

      try {
        const response = await settingAPI.setProductInfo({ productName, productVersion })

        dispatch('app/showSuccess', response.message, { root: true })
        commit('SET_PRODUCT_NAME', response.productName)
        commit('SET_PRODUCT_VERSION', response.productVersion)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
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
    },
    SET_PRODUCT_NAME(state, value) {
      state.productName = value
    },
    SET_PRODUCT_VERSION(state, value) {
      state.productVersion = value
    },
    SET_PAGE_TITLE(state, value) {
      state.pageTitle = value
    }
  }
}

export default module

<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-expansion-panels v-model="panel" multiple class="mt-3">
      <v-expansion-panel>
        <v-expansion-panel-header class="title">Logo</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row dense>
            <v-col cols="12">
              <v-img
                contain
                width="260"
                height="160"
                :eager="true"
                :src="logoFileSrc"
                class="mx-auto"
                style="border: 1px dashed #ccc;"
              >
              </v-img>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="logoFileInput"
                accept="image/*"
                label="New Logo Image"
                outlined
                dense
                prepend-icon="mdi-camera"
                @change="prepareLogo"
              ></v-file-input>
              <div class="text-right">
                <v-btn
                  color="primary"
                  :loading="uploadingLogo"
                  :disabled="uploadingLogo || !logoFileInput"
                  @click="handleUpload"
                >
                  <v-icon left>
                    mdi-cloud-upload
                  </v-icon>
                  Upload Logo
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="title">Application Customization</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form ref="form" lazy-validation @submit.prevent="submit">
            <v-text-field
              v-model="url"
              label="Input Website URL"
              outlined
              dense
              :rules="[$rules.required]"
            />
            <v-row justify="space-around">
              <v-btn
                class="ma-2 white--text"
                :loading="buttonLoading === 'SUBMIT'"
                :disabled="buttonLoading === 'SUBMIT'"
                color="info"
                @click="submit"
              >
                SUBMIT
              </v-btn>
              <v-sheet v-if="buttonLoading === 'APPLY' || buttonLoading === false">
                <v-btn
                  class="ma-2"
                  :loading="buttonLoading === 'APPLY'"
                  :disabled="buttonLoading === 'APPLY'"
                  color="success"
                  @click="applyCustomization"                          
                >
                  Apply Customization
                </v-btn>
                <v-btn
                  fab
                  large
                  dark
                  :color="customizationColor"
                ></v-btn>
              </v-sheet>
            </v-row>
          </v-form>
          <v-row v-if="colors">
            <v-col
              v-for="(color, idx) in colors"
              :key="idx"
              class="d-flex child-flex"
              cols="2"
            >
              <v-btn
                :key="idx"
                :color="color.Hex"
                elevation="11"
                height="100"
                @click="handleColorClicked(color.Hex)"
              ></v-btn>
            </v-col>
          </v-row>

          <div v-if="!colors.length && buttonLoading == false">
            <v-row justify="center">
              Sorry, We can't find any colors from given URL.
            </v-row>
            <v-row justify="center">
              <v-color-picker
                v-model="customizationColor"
                dot-size="25"
                show-swatches
                swatches-max-height="200"                          
                elevation="15"                          
              ></v-color-picker>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <br>
    
    <v-btn
      color="error"
      :loading="buttonLoading === 'RESET'"
      :disabled="buttonLoading === 'RESET'"
      @click="handleResetBtnClicked"
    >
      Set Default Settings
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      panel: [1],
      logoFileInput: undefined,
      logoFileSrc: '',

      url: '',
      tab: null,
      // customizationColor: this.privateColors[0],
      customizationColor: null
    }
  },
  computed: {
    ...mapState({
      uploadingLogo: (state) => state.settings.uploadingLogo,

      logoFile: (state) => state.settings.logo_file,
      colors: (state) => state.settings.colors,
      privateColors: (state) => state.settings.private_colors,
      buttonLoading: (state) => state.settings.button_loading
    }),
    logoFilePath() {
      return this.logoFile ? this.logoFile : require('../../assets/imgs/logo-aec.png')
    }
  },
  methods: {
    ...mapActions({
      'grabColors': 'settings/grabColors',
      'resetSettings': 'settings/resetSettings',
      'setInitialSetting': 'settings/setInitialSetting',
      'applyPrivateColors': 'settings/applyPrivateColors',
      'uploadLogo': 'settings/uploadLogo',
      'updateAuthBackground': 'settings/updateAuthBackground'
    }),
    async submit () {
      if (this.$refs.form.validate()) {
        this.grabColors(this.url)

        //-- Generic Random Images --//
        this.updateAuthBackground()
      }
    },
    applyCustomization () {
      if (this.customizationColor.hex) {
        this.customizationColor = this.customizationColor.hex
      }
      this.$vuetify.theme.themes.light.primary = this.customizationColor      
      let colors = [
        this.customizationColor
      ]

      if (this.colors.length) {
        this.$vuetify.theme.themes.light.accent = this.colors[1].Hex
        this.$vuetify.theme.themes.light.background = this.colors[2].Hex
        colors = [
          this.customizationColor,
          this.colors[1].Hex,
          this.colors[2].Hex
        ]
      }
      this.applyPrivateColors({
        colors
      })

      this.updateAuthBackground()
    },
    handleColorClicked (color) {
      this.customizationColor = color
    },
    handleResetBtnClicked () {
      this.resetSettings().then(() => {
        this.setInitialSetting({}).then(() => {
          this.$vuetify.theme.themes.light.primary = this.privateColors[0]
          if (this.privateColors.length >= 2) {
            this.$vuetify.theme.themes.light.accent = this.privateColors[1]
            this.$vuetify.theme.themes.light.background = this.privateColors[2]
          }
          this.customizationColor = this.privateColors[0]
        })
      })
    },
    prepareLogo(file) {
      if (file) {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => {
          this.logoFileSrc = reader.result
        }
      }
    },
    handleUpload() {
      const formData = new FormData()

      formData.append('logo', this.logoFileInput)
      this.uploadLogo({
        formData
      })
    }
  }
}
</script>

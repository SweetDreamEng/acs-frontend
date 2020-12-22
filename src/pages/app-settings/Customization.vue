<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-card>
      <v-toolbar
        color="primary"
        dark
      >
        <v-toolbar-title>Logo</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        
      </v-card-text>
    </v-card>

    <br>
    
    <v-card>
      <v-card-title>Logo</v-card-title>
      <v-card-text>
        <v-expansion-panels accordion>
          <!-- Upload logo Image --->
          <v-expansion-panel>
            <v-expansion-panel-header>Upload logo Image</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card flat>
                <v-btn
                  color="primary"
                  class="text-none"
                  depressed
                  :loading="isSelecting"
                  @click="handleFileUploadBtnClicked"
                >
                  <v-icon left>
                    mdi-cloud-upload
                  </v-icon>
                  Upload Logo Image
                </v-btn>
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileChanged"
                >
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Application Customization --->
          <v-expansion-panel>
            <v-expansion-panel-header>Application Customization</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card flat>
                <!-- Input URL Form -->
                <v-card-text>
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
                        :loading="buttonLoading == 'SUBMIT'"
                        :disabled="buttonLoading == 'SUBMIT'"
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
                </v-card-text>
                <v-text-field
                  v-if="buttonLoading"
                  color="success"
                  loading
                  disabled
                ></v-text-field>
                <v-card-text v-if="colors">
                  <v-row>
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
                </v-card-text>

                <v-card-text v-if="!colors.length && buttonLoading == false">
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
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-btn
            depressed
            color="error"
            style="width: 100%"
            :loading="buttonLoading == 'SUBMIT'"
            :disabled="buttonLoading == 'SUBMIT'"
            @click="handleResetBtnClicked"
          >
            Set Default Settings
          </v-btn>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      url: '',
      tab: null,
      items: [
        'Upload Image',
        'Choose Logo Color'
      ],
      customizationColor: this.privateColors[0],
      selectedFile: null,
      isSelecting: false
    }
  },
  computed: {
    ...mapState({
      colors: (state) => state.settings.colors,
      privateColors: (state) => state.settings.private_colors,
      buttonLoading: (state) => state.settings.button_loading
    })
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
        this.grabColors({
          url: this.url
        })

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
    handleFileUploadBtnClicked() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      const formData = new FormData()

      formData.append('logo', this.selectedFile)
      this.uploadLogo({
        formData
      })
    }
  }
}
</script>

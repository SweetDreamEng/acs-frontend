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
              class="mx-2"
              :rules="[$rules.required]"
            />
            <div class="text-right">
              <v-btn
                class="mx-2 white--text"
                :loading="buttonLoading === 'SUBMIT'"
                :disabled="buttonLoading === 'SUBMIT'"
                color="primary"
                @click="submit"
              >
                SUBMIT
              </v-btn>
            </div>
          </v-form>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-data-table
                :headers="headers"
                :items="colorSettings"
                :items-per-page="5"
                class="elevation-1"
                hide-default-footer
              >
                <template v-slot:item.color="{ item }">
                  <drop
                    class="my-2"
                    :style="`width: 40px; height: 40px; background: ${item.color}; border-radius: 50%; border: solid 1px grey;`"
                    @dragover="handleDragover(item)"
                    @drop="handleDrop"
                  >
                  </drop>
                </template>
              </v-data-table>
              <v-sheet v-if="buttonLoading === 'APPLY' || buttonLoading === false">
                <v-btn
                  class="ma-2"
                  :loading="buttonLoading === 'APPLY'"
                  :disabled="buttonLoading === 'APPLY'"
                  color="primary"
                  @click="applyCustomColors"                          
                >
                  Apply Customization
                </v-btn>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="6">
              <div v-if="colors" class="d-flex flex-wrap" style="max-height: 500px; overflow-y: scroll;">
                <div
                  v-for="(color, idx) in colors"
                  :key="idx"
                  class="text-center"
                  style="width: 100px;"
                >
                  <drag class="ma-2" :style="`width: 80px; height: 80px; background: ${color.Hex}`" :transfer-data="{ color }"></drag>
                  {{ color.Hex }}
                </div>
              </div>
            </v-col>
          </v-row>
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
import { Drag, Drop } from 'vue-drag-drop'

export default {
  components: { Drag, Drop },
  data () {
    return {
      panel: [1],
      logoFileInput: undefined,
      logoFileSrc: '',

      url: '',
      tab: null,
      // customizationColor: this.privateColors[0],
      customizationColor: null,

      selectedItem: null,

      headers: [
        { text: 'Color name', value: 'name' },
        { text: 'Color', value: 'color' }
      ],
      colorSettings: [
        {
          name: 'Background',
          key: 'color_background',
          color: '#ffffff'
        }, {
          name: 'Primary',
          key: 'color_primary',
          color: '#ffffff'
        }, {
          name: 'Secondary',
          key: 'color_secondary',
          color: '#ffffff'
        }, {
          name: 'Accent',
          key: 'color_accent',
          color: '#ffffff'
        }, {
          name: 'Surface',
          key: 'color_surface',
          color: '#ffffff'
        }
      ]
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
      'applyWebsiteColors': 'settings/applyWebsiteColors',
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
    applyCustomColors () {

      // if (this.customizationColor.hex) {
      //   this.customizationColor = this.customizationColor.hex
      // }
      // this.$vuetify.theme.themes.light.primary = this.customizationColor      
      // let colors = [
      //   this.customizationColor
      // ]

      // if (this.colors.length) {
      //   this.$vuetify.theme.themes.light.accent = this.colors[1].Hex
      //   this.$vuetify.theme.themes.light.background = this.colors[2].Hex
      //   colors = [
      //     this.customizationColor,
      //     this.colors[1].Hex,
      //     this.colors[2].Hex
      //   ]
      // }
      this.applyWebsiteColors({
        colors: this.colorSettings
      })

      // this.updateAuthBackground()
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
    },
    handleDrop(data, event) {
      const selectedSetting = this.colorSettings.find((setting) => setting.name === this.selectedItem.name)

      selectedSetting.color = data.color.Hex
    },
    handleDragover(item) {
      this.selectedItem = item
    }
  }
}
</script>

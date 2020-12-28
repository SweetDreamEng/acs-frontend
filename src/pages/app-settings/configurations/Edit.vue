<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-card>
      <v-card-title>Configuration</v-card-title>
      <v-card-text>
        <v-form
          v-if="configuration"
          ref="form"
          v-model="isFormValid"
          lazy-validation
          @submit.prevent="save"
        >
          <v-text-field
            v-model="configuration.name"
            label="Configuration Name"
            :rules="[$rules.required]"
            placeholder="Name"
            outlined
            dense
          >
          </v-text-field>
          <v-file-input
            v-model="jsonInput"
            accept=".json"
            outlined
            dense
            hide-details
            placeholder="Full JSON File"
            label="Configuration JSON"
            @change="previewJson"
          >
          </v-file-input>
          <v-row dense>
            <v-col xs="12" cols="6">
              <v-card flat>
                <v-card-title>Original JSON</v-card-title>
                <v-card-text color="grey" style="max-height: 500px; overflow-y: auto;">
                  <pre v-if="configuration.full_json">{{ JSON.parse(configuration.full_json) }}</pre>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col xs="12" cols="6">
              <v-card flat>
                <v-card-title>New JSON</v-card-title>
                <v-card-text style="max-height: 500px; overflow-y: auto;">
                  <pre v-if="newJson">{{ newJson }}</pre>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <div class="mt-2 text-right">
            <router-link class="mr-2 grey--text" to="/app-settings/configurations">Cancel</router-link>
            <v-btn
              color="primary"
              :loading="savingConfiguration"
              :disabled="savingConfiguration"
              @click="save"
            >Save</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      isFormValid: true,
      jsonInput: undefined,
      newJson: null
    }
  },
  computed: {
    ...mapState({
      savingConfiguration: (state) => state.configurations.savingConfiguration,
      configuration: (state) => state.configurations.configuration
    })
  },
  created() {
    this.getConfiguration(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getConfiguration: 'configurations/getConfiguration',
      saveConfiguration: 'configurations/saveConfiguration'
    }),
    save() {
      if (this.$refs.form.validate()) {
        this.configuration.new_json = this.newJson
        this.saveConfiguration(this.configuration)
      }
    },
    previewJson() {
      if (this.jsonInput) {
        const reader = new FileReader()

        reader.readAsText(this.jsonInput)
        reader.onload = (e) => {
          this.newJson = JSON.parse(event.target.result)
        }
      }
    }
  }
}
</script>
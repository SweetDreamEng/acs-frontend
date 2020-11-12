<template>
  <div>
    <div class="text-right">
      <span class="mr-1">{{ show ? 'Hide Import' : 'Show Import' }}</span>
      <v-btn
        icon
        color="primary"
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </div>
    <v-expand-transition>
      <v-card v-show="show" class="mt-1">
        <v-card-title>Import Devices</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="isFormValid" lazy-validation>
            <v-file-input
              label="File input"
              v-model="devicesFile"
              accept=".xlsx"
              outlined
              dense
              :rules="[rules.required]"
              @change="resetNums"
              @keyup.enter="submit"
              @input="resetErrors"
            ></v-file-input>
            <div class="d-flex flex-column align-center">
              <v-alert
                v-if="numAdded"
                dense
                outlined
                type="success"
                width="400"
              >
                Added: <strong>{{ numAdded }}</strong>
              </v-alert>
              <v-alert
                v-if="numDuplicates"
                dense
                outlined
                type="error"
                width="400"
              >
                Duplicates: <strong>{{ numDuplicates }}</strong>
              </v-alert>
            </div>
            <div class="text-right">
              <v-btn
                :loading="isLoading"
                :disabled="isLoading"
                color="primary"
                @click="submit"
              >
                Upload
                <v-icon
                  right
                  dark
                >
                  mdi-cloud-upload
                </v-icon>
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-expand-transition>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      show: false,

      isFormValid: true,
      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      },

      devicesFile: null
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.devices.button_loading,
      errorMessages: (state) => state.devices.error,
      numAdded: (state) => state.devices.numAdded,
      numDuplicates: (state) => state.devices.numDuplicates
    })
  },
  mounted() {
    this.resetStatus()
  },
  methods: {
    ...mapActions({
      'uploadDevices': 'devices/uploadDevices',
      'getDevices': 'devices/getDevices',
      'clearError': 'devices/clearError',
      'resetStatus': 'devices/resetStatus'
    }),
    submit() {
      const form = new FormData()

      form.append('devicesFile', this.devicesFile)
      this.uploadDevices(form)
        .then((response) => {
          this.getDevices(1)
        })
    },
    resetErrors() {
      this.clearError()
    },
    resetNums() {
      this.resetStatus()
    }
  }
}
</script>
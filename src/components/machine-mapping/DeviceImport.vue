<template>
  <div class="mt-2">
    <div class="text-right">
      <v-btn
        color="primary"
        :loading="import_btn_loading"
        :disabled="import_btn_loading"
        @click="submit"
      >
        Retrieve devices from Teltonika RMS
      </v-btn>
    </div>
    <!--     <div class="d-flex flex-column align-center mt-1">
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
    </div> -->
  </div>
</template>
<script>
/*
  Component to upload devices from excel file
*/
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      import_btn_loading: (state) => state.devices.import_btn_loading,
      numAdded: (state) => state.devices.numAdded,
      numDuplicates: (state) => state.devices.numDuplicates
    })
  },
  mounted() {
    this.resetStatus()
    this.resetErrors()
  },
  methods: {
    ...mapActions({
      'importDevices': 'devices/importDevices',
      'getDevices': 'devices/getDevices',
      'clearError': 'devices/clearError',
      'resetStatus': 'devices/resetStatus'
    }),
    submit() {
      this.importDevices()
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
<template>
  <div>
    <v-card :loading="isReportLoading" :disabled="isReportLoading">
      <v-card-title class="pb-0">Select Machines</v-card-title>
      <v-card-text class="mt-0">Select machines you want to include in your report</v-card-text>
      <v-card-text>
        <v-row v-if="reportMachines.length" dense>
          <v-col
            v-for="(machine, i) in reportMachines"
            :key="i"
            cols="12"
            md="4"
            sm="6"
          >
            <v-checkbox v-model="deviceIds" :label="machine.name" :value="machine.device_id" @change="handleSelectMachine"></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <div class="mt-2 pb-3 text-right">
        <v-btn color="grey lighten-2" depressed @click="handleBack">Back</v-btn>
        <v-btn class="ml-2" depressed color="primary" @click="$emit('setReportMachines', deviceIds)">Next Step</v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      deviceIds: []
    }
  },
  computed: {
    ...mapState({
      reportMachines: (state) => state.machines.reportMachines,
      isReportLoading: (state) => state.machines.isReportLoading
    })
  },
  methods: {
    handleSelectMachine(event) {
      if (event.length > 3) {
        event.pop()
      }
    },
    handleBack() {
      this.deviceIds = []
      this.$emit('cancel')
    },
    resetModel() {
      this.deviceIds = []
    }
  }
}
</script>

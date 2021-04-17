<template>
  <div>
    <v-card :disabled="isReportLoading">
      <v-text-field v-model="reportTitle" :rules="[rules.required]" label="Report Title"></v-text-field>
      <v-card-text class="mt-0">Confirm data selected and generate your report</v-card-text>
      <v-card-text>
        <v-row class="grey lighten-3 rounded mb-3" dense>
          <v-col cols="3" class="d-flex flex-column">
            <div class="pa-0 text-caption">Start Date & Time</div>
            <div class="primary--text">{{ getTimeRange.dateFrom }} at {{ getTimeRange.timeFrom }}</div>
          </v-col>
          <v-col cols="3" class="d-flex flex-column">
            <div class="pa-0 text-caption">End Date & Time</div>
            <div class="primary--text">{{ getTimeRange.dateTo }} at {{ getTimeRange.timeTo }}</div>
          </v-col>
        </v-row>
        <v-row
          v-for="(id, key) in Object.keys(selectedTags)"
          :key="key"
          dense
          align="center"
          justify="center"
          class="grey lighten-3 rounded mb-3"
        >
          <v-col cols="4" class="d-flex flex-column">
            <div class="pa-0 text-caption">Machine</div>
            <div class="primary--text">{{ getMachineName(id) }}</div>
          </v-col>
          <v-col cols="8" class="d-flex flex-column">
            <div class="pa-0 text-caption">Tags</div>
            <div class="primary--text">
              <v-chip
                v-for="(tag, i) in selectedTags[id]"
                :key="i"
                class="mr-1 mb-1"
                color="primary"
                outlined
                small
              >
                {{ tag.name }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <div class="mt-2 pb-3 text-right">
        <v-btn color="grey lighten-2" depressed @click="$emit('cancel')">Back</v-btn>
        <v-btn
          class="ml-2"
          depressed
          color="primary"
          :loading="isReportLoading"
          @click="handleNext"
        >Generate Report</v-btn>
      </div>
    </v-card>
    <v-dialog v-model="generateCompleted" max-width="500">
      <v-card>
        <v-card-text class="text-center">
          <v-avatar class="text-center mt-5" color="green lighten-2" size="100">
            <v-icon color="white" x-large>$mdi-check-bold</v-icon>
          </v-avatar>
        </v-card-text>
        <v-card-title class="mt-1 headline justify-center">Your report was successfully generated</v-card-title>
        <v-card-text class="pb-0 text-center">Click on Export & Save Report to export the report.</v-card-text>
        <div class="mt-2 pb-3 text-center">
          <v-btn color="grey lighten-2" depressed @click="handleCancelExport">Cancel</v-btn>
          <v-btn class="ml-2" depressed color="primary" @click="handleExportReport">Export & Save</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  props: {
    selectedTags: {
      type: Object,
      default: () => {}
    },
    selectedTimeRange: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      reportTitle: 'Report 1',
      rules: {
        required: (value) => !!value || 'This field is required.'
      },
      canExportReport: false
    }
  },
  computed: {
    ...mapState({
      reportMachines: (state) => state.machines.reportMachines,
      isReportLoading: (state) => state.machines.isReportLoading,
      reportName: (state) => state.machines.reportName
    }),
    generateCompleted: {
      get () {
        return this.$store.state.machines.generateCompleted
      },
      set (value) {
        this.$store.commit('machines/REPORT_GENERATE_COMPLETED', value)
      }
    },
    ...mapGetters('machines', ['timeRangeFromTo']),
    getTimeRange() {
      if (this.selectedTimeRange && this.selectedTimeRange.timeRangeOption !== 'custom') {
        const tR = {
          timeRangeOption: this.selectedTimeRange.timeRangeOption,
          dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
        }

        const from = new Date(this.timeRangeFromTo(tR).from).toISOString()
        const to =  new Date(this.timeRangeFromTo(tR).to).toISOString()

        const timeRange = {
          dateFrom: from.substr(0, 10),
          dateTo: to.substr(0, 10),
          timeFrom: from.substr(11, 8),
          timeTo: to.substr(11, 8)
        }

        return timeRange
      } else {
        const timeRange = {
          dateFrom: this.selectedTimeRange.dateFrom,
          dateTo: this.selectedTimeRange.dateTo,
          timeFrom: this.selectedTimeRange.timeFrom,
          timeTo: this.selectedTimeRange.timeTo
        }

        return timeRange
      }
    }
  },
  methods: {
    getMachineName(id) {
      const machine =  this.reportMachines.find((machine) => machine.id === Number(id))

      return machine ? machine.name : ''
    },
    isValidate(str) {
      if (str !== '') {
        return true
      } else {
        return false
      }
    },
    handleNext() {
      if (this.isValidate(this.reportTitle)) {
        this.$emit('generateReport', this.getTimeRange, this.reportTitle)
      }
    },
    handleExportReport() {
      const filepath = process.env.VUE_APP_SERVER_API_ENDPOINT.slice(0, -3) + 'assets/app/reports/' + this.reportName + '.xlsx'

      const filename = this.reportName + '.xlsx'

      this.$download(filepath, this.reportName)
      this.generateCompleted = false
      this.$emit('handleResetCreating')
    },
    handleCancelExport() {
      this.generateCompleted = false
      this.$emit('handleResetCreating')
    }
  }
}
</script>
<template>
  <div>
    <v-card :disabled="isReportLoading">
      <v-card-title class="mt-0">Location: {{ getLocationName() }}</v-card-title>
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
      </v-card-text>
      <v-divider></v-divider>
      <div class="mt-2 pb-3 text-right">
        <v-btn color="grey lighten-2" depressed @click="$emit('cancel')">Back</v-btn>
        <v-btn
          class="ml-2"
          depressed
          color="primary"
          :loading="isReportLoading"
          @click="handleGenerateReport"
        >Export</v-btn>
      </div>
    </v-card>
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
    },
    locationId:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
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
      reportName: (state) => state.machines.reportName,
      locations: (state) => state.locations.data
    }),
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
    handleGenerateReport() {
      this.$emit('generateReport', this.getTimeRange)
    },
    getLocationName() {
      const location = this.locations.find((location) => {
        return location.id === this.locationId
      })

      return location ? location.name : ''
    }
  }
}
</script>

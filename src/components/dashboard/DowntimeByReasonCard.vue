<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    height="100%"
    light
    :loading="isDowntimeByReasonGraphLoading"
    :disabled="isDowntimeByReasonGraphLoading"
  >
    <v-card-title>
      Downtime by Reason
      <v-spacer></v-spacer>
      <v-btn
        icon
        class=" ml-2"
        @click="showTimeRangeChooser = true"
      >
        <v-icon>$mdi-filter</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <apexchart
        :options="chartOptions"
        :series="getDowntimeByReasonSeries"
      ></apexchart>
    </v-card-text>
    <time-range-chooser
      :dlg="showTimeRangeChooser"
      :time-range="timeRange"
      @close="showTimeRangeChooser = false"
      @submit="onTimeRangeChanged"
    >
    </time-range-chooser>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import TimeRangeChooser from './TimeRangeChooser4'

const dateTimeIsoString = new Date().toISOString().substr(0, 10)

export default {
  components: {
    TimeRangeChooser
  },
  data() {
    return {
      showTimeRangeChooser: false,
      selectedTimeRange: {},
      timeRange: {
        timeRangeOption: 'last24Hours',
        dateFrom: dateTimeIsoString,
        dateTo: dateTimeIsoString,
        timeFrom: '00:00',
        timeTo: '00:00'
      },
      showChart: true,
      viewOptions: [
        'Daily', 'Weekly', 'Monthly'
      ]
    }
  },
  computed: {
    ...mapState({
      downtimeByReasonGraphSeries: (state) => state.devices.downtimeByReasonGraphSeries,
      isDowntimeByReasonGraphLoading: (state) => state.devices.isDowntimeByReasonGraphLoading
    }),
    ...mapGetters('machines', ['timeRangeFromTo']),
    getTimeRange() {
      if (this.selectedTimeRange && this.selectedTimeRange.timeRangeOption !== 'custom') {
        const tR = {
          timeRangeOption: this.selectedTimeRange.timeRangeOption,
          dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
        }

        const from = new Date(this.timeRangeFromTo(tR).from)
        const to = new Date(this.timeRangeFromTo(tR).to)

        const timeRange = {
          dateFrom: from.toLocaleDateString(),
          dateTo: to.toLocaleDateString(),
          timeFrom: from.toLocaleTimeString(),
          timeTo: to.toLocaleTimeString()
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
    },
    chartOptions() {
      return {
        chart: {
          type: 'bar',
          horizontal: false,
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        stroke: {
          show: false
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '80%',
            dataLabels: {
              enabled: false,
              position: 'top',
              offsetX: -80
            },
            distributed: true,
            space: 0.25
          }
        },
        xaxis: {
          categories: this.downtimeByReasonGraphSeries.map((item) => item.name),
          labels: {
            show: false
          }
        },
        legend: {
          position: 'bottom',
          offsetY: 10
        },
        fill: {
          opacity: 1
        }
      }
    },
    getDowntimeByReasonSeries() {
      const series = [{ data: [] }]

      this.downtimeByReasonGraphSeries.map((item) => {
        series[0].data.push(item.data)

        return 0
      })

      return series
    }
  },
  mounted() {
    this.onTimeRangeChanged(this.timeRange)
  },
  methods: {
    ...mapActions({
      getDowntimeByReasonGraphSeries: 'devices/getDowntimeByReasonGraphSeries'
    }),
    onTimeRangeChanged(newTimeRange) {
      this.selectedTimeRange = newTimeRange
      const to = new Date(`${this.getTimeRange.dateTo} ${this.getTimeRange.timeTo}`).getTime()
      const from = new Date(`${this.getTimeRange.dateFrom} ${this.getTimeRange.timeFrom}`).getTime()

      const customRange = to - from

      if (customRange < 0) {
        this.$store.dispatch('app/showError', { message: 'Failed: ', error: { message: 'Please check your time range selection' } }, { root: true })
      } else if (customRange > 60 * 60 * 24 * 14 * 1000) {
        this.$store.dispatch('app/showError', { message: 'Failed: ', error: { message: 'Time range selection is limited to two weeks' } }, { root: true })
      } else {
        this.getDowntimeByReasonGraphSeries({
          to,
          from
        })

        this.showTimeRangeChooser = false
      }
    }
  }
}
</script>
<style scoped>
  .v-card__title {
    word-break: break-word;
  }
</style>

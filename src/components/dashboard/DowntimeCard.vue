<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    height="600px"
    light
    :loading="isDowntimeGraphLoading"
    :disabled="isDowntimeGraphLoading"
  >
    <v-card-title>
      Downtime
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
        :series="chartOptions2.series"
        :options="chartOptions2"
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
      downtimeGraphData: (state) => state.devices.downtimeGraphData,
      downtimeGraphDate: (state) => state.devices.downtimeGraphDate,
      isDowntimeGraphLoading: (state) => state.devices.isDowntimeGraphLoading
    }),
    ...mapGetters('machines', ['timeRangeFromTo']),
    chartOptions2() {
      return {
        series: this.downtimeGraphData,
        chart: {
          type: 'bar',
          height: '500px',
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'top',
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '70%',
            horizontal: false
          }
        },
        dataLabels: {
          style: {
            fontSize: '10px',
            colors: ['#fff']
          }
        },
        xaxis: {
          type: 'date',
          categories: this.downtimeGraphDate
        },
        legend: {
          position: 'bottom'
        },
        fill: {
          opacity: 1
        }
      }
    },
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
    }
  },
  mounted() {
    this.onTimeRangeChanged(this.timeRange)
  },
  methods: {
    ...mapActions({
      getDowntimeGraphData: 'devices/getDowntimeGraphData'
    }),
    async onTimeRangeChanged(newTimeRange) {
      this.selectedTimeRange = newTimeRange
      const to = new Date(`${this.getTimeRange.dateTo} ${this.getTimeRange.timeTo}`).getTime()
      const from = new Date(`${this.getTimeRange.dateFrom} ${this.getTimeRange.timeFrom}`).getTime()

      const customRange = to - from

      if (customRange < 0) {
        this.$store.dispatch('app/showError', { message: 'Failed: ', error: { message: 'Please check your time range selection' } }, { root: true })
      } else if (customRange > 60 * 60 * 24 * 14 * 1000) {
        this.$store.dispatch('app/showError', { message: 'Failed: ', error: { message: 'Time range selection is limited to two weeks' } }, { root: true })
      } else {
        try {
          this.getDowntimeGraphData({
            to,
            from
          })} catch (error) {
          console.log(error)
        }

        this.showTimeRangeChooser = false
      }
    }
  }
}
</script>

<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    height="600px"
    light
    :loading="isDowntimeGraphLoading"
    :disabled="isDowntimeGraphLoading"
  >
    <v-card-title>
      Downtime History
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

const seriesColors = [{
  name: 'No Demand',
  color: '#a4bcbb'
}, {
  name: 'Preventative Maintenance',
  color: '#508FF0'
}, {
  name: 'Machine Failure',
  color: '#06d6a0'
}, {
  name: 'Power Outage',
  color: '#505554'
}, {
  name: 'Other',
  color: '#ffd166'
}, {
  name: 'Change Over',
  color: '#ea344e'
}, {
  name: 'Average Downtime',
  color: '#ba7d55'
}]

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
      isDowntimeGraphLoading: (state) => state.devices.isDowntimeGraphLoading,
      selectedCompany: (state) => state.machines.selectedCompany
    }),
    ...mapGetters('machines', ['timeRangeFromTo']),
    chartOptions2() {
      return {
        series: this.downtimeGraphData,
        chart: {
          type: 'line',
          height: '500px',
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        stroke: {
          width: this.getStrokeWidth,
          curve: 'smooth'
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
        colors: this.getSeriesColors,
        fill: {
          colors: this.getSeriesColors,
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
    },
    getSeriesColors() {
      const _colors = []

      this.downtimeGraphData.map((item) => {
        const seriesColor = seriesColors.find((data) => {
          return data.name === item.name
        })

        _colors.push(seriesColor ? seriesColor.color : '#fff')

        return _colors
      })

      return _colors
    },
    getStrokeWidth() {
      const _widths = []

      this.downtimeGraphData.map((item) => {
        if (item.name === 'Average Downtime') {
          _widths.push(3)
        } else {
          _widths.push(0)
        }

        return _widths
      })

      return _widths
    }
  },
  methods: {
    ...mapActions({
      getDowntimeGraphData: 'devices/getDowntimeGraphData',
      getDowntimeByTypeGraphSeries: 'devices/getDowntimeByTypeGraphSeries',
      getDowntimeByReasonGraphSeries: 'devices/getDowntimeByReasonGraphSeries'
    }),
    onTimeRangeChanged(newTimeRange) {
      this.selectedTimeRange = newTimeRange
      let to = new Date(`${this.getTimeRange.dateTo} ${this.getTimeRange.timeTo}`).getTime()
      let from = new Date(`${this.getTimeRange.dateFrom} ${this.getTimeRange.timeFrom}`).getTime()

      if (this.selectedTimeRange.timeRangeOption === 'custom') {
        to = new Date(`${this.getTimeRange.dateTo} ${this.getTimeRange.timeTo} GMT+00:00`).getTime() + 60 * 60 * 24 * 1000
        from = new Date(`${this.getTimeRange.dateFrom} ${this.getTimeRange.timeFrom} GMT+00:00`).getTime()
      }

      const customRange = to - from

      if (customRange < 0) {
        this.$store.dispatch('app/showError', { message: 'Failed: ', error: { message: 'Please check your time range selection' } }, { root: true })
      } else if (customRange > 60 * 60 * 24 * 14 * 1000) {
        this.$store.dispatch('app/showError', { message: 'Failed: ', error: { message: 'Time range selection is limited to two weeks' } }, { root: true })
      } else {
        const location_id = this.$route.params.location ? this.$route.params.location : 0
        const zone_id = this.$route.params.zone ? this.$route.params.zone : 0

        this.getDowntimeGraphData({ to, from, company_id: this.selectedCompany.id, location_id, zone_id })
        this.getDowntimeByTypeGraphSeries({ to, from, company_id: this.selectedCompany.id, location_id, zone_id })
        this.getDowntimeByReasonGraphSeries({ to, from, company_id: this.selectedCompany.id, location_id, zone_id })
        this.showTimeRangeChooser = false
      }
    }
  }
}
</script>

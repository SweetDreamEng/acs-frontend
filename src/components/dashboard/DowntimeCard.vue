<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    light
    :loading="isDowntimeGraphLoading"
    :disabled="isDowntimeGraphLoading"
  >
    <div v-if="showDowntimeChart">
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
        <v-btn
          v-if="canViewEquipmentAvailability || isNotOverrallOption"
          class="ml-1"
          color="primary"
          @click="showDowntimeChart = false"
        >
          Equipment Availability
        </v-btn>
      </v-card-title>
      <v-card-text>
        <apexchart
          key="downtimegraph"
          :series="chartOptions1.series"
          height="400"
          :options="chartOptions1"
        ></apexchart>
      </v-card-text>
      <time-range-chooser
        :dlg="showTimeRangeChooser"
        :time-range="selectedTimeRange"
        @close="showTimeRangeChooser = false"
        @submit="onTimeRangeChanged"
      >
      </time-range-chooser>
    </div>
    <div v-else>
      <v-card-title>
        Equipment Availability
        <v-spacer></v-spacer>
        <v-btn
          class="ml-1"
          color="primary"
          @click="showDowntimeChart = true"
        >
          Downtime
        </v-btn>
        <v-btn
          v-if="canAddAvailabilityPlanTime"
          class="ml-1"
          color="primary"
          @click="showPlanTimeForm = true"
        >
          Set Plan Time
        </v-btn>
      </v-card-title>
      <v-card-text>
        <apexchart
          key="availability-chart"
          height="400"
          :series="chartOptions2.series"
          :options="chartOptions2"
        ></apexchart>
      </v-card-text>
      <availability-plan-time-form
        :dlg="showPlanTimeForm"
        @close="showPlanTimeForm = false"
        @submit="handleSetPlanTime"
      ></availability-plan-time-form>
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import TimeRangeChooser from './TimeRangeChooser4'
import AvailabilityPlanTimeForm from './AvailabilityPlanTimeForm'

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
    TimeRangeChooser,
    AvailabilityPlanTimeForm
  },
  data() {
    return {
      showTimeRangeChooser: false,
      showPlanTimeForm: false,
      selectedTimeRange: {
        timeRangeOption: 'last24Hours',
        dateFrom: dateTimeIsoString,
        dateTo: dateTimeIsoString,
        timeFrom: '00:00',
        timeTo: '00:00'
      },
      showDowntimeChart: true,
      viewOptions: [
        'Daily', 'Weekly', 'Monthly'
      ]
    }
  },
  computed: {
    ...mapState({
      downtimeGraphData: (state) => state.devices.downtimeGraphData,
      downtimeGraphDate: (state) => state.devices.downtimeGraphDate,
      availabilityGraphData: (state) => state.devices.availabilityGraphData,
      isDowntimeGraphLoading: (state) => state.devices.isDowntimeGraphLoading,
      selectedCompany: (state) => state.machines.selectedCompany
    }),
    ...mapGetters('machines', ['timeRangeFromTo']),
    ...mapGetters('auth', ['canAddAvailabilityPlanTime', 'canViewEquipmentAvailability']),
    chartOptions1() {
      return {
        series: this.downtimeGraphData,
        chart: {
          type: 'line',
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
    chartOptions2() {
      return {
        chart: {
          type: 'line',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        colors: ['#FF1654', '#247BA0'],
        series: this.availabilityGraphData,
        stroke: {
          width: [4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: '20%'
          }
        },
        xaxis: {
          type: 'date',
          categories: this.downtimeGraphDate
        },
        yaxis: {
          forceNiceScale: true,
          labels: {
            offsetX: 10,
            formatter: (value) => {
              return (value * 100).toFixed(3) + '%'
            }
          },
          title: {
            text: 'Availability (%)'
          }
        },
    
        dataLabels: {
          style: {
            fontSize: '10px',
            colors: ['#fff']
          }
        },
        legend: {
          position: 'bottom'
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
    },
    isNotOverrallOption() {
      return this.selectedCompany && this.selectedCompany.id !== 0
    }
  },
  methods: {
    ...mapActions({
      getDowntimeGraphData: 'devices/getDowntimeGraphData',
      getDowntimeByTypeGraphSeries: 'devices/getDowntimeByTypeGraphSeries',
      getDowntimeByReasonGraphSeries: 'devices/getDowntimeByReasonGraphSeries',
      setAvailabilityPlanTime: 'devices/setAvailabilityPlanTime'
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

        this.getDowntimeGraphData({ to, from, company_id: this.selectedCompany ? this.selectedCompany.id : 0, location_id, zone_id })
        this.getDowntimeByTypeGraphSeries({ to, from, company_id: this.selectedCompany ? this.selectedCompany.id : 0, location_id, zone_id })
        this.getDowntimeByReasonGraphSeries({ to, from, company_id: this.selectedCompany ? this.selectedCompany.id : 0, location_id, zone_id })
        this.showTimeRangeChooser = false
      }
    },
    handleSetPlanTime(data) {
      const timestamp = new Date(`${data.dateFrom} 00:00:00 GMT+00:00`).getTime()

      this.setAvailabilityPlanTime({
        date: timestamp,
        time: data.planTime
      })
    }
  }
}
</script>

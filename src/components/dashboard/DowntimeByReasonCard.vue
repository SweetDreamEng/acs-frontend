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
    </v-card-title>
    <v-card-text>
      <apexchart
        :options="chartOptions"
        :series="getDowntimeByReasonSeries"
      ></apexchart>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

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
}]

export default {
  data() {
    return {
      showTimeRangeChooser: false,
      selectedTimeRange: {},
      showChart: true
    }
  },
  computed: {
    ...mapState({
      downtimeByReasonGraphSeries: (state) => state.devices.downtimeByReasonGraphSeries,
      isDowntimeByReasonGraphLoading: (state) => state.devices.isDowntimeByReasonGraphLoading
    }),
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
        colors: this.getSeriesColors,
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
      const series = [{ name: 'Hours', data: [] }]

      this.downtimeByReasonGraphSeries.map((item) => {
        series[0].data.push(item.data)

        return 0
      })

      return series
    },
    getSeriesColors() {
      const _colors = []

      this.downtimeByReasonGraphSeries.map((item) => {
        const seriesColor = seriesColors.find((data) => {
          return data.name === item.name
        })

        _colors.push(seriesColor ? seriesColor.color : '#fff')

        return _colors
      })

      return _colors
    }
  }
}
</script>
<style scoped>
  .v-card__title {
    word-break: break-word;
  }
</style>

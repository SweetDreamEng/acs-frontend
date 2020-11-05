<template>
  <v-card class="d-flex primary flex-grow-1 darken-2" dark>

    <!-- loading spinner -->
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- information -->
    <div v-else class="d-flex flex-column flex-grow-1">
      <v-card-title>
        <div>{{ $t(label) }}</div>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="$emit('action-clicked')">{{ actionLabel }}</v-btn>
      </v-card-title>

      <div class="d-flex flex-column flex-grow-1">
        <div class="pa-2">
          <div class="text-h4">
            {{ 58.49 | percentageLabel }}
          </div>
          <div class="primary--text text--lighten-4 mt-1">
            {{ 1.04 | percentageLabel }} {{ $t('dashboard.lastweek') }}
          </div>
        </div>

        <v-spacer></v-spacer>

        <div class="px-2 pb-2">
          <div class="title mb-1">{{ $t('dashboard.weeklyUtil') }}</div>
          <div class="d-flex align-center">
            <div class="text-h4">
              <!-- {{ value | formatPercentage }} -->
              {{ 55 | percentageLabel }}
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex flex-column text-right">
              <div class="font-weight-bold">
                <trend-percent :value="percentage" />
              </div>
              <div class="caption">{{ percentageLabel }}</div>
            </div>
          </div>
        </div>
      </div>

      <apexchart
        type="area"
        height="120"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment'
import VueApexCharts from 'vue-apexcharts'
import TrendPercent from '../common/TrendPercent'

function formatDate(date) {
  return date ? moment(date).format('D MMM') : ''
}

/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
export default {
  components: {
    TrendPercent
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0
    },
    percentageLabel: {
      type: String,
      default: 'vs. target'
    },
    series: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: 'Ours',
          data: [14, 30, 16, 32, 56]
        }
      ]
    },
    xaxis: {
      type: Object,
      default: () => ({
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-20T00:00:00.000Z',
          '2018-09-21T00:00:00.000Z',
          '2018-09-22T00:00:00.000Z',
          '2018-09-23T00:00:00.000Z'
        ]
      })
    },
    label: {
      type: String,
      default: 'dashboard.capacity'
    },
    actionLabel: {
      type: String,
      default: 'View Report'
    },
    options: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    chartOptions() {
      const primaryColor = this.$vuetify.theme.isDark
        ? this.$vuetify.theme.themes.dark.secondary
        : this.$vuetify.theme.themes.light.secondary

      return {
        chart: {
          height: 120,
          type: 'area',
          sparkline: {
            enabled: true
          },
          animations: {
            speed: 400
          }
        },
        colors: [primaryColor],
        fill: {
          type: 'solid',
          colors: [primaryColor],
          opacity: 0.15
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: this.xaxis,
        tooltip: {
          followCursor: true,
          theme: 'dark',
          custom: function({ ctx, series, seriesIndex, dataPointIndex, w }) {
            const seriesName = w.config.series[seriesIndex].name

            return `<div class="rounded-lg pa-1 caption">
              <div class="font-weight-bold">${formatDate(w.globals.labels[dataPointIndex])}</div>
              <div>${series[seriesIndex][dataPointIndex]} ${seriesName}</div>
            </div>`
          }
        },
        ...this.options
      }
    }
  }
}
</script>

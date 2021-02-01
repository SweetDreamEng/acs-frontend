<template>
  <v-card class="d-flex flex-grow-1 elevation-0 primary--text" height="100%">

    <!-- loading spinner -->
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="secondary"></v-progress-circular>
    </div>

    <!-- information -->
    <div v-else class="d-flex flex-column flex-grow-1" :style="cardStyle">
      <v-card-title>
        <div>Daily Production</div>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="$emit('action-clicked')">{{ actionLabel }}</v-btn>
      </v-card-title>

      <div class="d-flex flex-column flex-grow-1">
        <div class="pa-2">
          <div class="text-h4">
            152
            <!-- {{ 58.49 | percentageLabel }} -->
          </div>
          <div class="primary--text mt-1">
            <!-- {{ 1.04 | percentageLabel }} {{ $t('dashboard.lastweek') }} -->
            {{ 42 }} vs last week
          </div>
        </div>

        <v-spacer></v-spacer>

        <div class="px-2 pb-2">
          <div class="title mb-1">Target Production</div>
          <div class="d-flex align-center">
            <div class="text-h4">
              <!-- {{ value | formatPercentage }} -->
              163
              <!-- {{ 55 | percentageLabel }} -->
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex flex-column text-right">
              <div class="font-weight-bold">
                <trend-percent :color="$vuetify.theme.themes.light.primary" :value="percentage" />
              </div>
              <div class="black--text caption">{{ percentageLabel }}</div>
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
import TrendPercent from '../common/TrendPercent'

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
      default: 'vs. last week'
    },
    series: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: 'Products',
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
      const primaryColor = this.$vuetify.theme.themes.light.primary

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
          theme: 'dark'
        },
        ...this.options
      }
    },
    cardStyle() {
      return `background: ${this.$vuetify.theme.themes.light.primary}20`
    }
  }
}
</script>

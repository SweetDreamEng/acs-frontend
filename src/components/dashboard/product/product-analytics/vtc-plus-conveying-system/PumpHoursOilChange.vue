<template>
  <v-card
    height="100%"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title class="d-flex justify-space-between">
      Pump Hours Oil Change
    </v-card-title>
    <v-card-text>
      <apexchart
        type="bar"
        height="500"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </v-card-text>
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  components: {
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    valuesTarget: {
      type: Array,
      default: () => []
    },
    valuesActual: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          animations: {
            speed: 400
          },
          toolbar: {
            show: false
          }
        },
        fill: {
          colors: ['#002855', '#008ffb'],
          opacity: 0.9,
          type: 'solid'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top'
            },
            barHeight: '70%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: 26,
          textAnchor: 'start',
          style: {
            fontSize: '10px',
            colors: ['#000']
          },
          formatter: function(value, { seriesIndex, dataPointIndex, w }) {
            return value + 'h'
          }
        },
        xaxis: {
          categories: ['Pump 1', 'Pump 2', 'Pump 3', 'Pump 4', 'Pump 5', 'Pump 6', 'Pump 7', 'Pump 8', 'Pump 9', 'Pump 10', 'Pump 11', 'Pump 12'],
          rotate: -45
        },
        legend: {
          show: true,
          markers: {
            fillColors: ['#002855', '#008ffb']
          }
        }
      }
    }
  },
  computed: {
    series() {
      return [
        {
          id: 1,
          name: 'Target',
          data: this.valuesTarget
        },
        {
          id: 2,
          name: 'Actuals',
          data: this.valuesActual
        }
      ]
    }
  }
}
</script>
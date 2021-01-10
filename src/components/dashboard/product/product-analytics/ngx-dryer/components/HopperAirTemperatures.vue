<template>
  <v-card
    height="100%"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title class="d-flex justify-space-between">
      Hopper Air Temperatures
    </v-card-title>
    <v-card-text>
      <apexchart
        type="bar"
        height="320"
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
    valuesInlet: {
      type: Array,
      default: () => []
    },
    valuesOutlet: {
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
          colors: ['#002855', '#008ffb', '#feb019'],
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
          offsetX: 22,
          style: {
            fontSize: '10px',
            colors: ['#000']
          },
          formatter: function(value, { seriesIndex, dataPointIndex, w }) {
            return value + '°'
          }
        },
        xaxis: {
          categories: ['Hopper 1', 'Hopper 2', 'Hopper 3'],
          rotate: -45
        },
        legend: {
          show: true,
          markers: {
            fillColors: ['#002855', '#008ffb', '#feb019']
          }
        }
      }
    }
  },
  computed: {
    series() {
      return [
        {
          name: 'Outlet Temperature',
          data: this.valuesOutlet
        },
        {
          name: 'Inlet Temperature',
          data: this.valuesInlet
        },
        {
          name: 'Set Point',
          data: this.valuesTarget
        }
      ]
    }
  }
}
</script>
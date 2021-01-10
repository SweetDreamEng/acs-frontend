<template>
  <v-card
    height="100%"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-title class="d-flex justify-space-between">
      Target & Actuals Weight
    </v-card-title>
    <v-card-text>
      <apexchart
        type="bar"
        height="400"
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
    isLoading: {
      type: Boolean,
      default: false
    },
    timeRangeLabel: {
      type: String,
      default: ''
    },
    param: {
      type: Number,
      default: 1
    },
    valuesTgtWeight: {
      type: Array,
      default: () => [{}]
    },
    valuesActWeight: {
      type: Array,
      default: () => [{}]
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
          textAnchor: 'start',
          offsetX: 20,
          style: {
            fontSize: '10px',
            colors: ['#000']
          }
        },
        xaxis: {
          categories: ['Feeder 1', 'Feeder 2', 'Feeder 3', 'Feeder 4', 'Feeder 5', 'Feeder 6', 'Feeder 7', 'Feeder 8'],
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
    ...mapState('machines', ['weightTimeRange']),
    series() {
      return [
        {
          id: 1,
          name: 'Target',
          data: this.valuesTgtWeight
        },
        {
          id: 2,
          name: 'Actuals',
          data: this.valuesActWeight
        }
      ]
    }
  }
}
</script>
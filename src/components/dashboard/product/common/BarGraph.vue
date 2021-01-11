<template>
  <v-card
    :height="height"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title class="d-flex justify-space-between">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <apexchart
        type="bar"
        height="340"
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
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '100%'
    },
    categories: {
      type: Array,
      default: () => []
    },
    series: {
      type: Array,
      default: () => [{
        data: [0]
      }]
    }
  },
  data() {
    return {
    }
  },
  computed: {
    chartOptions() {
      return {
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
          }
          // formatter: function(value, { seriesIndex, dataPointIndex, w }) {
          //   return value + '°'
          // }
        },
        xaxis: {
          categories: this.categories
        },
        legend: {
          show: true,
          markers: {
            fillColors: ['#002855', '#008ffb', '#feb019']
          }
        }
      }
    }
  }
}
</script>
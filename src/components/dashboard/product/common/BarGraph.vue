<template>
  <v-card
    height="100%"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title class="d-flex justify-space-between">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <apexchart
        type="bar"
        :height="height"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </v-card-text>
  </v-card>
</template>

<script>

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
      type: Number,
      default: 300
    },
    unit: {
      type: String,
      default: ''
    },
    categories: {
      type: Array,
      default: () => []
    },
    series: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
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
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: 20,
          textAnchor: 'start',
          style: {
            fontSize: '10px',
            colors: ['#000']
          },
          formatter: (value, { seriesIndex, dataPointIndex, w }) => {
            const unit = this.unit ? this.unit : ''

            return value + unit
          }
        },
        xaxis: {
          categories: this.categories,
          max: (this.seriesMax + 2) * 1.1
        },
        legend: {
          show: true,
          markers: {
            fillColors: ['#002855', '#008ffb', '#feb019']
          }
        },
        ...this.options
      }
    },
    seriesMax() {
      let max = 0

      this.series.forEach((item) => {
        max = Math.max(Math.max(...item.data), max)
      })

      return max
    }
  }
}
</script>
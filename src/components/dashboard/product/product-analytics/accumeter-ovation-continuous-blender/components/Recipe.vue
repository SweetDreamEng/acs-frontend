<template>
  <v-card
    height="100%"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title class="d-flex justify-space-between">
      Target & Actuals Recipe
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

export default {
  components: {
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    targets: {
      type: Array,
      default: () => [{}]
    },
    actuals: {
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
          offsetX: -10,
          style: {
            fontSize: '10px',
            colors: ['#fff']
          }
        },
        xaxis: {
          categories: ['Feeder 1', 'Feeder 2', 'Feeder 3', 'Feeder 4', 'Feeder 5', 'Feeder 6'],
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
          data: this.targets
        },
        {
          id: 2,
          name: 'Actuals',
          data: this.actuals
        }
      ]
    }
  }
}
</script>
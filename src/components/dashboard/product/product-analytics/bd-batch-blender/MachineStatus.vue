<template>
  <v-card height="100%" color="primary lighten-1" dark>
    <v-card-title class="d-flex justify-space-between">
      <div>Machine Status</div>
      <v-btn
        icon
        small
      >
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      <span class="display-1">655.1</span>
      <span><v-icon color="green">mdi-arrow-up</v-icon>36% of target</span>
    </v-card-subtitle>
    <v-card-text style="background: white;">
      <apexchart
        type="pie"
        :options="chartOptions"
        :series="series"
        height="200"
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
    label: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'Weekly'
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true
    }
  },
  computed: {
    chartOptions() {
      const successColor = this.$vuetify.theme.themes.light.success

      return {
        chart: {
          width: '100%',
          type: 'pie'
        },
        labels: ['Running', 'Stopped'],
        theme: {
          monochrome: {
            enabled: true
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5
            }
          }
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]

            return [name, val.toFixed(1) + '%']
          }
        },
        fill: {
          colors: [successColor, '']
        },
        legend: {
          show: false
        }
      }
    },
    series() {
      return [85, 15]
    }
  },
  mounted() {
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  methods: {
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>

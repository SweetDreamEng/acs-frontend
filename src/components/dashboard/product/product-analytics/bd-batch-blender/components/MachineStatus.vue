<template>
  <v-card height="100%">
    <v-card-title class="d-flex justify-space-between">
      <div>Machine Status</div>
      <v-btn
        icon
        small
      >
        <v-icon>$mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
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
    totalRunningPercentage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
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
      return [this.totalRunningPercentage, 100 - this.totalRunningPercentage]
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

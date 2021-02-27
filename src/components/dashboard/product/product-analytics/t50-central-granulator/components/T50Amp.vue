<template>
  <v-card height="100%" :loading="loading" :disabled="loading">
    <v-card-title>Amp</v-card-title>
    {{ graphSeries }}
    <v-card-text class="px-2">
<!--       <apexchart
        v-if="!loading"
        type="radialBar"
        :height="300"
        :options="chartOptions"
        :series="graphSeries"
      >
      </apexchart> -->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    amps: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions: {
        chart: {
          type: 'radialBar'
        },
        fill: {
          colors: [this.$vuetify.theme.themes.light.primary]
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: '#d6d93d'
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 0
              }
            }
          }
        },
        labels: ['Results']
      }
    }
  },
  computed: {
    graphSeries() {
      return 100 * (this.amps[0] / this.amps[1])
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

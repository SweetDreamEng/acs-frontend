<template>
  <v-card>
    <v-card-subtitle class="d-flex justify-space-between">
      <strong>MC 1 Utilization</strong>
      <small class="ml-auto">1 Mon</small>
    </v-card-subtitle>
    <v-card-text>
      <apexchart
        v-if="!isLoading1"
        type="radialBar"
        height="150"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </v-card-text>
  </v-card>
</template>

<script>

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
  props: {
    label: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    series: {
      type: Array,
      default: () => [65]
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions: {
        chart: {
          height: 350,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%'
            },
            dataLabels: {
              value: {
                offsetY: -10,
                fontSize: '18px',
                color: '#4CAF50'
              }
            },
            track: {
              background: '#ccc'
            }
          }
        },
        fill: {
          colors: ['#4CAF50']
        },
        labels: ['']
      }
    }
  },
  computed: {
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
<template>
  <v-card height="100%">
    <v-card-subtitle class="d-flex justify-space-between">
      <strong>Target & Actuals</strong>
      <small class="ml-auto">1 Mon</small>
    </v-card-subtitle>
    <v-card-text>
      <apexchart
        type="area"
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
      default: () => [
        {
          id: 1,
          name: 'Target',
          data: [88, 71, 84, 0, 0, 88, 88, 82, 88, 88, 0, 0, 48, 0, 88]
        },
        {
          id: 2,
          name: 'Actuals',
          data: [78, 61, 74, 0, 0, 78, 78, 72, 78, 78, 0, 0, 38, 0, 78]
        }
      ]
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions: {
        chart: {
          height: 120,
          type: 'area',
          sparkline: {
            enabled: true
          },
          animations: {
            speed: 400
          }
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: this.xaxis
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
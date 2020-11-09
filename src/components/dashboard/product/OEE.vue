<template>
  <v-card height="100%">
    <v-card-subtitle class="d-flex justify-space-between">
      <strong>Utilization & Availability</strong>
      <small class="ml-auto">1 Mon</small>
    </v-card-subtitle>
    <v-card-text class="d-flex align-center">
      <apexchart
        v-if="!isLoading1"
        type="radialBar"
        height="150"
        :options="chartOptions0"
        :series="series0"
      >
      </apexchart>
      <div class="d-flex flex-column mr-2">
        <div>
          <v-chip
            class="mt-1"
            outlined
            style="width: 68px;"
            color="primary lighten-2"
            label
            dark
          >
            A: 100
          </v-chip>
        </div>
        <div>
          <v-chip
            class="mt-1"
            outlined
            style="width: 68px;"
            color="grey"
            label
            dark
          >
            P: 60
          </v-chip>
        </div>
        <div>
          <v-chip
            class="mt-1"
            outlined
            style="width: 68px;"
            color="orange"
            label
            dark
          >
            Q: 100
          </v-chip>
        </div>
      </div>
      <apexchart
        type="area"
        :options="chartOptions"
        :series="series"
        height="150"
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
    series0: {
      type: Array,
      default: () => [59]
    },
    series: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: 'Utilization',
          data: [88, 71, 84, 0, 0, 88, 88, 82, 88, 88, 0, 0, 48, 0, 88]
        },
        {
          id: 2,
          name: 'Availability',
          data: [78, 61, 74, 0, 0, 78, 78, 72, 78, 78, 0, 0, 38, 0, 78]
        }
      ]
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions0: {
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
                color: '#EF9A9A'
              }
            },
            track: {
              background: '#ccc'
            }
          }
        },
        fill: {
          colors: ['#EF9A9A']
        },
        labels: ['']
      },
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
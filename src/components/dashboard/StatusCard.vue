<template>
  <v-card class="d-flex flex-column flex-grow-1">

    <!-- loading spinner -->
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else class="d-flex flex-column flex-grow-1">
      <v-card-title>
        <div>{{ label }}</div>
      </v-card-title>

      <v-card-text>
        <apexchart
          v-if="!isLoading1"
          type="bar"
          height="260"
          :options="chartOptions"
          :series="series"
        >
        </apexchart>
      </v-card-text>
    </div>
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
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      series: [{
        name: 'A',
        data: [8.2, 10.8, 10.6, 10.8, 10.6]
      }],
      chartOptions: {
        chart: {
          type: 'bar'
        },
        plotOptions: {
          bar: {
            distributed: true,
            colors: {
            },
            dataLabels: {
              offsetX: 0,
              position: 'top',
              style: {
                fontSize: '14px',
                colors: ['#000']
              },
              formatter: function (val) {
                return val + 'k'
              }
            }
          }
        },
        dataLabels: {
          style: {
            fontSize: '14px',
            colors: ['#000']
          },
          offsetY: -20,
          formatter: function (val) {
            return val * 10
          }
        },
        xaxis: {
          categories: [
            '0.00 to 20.00',
            '20.00 to 40.00',
            '40.00 to 60.00',
            '60.00 to 80.00',
            '80.00 to 100.00'
          ],
          labels: {
            formatter: function (value) {
              return ''
            }
          }
        },
        yaxis: {
          // min: 6,
          max: 16.8,
          title: {
            text: 'Hours',
            style: {
              fontWeight: 500,
              fontSize: 18
            }
          },
          labels: {
            formatter: function (value) {
              return parseInt(value * 10)
            }
          }
        }
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
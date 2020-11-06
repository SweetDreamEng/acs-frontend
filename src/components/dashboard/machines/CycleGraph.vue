<template>
  <apexchart
    v-if="!isLoading1"
    type="radialBar"
    height="150"
    :options="chartOptions"
    :series="series"
  >
  </apexchart>
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
      default: () => [60.18]
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions: {
        chart: {
          type: 'radialBar'
          // sparkline: {
          //   enabled: true
          // }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                show: true,
                fontSize: '12px',
                color: '#222',
                offsetY: 64
              },
              value: {
                offsetY: -10,
                fontSize: '18px',
                color: undefined,
                formatter: function (val) {
                  return val
                }
              }
            }
          }
        },
        grid: {
          padding: {
            top: -10
          }
        },
        colors: ['#2364aa', '#3da5d9', '#73bfb8', '#fec601', '#ea7317'],
        fill: {
          colors: ['#2364aa', '#3da5d9', '#73bfb8', '#fec601', '#ea7317']
        },
        labels: ['Cycle Time']
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

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
      default: () => [83]
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions: {
        colors: ['#20E647'],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '70%',
              background: '#293450'
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15
              }
            },
            dataLabels: {
              name: {
                offsetY: -20,
                color: '#fff',
                fontSize: '13px'
              },
              value: {
                offsetY: 10,
                color: '#fff',
                fontSize: '24px',
                show: true
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            gradientToColors: ['#87D4F9'],
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Uptime']
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

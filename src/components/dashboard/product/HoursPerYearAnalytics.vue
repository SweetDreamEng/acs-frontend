<template>
  <v-card>
    <v-card-subtitle class="d-flex justify-space-between">
      <strong>Operational Efficiency</strong>
      <MonthlyWeekly />
    </v-card-subtitle>
    <v-card-text>
      <apexchart
        v-if="!isLoading1"
        type="radialBar"
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
import MonthlyWeekly from '../MonthlyWeekly'
export default {
  components: {
    MonthlyWeekly
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
    series: {
      type: Array,
      default: () => [67]
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
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '12px',
                color: '#222',
                offsetY: 70
              },
              value: {
                offsetY: -10,
                fontSize: '18px',
                color: undefined,
                formatter: function (val) {
                  return val + '%'
                }
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
          }
        },
        stroke: {
          dashArray: 4
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

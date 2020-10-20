<template>
  <v-card class="d-flex flex-column flex-grow-1">

    <div class="d-flex flex-column flex-grow-1">
      <v-card-title>
        <div>{{ label }}</div>
      </v-card-title>

      <v-card-text>
        <apexchart type="bar" height="220" :options="chartOptions" :series="series"></apexchart>
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
    }
  },
  data() {
    return {
      series: [{
        name: '0.00 to 20.00',
        data: [8.2]
      }, {
        name: '20.00 to 40.00',
        data: [10.8]
      }, {
        name: '40.00 to 60.00',
        data: [10.6]
      }, {
        name: '60.00 to 80.00',
        data: [10.8]
      }, {
        name: '80.00 to 100.00',
        data: [10.6]
      }],
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B'],
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      chartOptions: {
        chart: {
          type: 'bar',
          width: 180
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: 0,
          offsetY: -20,
          style: {
            fontSize: '14px',
            colors: ['#000']
          },
          formatter: function (val) {
            return val + 'k'
          }
        },
        xaxis: {
          categories: [0]
        },
        yaxis: {
          seriesName: ['a', 'b', 'c', 'd'],
          categories: [0, 5, 10, 15],
          title: {
            text: 'Count - Quantity',
            style: {
              fontWeight: 500,
              fontSize: 18
            }
          }
        }
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
</style>

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
          title: {
            text: 'Count - Quantity',
            style: {
              fontWeight: 500,
              fontSize: 18
            }
          },
          labels: {
            formatter: function (value) {
              return value + 'k'
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
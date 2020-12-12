<template>
  <apexchart
    type="bar"
    width="240"
    height="80"
    :options="chartOptions"
    :series="series"
  >
  </apexchart>
</template>

<script>
export default {
  data () {
    return {
      chartOptions: {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            colors: {
              ranges: [{
                from: 0,
                to: 100,
                color: '#4CAF50'
              }]
            }
          }
        },
        xaxis: {
          axisBorder: {
            show: false
          },
          labels: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          enabled: false
        },
        legend: {
          show: false
        },
        grid: {
          show: false
        }
      },

      series: [
        {
          name: 'Name',
          data: [100]
        }
      ]
    }
  }
}
</script>
<style scoped>
  a {
    text-decoration: none;
  }
</style>
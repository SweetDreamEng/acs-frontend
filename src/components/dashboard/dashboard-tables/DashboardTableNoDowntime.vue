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
          stackType: '100%',
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
        dataLabels: {
          enabled: true,
          formatter: function(val, opt) {
            return 'No Downtime'
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
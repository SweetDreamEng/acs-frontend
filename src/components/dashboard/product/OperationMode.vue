<template>
	<v-card height="100%">
    <v-card-title>Operation Mode</v-card-title>
    <v-card-text>
      <apexchart type="rangeBar" height="200" :options="chartOptions" :series="series"></apexchart>
    </v-card-text>
  </v-card>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      series: [
        {
          name: 'STOP MODE ENGAGED',
          data: [
            {
              x: 'Date',
              y: [
                new Date('2019-03-05').getTime(),
                new Date('2019-03-08').getTime()
              ]
            }
          ]
        },
        {
          name: 'MONITOR MODE ENGAGED',
          data: [
            {
              x: 'Date',
              y: [
                new Date('2019-03-08').getTime(),
                new Date('2019-03-12').getTime()
              ]
            },
            {
              x: 'Date',
              y: [
                new Date('2019-03-16').getTime(),
                new Date('2019-03-20').getTime()
              ]
            }
          ]
        },
        {
          name: 'RPM MODE ENGAGED',
          data: [
            {
              x: 'Date',
              y: [
                new Date('2019-03-20').getTime(),
                new Date('2019-03-28').getTime()
              ]
            },
            {
              x: 'Date',
              y: [
                new Date('2019-03-12').getTime(),
                new Date('2019-03-16').getTime()
              ]
            }
          ]
        },
        {
          name: 'WEIGHT MODE ENGAGED',
          data: [
            {
              x: 'Date',
              y: [
                new Date('2019-03-02').getTime(),
                new Date('2019-03-05').getTime()
              ]
            }
          ]
        }
      ],
      chartOptions: {
        chart: {
          type: 'rangeBar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '80%'
          }
        },
        xaxis: {
          type: 'datetime'
        },
        stroke: {
          width: 1
        },
        fill: {
          type: 'solid',
          opacity: 0.6
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
        yaxis: {
          show: false
        }
      }
    }
  }
}
</script>
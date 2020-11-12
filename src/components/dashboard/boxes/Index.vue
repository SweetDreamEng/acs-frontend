<template>
	<v-card>
    <div class="pa-2">
      <div class="d-flex flex-wrap justify-center">
        <v-slide-group
          multiple
          show-arrows
        >
          <v-slide-item
            v-for="(box, n) in boxes"
            :key="n"
          >
            <v-card
              :color="box.value < 60 ? 'red' : 'green'"
              dark
              width="100"
              height="140"
              class="d-flex flex-column flex-grow-1 mx-1"
            >
              <div class="pa-1">
                <div class="">{{ box.location }} </div>
                <div class="pl-2">
                  <small>OEE </small>
                  <div class="display-1">{{ box.value }}</div>
                </div>
              </div>
              <v-spacer></v-spacer>

              <apexchart
                type="area"
                height="40"
                :options="chartOptions"
                :series="box.series"
              ></apexchart>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </div>
    </div> 
  </v-card>
</template>
<script>
export default {
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#333333'
    },
    value: {
      type: String,
      default: ''
    },
    percentage: {
      type: Number,
      default: 0
    },
    percentageLabel: {
      type: String,
      default: 'vs. last week'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: true,
      customersSeries: [{
        name: 'Avg FPY',
        data: [
          ['2020-02-02', 13],
          ['2020-02-03', 11],
          ['2020-02-04', 13],
          ['2020-02-05', 12]
        ]
      }],
      chartOptions: {
        chart: {
          animations: {
            speed: 400,
            animateGradually: {
              enabled: false
            }
          },
          width: '100%',
          height: 60,
          type: 'area',
          sparkline: {
            enabled: true
          }
        },
        colors: ['#fff'],
        fill: {
          type: 'solid',
          colors: [this.color],
          opacity: 0.15
        },
        stroke: {
          curve: 'smooth',
          width: 1
        },
        xaxis: {
          type: 'datetime'
        },
        tooltip: {
          followCursor: true,
          theme: 'dark', //this.$vuetify.theme.isDark ? 'light' : 'dark',
          custom: function({ ctx, series, seriesIndex, dataPointIndex, w }) {
            const seriesName = w.config.series[seriesIndex].name
            const dataPoint = w.config.series[seriesIndex].data[dataPointIndex]

            return `<div class="rounded-lg pa-1 caption">
              <div class="font-weight-bold">${formatDate(dataPoint[0])}</div>
              <div>${dataPoint[1]} ${seriesName}</div>
            </div>`
          }
        },
        ...this.options
      },

      boxes: [
        {
          location: 'Location 1',
          color: 'green',
          value: 75,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 13],
              ['2020-02-03', 16],
              ['2020-02-04', 9],
              ['2020-02-05', 12]
            ]
          }]
        },
        {
          location: 'Location 2',
          color: 'green',
          value: 52,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 13],
              ['2020-02-03', 11],
              ['2020-02-04', 13],
              ['2020-02-05', 12]
            ]
          }]
        },
        {
          location: 'Location 3',
          color: 'red',
          value: 78,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 6],
              ['2020-02-03', 18],
              ['2020-02-04', 3],
              ['2020-02-05', 22]
            ]
          }]
        },
        {
          location: 'Location 4',
          color: 'green',
          value: 75,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 3],
              ['2020-02-03', 21],
              ['2020-02-04', 13],
              ['2020-02-05', 32]
            ]
          }]
        },
        {
          location: 'Location 5',
          color: 'red',
          value: 52,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 13],
              ['2020-02-03', 11],
              ['2020-02-04', 13],
              ['2020-02-05', 12]
            ]
          }]
        },
        {
          location: 'Location 6',
          color: 'red',
          value: 78,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 13],
              ['2020-02-03', 11],
              ['2020-02-04', 13],
              ['2020-02-05', 12]
            ]
          }]
        },
        {
          location: 'Location 7',
          color: 'green',
          value: 75,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 23],
              ['2020-02-03', 18],
              ['2020-02-04', 11],
              ['2020-02-05', 10]
            ]
          }]
        },
        {
          location: 'Location 8',
          color: 'red',
          value: 52,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 9],
              ['2020-02-03', 21],
              ['2020-02-04', 33],
              ['2020-02-05', 6]
            ]
          }]
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  }
}
</script>

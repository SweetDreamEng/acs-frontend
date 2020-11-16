<template>
  <v-card>
    <div class="d-flex flex-wrap justify-center pa-2">
      <v-slide-group
        multiple
        show-arrows
      >
        <v-slide-item
          v-for="(box, n) in boxes"
          :key="n"
        >
          <v-card
            :color="box.value < 60 ? 'error' : 'success darken-1'"
            dark
            max-width="100"
            height="100"
            class="d-flex flex-column flex-grow-1 mx-1"
          >
            <div class="pa-1 pb-0">
              <div class="caption">{{ box.zone }} </div>
              <div class="pl-2">
                <small>OEE </small>
                <div class="">{{ box.value }}</div>
              </div>
            </div>
            <v-spacer></v-spacer>

            <apexchart
              type="area"
              height="30"
              :options="chartOptions"
              :series="box.series"
            ></apexchart>
          </v-card>
        </v-slide-item>
      </v-slide-group>
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
          zone: 'Zone 1',
          value: 75,
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
          zone: 'Zone 2',
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
          zone: 'Zone 3',
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
          zone: 'Zone 4',
          value: 75,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 13],
              ['2020-02-03', 11],
              ['2020-02-04', 13],
              ['2020-02-05', 12]
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

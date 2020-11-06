<template>
  <v-card class="d-flex flex-column flex-grow-1">
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else class="d-flex flex-column flex-grow-1">
      <v-card-title class="primary--text">
        {{ label }}
      </v-card-title>

      <div class="d-flex flex-column flex-grow-1">
        <div class="px-2 pb-2">
          <div class="">
            <v-progress-linear
              color="secondary"
              rounded
              value="100"
              height="16"
            >
              <template v-slot="{ }">
                <strong class="white--text">7h10m</strong>
              </template>
            </v-progress-linear>
            <div class="text-right"><small>10/16/2020 20:00</small></div>
            <div>
              <v-icon small color="secondary">mdi-magnify</v-icon><small class="mx-1">Zoom</small>
              <v-icon small color="secondary">mdi-flag</v-icon><small class="mx-1">Marker</small>
              <v-icon small color="secondary">mdi-chart-areaspline</v-icon><small class="mx-1">Lines</small>
            </div>
            <apexchart
              type="area"
              height="250"
              :options="chartOptions"
              :series="series"
            >
            </apexchart>
          </div>
        </div>
      </div>
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
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      series: [{
        name: 'series1',
        data: [
          {
            x: 'Dec 25 2017',
            y: 14
          },{
            x: 'Dec 26 2017',
            y: 16
          },{
            x: 'Dec 27 2017',
            y: 18
          }
        ]
      }],
      chartOptions: {
        chart: {
          height: 250,
          type: 'area',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ['2020-10-16T13:00', '2020-10-16T14:00', '2020-10-16T15:00', '2020-10-16T16:00', '2020-10-16T17:00', '2020-10-16T18:00', '2020-10-16T19:00']
        },
        yaxis: {
          type: 'datetime'
        },
        tooltip: {
          x: {
            format: 'yyyy-mm-dd HH:mm'
          }
        }
      }
    }
  },
  computed: {
  }
}
</script>

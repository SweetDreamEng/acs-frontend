<template>
  <div>
    <v-card width="50%">
      <v-card-title>
        Location 1
        <v-spacer></v-spacer>
        <div>
          <v-btn icon class="ml-auto" @click="">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <goal-graph></goal-graph>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import VueSpeedometer from 'vue-speedometer'
const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46]

import GoalGraph from './machines/GoalGraph'
export default {
  components: { GoalGraph },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      seriesUpTime: [49.8],

      chartOptionsUpTime: {
        labels: ['Percent']
      },

      showChart: false,
      series: [{
        data: sparklineData
      }],
      chartOptions: {
        chart: {
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3
        },
        yaxis: {
          min: 0
        },
        colors: ['#DCE6EC'],
        title: {
          text: '$424,652',
          offsetX: 0,
          style: {
            fontSize: '24px'
          }
        },
        subtitle: {
          text: 'Sales',
          offsetX: 0,
          style: {
            fontSize: '14px'
          }
        }
      },
      seriesSpark2: [{
        data: sparklineData
      }],
      chartOptionsSpark2: {
        chart: {
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3
        },
        yaxis: {
          min: 0
        },
        colors: ['#DCE6EC'],
        title: {
          text: '$235,312',
          offsetX: 0,
          style: {
            fontSize: '24px'
          }
        },
        subtitle: {
          text: 'Expenses',
          offsetX: 0,
          style: {
            fontSize: '14px'
          }
        }
      },
      seriesSpark3: [{
        data: sparklineData
      }],
      chartOptionsSpark3: {
        chart: {
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3
        },
        xaxis: {
          crosshairs: {
            width: 1
          }
        },
        yaxis: {
          min: 0
        },
        title: {
          text: '$135,965',
          offsetX: 0,
          style: {
            fontSize: '24px'
          }
        },
        subtitle: {
          text: 'Profits',
          offsetX: 0,
          style: {
            fontSize: '14px'
          }
        }
      }
    }
  },
  mounted() {
    this.showChart = true
  }
}
</script>

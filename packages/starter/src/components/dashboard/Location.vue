<template>
  <div>
    <v-card>
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
          <div>
            <v-btn icon class="ml-auto" @click="">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
        </div>
      </v-card-title>
       <v-card-text>
<!--        <v-row dense>
          <v-col xs="12" sm="6" md="3">
            <div class="">Machine status: <span class="subtitle-1 green--text">Running</span></div>
            <div class="">Energy usage/cycle: <span class="subtitle-1 primary--text">0.07kw</span></div>
            <div class="">Operational efficiency: <span class="subtitle-1 primary--text">75</span></div>
          </v-col>
          <v-col xs="12" sm="6" md="3">
            <div class="title text-xs-center">Capacity utilization</div>
            <vue-speedometer
              :maxSegmentLabels="0"
              :width="200"
              :height="190"
              :ringWidth="25"
              :needleHeightRatio="0.7"
              :segments="70"
              needleColor="#092954"
              :value="40"
              currentValueText="4"
              style="text-align: center"
              :forceRender="true"
            />
          </v-col>
          <v-col xs="12" sm="6" md="4">
            <div class="title text-xs-center">Cycle Time</div>
            <div class="d-flex">
              <div>
                <vue-speedometer
                  :width="200"
                  :height="140"
                  :ringWidth="25"
                  :needleHeightRatio="0.7"
                  :maxSegmentLabels="0"
                  :segments="3"
                  :customSegmentStops="[0, 900, 1000]"
                  :segmentColors='["#AAA", "#092954"]'
                  needleColor="#092954"
                  :value="900"
                  currentValueText="40"
                  style="text-align: center"
                  :forceRender="true"
                />
                <div class="title text-xs-center">
                  Actual Target
                  <v-icon color="green" style="font-size: 50px;">mdi-menu-down</v-icon>
                </div>
              </div>
              <div class="">
                <div class="text-right">
                  <div class="title">6.18</div>
                  <div class="title">6.20</div>
                  <div class="display-1">-0.02</div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col xs="12" sm="6" md="2">
            <div class="title text-xs-center">Uptime percentage</div>
            <apexchart type="radialBar" height="140" :options="chartOptions" :series="series"></apexchart>
          </v-col>
        </v-row> -->
        <div class="row" v-if="showChart">
          <div class="col-md-4">
            <div class="text-h5 font-weight-bold black--text">$424,652</div>
            <div>Sales</div>
            <vue-speedometer
              :maxSegmentLabels="0"
              :width="200"
              :height="190"
              :ringWidth="20"
              :needleHeightRatio="0.7"
              :segments="70"
              needleColor="#092954"
              :value="40"
              currentValueText="4"
              style="text-align: center"
              :forceRender="true"
            />
          </div>
          <div class="col-md-4">
            <div class="text-h5 font-weight-bold black--text">$424,652</div>
            <div>Sales</div>
            <vue-speedometer
              :width="200"
              :height="140"
              :ringWidth="20"
              :needleHeightRatio="0.7"
              :maxSegmentLabels="0"
              :segments="3"
              :customSegmentStops="[0, 900, 1000]"
              :segmentColors='["#AAA", "#092954"]'
              needleColor="#092954"
              :value="900"
              currentValueText="40"
              style="text-align: center"
              :forceRender="true"
            />
          </div>
          <div class="col-md-4">
            <div class="text-h5 font-weight-bold black--text">$424,652</div>
            <div>Profits</div>
            <apexchart type="radialBar" height="200" :options="chartOptionsUpTime" :series="seriesUpTime"></apexchart>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import VueSpeedometer from 'vue-speedometer'
const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46]

export default {
  components: { VueSpeedometer },
  props: ['title'],
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

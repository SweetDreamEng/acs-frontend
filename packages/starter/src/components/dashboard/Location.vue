<template>
  <div>
    <v-card color="blue-grey lighten-4">
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
        <v-row dense>
          <v-col xs="12" sm="6" md="3">
            <v-card outlined height="300">
              <v-card-text>
                <div class="">Machine status: <span class="subtitle-1 green--text">Running</span></div>
                <div class="">Energy usage/cycle: <span class="subtitle-1 primary--text">0.07kw</span></div>
                <div class="">Operational efficiency: <span class="subtitle-1 primary--text">75</span></div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xs="12" sm="6" md="3">
            <v-card outlined height="300">
              <v-card-text>
                <div class="title text-center">Capacity utilization</div>
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
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xs="12" sm="6" md="4">
            <v-card outlined height="300">
              <v-card-text>
                <div class="title text-center">Cycle Time</div>
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
                    <div class="title text-center">
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
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xs="12" sm="6" md="2">
            <v-card outlined height="300">
              <v-card-text>
                <div class="title text-center">Uptime percentage</div>
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import VueSpeedometer from 'vue-speedometer'
export default {
  components: { VueSpeedometer },
  props: ['title'],
  data() {
    return {
      series: [49.8],

      chartOptions: {
        labels: ['Percent']
      }
    }
  }
}
</script>

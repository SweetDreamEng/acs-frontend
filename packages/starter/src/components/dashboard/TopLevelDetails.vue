<template>
  <div>
    <div>
        <v-row dense>
          <v-col cols="12" sm="12" md="6">
            <v-card
              outlined
              tile
              class="d-flex flex-column justify-space-between"
              height="100%"
            >
              <v-card-title>
                Operational Efficiency (OEE)
                <v-menu offset-y left transition="slide-y-transition">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      v-on="on"
                      small
                      class="ml-auto"
                    >
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>

                  <v-list dense>
                    <v-list-item
                      v-for="(item, index) in viewOptions"
                      :key="index"
                      link
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
              <div v-if="showChart">
                <apexchart
                  type="line"
                  height="160"
                  :options="chartOptions"
                  :series="series">
                </apexchart>
              </div>
              <div>
                <v-divider></v-divider>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-title>First pass yield</v-list-item-title>
                    <v-list-item-subtitle class="text-h4 primary--text">92%</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
                <div class="text-center"><span class="red--text">2%</span> decline today</div>
                <v-card-actions>
                  <v-btn
                    text
                    color="red accent-4"
                  >
                   Alarms reported
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon  color="red darken-2">mdi-bell</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-card
              outlined
              tile
              class="d-flex flex-column justify-space-between"
              height="100%"
            >
              <v-card-title>
                Downtime
                <v-menu offset-y left transition="slide-y-transition">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      v-on="on"
                      small
                      class="ml-auto"
                    >
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>

                  <v-list dense>
                    <v-list-item
                      v-for="(item, index) in viewOptions"
                      :key="index"
                      link
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
              <div v-if="showChart">
                <apexchart
                  type="donut"
                  height="160"
                  :options="chartOptions2"
                  :series="series2"
                ></apexchart>
              </div>
              <div>
                <v-divider></v-divider>
                <v-list class="transparent">
                  <v-list-item>
                  <v-list-item-title>Cycle time</v-list-item-title>
                  <v-list-item-subtitle class="text-h4 primary--text">11.83<span class="caption">seconds</span></v-list-item-subtitle>
                  </v-list-item>
                </v-list>
                <div class="text-center"><span class="green--text">11%</span> increase today</div>
                <v-card-actions>
                  <v-btn
                    text
                    color="green accent-4"
                  >
                  View Report
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon  color="green ">mdi-chart-bar</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showChart: false,
      series: [{
        name: 'Desktops',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: '',
          align: 'left'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        grid: {
          show: false
        }
      },
      series2: [44, 55, 41],
      chartOptions2: {
        chart: {
          type: 'donut'
        },
        labels: ['Unplanned', 'Planned', 'Idle']
      },
      viewOptions: [
        'Daily', 'Weekly', 'Montyly'
      ]
    }
  },
  mounted() {
    this.showChart = true
  }
}
</script>
<style scoped>
  .v-card__title {
    word-break: break-word;
  }
</style>
<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    height="100%"
    light
  >
    <v-card-title>
      Operational Efficiency (OEE)
      <v-menu offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            small
            class="ml-auto"
            v-on="on"
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
        :series="series"
      >
      </apexchart>
    </div>
    <div>
      <v-divider></v-divider>
      <!-- <v-list class="transparent">
                <v-list-item>
                  <v-list-item-title>First pass yield</v-list-item-title>
                  <v-list-item-subtitle class="text-h4 primary--text">92%</v-list-item-subtitle>
                </v-list-item>
              </v-list>
              <div class="text-center"><span class="red--text">2%</span> decline today</div> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="red"
          @click="alarmReports=true"
        >
          Alarms reported
          <v-icon right>mdi-bell</v-icon>
        </v-btn>
      </v-card-actions>
    </div>

    <v-dialog v-model="alarmReports" max-width="400">
      <alarm-reports @close="alarmReports=false"></alarm-reports>
    </v-dialog>
  </v-card>
</template>

<script>
import AlarmReports from './AlarmReports'
export default {
  components: {
    AlarmReports
  },
  data() {
    return {
      showChart: false,
      series: [{
        name: 'OEE',
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
          curve: 'smooth',
          width: '2'
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
      viewOptions: [
        'Daily', 'Weekly', 'Monthly'
      ],

      alarmReports: false
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

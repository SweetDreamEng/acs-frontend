<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    height="100%"
    light
  >
    <v-card-title class="mb-n4">
      Operational Efficiency (OEE)
    </v-card-title>
    <div v-if="showChart">
      <apexchart
        type="line"
        height="120"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </div>
    <div>
      <v-card-actions class="mt-n4">
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
          axisBorder: {
            show: false
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        yaxis: {
          labels: {
            show: false
          }
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

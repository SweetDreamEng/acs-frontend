<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    height="100%"
    light
    :loading="isAlarmsReportLoading"
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
          :disabled="alarmsReports.alarms && alarmsReports.alarms.length === 0"
          @click="showAlarmReports"
        >
          {{ alarmsReports.alarms && alarmsReports.alarms.length !== 0 ? 'Alarms Reported' : 'No Alarms Reported' }}
          <v-icon right>$mdi-bell</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
    <v-dialog v-model="alarmReports" max-width="400">
      <alarm-reports :alarms-reports="alarmsReports.alarm_types" :active-alarms="activeAlarms" @close="alarmReports=false"></alarm-reports>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
        colors: [this.$vuetify.theme.themes.light.primary],
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
        },
        tooltip: {
          enabled: false
        }
      },
      viewOptions: [
        'Daily', 'Weekly', 'Monthly'
      ],

      alarmReports: false
    }
  },
  computed: {
    ...mapState('alarms', ['isAlarmsReportLoading', 'alarmsReports']),
    ...mapState({
      companyId: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.id : 0
    }),
    activeAlarms() {
      return this.alarmsReports.alarms ? this.alarmsReports.alarms.filter((alarm) => alarm.active) : []
    }
  },
  mounted() {
    this.showChart = true
    // this.getAlarmsReports({
    //   companyId: this.companyId
    // })
  },
  methods: {
    ...mapActions({
      'getAlarmsReports': 'alarms/getAlarmsReports'
    }),
    showAlarmReports() {
      this.alarmReports = true
    }
  }
}
</script>
<style scoped>
  .v-card__title {
    word-break: break-word;
  }
</style>

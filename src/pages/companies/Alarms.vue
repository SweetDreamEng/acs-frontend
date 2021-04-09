<template>
  <div class="d-flex flex-grow-1 flex-column mt-1">
    <br>

    <v-card :loading="loadingAlarmsPerMachine" :disabled="loadingAlarmsPerMachine">
      <v-card-title>
        Alarms By Machine
        <v-btn
          icon
          class="ml-auto"
          @click="$emit('showTimeRange')"
        >
          <v-icon>$mdi-filter</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <alarms-by-machine
          :devices="devices"
        >
        </alarms-by-machine>
      </v-card-text>
    </v-card>

    <br>

    <v-card>
      <v-card-title>Alarm Distribution</v-card-title>
      <v-card-text>
        <line-chart
          :series="alarmsDistribution"
          :drop-down-list="devices"
          :sub-title="'Long-Term'"
          @selectMachine="handleAlarmDistribution"
        >
        </line-chart>
      </v-card-text>
    </v-card>

    <br>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PieChart from '../../components/alarms/charts/PieChart'
import LineChart from '../../components/alarms/charts/LineChart'
import AlarmsByMachine from '../../components/alarms/companies/CompaniesAlarmsByMachine'

export default {
  components: {
    LineChart,
    AlarmsByMachine
  },
  data() {
    return {
      loading: true,
      categories: [],
      selectedMachineName: ''
    }
  },
  computed: {
    ...mapState({
      devices: (state) => state.devices.data,
      loadingAlarmsPerMachine: (state) => state.alarms.loadingAlarmsPerMachine,
      alarmsDistribution: (state) => state.alarms.alarmsDistribution
    })
  },
  async mounted() {
    try {
      await this.getAllDevices()
      await this.getCompanies()
    } catch (err) {
      console.log(err)
    }
    
    this.handleAlarmDistribution(this.devices[0].name)
  },
  methods: {
    ...mapActions({
      getCustomerDevices: 'devices/getCustomerDevices',
      getAlarmsByMachine: 'alarms/getAlarmsByMachine',
      'getAlarmsDistributionByMachine': 'alarms/getAlarmsDistributionByMachine'
    }),
    handleAlarmDistribution (machineName) {
      this.getAlarmsDistributionByMachine({ machine_name: machineName })
    }
  }
}
</script>

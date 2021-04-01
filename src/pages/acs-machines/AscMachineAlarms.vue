<template>
  <div class="d-flex flex-grow-1 flex-column mt-1">

    <br>

    <alarms-per-customer></alarms-per-customer>

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
import LineChart from '../../components/alarms/charts/LineChart'
import AlarmsPerCustomer from '../../components/dashboard/alarms/AlarmsPerCustomer'
import AlarmsPerMachine from './AscMachineAlarmsPerMachine'

export default {
  components: {
    LineChart,
    AlarmsPerCustomer
  },

  data() {
    return {
      loading: true,
      categories: []
    }
  },
  computed: {
    ...mapState({
      devices: (state) => state.devices.data,
      companies: (state) => state.companies.companies,
      alarmsDistribution: (state) => state.alarms.alarmsDistribution
    })
  },
  mounted() {
    this.getAllDevices()
    this.getCompanies()
  },
  methods: {
    ...mapActions({
      'getAllDevices': 'devices/getAllDevices',
      'getCompanies': 'companies/getCompanies',
      'getAlarmsDistributionByMachine': 'alarms/getAlarmsDistributionByMachine'
    }),
    handleAlarmDistribution (machineName) {
      this.getAlarmsDistributionByMachine({ machine_name: machineName })
    }
  }
}
</script>

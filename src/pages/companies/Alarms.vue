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
      columnSeries: [{
        name: 'BD Batch Blender',
        data: [44, 55, 41, 67, 22, 43]
      }],
      lineSeries: [{
        name: 'Accumeter Ovation Continuous Blender',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      },
      {
        name: 'GH Gravimetric Extrusion Control Hopper',
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
      },
      {
        name: 'GH-F Gravimetric Additive Feeder',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
      },
      {
        name: 'VTC Plus Conveying System',
        data: [30, 43, 42, 72, 83, 98, 19, 47, 66, 81, 22, 45]
      },
      {
        name: 'NGX Dryer',
        data: [57, 87, 94, 79, 35, 88, 25, 58, 58, 82, 13, 99]
      }],
      responseSeries: [{
        name: 'Accumeter Ovation Continuous Blender',
        data: [0, 37, 50, 35, 10, 0, 0, 2, 3, 0, 0, 0]
      },
      {
        name: 'GH Gravimetric Extrusion Control Hopper',
        data: [8, 0, 12, 7, 0, 0, 0, 0, 0, 5, 0, 0]
      },
      {
        name: 'GH-F Gravimetric Additive Feeder',
        data: [8, 2, 0, 0, 0, 3, 4, 5, 0, 0, 0, 0]
      },
      {
        name: 'VTC Plus Conveying System',
        data: [3, 0, 4, 7, 0, 9, 1, 4, 0, 0, 0, 5]
      },
      {
        name: 'NGX Dryer',
        data: [0, 0, 0, 0, 0, 0, 2, 8, 0, 0, 2, 0]
      }],
      pieSeries: [231.225, 529.313, 526.458],
      pieHours: [2000, 1600, 200],
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
  mounted() {
    this.getCustomerDevices()
    this.getAlarmsByMachine()
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

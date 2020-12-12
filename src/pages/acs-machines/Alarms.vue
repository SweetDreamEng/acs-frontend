<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-card elevation="10">
      <v-sheet>
        <v-row>
          <v-col cols="12">
            <pie-chart
              :series="pieSeries"
              :hours="pieHours"
            >
            </pie-chart>
          </v-col>    
          <v-col cols="12">
            <column-chart
              :title="'Alarm Per Type'"
              :series="columnSeries"
              :dropDownList="machineNames"
              :categories="categories"
              @selectMachine="handleSelectMachine"              
            >
            </column-chart>
          </v-col>
          <v-col cols="12">
            <line-chart
              :title="'Alarm Distribution'"
              :series="lineSeries"
              :dropDownList="machineNames"
              :subTitle="'Long-Term'"
            >
            </line-chart>
            <line-chart
              :series="lineSeries"
              :dropDownList="machineNames"
              :subTitle="'Short-Term'"
            >
            </line-chart>
          </v-col>
          <v-col cols="12">
            <line-chart
              :title="'Alarm response time'"
              :series="responseSeries"
              :dropDownList="machineNames"
            >
            </line-chart>
          </v-col>
          <v-col cols="12">
            <alarms-per-machine
              :title="'Alarms Per Machine'"
              :dropDownList="machineNames"
            >
            </alarms-per-machine>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import ColumnChart from '../../components/alarms/charts/ColumnChart'
import PieChart from '../../components/alarms/charts/PieChart'
import LineChart from '../../components/alarms/charts/LineChart'
import AlarmsPerMachine from './AlarmsPerMachine'
// import TrendPercent from '../../common/TrendPercent'

function formatDate(date) {
  return date ? moment(date).format('D MMM') : ''
}

/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
export default {
  components: {
    ColumnChart,
    PieChart,
    LineChart,
    AlarmsPerMachine
    // TrendPercent
  },
  // props: {
  //   series: {
  //     type: Array,
  //     default: () => ([])
  //   },
  //   label: {
  //     type: String,
  //     default: ''
  //   },
  //   color: {
  //     type: String,
  //     default: '#092954'
  //   },
  //   value: {
  //     type: String,
  //     default: ''
  //   },
  //   percentage: {
  //     type: Number,
  //     default: 0
  //   },
  //   percentageLabel: {
  //     type: String,
  //     default: 'vs. last week'
  //   },
  //   options: {
  //     type: Object,
  //     default: () => ({})
  //   }
  // },
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
      categories: null,
      selectedMachineName: null
    }
  },
  computed: {
    ...mapState({
      machines: (state) => state.machines.machines,
      alarmTypes: (state) => state.alarms.alarmTypes
    }),
    machineNames() {
      let names = []

      if (this.machines.length) {
        names = this.machines.map((machine) => machine.name)
      }

      return names
    }
  },
  mounted() {
    this.getMachines()

    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  methods: {
    ...mapActions({
      'getMachines': 'machines/getMachines',
      'getCorrespondingAlarmTypes': 'alarms/getCorrespondingAlarmTypes'
    }),
    handleSelectMachine (selectedMachineName) {
      this.getMachines().then(() => {
        let machine = this.machines.filter((machine) => machine.name === selectedMachineName)
        
        machine = machine[0]
        this.getCorrespondingAlarmTypes(machine.id).then(() => {

          const category_data = []
          const series_data = []

          if (this.alarmTypes.length) {

            for (let i = 0; i < this.alarmTypes.length; i ++) {
              category_data.push([`${this.alarmTypes[i].name}`])
              series_data.push(Math.floor(Math.random() * 1000))
            }
            this.categories = category_data
            this.columnSeries = [{
              name: selectedMachineName,
              data: series_data
            }]
          }
        })
      })      
    }
  }
}
</script>

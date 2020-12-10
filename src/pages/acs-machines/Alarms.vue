<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-card elevation="10">
      <v-sheet class="my-n4 mb-n8 pb-8">
        <v-row>
          <v-col cols="6">
            <column-chart
              :series="customersSeries"
              :dropDownList="machineNames"
              :categories="categories"
              @selectMachine="handleSelectMachine"              
            >
            </column-chart>
          </v-col>
          <v-col cols="6">
            <pie-chart
              :series="pieSeries"
            >
            </pie-chart>
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
import ColumnChart from '../../components/apexcharts/ColumnChart'
import PieChart from '../../components/apexcharts/PieChart'
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
    PieChart
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
      customersSeries: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
      }],
      pieSeries: [2, 7, 5],
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
          this.customersSeries = [{
            name: selectedMachineName,
            data: series_data
          }]
        }
      })
    }
  }
}
</script>

<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-row>
      <v-col cols="12">
        <pie-chart
          :title="'All Alarms - Severity'"
          :series="severityChartSeries"
          :times="severityChartTimes"
          :labels="severityChartLabels"              
          @onDateRangeSelected="handleDateRangeSelected"
        >
        </pie-chart>
      </v-col>    
      <v-col cols="12">
        <column-chart
          :title="'Alarms Per Type'"
          :series="alarmPerTypeChartSeries"
          :dropDownList="machineNames"
          :categories="alarmPerTypeChartCategories"
          @selectMachine="updateAlarmPerTypeChartSeries"
          @onDateRangeSelected="handleDateRangeSelected"              
        >
        </column-chart>
      </v-col>
      <v-col cols="12">
        <line-chart
          :title="'Alarms Distribution'"
          :series="alarmDistributionChartSeries"
          :dropDownList="machineNames"
          @selectMachine="updateAlarmDistributionChartSeries"
          @onDateRangeSelected="handleDateRangeSelected"
        >
        </line-chart>
      </v-col>
      <!-- <v-col cols="12">
        <line-chart
          :title="'Alarm response time'"
          :series="responseSeries"
          :dropDownList="machineNames"
        >
        </line-chart>
      </v-col> -->
      <v-col cols="12">
        <alarms-per-machine
          :title="'Alarms Per Machine'"
          :alarmsAmountPerMachine="alarmsAmountPerMachine"              
          @onDateRangeSelected="handleDateRangeSelected"
        >
        </alarms-per-machine>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment, { max } from 'moment'
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
  },
  data() {
    return {
      loading: true,
      alarmPerTypeChartSeries: [],
      alarmPerTypeChartCategories: [],
      alarmDistributionChartSeries: [],
      severityChartSeries: [],
      severityChartTimes: [],
      severityChartLabels: [],
      selectedMachineName: null
    }
  },
  computed: {
    ...mapState({
      machines: (state) => state.machines.machines,
      severity: (state) => state.alarms.severity,
      companyId: (state) => state.auth.user.companyId,
      alarmsPerType: (state) => state.alarms.alarmsPerType,
      alarmsDistribution: (state) => state.alarms.alarmsDistribution,
      alarmsAmountPerMachine: (state) => state.alarms.alarmsAmountPerMachine,
      dateRange: (state) => state.alarms.dateRange,
      machineName: (state) => state.alarms.selectedMachineName
    }),
    machineNames() {
      let names = []

      if (this.machines.length) {
        names = this.machines.map((machine) => machine)
      }

      return names
    }
  },
  mounted() {
    this.updateSeverityChartData()
    this.updateAlarmsAmountPerMachineByCompanyId()
    this.getMachinesByCompanyId({ 
      companyId: this.companyId
    }).then(() => {
      if (this.machines.length) {
        this.updateAlarmPerTypeChartSeries(this.machines[0].name)
        this.updateAlarmDistributionChartSeries(this.machines[0].name)
      }      
    })

    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  methods: {
    ...mapActions({
      'getMachinesByCompanyId': 'machines/getMachinesByCompanyId',
      'getSeverityByCompanyId': 'alarms/getSeverityByCompanyId',
      'getAlarmsPerTypeByMachine': 'alarms/getAlarmsPerTypeByMachine',
      'getAlarmsDistributionByMachine': 'alarms/getAlarmsDistributionByMachine',
      'getAlarmsAmountPerMachineByCompanyId': 'alarms/getAlarmsAmountPerMachineByCompanyId',
      'setDateRange': 'alarms/setDateRange'
    }),
    updateSeverityChartData () {
      this.getSeverityByCompanyId({
        company_id: this.companyId,
        dates: this.dateRange['All Alarms - Severity']
      }).then(() => {
        this.severityChartLabels = []
        this.severityChartSeries = []
        this.severityChartTimes = []
        for (let i = 0; i < 3; i ++) {
          this.severityChartLabels.push(this.severity[i].alarm_type_name)
          this.severityChartSeries.push(parseInt(this.severity[i].values))
          this.severityChartTimes.push(parseInt(this.severity[i].times))
        }
      })
    },
    updateAlarmPerTypeChartSeries (selectedMachineName) {
      this.getAlarmsPerTypeByMachine({
        company_id: this.companyId,
        machine_name: selectedMachineName,
        dates: this.dateRange['Alarms Per Type']
      }).then(() => {
        this.alarmPerTypeChartSeries[0] = {
          'name': this.machineName['Alarms Per Type'],
          'data': this.alarmsPerType.map((item) => item.values)
        }
        this.alarmPerTypeChartCategories = this.alarmsPerType.map((item) => item.name)
        console.log(this.alarmsPerTypeChartCategories)
      })
    },
    updateAlarmDistributionChartSeries (selectedMachineName) {
      this.getAlarmsDistributionByMachine({
        company_id: this.companyId,
        machine_name: selectedMachineName,
        dates: this.dateRange['Alarms Distribution']
      }).then(() => {
        this.alarmDistributionChartSeries = this.alarmsDistribution.slice(0, this.alarmsDistribution.length)
      })
    },
    updateAlarmsAmountPerMachineByCompanyId () {
      this.getAlarmsAmountPerMachineByCompanyId({
        company_id: this.companyId,
        dates: this.dateRange['Alarms Per Machine']
      })
    },
    handleDateRangeSelected (type, dates) {
      if (dates[0] > dates[1]) {
        const temp = dates[0].slice(0)

        dates[0] = dates[1].slice(0)
        dates[1] = temp.slice(0)
      }
      
      switch (type) {
      case 'All Alarms - Severity':
        this.setDateRange({ type, dates }).then(() => {
          this.updateSeverityChartData ()
        })
        break
      case 'Alarms Per Type':
        this.setDateRange({ type, dates }).then(() => {
          this.updateAlarmPerTypeChartSeries ()
        })
        break
      case 'Alarms Distribution':
        this.setDateRange({ type, dates }).then(() => {
          this.updateAlarmDistributionChartSeries ()
        })
        break
      case 'Alarms Per Machine':
        this.setDateRange({ type, dates }).then(() => {
          this.updateAlarmsAmountPerMachineByCompanyId ()
        })
        break
      }
    }
  }
}
</script>

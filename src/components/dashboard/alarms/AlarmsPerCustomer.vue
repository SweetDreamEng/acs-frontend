<template>
  <div class="d-flex flex-grow-1 flex-column mt-1">
    <v-card
      :loading="loading"
      :disabled="loading"
    >
      <v-card-title>Alarm Per Customers</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="3">
            <v-select
              v-model="selectedCompany"
              :items="companies"
              label="Company"
              placeholder="Company"
              item-value="id"
              item-text="name"
              outlined
              dense
              @change="getAlarms()"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="selectedConfiguration"
              :items="configurations"
              label="Machine Types"
              placeholder="Machine Types"
              item-value="id"
              item-text="name"
              outlined
              dense
              @change="getAlarms()"
            >
            </v-select>
          </v-col>
          <!-- <time-range-chooser
            :dlg="showTimeRangeChooser"
            :time-range="timeRange"
            @close="showTimeRangeChooser = false"
            @submit="onTimeRangeChanged"
          >
          </time-range-chooser> -->
        </v-row>
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

// import TimeRangeChooser from '../TimeRangeChooser1'

export default {
  components: {
    // TimeRangeChooser
  },

  data() {
    return {
      showTimeRangeChooser: false,
      loading: false,
      selectedCompany: 0,
      selectedConfiguration: 1
    }
  },
  computed: {
    ...mapState({
      companies: (state) => state.companies.companies,
      configurations: (state) => state.configurations.configurations,
      alarmsPerCustomerAndMachine: (state) => state.alarms.alarmsPerCustomerAndMachine
    }),
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '10px',
            colors: ['#000']
          }
        },
        xaxis: {
          categories: this.alarmsPerCustomerAndMachine.map((a) => a.name),
          axisBorder: {
            show: false
          },
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          }
        }
      }
    },
    series() {
      return [{
        name: 'Alarms',
        data: this.alarmsPerCustomerAndMachine.map((a) => a.counts)
      }]
    }
  },

  async mounted() {
    this.loading = true

    try {
      await Promise.all([
        this.getCompanies(),
        this.getConfigurations()
      ])

      this.selectedCompany = this.companies[0].id
      // this.selectedConfiguration = this.configurations[0].id
    } catch (error) {
      console.log(error)
    }

    try {
      await this.getAlarmsByCustomerAndConfiguration({
        companyId: this.selectedCompany,
        machineId: this.selectedConfiguration
      })
    } catch (error) {
      console.log(error)
    }

    this.loading = false
  },
  methods: {
    ...mapActions({
      getCompanies: 'companies/getCompanies',
      getConfigurations: 'configurations/getConfigurations',
      getAlarmsByCustomerAndConfiguration: 'alarms/getAlarmsByCustomerAndConfiguration'
    }),

    async getAlarms() {
      this.loading = true

      try {
        await this.getAlarmsByCustomerAndConfiguration({
          companyId: this.selectedCompany,
          machineId: this.selectedConfiguration
        })
      } catch (error) {
        console.log(error)
      }

      this.loading = false
    }
  }
}
</script>

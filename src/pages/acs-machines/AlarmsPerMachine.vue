<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" style="max-height: 100px">
          <v-row justify="space-between">
            <v-col cols="4" sm="4" md="4" lg="4">
              <v-select
                :items="dropDownList"
                label="Select Machine Types"
              ></v-select>
            </v-col>
            <v-col cols="4" sm="4" md="4" lg="4">
              <date-range-picker></date-range-picker>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" style="font-size: 20px;">
          All Machines <v-icon>mdi-near-me</v-icon>{{ totalAmount }}
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col 
              v-for="idx in 4"
              :key="idx"
              cols="3"
              xs="12"
              sm="12"
              md="6"
              lg="3"
            >
              <alarm-per-machine-card />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import DateRangePicker from '../../components/dashboard/DateRangePicker'
import AlarmPerMachineCard from '../../components/alarms/AlarmPerMachineCard'

export default {
  components: {
    DateRangePicker,
    AlarmPerMachineCard
  },
  props: {
    dropDownList: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: () => ('All Alarms- Severity')
    },
    series: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      totalAmount: Math.floor(Math.random() * 200) + 200,
      selectMachineName: 0
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'donut'
        },
        plotOptions: {
          pie: {
            customScale: 0.86,
            donut: {
              size: '72%'
            },
            dataLabels: {
              enabled: false
            }
          }
        },
        fill: {
          colors: ['#FF0000', '#FFDD00', '#00AAFF']
        },
        labels: ['Social Media', 'Blog', 'External'],
        legend: {
          show: false
        }
      }
    }
  }
}
</script>

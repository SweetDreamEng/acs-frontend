<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <div class="d-flex" style="justify-content: flex-end">
        <v-col cols="4">
          <date-range-picker
            @onDateRangeSelected="handleDateRangeSelected"
          ></date-range-picker>
        </v-col>
      </div>
      <v-row dense>
        <v-col
          xs="12"
          sm="12"
          md="3"
          lg="3"
        >
          <apexchart
            height="200"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </v-col>
        <v-col
          xs="12"
          sm="12"
          md="4"
          lg="4"
        >
          <v-row>
            <v-col cols="6">
              <alarm-amount-cards
                :iconType="'mdi-bell'"
                :amount="totalAmount"
                :time="'Total Alarms'"
              />
            </v-col>
            <v-col cols="6">
              <alarm-amount-cards 
                :iconType="'mdi-clock-outline'"
                :amount="totalTime"
                :time="'Total Times'"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          xs="12"
          sm="12"
          md="4"
          lg="4"
        >
          <v-row>
            <v-col 
              v-for="(value, idx) in 3"
              :key="value"
              cols="4">
              <alarm-amount-cards
                :iconColor="colors[idx]"
                :iconType="'mdi-near-me'"
                :amount="series[idx]"
                :time="alarmTimes[idx]"
                :isAlarmInfo="true"
              />
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
import DateRangePicker from '../../dashboard/DateRangePicker.vue'
import AlarmAmountCards from '../AlarmAmountCards.vue'

export default {
  components: {
    DateRangePicker,
    AlarmAmountCards
  },
  props: {
    title: {
      type: String,
      default: () => ('')
    },
    series: {
      type: Array,
      default: () => ([])
    },
    times: {
      type: Array,
      default: () => ([])
    },
    labels: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      selectMachineName: 0,
      colors : ['#FF0000', '#FFDD00', '#00AAFF']
    }
  },
  computed: {
    totalAmount() {
      let amount = 0

      this.series.forEach((item) => {
        amount += item
      })

      return amount
    },
    totalTime() {
      let value = 0
      
      this.times.forEach((item) => {
        value += item
      })

      return value
    },
    alarmTimes() {
      const data = this.times.map((item) => item + ' times')

      return data
    },
    chartOptions() {
      return {
        chart: {
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
        labels: this.labels,
        legend: {
          show: false
        }
      }
    }
  },
  methods: {
    handleDateRangeSelected (dates) {
      this.$emit('onDateRangeSelected', this.title, dates)
    }
  }
}
</script>

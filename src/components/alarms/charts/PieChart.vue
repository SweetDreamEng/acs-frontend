<template>
  <div>
    <v-row dense>
      <v-col md="3" sm="12">
        <apexchart
          height="200"
          :options="chartOptions"
          :series="series"
        >
        </apexchart>
      </v-col>
      <v-col md="4" sm="12">
        <v-row>
          <v-col cols="6">
            <alarm-amount-cards
              :icon-type="'mdi-bell'"
              :amount="totalAmount"
              :time="'Total Alarms'"
            />
          </v-col>
          <v-col cols="6">
            <alarm-amount-cards 
              :icon-type="'mdi-clock-outline'"
              :amount="totalTime"
              :time="'Total Times'"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col md="4" sm="12">
        <v-row>
          <v-col 
            v-for="(value, idx) in 3"
            :key="value"
            cols="4"
          >
            <alarm-amount-cards
              :icon-color="colors[idx]"
              :icon-type="'mdi-near-me'"
              :amount="series[idx]"
              :time="alarmTimes[idx]"
              :is-alarm-info="true"
            />
          </v-col>
        </v-row>
      </v-col>    
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AlarmAmountCards from '../AlarmAmountCards.vue'

export default {
  components: {
    AlarmAmountCards
  },
  props: {
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
              size: '60%'
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
  }
}
</script>

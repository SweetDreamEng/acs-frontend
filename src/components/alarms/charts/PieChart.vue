<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <div class="d-flex" style="justify-content: flex-end">
        <v-col cols="4">
          <date-range-picker></date-range-picker>
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
            height="150"
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
                :iconType="'mdi-near-me'"
                :amount="series[0] + series[1] + series[2]"
                :title="'Total Alarms'"
              />
            </v-col>
            <v-col cols="6">
              <alarm-amount-cards 
                :iconType="'mdi-clock-outline'"
                :amount="totalTime"
                :title="'Total hours'"
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
            <v-col cols="4">
              <alarm-amount-cards
                :iconColor="'#FF0000'"
                :iconType="'mdi-near-me'"
                :amount="series[0]"
                :title="'28:45 h'"
                :isAlarmInfo="true"
              />
            </v-col>
            <v-col cols="4">
              <alarm-amount-cards
                :iconColor="'#FFDD00'" 
                :iconType="'mdi-near-me'"
                :amount="series[1]"
                :title="'64:51 h'"
                :isAlarmInfo="true"
              />
            </v-col>
            <v-col cols="4">
              <alarm-amount-cards
                :iconColor="'#00AAFF'"
                :iconType="'mdi-near-me'"
                :amount="series[2]"
                :title="'04:59 h'"
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
      default: () => ('All Alarms- Severity')
    },
    totalAmount: {
      type: Number,
      default: () => (0)
    },
    totalHours: {
      type: Number,
      default: () => (0)
    },
    series: {
      type: Array,
      default: () => ([])
    },
    hours: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      selectMachineName: 0
    }
  },
  computed: {
    alarmTimes() {
      const times = this.hours.map((mins) => {
        const hours = Math.floor(mins / 60)
        const minutes = Math.round(mins % 60)

        return hours + ':' + minutes
      })

      return times
    },
    totalTime() {
      let totalmins = 0

      for (let i = 0; i < this.hours.length; i ++) {
        totalmins += this.hours[i]
      }
      const hours = Math.floor(totalmins / 60)
      const minutes = Math.round(totalmins % 60)

      return hours + ':' + minutes
    },
    chartOptions() {
      return {
        chart: {
          height: 500,
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
        labels: ['BD Batch Blender', 'GH-F Gravimetric Additive Feeder', 'GP Portable Chiller'],
        legend: {
          show: false
        }
      }
    }
  }
}
</script>

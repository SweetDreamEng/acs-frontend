<template>
  <v-card>
    <v-card-title v-if="subTitle != 'Short-Term'">{{ title }}</v-card-title>
    <v-card-text>
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
      <div style="overflow-x: hidden; overflow-y: hidden; width:100%">
        <v-card>
          <apexchart
            height="300"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import DateRangePicker from '../../dashboard/DateRangePicker.vue'

export default {
  components: {
    DateRangePicker
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
    dropDownList: {
      type: Array,
      default: () => ([])
    },
    categories: {
      type: Array,
      default: () => ([])
    },
    subTitle: {
      type: String,
      default: () => ('')
    }
  },
  data() {
    return {
      selectedMachineName: 0
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'line',
          toolbar: {
            show: false
          }
        },
        maintainAspectRatio: true,
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [5, 5, 5, 5, 5],
          curve: 'straight'
        },
        title: {
          text: this.subTitle,
          align: 'left'
        },        
        xaxis: {
          categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
        },
        grid: {
          borderColor: '#f1f1f1'
        }
      }
    }
  }
}
</script>

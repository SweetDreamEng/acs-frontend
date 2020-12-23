<template>
  <div>
    <v-row justify="space-between">
      <v-col cols="4">
        <v-select
          :items="dropDownList"
          label="Select Product"
          item-text="name"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col 
            v-for="idx in 4"
            :key="idx"
            lg="3"
            md="6"
            sm="12"
          >
            <alarm-per-machine-card />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import AlarmPerMachineCard from '../../components/alarms/AlarmPerMachineCard'

export default {
  components: {
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

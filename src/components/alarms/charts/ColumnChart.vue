<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-row justify="space-between">
        <v-col cols="4" sm="4" md="4" lg="4">
          <v-select
            v-model="selectedMachineName"
            :items="dropDownList"
            label="Select Machine Types"
            @input="$emit('selectMachine', selectedMachineName)"
          ></v-select>
        </v-col>
        <v-col cols="4" sm="4" md="4" lg="4">
          <date-range-picker></date-range-picker>
        </v-col>
      </v-row>
      <apexchart
        height="300"
        :options="chartOptions"
        :series="series"
      ></apexchart>
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
    }
  },
  mounted() {
    this.$emit('selectMachine', 'BD Batch Blender')
  },
  data() {
    return {
      selectedMachineName: 'BD Batch Blender'
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          categories: this.categories
        },
        legend: {
          show: false,
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      }
    }
  }
}
</script>

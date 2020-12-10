<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <div class="d-flex flex-column flex-grow-1 graphic-container"> 
        <v-select
          v-model="selectedMachineName"
          :items="dropDownList"
          label="Select Machine Types"
          @input="$emit('selectMachine', selectedMachineName)"
        ></v-select>               
        <apexchart
          height="300"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueApexCharts from 'vue-apexcharts'

export default {
  props: {
    title: {
      type: String,
      default: () => ('Alarm Per Type')
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
  data() {
    return {
      selectedMachineName: 0
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
            show: true
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
<style scoped>
.graphic-container {
  max-width: 600px;
}
</style>

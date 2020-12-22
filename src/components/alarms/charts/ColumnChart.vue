<template>
  <div>
    <v-row justify="space-between">
      <v-col cols="4">
        <v-select
          v-model="selectedMachineName"
          :items="dropDownList"
          item-text="name"
          item-value="id"
          outlined
          dense
          label="Select Product"
          @input="$emit('selectMachine', selectedMachineName)"
        ></v-select>
      </v-col>
    </v-row>
    <apexchart
      height="300"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  components: {
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
  data() {
    return {
      selectedMachineName: null
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
  },
  mounted() {
    this.selectedMachineName = 'ddd'
  },
  methods: {
    handleDateRangeSelected (dates) {
      this.$emit('onDateRangeSelected', this.title , dates)
    }
  }
}
</script>

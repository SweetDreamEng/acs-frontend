<template>
  <div>
    <v-row justify="space-between">
      <v-col cols="4">
        <v-select
          v-model="selectedMachineName"
          :items="dropDownList"
          item-text="name"
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
      default: ''
    },
    series: {
      type: Array,
      default: null
    },
    dropDownList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedMachineName: this.dropDownList[0]
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
        xaxis: {
          type: 'datetime',
          labels: {
            formatter: (value, timestamp, opts) => {
              return [this.$options.filters.formatDate(value, 'yyyy-MM-dd'), this.$options.filters.formatDate(value, ' HH:mm:ss')]
            }
          }
        },
        maintainAspectRatio: true,
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 3,
          curve: 'smooth',
          lineCap: 'butt'
        },
        grid: {
          borderColor: '#f1f1f1'
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

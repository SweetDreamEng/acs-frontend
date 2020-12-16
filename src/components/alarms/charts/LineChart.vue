<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-row justify="space-between">
        <v-col cols="4" sm="4" md="4" lg="4">
          <v-select
            v-model="selectedMachineName"
            :items="dropDownList"
            item-text="name"
            outlined
            dense
            label="Select Machine Types"
            @input="$emit('selectMachine', selectedMachineName)"
          ></v-select>
        </v-col>
        <v-col cols="4" sm="4" md="4" lg="4">
          <date-range-picker
            @onDateRangeSelected="handleDateRangeSelected"
          ></date-range-picker>
        </v-col>
      </v-row>
      <div style="overflow-x: scroll; overflow-y: hidden;">
        <v-card>
          <apexchart
            :width="width"
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
      default: () => (null)
    },
    dropDownList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      selectedMachineName: this.dropDownList[0]
    }
  },
  computed: {
    width() {
      if (this.series[0]) {
        return 1250 > 30 * this.series[0].data.length ? 1250 : 30 * this.series[0].data.length
      }
      
      return '100%'
    },
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

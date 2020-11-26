<template>
  <v-card
    height="100%"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-subtitle class="d-flex justify-space-between">
      <div>
        <div class="font-weight-bold">Target & Actuals</div>
        <div class="font-italic">({{ mode }})</div>
      </div>
      <MonthlyWeekly @changeMode="changeMode"/>
    </v-card-subtitle>
    <v-card-text>
      <apexchart
        type="area"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </v-card-text>
  </v-card>
</template>

<script>

/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
import MonthlyWeekly from '../MonthlyWeekly'
export default {
  components: {
    MonthlyWeekly
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'Weekly'
    },
    valuesTgtWeight: {
      type: Array,
      default: () => [{}]
    },
    valuesActWeight: {
      type: Array,
      default: () => [{}]
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions: {
        chart: {
          height: 120,
          type: 'area',
          sparkline: {
            enabled: true
          },
          animations: {
            speed: 400
          }
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: this.xaxis
      }
    }
  },
  computed: {
    series() {
      return [
        {
          id: 1,
          name: 'Target',
          data: this.valuesTgtWeight
        },
        {
          id: 2,
          name: 'Actuals',
          data: this.valuesActWeight
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    changeMode(mode) {
      this.$emit('changeMode', mode)
    }
  }
}
</script>
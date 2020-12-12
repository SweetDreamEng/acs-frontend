<template>
  <v-card
    height="100%"
    :loading="loadingEnergyConsumption"
  >
    <v-card-subtitle class="d-flex justify-space-between">
      <div>
        <div>Energy Consumption</div>
        <div class="caption font-italic">({{ timeRangeLabel }})</div>
      </div>
      <v-btn
        icon
        class="ml-auto"
        @click="$emit('showTimeRange')"
      >
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-card-subtitle>
    <v-card-text>
      <apexchart
        type="area"
        height="180"
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
import { mapState } from 'vuex'

export default {
  components: {
  },
  props: {
    machineId: {
      type: Number,
      default: 0
    },
    timeRangeLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'area',
          animations: {
            speed: 400
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          type: 'datetime'
        }
      }
    }
  },
  computed: {
    ...mapState({
      loadingEnergyConsumption: (state) => state.machines.loadingEnergyConsumption,
      energyConsumption: (state) => state.machines.energyConsumption
    }),
    series() {
      return [{
        name: 'Energy Consumption',
        data: this.energyConsumption
      }]
    }
  }
}
</script>

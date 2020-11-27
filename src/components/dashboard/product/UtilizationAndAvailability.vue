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
    <v-card-subtitle>
      <v-select
        v-model="loc_param"
        :items="items"
        label="Choose Parameter"
        item-text="text"
        item-value="id"
        hide-details
        @change="changeParams"
        outlined
        dense
      >
      </v-select>
    </v-card-subtitle>
    <v-card-text>
      <apexchart
        type="area"
        :options="chartOptions"
        :series="series"
        height="240"
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
    isLoading: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'Weekly'
    },
    param: {
      type: Number,
      default: 1
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

      items: [
        {
          id: 0,
          text: 'L18_0_8_TargetWeight[1] with L19_0_8_DispActWeight[1]'
        }, {
          id: 1,
          text: 'L18_0_8_TargetWeight[2] with L19_0_8_DispActWeight[2]'
        }, {
          id: 2,
          text: 'L18_0_8_TargetWeight[3] with L19_0_8_DispActWeight[3]'
        }, {
          id: 3,
          text: 'L18_0_8_TargetWeight[4] with L19_0_8_DispActWeight[4]'
        }, {
          id: 4,
          text: 'L18_0_8_TargetWeight[5] with L19_0_8_DispActWeight[5]'
        }, {
          id: 5,
          text: 'L18_0_8_TargetWeight[6] with L19_0_8_DispActWeight[6]'
        }, {
          id: 6,
          text: 'L18_0_8_TargetWeight[7] with L19_0_8_DispActWeight[7]'
        }, {
          id: 7,
          text: 'L18_0_8_TargetWeight[8] with L19_0_8_DispActWeight[8]'
        }
      ],

      loc_param: this.param,

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
      this.$emit('changeParams', {
        mode: mode,
        param: this.loc_param
      })
    },
    changeParams() {
      this.$emit('changeParams', {
        mode: this.mode,
        param: this.loc_param
      })
    }
  }
}
</script>
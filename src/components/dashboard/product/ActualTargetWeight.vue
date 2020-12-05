<template>
  <div>
    <v-card
      height="100%"
      :loading="isLoading"
      :disabled="isLoading"
    >
      <v-card-title class="d-flex justify-space-between">
        <div>
          <div>Target & Actuals Weight</div>
          <div class="caption font-italic">({{ timeRangeLabel }})</div>
        </div>
        <v-btn
          icon
          class="ml-auto"
          @click="$emit('showTimeRange')"
        >
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle class="mt-1">
        <v-select
          v-model="loc_param"
          :items="items"
          label="Choose Parameter"
          item-text="text"
          item-value="id"
          hide-details
          outlined
          dense
          class="ml-auto"
          style="width: 480px"
          @change="changeParams"
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
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  components: {
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    timeRangeLabel: {
      type: String,
      default: ''
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

      showTimeRangeChooser: false,

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
    ...mapState('machines', ['weightTimeRange']),
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
    changeParams() {
      this.$emit('changeParams', {
        param: this.loc_param
      })
    },
    onTimeRangeChanged(data) {
      this.$emit('change', data)
      this.showTimeRangeChooser = false
    }
  }
}
</script>
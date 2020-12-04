<template>
  <v-card
    height="100%"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-title class="d-flex justify-space-between">
      <div>
        <div>Hop & Fractual Inventories</div>
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
        @change="changeParams"
        outlined
        dense
        class="ml-auto"
        style="width: 480px"
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
    xaxisLabels: {
      type: Array,
      default: () => ([])
    },
    param: {
      type: Number,
      default: 1
    },
    valuesHopInventory: {
      type: Array,
      default: () => [{}]
    },
    valuesFrtInventory: {
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
          text: 'L30_0_8_HopInv[1] with L30_16_23_FracInv[1]'
        }, {
          id: 1,
          text: 'L30_0_8_HopInv[2] with L30_16_23_FracInv[2]'
        }, {
          id: 2,
          text: 'L30_0_8_HopInv[3] with L30_16_23_FracInv[3]'
        }, {
          id: 3,
          text: 'L30_0_8_HopInv[4] with L30_16_23_FracInv[4]'
        }, {
          id: 4,
          text: 'L30_0_8_HopInv[5] with L30_16_23_FracInv[5]'
        }, {
          id: 5,
          text: 'L30_0_8_HopInv[6] with L30_16_23_FracInv[6]'
        }, {
          id: 6,
          text: 'L30_0_8_HopInv[7] with L30_16_23_FracInv[7]'
        }, {
          id: 7,
          text: 'L30_0_8_HopInv[8] with L30_16_23_FracInv[8]'
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
        stroke: {
          curve: 'smooth',
          width: 2
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'datetime'
        }
      }
    }
  },
  computed: {
    series() {
      return [
        {
          name: 'Hop',
          data: this.valuesHopInventory
        },
        {
          name: 'Fractual',
          data: this.valuesFrtInventory
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
    }
  }
}
</script>
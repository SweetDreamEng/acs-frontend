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
        rounded
        outlined
        color="primary"
        dark
        class="ml-auto"
        @click="$emit('showTimeRange')"
      >
        Choose Time Range
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
    mode: {
      type: String,
      default: 'Weekly'
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
        }
        // xaxis: {
        //   type: 'datetime',
        //   categories: [
        //     '2018-09-19T00:00:00.000Z',
        //     '2018-09-19T01:30:00.000Z',
        //     '2018-09-20T02:30:00.000Z',
        //     '2018-09-21T03:30:00.000Z',
        //     '2018-09-22T04:30:00.000Z',
        //     '2018-09-23T05:30:00.000Z',
        //     '2018-09-24T06:30:00.000Z',
        //     '2018-09-25T00:00:00.000Z',
        //     '2018-09-26T01:30:00.000Z',
        //     '2018-09-27T02:30:00.000Z',
        //     '2018-09-28T03:30:00.000Z',
        //     '2018-09-29T04:30:00.000Z',
        //     '2018-09-30T05:30:00.000Z',
        //     '2018-10-1T06:30:00.000Z',
        //     '2018-10-2T00:00:00.000Z',
        //     '2018-10-3T01:30:00.000Z',
        //     '2018-10-4T06:30:00.000Z'
        //   ]
        // },
      }
    }
  },
  computed: {
    series() {
      return [
        {
          id: 1,
          name: 'Hop',
          data: this.valuesHopInventory
        },
        {
          id: 2,
          name: 'Fractual',
          data: this.valuesFrtInventory
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
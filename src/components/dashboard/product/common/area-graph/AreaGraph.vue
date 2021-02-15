<template>
  <v-card
    height="100%"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-title>
      <div>
        <div>{{ title }}</div>
        <div class="text-caption font-italic">({{ timeRangeLabel(timeRange) }})</div>
        <!-- <div class="text-caption font-italic">(timeRangeLabel)</div> -->
      </div>
      <v-btn
        icon
        small
        class="ml-auto"
        @click="open()"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn
        icon
        class=" ml-2"
        @click="showTimeRangeChooser = true"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <apexchart
        type="area"
        :height="height"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </v-card-text>
    <time-range-chooser
      :dlg="showTimeRangeChooser"
      :time-range="timeRange"
      @close="showTimeRangeChooser = false"
      @submit="onTimeRangeChanged"
    >
    </time-range-chooser>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import areaGraphStore from './store'
import TimeRangeChooser from '../../../TimeRangeChooser1'
export default {
  name: 'AreaGraph',
  components: {
    TimeRangeChooser
  },
  props: {
    namespace: {
      type: String,
      default: ''
    },
    fetch: {
      type: Function,
      default: () => {}
    },
    machineId: {
      type: Number,
      default: 0
    },
    serialNumber: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    names: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 220
    },
    persist: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showTimeRangeChooser: false
    }
  },
  computed: {
    ...mapGetters('machines', ['timeRangeLabel']),
    isLoading() {
      return this.$store.state[this.namespace]['isLoading']
    },
    timeRange() {
      return this.$store.state[this.namespace]['timeRange']
    },
    series() {
      if (this.names.length)
        return this.names.map((name, index) => {
          return {
            name,
            data: (this.$store.state[this.namespace]['items'].length) ? (this.$store.state[this.namespace]['items'][index]) : []
          }
        })
      else
        return (this.$store.state[this.namespace]['items']) ? (this.$store.state[this.namespace]['items']) : [[]]
    },
    chartOptions() {
      return {
        chart: {
          type: 'area',
          animations: {
            speed: 400
          },
          toolbar: {
            show: false
          }
        },
        colors: [this.$vuetify.theme.themes.light.primary, this.$vuetify.theme.themes.light.secondary, '#00E396', '#FEB019', '#FF4560', '#775DD0'],
        noData: {
          text: 'No Data From Devce'
        },
        yaxis: {
          title: {
            text: this.unit ? `${this.title} (${this.unit})` : `${this.title}`
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
  created() {
    if (!this.isModuleCreated([this.namespace])) {
      this.registerModule()
    }
  },
  mounted() {
    this.open()
  },
  beforeDestroy() {
    if (!this.persist) this.$store.unregisterModule(this.namespace)
  },
  methods: {
    ...mapActions({
      getSeries(dispatch, payload) {
        return dispatch(this.namespace + '/getSeries', payload)
      },
      updateTimeRange(dispatch, payload) {
        return dispatch(this.namespace + '/updateTimeRange', payload)
      }
    }),
    open () {
      this.getSeries({
        machineId: this.machineId,
        serialNumber: this.serialNumber,
        timeRange: this.timeRange
      })
    },
    isModuleCreated(path) {
      let m = this.$store._modules.root

      return path.every((p) => {
        m = m._children[p]

        return m
      })
    },
    registerModule() {
      this.$store.registerModule(this.namespace, {
        namespaced: true,
        state: areaGraphStore.areaGraphState(),
        actions: areaGraphStore.areaGraphActions(this.fetch),
        mutations: areaGraphStore.areaGraphMutations()
      })
    },
    onTimeRangeChanged(newTimeRange) {
      this.updateTimeRange(newTimeRange)
      this.showTimeRangeChooser = false
      this.getSeries({
        id: this.productId,
        isAdditional: this.isAdditional,
        timeRange: this.timeRange
      })
    }
  }
}
</script>

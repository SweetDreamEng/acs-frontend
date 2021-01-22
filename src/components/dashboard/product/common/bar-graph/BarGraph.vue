<template>
  <v-card
    height="100%"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-title class="d-flex justify-space-between">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <apexchart
        type="bar"
        :height="height"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import barGraphStore from './store'

export default {
  name: 'BarGraph',
  props: {
    namespace: {
      type: String,
      default: ''
    },
    fetch: {
      type: Function,
      default: () => {}
    },
    productId: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 300
    },
    unit: {
      type: String,
      default: ''
    },
    names: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    isLoading() {
      return this.$store.state[this.namespace]['isLoading']
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
        return [{
          data: (this.$store.state[this.namespace]['items']) ? (this.$store.state[this.namespace]['items']) : []
        }]
    },
    chartOptions() {
      return {
        chart: {
          animations: {
            speed: 400
          },
          toolbar: {
            show: false
          }
        },
        noData: {
          text: 'No Data From Devce'
        },
        fill: {
          colors: ['#002855', '#008ffb', '#feb019'],
          opacity: 0.9,
          type: 'solid'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top'
            },
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: 20,
          textAnchor: 'start',
          style: {
            fontSize: '10px',
            colors: ['#000']
          },
          formatter: (value, { seriesIndex, dataPointIndex, w }) => {
            const unit = this.unit ? this.unit : ''

            return value + unit
          }
        },
        xaxis: {
          categories: this.categories,
          max: (this.seriesMax + 2) * 1.1
        },
        legend: {
          show: true,
          markers: {
            fillColors: ['#002855', '#008ffb', '#feb019']
          }
        },
        ...this.options
      }
    },
    seriesMax() {
      let max = 0

      try {
        this.series.forEach((item) => {
          max = Math.max(Math.max(...item.data), max)
        })

        return max
      } catch (err) {
        return 2
      }
    }
  },
  created() {
    if (!this.isModuleCreated([this.namespace])) {
      this.registerModule()
    }
  },
  mounted() {
    this.getSeries({
      productId: this.productId
    })
  },
  methods: {
    ...mapActions({
      getSeries(dispatch, payload) {
        return dispatch(this.namespace + '/getSeries', payload)
      }
    }),
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
        state: barGraphStore.barGraphState(),
        actions: barGraphStore.barGraphActions(this.fetch),
        mutations: barGraphStore.barGraphMutations()
      })
    }
  }
}
</script>
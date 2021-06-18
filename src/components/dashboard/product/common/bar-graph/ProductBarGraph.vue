<template>
  <v-card
    height="100%"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-title class="d-flex justify-space-between">
      {{ title }}
      <v-btn
        icon
        small
        class="ml-2"
        @click="getSeries({ serialNumber, machineId })"
      >
        <v-icon>$mdi-refresh</v-icon>
      </v-btn>
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

const COMMON_GRAPHS = ['barGraph-id1', 'barGraph-portableChiller-id1', 'barGraph-t50-id1', 'barGraph-vtc-id1', 'barGraph-vtc-id3']

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
    height: {
      type: Number,
      default: 300
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
  computed: {
    state() {
      return this.$store.state[this.namespace]
    },
    isLoading() {
      return this.state['isLoading']
    },
    series() {

      if (COMMON_GRAPHS.includes(this.namespace)) {
        const series = { data: this.state['items'] }

        return [series]

      }

      if (this.namespace === 'barGraph-ngxDryer-id1') {
        const hopperCategories = []

        for (let i = 0; i < this.state['hopperCount']; i ++) {
          hopperCategories.push(`Hopper ${i + 1}`)
        }

        const tempSeries = this.names.map((name, index) => {
          return {
            name,
            data: hopperCategories.map((category, id) => {
              return this.state['items'][index] ?
                this.state['items'][index][Number(category.split(' ')[1]) - 1] : []
            })
          }
        })

        return tempSeries
      }

      const arr = [[], []]

      if (this.state['items'][0]) {
        this.state['items'][0].forEach((item, index) => {
          if (item !== 0 || this.state['items'][1][index] !== 0) {
            arr[0].push(item)
            arr[1].push(this.state['items'][1][index])
          }
        })
      }

      return this.names.length
        ? this.names.map((name, index) => ({ name, data: (arr.length) ? (arr[index]) : [] }))
        : [{ data: arr ? arr : [] }]
    },
    graphUnit() {
      return this.state['unit'] ? this.state['unit'] : ''
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
          // colors: [this.$vuetify.theme.themes.light.primary, `${this.$vuetify.theme.themes.light.primary}90`, `${this.$vuetify.theme.themes.light.primary}50`],
          // colors: [this.$vuetify.theme.themes.light.primary, this.$vuetify.theme.themes.light.secondary, '#00E396', '#FEB019', '#FF4560', '#775DD0'],
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
          offsetX: 25,
          textAnchor: 'start',
          style: {
            fontSize: '10px',
            colors: ['#000']
          },
          formatter: (value, { seriesIndex, dataPointIndex, w }) => {
            return this.namespace === 'barGraph-t50-id1' ? `${value.toFixed(3)} ${this.graphUnit}` : `${value} ${this.graphUnit}`
          }
        },
        xaxis: {
          categories: this.filteredCategories,
          max: (this.seriesMax + 2) * 1.1
        },
        legend: {
          show: true
          // markers: {
          //   fillColors: [this.$vuetify.theme.themes.light.primary, `${this.$vuetify.theme.themes.light.primary}90`, `${this.$vuetify.theme.themes.light.primary}50`]
          // }
        },
        tooltip: {
          enabled: false
        },
        ...this.options
      }
    },
    filteredCategories() {
      if (COMMON_GRAPHS.includes(this.namespace)) return this.categories

      if (this.namespace === 'barGraph-ngxDryer-id1') {
        const hopperCategories = []

        for (let i = 0; i < this.state['hopperCount']; i ++) {
          hopperCategories.push(`Hopper ${i + 1}`)
        }

        return hopperCategories
      }

      const category = []

      if (this.state['items'][0]) {
        this.state['items'][0].forEach((item, index) => {
          if (item !== 0 || this.state['items'][1][index] !== 0) {
            category.push(this.categories[index])
          }
        })
      }

      return category
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
    this.getSeries({ serialNumber: this.serialNumber, machineId: this.machineId })
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

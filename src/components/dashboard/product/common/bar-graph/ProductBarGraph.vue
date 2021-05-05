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
  data() {
    return {
    }
  },
  computed: {
    isLoading() {
      return this.$store.state[this.namespace]['isLoading']
    },
    series() {
      if (this.namespace === 'barGraph-id1' || this.namespace === 'barGraph-portableChiller-id1' || this.namespace === 'barGraph-t50-id1') {
        const series = {
          data: this.$store.state[this.namespace]['items']
        }

        return [series]
        
      } else if (this.namespace === 'barGraph-ngxDryer-id1') {
        const hopperCategories = []

        for (let i = 0; i < this.$store.state[this.namespace]['hopperCount']; i ++) {
          hopperCategories.push(`Hopper ${i + 1}`)
        }
        const tempSeries = this.names.map((name, index) => {
          return {
            name,
            data: hopperCategories.map((category, id) => {
              return this.$store.state[this.namespace]['items'][index] ? 
                this.$store.state[this.namespace]['items'][index][Number(category.split(' ')[1]) - 1] : []
            })
          }
        })

        return tempSeries
      } else {
        const arr = [[], []]

        if (this.$store.state[this.namespace]['items'][0]) {
          this.$store.state[this.namespace]['items'][0].forEach((item, index) => {
            if (item !== 0 || this.$store.state[this.namespace]['items'][1][index] !== 0) {
              arr[0].push(item)
              arr[1].push(this.$store.state[this.namespace]['items'][1][index])
            }
          })
        }

        if (this.names.length)
          return this.names.map((name, index) => {
            return {
              name,
              data: (arr.length) ? (arr[index]) : []
            }
          })
        else
          return [{
            data: arr ? arr : []
          }] 
      }
    },
    graphUnit() {
      return this.$store.state[this.namespace]['unit'] ? this.$store.state[this.namespace]['unit'] : ''
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
      if (this.namespace === 'barGraph-id1' || this.namespace === 'barGraph-portableChiller-id1' || this.namespace === 'barGraph-t50-id1') {
        return this.categories
      } else if (this.namespace === 'barGraph-ngxDryer-id1') {
        const hopperCategories = []

        for (let i = 0; i < this.$store.state[this.namespace]['hopperCount']; i ++) {
          hopperCategories.push(`Hopper ${i + 1}`)
        }

        return hopperCategories
      } else {
        const category = []

        if (this.$store.state[this.namespace]['items'][0]) {
          this.$store.state[this.namespace]['items'][0].forEach((item, index) => {
            if (item !== 0 || this.$store.state[this.namespace]['items'][1][index] !== 0) {
              category.push(this.categories[index])
            }
          })
        }

        return category
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
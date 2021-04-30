<template>
  <v-card height="100%" :loading="loading" :disabled="loading">
    <v-card-title>
      Recipe
      <div class="text-caption font-italic ml-1">({{ recipeMode }})</div>
      <v-btn
        icon
        small
        class="ml-auto"
        @click="$emit('reload')"
      >
        <v-icon>$mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <apexchart type="pie" height="420" :options="chartOptions" :series="recipeSeries"></apexchart>
    </v-card-text>
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    recipes: {
      type: Array,
      default: () => []
    },
    ezTypes: {
      type: Array,
      default: () => []
    },
    mode: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tab: null,
      tabItems: ['Percentage', 'Parts', 'EZ mode']
    }
  },
  computed: {
    ...mapState({
      materials: (state) => state.materials.data
    }),
    ...mapState('bdBlenderAnalytics', ['inventory']),
    recipeMode() {
      switch (this.mode) {
      case 0:
        return 'Percentage'
      case 1:
        return 'Parts'
      case 2:
        return 'EZ mode'
      default:
        return ''
      }
    },
    chartOptions() {
      const { mode } = this

      return {
        chart: {
          type: 'pie',
          height: 340
        },
        labels: this.labels,
        dataLabels: {
          formatter: function (val, opts) {
            if (mode === 1)
              return opts.w.config.series[opts.seriesIndex]
            else
              return [val.toFixed(2) + '%']
          },
          offset: 30
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -30
            }
          }
        },
        noData: {
          text: 'No Data From Devce'
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'left',
          itemMargin: {
            horizontal: 2,
            vertical: 4
          }
        },
        tooltip: {
          enabled: false
        }
      }
    },
    recipeSeries() {
      if (this.mode === 0 || this.mode === 1) {
        const filteredRecipes = []
        
        this.recipes.forEach((recipe) => {
          if (recipe !== 0) {
            filteredRecipes.push(recipe)
          }
        })

        return filteredRecipes
      } else if (this.mode === 2) {
        return [this.totalRegrid, 100 - this.totalRegrid]
      } else {
        return []
      }
    },
    labels() {
      if (this.mode === 0 || this.mode === 1) {
        const filteredHopperIds = []

        this.recipes.map((recipe, index) => {
          if (recipe !== 0) {
            filteredHopperIds.push(index)
          }

          return 0
        })

        return filteredHopperIds.map((id) => {
          return `Hopper ${id + 1}(${this.materialText(id)}): ${this.recipes[id]}`
        })
      }
      else if (this.mode === 2) {
        return [this.regridLabel, this.additiveLabel]
      } else {
        return ['']
      }
    },
    totalRegrid() {
      let ret = 0

      for (let i = 0; i < 8; i++) {
        if (this.ezTypes[i] === 2) {
          ret += this.recipes[i]
        }
      }

      return ret
    },
    regridLabel() {
      let ret = ''

      for (let i = 0; i < 8; i++) {
        if (this.ezTypes[i] === 2 && this.recipes[i] !== 0) {
          ret += `Hopper ${i + 1} REG ${this.recipes[i]}%&nbsp;`
        }
      }

      return ret ? ret : 'No Regrind'
    },
    additiveLabel() {
      const naturals = []
      let ret = ''

      for (let i = 0; i < 8; i++) {
        if (this.ezTypes[i] === 0)
          naturals.push(i)
      }

      if (naturals.length === 1) {
        ret = `Hopper ${naturals[0] + 1} AUTO `
      } else {
        for (let i = 0; i < naturals.length; i++) {
          if (this.recipes[naturals[i]] !== 0) {
            ret += `Hopper ${naturals[i] + 1} NAT ${this.recipes[i]}% `
          }
        }
      }

      for (let i = 0; i < 8; i++) {
        if (this.ezTypes[i] === 1) {
          if (this.recipes[i] !== 0) {
            ret += this.recipes[i] ? `Hopper ${i + 1} ADD ${this.recipes[i]}%` : ''
          }
        }
      }

      return ret
    }
  },
  methods: {
    materialText(ind) {
      let m = null

      m = this.materials.find((material) => material.id === this.inventory.inventory_material.[`material${ind + 1}_id`])

      return m ? m.material : '#'
    }
  }
}
</script>

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
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <apexchart type="pie" height="360" :options="chartOptions" :series="recipeSeries"></apexchart>
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
            horizontal: 10,
            vertical: 10
          }
        },
        tooltip: {
          enabled: false
        }
      }
    },
    recipeSeries() {
      if (this.mode === 0 || this.mode === 1)
        return this.recipes
      else if (this.mode === 2) {
        return [this.totalRegrid, 100 - this.totalRegrid]
      } else {
        return []
      }
    },
    labels() {
      if (this.mode === 0 || this.mode === 1) {
        return [0, 1, 2, 3, 4, 5, 6, 7].map((hop) => {
          return `Hop[${hop + 1}]: ${this.recipes[hop]}`
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
        if (this.ezTypes[i] === 2) {
          ret += `Hop[${i + 1}] REG ${this.recipes[i]}%&nbsp;&nbsp;`
        }
      }

      return ret
    },
    additiveLabel() {
      const naturals = []
      let ret = ''

      for (let i = 0; i < 8; i++) {
        if (this.ezTypes[i] === 0)
          naturals.push(i)
      }

      if (naturals.length === 1) {
        ret = `Hop[${naturals[0]}] AUTO&nbsp;&nbsp;`
      } else {
        for (let i = 0; i < naturals.length; i++) {
          ret += `Hop[${naturals[0]}] ${100 / naturals.length}&nbsp;&nbsp;`
        }
      }

      for (let i = 0; i < 8; i++) {
        if (this.ezTypes[i] === 1) {
          ret += `Hop[${i + 1}] ADD ${this.recipes[i]}%`
        }
        ret += '&nbsp;&nbsp;'
      }

      return ret
    }
  }
}
</script>

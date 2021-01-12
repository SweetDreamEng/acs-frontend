<template>
  <v-card height="100%" :loading="loading" :disabled="loading">
    <v-card-title>
      Recipe
      <div class="caption font-italic ml-1">({{ recipeMode }})</div>
    </v-card-title>
    <v-card-text>
      <apexchart type="donut" height="360" :options="chartOptions" :series="recipes"></apexchart>
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
    mode: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tab: null,
      tabItems: ['Percentage', 'Parts', 'EZ mode'],
      chartOptions: {
        chart: {
          type: 'donut',
          height: 300
        },
        labels: ['Feed 1', 'Feed 2', 'Feed 3', 'Feed 4', 'Feed 5', 'Feed 6', 'Feed 7', 'Feed 8'],
        dataLabels: {
          formatter(val, opts) {
            return [val.toFixed(2) + '%']
          }
        },
        legend: {
          show: true,
          position: 'bottom',
          itemMargin: {
            horizontal: 25,
            vertical: 10
          }
        }
      }
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
    }
  }
}
</script>

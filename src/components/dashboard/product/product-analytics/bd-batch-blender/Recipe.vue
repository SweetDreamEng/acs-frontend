<template>
  <v-card height="100%">
    <v-card-title>
      Recipe
    </v-card-title>
    <v-card-text>
      <apexchart type="pie" height="240" :options="chartOptions" :series="recipeValues"></apexchart>
    </v-card-text>
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      chartOptions: {
        chart: {
          width: '100%',
          type: 'pie'
        },
        labels: ['Feed 1', 'Feed 2', 'Feed 3', 'Feed 4', 'Feed 5', 'Feed 6', 'Feed 7', 'Feed 8'],
        theme: {
          monochrome: {
            enabled: true
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5
            }
          }
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]

            return [name, val.toFixed(2) + '%']
          }
        },
        legend: {
          show: false
        }
      }
    }
  },
  computed: {
    ...mapState({
      recipeValues: (state) => state.machines.recipeValues
    })
  },
  mounted() {
  },
  methods: {
  }
}
</script>

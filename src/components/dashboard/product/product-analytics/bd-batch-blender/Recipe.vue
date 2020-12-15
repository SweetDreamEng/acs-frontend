<template>
  <v-card height="100%">
    <v-card-title>
      Recipe
    </v-card-title>
    <v-card-text>
      <apexchart type="donut" height="360" :options="chartOptions" :series="recipeValues"></apexchart>
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

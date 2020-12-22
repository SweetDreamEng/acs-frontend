<template>
  <v-card height="100%">
    <v-toolbar
      flat
    >
      <v-toolbar-title>Recipe</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tab
            v-for="item in tabItems"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in tabItems"
          :key="item"
        >
          <apexchart type="donut" height="360" :options="chartOptions" :series="recipeValues"></apexchart>
        </v-tab-item>
      </v-tabs-items>
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

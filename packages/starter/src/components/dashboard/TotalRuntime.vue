<template>
  <v-card>
    <v-card-title>
      {{ label }}
      <v-spacer></v-spacer>
        <div>
          <v-btn icon class="ml-auto">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <div v-if="showChart">
        <apexchart type="radialBar" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: {
        type: Boolean,
        default: false
      },
      
      showChart: false,

      series: [49.8],

      chartOptions: {
        labels: ['Percent']
      }
    }
  },
  mounted() {
    this.showChart = true
  }
}
</script>

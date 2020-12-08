<template>
  <v-card
    height="100%"
    :loading="loading"
  >
    <v-card-title class="d-flex justify-space-between">
      <div>Average runtime by week</div>
      <v-btn
        icon
      >
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <apexchart type="bar" height="140" :options="chartOptions" :series="series"></apexchart>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  components: {
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    weeklyRunningHours: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        grid: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Mod', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      }
    }
  },
  watch: {
    loading(val) {
      console.log(val)
    }
  },
  computed: {
    series() {
      return [{
        name: 'Average runtime by week',
        data: this.weeklyRunningHours
      }]
    }
  },
  methods: {
  }
}
</script>
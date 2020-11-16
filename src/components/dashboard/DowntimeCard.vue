<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    height="100%"
    light
  >
    <v-card-title>
      Downtime
      <v-menu offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            small
            class="ml-auto"
            v-on="on"
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item
            v-for="(item, index) in viewOptions"
            :key="index"
            link
          >
            <v-list-item-content>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <div class="d-flex align-center justify-center mt-n2">
      <div v-if="showChart" style="width: 400px">
        <apexchart
          type="donut"
          height="110"
          :options="chartOptions2"
          :series="series2"
        ></apexchart>
      </div>
    </div>
    <div>
      <v-divider></v-divider>
      <v-card-actions class="mt-n4">
        <v-spacer></v-spacer>
        <v-btn
          text
          color="green accent-4"
        >
          View Report
          <v-icon right>mdi-chart-bar</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      showChart: true,
      series2: [44, 87, 12],
      chartOptions2: {
        chart: {
          type: 'donut',
          animations: {
            speed: 400
          },
          background: 'transparent'
        },
        stroke: {
          show: true,
          colors: '#fff',
          width: 1,
          dashArray: 0
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: '74%'
            }
          }
        },
        theme: {
          mode: 'light'
        },
        labels: ['Unplanned', 'Planned', 'Idle'],
        dataLabels: {
          enabled: false
        },
        colors: ['#d6d93d', '#219ae2', '#999'],
        fill: {
          colors: ['#d6d93d', '#219ae2', '#999']
        },
        legend: {
          offsetY: 20,
          fontSize: '13px',
          fontFamily: 'Quicksand',
          fontWeight: 700
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              offsetY: 0,
              position: 'bottom'
            }
          }
        }]
      },
      viewOptions: [
        'Daily', 'Weekly', 'Monthly'
      ]
    }
  }
}
</script>
<style scoped>
  .v-card__title {
    word-break: break-word;
  }
</style>

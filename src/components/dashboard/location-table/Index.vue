<template>
  <div class="test-machine">
    <v-card>
      <v-card-title>
      </v-card-title>
      <v-card-subtitle>
        <div>
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            solo
            hide-details
            dense
            clearable
            placeholder="Search"
          ></v-text-field>
        </div>
      </v-card-subtitle>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="locations"
          hide-default-footer
          :search="searchQuery"
        >
          <!-- <template v-slot:header.status="{ header }">
            <v-icon color="primary">mdi-chevron-double-right</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.machinename="{ header }">
            <v-icon small color="primary">mdi-wrench</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.capacity="{ header }">
            <v-icon color="primary">mdi-trending-up</v-icon>
            {{ header.text | percentageLabel }}
          </template>
          <template v-slot:header.consumption="{ header }">
            <v-icon class="mdi-rotate-90" color="primary">mdi-battery-30</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.department="{ header }">
            <v-icon small color="primary">mdi-factory</v-icon>
            {{ header.text }}
          </template> -->
          <template v-slot:item.utilization="{ item }">
            <div class="d-flex align-center">
              <apexchart
                type="line"
                width="200"
                height="100"
                :options="utilizationChartOptions"
                :series="utilizationSeries"
              >
              </apexchart>
              {{ item.utilization }}
            </div>
          </template>
          <template v-slot:item.location="{ item }">
            <v-icon>mdi-home-map-marker</v-icon>
            <div class="title text-no-wrap">{{ item.location }}</div>
          </template>
          <template v-slot:item.downtime_distribution="{ item }">
            <apexchart
              type="bar"
              width="200"
              height="100"
              :options="chartOptions"
              :series="item.downtime_distribution"
            >
            </apexchart>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const series = [
  {
    name: 'Marine Sprite',
    data: [44]
  },
  {
    name: 'Striking Calf',
    data: [53]
  },
  {
    name: 'Tank Picture',
    data: [12]
  },
  {
    name: 'Bucket Slope',
    data: [9]
  },
  {
    name: 'Reborn Kid',
    data: [25]
  }
]

export default {
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      headers: [
        { text: 'Location', value: 'location' },
        { text: 'Utilization', value: 'utilization' },
        { text: 'OEE', align: 'start', value: 'oee' },
        { text: 'Mean Runtime', value: 'mean_runtime' },
        { text: 'Deviations', align: 'center', value: 'deviations' },
        { text: 'Production Rate', value: 'rate' },
        { text: 'Downtime Distrubton', value: 'downtime_distribution' }
      ],

      locations: [
        {
          location: 'Location 1',
          utilization: '32%',
          color: 'green',
          value: 75,
          oee: '93.1%',
          mean_runtime: '07:08',
          deviations: 7,
          rate: 56,
          downtime_distribution: series
        },
        {
          location: 'Location 2',
          utilization: '36%',
          color: 'green',
          value: 52,
          oee: '89.8%',
          mean_runtime: '02:08',
          deviations: 34,
          rate: 65,
          downtime_distribution: series
        },
        {
          location: 'Location 3',
          utilization: '82%',
          color: 'red',
          value: 78,
          oee: '78.2%',
          mean_runtime: '23:25',
          deviations: 12,
          rate: 34,
          downtime_distribution: series
        }
      ],

      searchQuery: '',

      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              enabled: false
            }
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
          labels: {
            show: false,
            formatter: function (val) {
              return val + 'K'
            }
          }
        },
        yaxis: {
          labels: {
            show: false
          },
          title: {
            text: undefined
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + 'K'
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          show: false,
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
      },

      utilizationSeries: [{
        name: 'OEE',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      utilizationChartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: '',
          align: 'left'
        },
        xaxis: {
          labels: {
            show: false
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        grid: {
          show: false
        }
      }
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
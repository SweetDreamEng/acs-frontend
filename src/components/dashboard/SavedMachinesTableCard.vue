<template>
  <v-card :disabled="loadingDashboardSavedMachinesTable">
    <v-card-title>
      Saved Machines
      <br />
      <br />
      <v-combobox
        v-model="headerColumnValues"
        :items="headerColumns"
        chips
        solo
        label="Add/Remove Coloumns"
        multiple
        class="flex-grow-0 ml-auto"
      >
        <template v-slot:selection="{ attrs, item }">
          <v-chip
            v-bind="attrs"
            close
            small
            color="primary lighten-2"
            outlined
            @click:close="remove(item)"
          >
            {{ item }}
          </v-chip>
        </template>
      </v-combobox>
    </v-card-title>
    <v-card-text>
      <v-data-table
        id="saved-machines-table"
        :headers="filtedHeaders"
        :items="savedMachines"
        :search="searchQuery"
        :loading="loadingDashboardSavedMachinesTable"
        :items-per-page="10"
        :page.sync="page"
        class="link-table"
        hide-default-footer
        @click:row="productView"
      >
        <template v-slot:header.status="{ header }">
          <v-icon color="primary">$mdi-chevron-double-right</v-icon>
          {{ header.text }}
        </template>
        <template v-slot:header.name="{ header }">
          <v-icon small color="primary">$mdi-wrench</v-icon>
          {{ header.text }}
        </template>
        <template v-slot:header.capacityUtilization="{ header }">
          <v-icon color="primary">$mdi-trending-up</v-icon>
          {{ header.text | percentageLabel }}
        </template>
        <template v-slot:header.location_id="{ header }">
          <v-icon small color="primary">$mdi-factory</v-icon>
          {{ header.text }}
        </template>

        <!-- -->
        <template v-slot:item.status="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-avatar
                class="mr-1"
                :color="getColor(item)"
                size="25"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small>
                  {{ getIcon(item) }}
                </v-icon>
              </v-list-item-avatar>
            </template>
            <span>{{ getText(item) }}</span>
          </v-tooltip>
        </template>
        <template v-slot:item.capacityUtilization="{ item }">
          <div v-if="item && item.capacityUtilization" class="mx-auto d-flex justify-center">
            <apexchart
              key="uilization-chart"
              width="240"
              height="80"
              type="area"
              :options="utilizationOptions"
              :series="getUtilizationSeries(item.capacityUtilization)"
            >
            </apexchart>
          </div>
        </template>
        <template v-slot:item.configuration="{ item }">
          <span v-if="item.configuration">{{ item.configuration.name }}</span>
        </template>
        <template v-slot:item.location_id="{ item }">
          {{ locationName(item.location_id) }}
        </template>
        <template v-slot:item.zone_id="{ item }">
          {{ zoneName(item.zone_id) }}
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="savedMachinesPageCountReport"
        :total-visible="7"
        @input="getSavedMachines({ page: page })"
      ></v-pagination>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
/*
|---------------------------------------------------------------------
| Machines Table Card Component
|---------------------------------------------------------------------
|
| Machines table card to list machines and their properties
|
*/
export default {
  components: {
  },
  props: {
    location: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      headers: [
        { text: 'Running', align: 'center', value: 'status' },
        { text: 'Machine Name', align: 'start', value: 'name' },
        { text: 'Machine Type', align: 'start', value: 'configuration' },
        { text: 'Capacity Utilization', align: 'center', value: 'capacityUtilization' },
        { text: 'Locations', align: 'center', value: 'location_id' },
        { text: 'Zones', align: 'center', value: 'zone_id' }
      ],
      page: 1,
      hours: 8,
      searchQuery: '',
      row: '',
      headerColumnValues: [
        'Running',
        'Machine Name',
        'Machine Type',
        'Capacity Utilization',
        'Locations',
        'Zones'
      ],
      deviceStatus: {
        running: {
          color: 'green',
          text: 'Running',
          icon: '$mdi-check-circle-outline'
        },
        routerNotConnected: {
          color: 'yellow',
          text: 'Router Not Connected',
          icon: '$mdi-wifi-off'
        },
        shutOff: {
          color: 'red',
          text: 'Shut Off',
          icon: '$mdi-block-helper'
        },
        plcNotConnected: {
          color: 'orange',
          text: 'PLC Not Connected',
          icon: '$mdi-database-remove'
        }
      },
      utilizationOptions: {
        chart: {
          type: 'area',
          animations: {
            speed: 400
          },
          toolbar: {
            show: false
          }
        },
        colors: [this.$vuetify.theme.themes.light.primary, this.$vuetify.theme.themes.light.secondary, '#00E396', '#FEB019', '#FF4560', '#775DD0'],
        noData: {
          text: 'No Data From Devce'
        },
        yaxis: {
          floating: true,
          labels: {
            show: false
          },
          title: {
            text: undefined
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            show: false
          },
          labels: {
            show: false
          }
        },
        legend: {
          show: false
        },
        grid: {
          show: false
        }
      }
    }
  },
  computed: {
    ...mapState({
      savedMachines: (state) => state.devices.savedMachines,
      loadingDashboardSavedMachinesTable: (state) => state.devices.loadingDashboardSavedMachinesTable,
      savedMachinesPageCountReport: (state) => state.devices.savedMachinesPageCountReport
    }),
    ...mapGetters({
      locationName: 'locations/locationName',
      zoneName: 'zones/zoneName'
    }),
    filtedHeaders() {
      return this.headers.filter((header) => {
        return this.headerColumnValues.includes(header.text)
      })
    },
    headerColumns() {
      return this.headers.map((header) => header.text)
    }
  },
  mounted() {
    this.getSavedMachines({
      page: this.page
    })
  },
  methods: {
    ...mapActions({
      getSavedMachines: 'devices/getSavedMachines'
    }),
    open(item) { },
    getColor (item) {
      return this.deviceStatus[item.status] ? this.deviceStatus[item.status].color : ''
    },
    getText(item) {
      return this.deviceStatus[item.status] ? this.deviceStatus[item.status].text : ''
    },
    getIcon(item) {
      return this.deviceStatus[item.status] ? this.deviceStatus[item.status].icon : ''
    },
    getUtilizationSeries(item) {
      const series = []

      const temp = {
        data: item[0]
      }

      series.push(temp)

      return series
    },
    productView(item) {
      if (item.location_id && item.zone_id) {
        this.$router.push({
          name: 'dashboard-product',
          params: {
            location: item.location_id,
            zone: item.zone_id,
            configurationId: item.machine_id,
            productId: item.serial_number
          }
        })
      } else {
        this.$router.push({
          name: 'product-details',
          params: {
            configurationId: item.machine_id,
            productId: item.serial_number
          }
        })
      }
    },
    remove (item) {
      this.headerColumnValues.splice(this.headerColumnValues.indexOf(item), 1)
      this.headerColumnValues = [...this.headerColumnValues]
    }
  }
}
</script>
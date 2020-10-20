<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-row class="flex-grow-0" dense>
      <v-col cols="12">
        <sales-card
          class="h-full"
          style="min-height: 380px"
          :value="1.832"
          :percentage="3.2"
          :loading="isLoading1"
          :percentage-label="$t('dashboard.lastweek')"
          :action-label="$t('dashboard.viewReport')"
        ></sales-card>
      </v-col>

      <v-col sm="12" md="8">
        <machines-table-card
          class="h-full"
          style="min-height: 380px"
          label="Machines"
          :items="items"
          :loading="isLoading1"
        ></machines-table-card>
      </v-col>
      <v-col sm="12" md="4">
        <total-runtime
          :series="series"
          label="Total Runtime"
        >
        </total-runtime>
        <br>
        <status-card></status-card>
      </v-col>

      <v-col cols="12">
        <overview-card
          label="Overview"
          :loading="isLoading1"
          :markers="markers"
        >
        </overview-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// DEMO Cards for dashboard
import SalesCard from '../../components/dashboard/SalesCard'
import MachinesTableCard from '../../components/dashboard/MachinesTableCard'
import StatusCard from '../../components/dashboard/StatusCard'
import TotalRuntime from '../../components/dashboard/TotalRuntime'
import OverviewCard from '../../components/dashboard/OverviewCard'

export default {
  components: {
    SalesCard, MachinesTableCard, StatusCard, TotalRuntime, OverviewCard
  },
  data() {
    return {
      loadingInterval: null,

      isLoading1: true,

      items: [
        {
          status: 'Warning',
          machinename: 'BD Batch Blender',
          capacity: '89%',
          consumption: '80 Watts',
          factory: '30 Elm Street, NY',
          department: 'Division 1'
        },
        {
          status: 'Normal',
          machinename: 'Accumeter Ovation Continuous',
          capacity: '30%',
          consumption: '30 Watts',
          factory: '45 Main street, FL',
          department: 'Division 2'
        },
        {
          status: 'Normal',
          machinename: 'GH Gravimetric Extrusion Control',
          capacity: '57%',
          consumption: '20 Watts',
          factory: '50 Gracy Street, TX',
          department: 'Division 3'
        },
        {
          status: 'Alarm',
          machinename: 'GH-F Gravimetric Additive',
          capacity: '99%',
          consumption: '90 Watts',
          factory: '44 Main Street, GA',
          department: 'Division 4'
        },
        {
          status: 'Normal',
          machinename: 'VTC Plus Conveying',
          capacity: '32%',
          consumption: '10 Watts',
          factory: '33 One Drive, MA',
          department: 'Division 1'
        },
        {
          status: 'Normal',
          machinename: 'NGX',
          capacity: '27%',
          consumption: '10 Watts',
          factory: '29 Georgia Ave, CA',
          department: 'Division 4'
        },
        {
          status: 'Normal',
          machinename: 'NGX Nomad',
          capacity: '38%',
          consumption: '40 Watts',
          factory: '746 Macon, CO',
          department: 'Division 5'
        },
        {
          status: 'Warning',
          machinename: 'Truetemp',
          capacity: '74%',
          consumption: '20 Watts',
          factory: '1 Cantance Street, UT',
          department: 'Division 1'
        },
        {
          status: 'Not',
          machinename: 'GP & HE Central',
          capacity: '',
          consumption: 'OFF',
          factory: '45 Spring Street, NY',
          department: 'Division 5'
        },
        {
          status: 'Normal',
          machinename: 'T50 Central',
          capacity: '52%',
          consumption: '30 Watts',
          factory: '69 Borden Rd, IL',
          department: 'Division 3'
        }
      ],

      series: [44, 55],

      markers: [{
        position: {
          lat: 25.44,
          lng: -80.47
        }
      }, {
        position: {
          lat: 40.66,
          lng: -73.94
        }
      }, {
        position: {
          lat: 31.89,
          lng: -97.08
        }
      }, {
        position: {
          lat: 37.9,
          lng: -122.08
        }
      }, {
        position: {
          lat: 31.99,
          lng: -83.31
        }
      }, {
        position: {
          lat: 39.42,
          lng: -74.49
        }
      }]
    }
  },
  mounted() {
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>

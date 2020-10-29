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
          :items="machines"
          :loading="isLoading1"
        ></machines-table-card>
      </v-col>
      <v-col sm="12" md="4">
        <total-runtime
          :loading="isLoading1"
          :series="series"
          label="Uptime Percentage"
        >
        </total-runtime>
        <br>
        <status-card
          label="Run time Categories"
        ></status-card>
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

/*
|---------------------------------------------------------------------
| Dashboard Page Component
| url: /dashboard/analytics
|---------------------------------------------------------------------
|
*/

// import vuex helper functions
import { mapState } from 'vuex'

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
  computed: {
    ...mapState({
      machines: (state) => state.machines.data
    })
  },
  methods: {
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>

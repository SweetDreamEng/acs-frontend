<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="#e2e8ee" class="ma-n4 mb-n8 pa-4 pb-8">
      <v-container class="pb-0">
        <v-row class="flex-grow-0" dense>
          <v-col cols="12" lg="6">
            <v-row dense>
              <v-col cols="6" class="pt-0">
                <track-card
                  is-flat
                  label="First Past Yield"
                  class="h-full"
                  color="#8c9eff"
                  value="87%"
                  :percentage="1.7"
                  :percentage-label="$t('dashboard.lastweek')"
                  :series="ordersSeries"
                ></track-card>
              <!-- <v-card class="d-flex flex-column flex-grow-1 text-center px-3 py-6 pb-7" light>
                <div class="font-weight-bold text-body-2 text-uppercase">Today's Production</div>
                <div class="d-flex align-center mt-3 justify-center">
                  <div class="text-h4 number">80</div>
                  <div class="grey--text text--darken-1 text-h5 number ml-1">/ 140</div>
                </div>
              </v-card> -->
              </v-col>
              <v-col cols="6" class="pt-0">
                <downtime-card></downtime-card>
              </v-col>
              <v-col cols="6" class="pb-0">
                <track-card
                  is-flat
                  label="Avg First Past Yield"
                  class="h-full"
                  color="#06d6a0"
                  value="84%"
                  :percentage="4.3"
                  :percentage-label="$t('dashboard.lastweek')"
                  :series="customersSeries"
                ></track-card>
              <!-- <v-card class="d-flex flex-column flex-grow-1 text-center px-3 py-6 pb-7" light>
                <div class="font-weight-bold text-body-2 text-uppercase">Avg Daily Production /wk</div>
                <div class="d-flex align-center mt-3 justify-center">
                  <div class="text-h4 number">152</div>
                </div>
              </v-card> -->
              </v-col>
              <v-col cols="6" class="pb-0">
                <oee-card></oee-card>
                <!-- <v-card class="d-flex flex-column flex-grow-1 text-center px-3 py-6 pb-7">
              <div class="font-weight-bold text-body-2 text-uppercase">Avg First Past Yield /wk</div>
              <div class="d-flex align-center mt-3 justify-center">
                <div class="text-h4 number">84%</div>
              </div>
            </v-card> -->
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="6">
            <div class="d-flex flex-column h-full flex-grow-1">
              <sales-card
                class="h-full"
                style="min-height: 350px"
                :value="1.832"
                :percentage="3.2"
                :loading="isLoading1"
                :percentage-label="$t('dashboard.lastweek')"
                :action-label="$t('dashboard.viewReport')"
              ></sales-card>
            </div>
          </v-col>
          <!-- <v-col cols="12">
          <top-level-details
            class="h-full"
            :value="1.832"
            :percentage="3.2"
            :loading="isLoading1"
            :percentage-label="$t('dashboard.lastweek')"
            :action-label="$t('dashboard.viewReport')"
          ></top-level-details>
        </v-col> -->
          <v-col cols="12">
            <OeeBoxes />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container class="pt-0">
      <v-row dense>
        <v-col cols="12">
          <location-table />
        </v-col>
      </v-row>

      <!-- Locations -->
      <!--     <v-row dense v-if="!locationDetailsView">
      <v-col
        xs="12"
        sm="12"
        md="6"
        v-for="n in 3"
        :key="n"
      >
        <location :title="`Location ${n}`" @viewDetails="locationDetailsView = true"></location>
      </v-col>
    </v-row>
    <v-card v-else>
      <v-card-title>
        Location 1
        <v-btn text color="primary" @click="locationDetailsView = false" class="ml-auto">Back to all locations</v-btn>
      </v-card-title>
      <v-card-text>
        <locations-section></locations-section>
      </v-card-text>
    </v-card> -->

      <!-- <v-col cols="6" md="3">
        <v-card class="d-flex flex-column flex-grow-1 text-center px-3 py-6">
          <div class="overline">Today's Production</div>
          <div class="d-flex align-center mt-3 justify-center">
            <div class="text-h4 number">80</div>
            <div class="grey--text text--darken-1 text-h5 number ml-1">/ 140</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card class="d-flex flex-column flex-grow-1 text-center px-3 py-6">
          <div class="overline">First Pass Yield</div>
          <div class="d-flex align-center mt-3 justify-center">
            <div class="text-h4 number">87%</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card class="d-flex flex-column flex-grow-1 text-center px-3 py-6">
          <div class="overline">Avg Daily Production /wk</div>
          <div class="d-flex align-center mt-3 justify-center">
            <div class="text-h4 number">152</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card class="d-flex flex-column flex-grow-1 text-center px-3 py-6">
          <div class="overline">Avg First Past Yield</div>
          <div class="d-flex align-center mt-3 justify-center">
            <div class="text-h4 number">84%</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <sales-card
          class="h-full"
          style="min-height: 380px"
          :value="1.832"
          :percentage="3.2"
          :loading="isLoading1"
          :percentage-label="$t('dashboard.lastweek')"
          :action-label="$t('dashboard.viewReport')"
        ></sales-card>
      </v-col> -->
      <v-row dense class="mt-4">
        <v-col cols="12">
          <machines-table-card
            class="h-full"
            style="min-height: 380px"
            label="Machines"
            :items="machines"
            :loading="isLoading1"
          ></machines-table-card>
        </v-col>
        <v-col cols="12">
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
    </v-container>
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
// import TopLevelDetails from '../../components/dashboard/TopLevelDetails'
import DowntimeCard from '../../components/dashboard/DowntimeCard'
import OeeCard from '../../components/dashboard/OeeCard'
// import LocationsSection from '../../components/dashboard/LocationsSection'
// import StatusCard from '../../components/dashboard/StatusCard'
// import TotalRuntime from '../../components/dashboard/TotalRuntime'
import OverviewCard from '../../components/dashboard/OverviewCard'
import TrackCard from '../../components/dashboard/TrackCard'

// import Location from '../../components/dashboard/location/Index'
import OeeBoxes from '../../components/dashboard/boxes/Index'
import LocationTable from '../../components/dashboard/location-table/Index'

export default {
  components: {
    // Location,
    TrackCard,
    // GaugeCard
    SalesCard,
    DowntimeCard,
    OeeCard,
    MachinesTableCard,
    OverviewCard,
    // TopLevelDetails,
    // LocationsSection,
    OeeBoxes,
    LocationTable
  },
  data() {
    return {
      loadingInterval: null,

      isLoading1: true,

      series: [44, 55],

      ordersSeries: [{
        name: 'FPY',
        data: [
          ['2020-02-02', 34],
          ['2020-02-03', 43],
          ['2020-02-04', 40],
          ['2020-02-05', 43]
        ]
      }],

      customersSeries: [{
        name: 'Avg FPY',
        data: [
          ['2020-02-02', 13],
          ['2020-02-03', 11],
          ['2020-02-04', 13],
          ['2020-02-05', 12]
        ]
      }],

      tab: 0,
      locationDetailsView: false,

      page: 1,
      total: 9,

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
  computed: {
    ...mapState({
      machines: (state) => state.machines.data
    }),
    locationCountInPage() {
      const remainding = this.total - parseInt(this.page - 1) * 4

      console.log(remainding)

      return remainding >= 4 ? 4 : remainding
    },
    pageLen() {
      return parseInt(this.total / 4) + 1
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
    },
    locationTitle(i) {
      const num = parseInt(i) + parseInt(this.page - 1) * 4

      return 'Location ' + num
    }
  }
}
</script>

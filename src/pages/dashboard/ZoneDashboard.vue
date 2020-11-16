<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="primary lighten-1" class="my-n4 mb-n8 pb-8">
      <v-container class="pb-0">
        <top-card></top-card>
        <v-row dense>
          <v-col cols="12">
            <OeeBoxes></OeeBoxes>
          </v-col>
          <v-col cols="12">
            <top-level-details
              class="h-full"
              :value="1.832"
              :percentage="3.2"
              :loading="isLoading1"
              :percentage-label="$t('dashboard.lastweek')"
              :action-label="$t('dashboard.viewReport')"
            ></top-level-details>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-container>
      <v-card>
        <v-card-title>
          Machines
        </v-card-title>
        <v-card-text>
          <locations-section></locations-section>
        </v-card-text>
      </v-card>
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
import TopLevelDetails from '../../components/dashboard/TopLevelDetails'
import LocationsSection from '../../components/dashboard/LocationsSection'
import TopCard from '../../components/dashboard/TopCard'

export default {
  components: {
    TopLevelDetails,
    LocationsSection,
    TopCard
  },
  data() {
    return {
      loadingInterval: null,

      isLoading1: true,

      breadcrumbItems: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/dashboard/analytics'
        },
        {
          text: 'Location 1',
          disabled: false,
          href: '/dashboard/loc1'
        },
        {
          text: 'Zone 1',
          disabled: true
        }
      ],

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
    })
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

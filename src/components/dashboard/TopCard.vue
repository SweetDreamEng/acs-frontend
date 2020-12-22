<template>
  <div>
    <v-row class="flex-grow-0" dense>
      <v-col xs="12" sm="12" md="6" lg="6">
        <v-row dense>
          <v-col
            cols="6"
            xs="12"
            class="pt-0"
          >
            <track-card
              label="First Pass Yield"
              color="#8c9eff"
              value="87%"
              :percentage="1.7"
              percentage-label="vs last week"
              :series="ordersSeries"
            ></track-card>
          </v-col>
          <v-col
            cols="6"
            xs="12"
            class="pt-0"
          >
            <downtime-card></downtime-card>
          </v-col>
          <v-col
            cols="6"
            xs="12"
            class="pb-0"
          >
            <track-card
              label="Avg First Pass Yield"
              color="#06d6a0"
              value="84%"
              :percentage="4.3"
              percentage-label="vs last week"
              :series="customersSeries"
            >
            </track-card>
          </v-col>
          <v-col
            cols="6"
            xs="12"
            class="pb-0"
          >
            <oee-card></oee-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" xs="12" sm="12">
        <div class="d-flex flex-column flex-grow-1" style="height: 100%">
          <sales-card
            :value="1.832"
            :percentage="3.2"
            :loading="isLoading1"
            percentage-label="vs last week"
            action-label="View Report"
          ></sales-card>
        </div>
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

import { mapState } from 'vuex'

import SalesCard from '../../components/dashboard/SalesCard'
import DowntimeCard from '../../components/dashboard/DowntimeCard'
import OeeCard from '../../components/dashboard/OeeCard'
import TrackCard from '../../components/dashboard/TrackCard'

export default {
  components: {
    TrackCard,
    SalesCard,
    DowntimeCard,
    OeeCard
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

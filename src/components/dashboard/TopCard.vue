<template>
  <v-row class="flex-grow-0" dense>
    <v-col md="12" sm="12">
      <v-row dense class="my-0">
        <v-col
          xs="12"
          sm="12"
          class="pt-0"
        >
          <downtime-card></downtime-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col md="6" sm="6">
      <downtime-by-type-card></downtime-by-type-card>
    </v-col>
    <v-col md="6" sm="6">
      <downtime-by-reason-card></downtime-by-reason-card>
    </v-col>
  </v-row>
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
import DowntimeByTypeCard from '../../components/dashboard/DowntimeByTypeCard'
import DowntimeByReasonCard from '../../components/dashboard/DowntimeByReasonCard'
import OeeCard from '../../components/dashboard/OeeCard'
import TrackCard from '../../components/dashboard/TrackCard'

export default {
  components: {
    DowntimeCard,
    DowntimeByTypeCard,
    DowntimeByReasonCard
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

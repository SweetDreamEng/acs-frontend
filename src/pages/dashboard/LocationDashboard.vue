<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="primary lighten-1" class="my-n4 mb-n8 pb-8">
      <v-container class="pb-0">
        <v-breadcrumbs :items="breadcrumbItems" class="mt-0 mb-n1" dark></v-breadcrumbs>
        <top-card></top-card>
        <v-row dense>
          <v-col cols="12">
            <ZoneCards></ZoneCards>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-container>
      <location-details-table />

      <br>

      <machines-table-card
        style="min-height: 380px"
        label="Machines"
        :items="machines"
        :loading="isLoading1"
      ></machines-table-card>
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

import MachinesTableCard from '../../components/dashboard/MachinesTableCard'
import LocationDetailsTable from '../../components/dashboard/location-table/LocationDetailsTable'
import TopCard from '../../components/dashboard/TopCard'
import ZoneCards from '../../components/dashboard/boxes/ZoneCard'

export default {
  components: {
    MachinesTableCard,
    LocationDetailsTable,
    TopCard,
    ZoneCards
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
<style>
  .v-breadcrumbs a {
    color: white;
  }
</style>
<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="surface2" class="my-n8 py-8">
      <v-container class="pb-0">
        <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>
        <top-card></top-card>
      </v-container>
    </v-sheet>
    <v-container>
      <machines-table></machines-table>
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
import { mapState, mapGetters, mapActions } from 'vuex'

// DEMO Cards for dashboard
import MachinesTable from '../../components/dashboard/dashboard-tables/MachinesTable'
import SalesCard from '../../components/dashboard/SalesCard'
import TopCard from '../../components/dashboard/TopCard'

export default {
  components: {
    MachinesTable,
    TopCard
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
      total: 9
    }
  },
  computed: {
    ...mapState({
      machines: (state) => state.machines.data
    }),
    ...mapGetters({
      locationName: 'locations/locationName',
      zoneName: 'zones/zoneName'
    }),
    breadcrumbItems() {
      return  [
        {
          text: 'Dashboard',
          disabled: false,
          exact: true,
          to: '/dashboard/analytics'
        }, {
          text: this.locationName(parseInt(this.$route.params.location)),
          disabled: false,
          exact: true,
          to: `/dashboard/analytics/${this.$route.params.location}`
        }, {
          text: this.zoneName(parseInt(this.$route.params.zone)),
          disabled: true
        }
      ]
    },
    machinesForZone() {
      return this.machines.filter((machine) => {
        return parseInt(machine.location.id) === parseInt(this.$route.params.location)
          && parseInt(machine.zone.id) === parseInt(this.$route.params.zone)
      })
    }
  },
  mounted() {
    this.getLocations()
    this.getZones()

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
    ...mapActions({
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones'
    }),
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>
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

      <v-col cols="8">
        <machines-table-card
          class="h-full"
          style="min-height: 380px"
          label="Machines"
          :loading="isLoading1"
        ></machines-table-card>
      </v-col>
      <v-col cols="4">
        <status-card>
          
        </status-card>

<!--         <total-runtime
          :series="series"
        >
          
        </total-runtime> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
// DEMO Cards for dashboard
import SalesCard from '../../components/dashboard/SalesCard'
import MachinesTableCard from '../../components/dashboard/MachinesTableCard'
import StatusCard from '../../components/dashboard/StatusCard'
// import TotalRuntime from '../../components/dashboard/TotalRuntime'

export default {
  components: {
    SalesCard, MachinesTableCard, StatusCard
  },
  data() {
    return {
      loadingInterval: null,

      isLoading1: true,

      series: [

      ]
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

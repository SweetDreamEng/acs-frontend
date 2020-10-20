<template>
  <div class="d-flex flex-grow-1 flex-column">

    <!-- loading spinner -->
    <div v-if="isLoading1" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    
    <div v-else>
      <v-row class="flex-grow-0" dense>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <div class="display-1">{{ selectedMachine.machinename }}</div>
            <v-btn text color="primary">Add charts</v-btn>
          </div>
        </v-col>
        <v-col sm="12" md="6">
          <product-details
            :machine="selectMachine"
            label="Runtime"
            :loading="isLoading1"
          >
          </product-details>
        </v-col>
        <v-col sm="12" md="6">
          <product-details
            label="Feeder Calibration"
            :loading="isLoading1"
          >
          </product-details>
        </v-col>
        <v-col sm="12" md="6">
          <product-details
            label="Blender Capability"
            :loading="isLoading1"
          >
          </product-details>
        </v-col>
        <v-col sm="12" md="6">
          <product-details
            label="Accumulated Hopper inventory"
            :loading="isLoading1"
          >
          </product-details>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// DEMO Cards for dashboard
import ProductDetails from '../../components/dashboard/ProductDetails'

export default {
  components: {
    ProductDetails
  },
  props: {
  },
  data() {
    return {
      loadingInterval: null,

      isLoading1: false
    }
  },
  created () {
  },
  mounted() {
    let count = 0

    this.selectMachine(this.$route.params.id)

    console.log(this.selectedMachine)
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
    ...mapGetters([
      'selectedMachine'
    ])
  },
  methods: {
    ...mapActions([
      'selectMachine'
    ]),
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>

<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-row class="flex-grow-0" dense>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center">
          <div class="display-1">BD Batch Blender - Metrics</div>
          <v-btn text color="primary">Add charts</v-btn>
        </div>
      </v-col>
      <v-col sm="12" md=6>
        <product-details
          label="Runtime"
          :loading="isLoading1"
        >
        </product-details>
      </v-col>
      <v-col sm="12" md=6>
        <product-details
          label="Feeder Calibration"
          :loading="isLoading1"
        >
        </product-details>
      </v-col>
      <v-col sm="12" md=6>
        <product-details
          label="Blender Capability"
          :loading="isLoading1"
        >
        </product-details>
      </v-col>
      <v-col sm="12" md=6>
        <product-details
          label="Accumulated Hopper inventory"
          :loading="isLoading1"
        >
        </product-details>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// DEMO Cards for dashboard
import ProductDetails from '../../components/dashboard/ProductDetails'

export default {
  components: {
    ProductDetails
  },
  data() {
    return {
      loadingInterval: null,

      isLoading1: true
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

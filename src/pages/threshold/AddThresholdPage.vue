<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-card>
      <v-card-text>
        <div>
          <h2 class="my-2">Target Devices</h2>
          <div class="">Select the target device template your rule will use. If you need to narrow the rule's scope, add filters.</div>
          <v-select
            v-model="selectedLocation"
            :items="locations"
            item-text="name"
            item-value="id"
            label="Location"
            :loading="isLocationLoading"
            :disabled="isLocationLoading"
            @change="handleLocationChange"
          >
          </v-select>
          <v-select
            v-model="selectedZone"
            :items="zones"
            item-text="name"
            item-value="id"
            label="Zone"
            :loading="isZoneLoading"
            :disabled="isZoneLoading || !selectedLocation"
            @change="handleZoneChange"
          >
          </v-select>
          <v-select
            v-model="selectedProduct"
            :items="products"
            item-text="name"
            item-value="device_id"
            label="Product"
            :loading="isProductLoading"
            :disabled="isProductLoading || !selectedZone"
            @change="handleProductChange"
          >
          </v-select>
        </div>
        <div>
          <h2 class="my-3">Conditions</h2>
          <div class="">Conditions define when your rule is triggered.</div>
          <br>
          <v-form ref="conditionForm" v-model="conditionValid" :disabled="!selectedProduct || isLoadingMachineTags">
            <div v-for="(filter, i) in filters" :key="i" class="d-flex align-center mb-5">
              <div class="flex-grow-1">
                <v-row>
                  <v-col
                    cols="12"
                    sm="3"
                    class="py-0"
                  >
                    <v-select
                      v-model="filter.parameter"
                      :items="machineTags"
                      item-text="name"
                      item-value="id"
                      label="Select a parameter"
                      :rules="[$rules.required]"
                      required
                    >
                    </v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                    class="py-0"
                  >
                    <v-select
                      v-model="filter.operator"
                      :items="operators"
                      label="Select an operator"
                      required
                      :rules="[$rules.required]"
                    >
                    </v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="2"
                    class="py-0"
                  >
                    <v-text-field
                      v-model="filter.value"
                      type="number"
                      label="Select or enter a value"
                      required
                      :rules="[$rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="2"
                    class="py-0"
                  >
                    <v-text-field
                      v-model="filter.approachingValue"
                      type="number"
                      label="Enter a approaching value"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="2"
                    class="py-0"
                  >
                    <v-select
                      v-model="filter.isRunning"
                      label="Select a machine status"
                      :items="runningStatus"
                      item-text="name"
                      item-value="value"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
              <div class="flex-shrink-0" style="width: 48px;">
                <v-btn
                  v-if="i !== 0"
                  icon
                  fab
                  class="ml-2"
                  elevation="2"
                  x-small
                  @click="filters.splice(i, 1)"
                >
                  <v-icon small>$mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
          </v-form>
          <v-btn
            @click="addFilter"
          >
            <v-icon left>$mdi-plus</v-icon>Condition
          </v-btn>
        </div>
        <div>
          <v-btn
            color="primary"
            class="mt-2"
            :disabled="!selectedLocation || !selectedZone || !selectedProduct || !conditionValid"
            :loading="isAddingThreshold"
            @click="handleSubmit"
          >
            Add Threshold
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Threshold Add Page Component
| url: /threshold/add
|---------------------------------------------------------------------
|
| Add a new threshold
*/
import { mapState, mapActions } from 'vuex'

import telemetries from './content/telemetries'
import operators from './content/operators'

export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    roles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedLocation: 0,
      selectedZone: 0,
      selectedProduct: 0,
      telemetries,
      operators,

      switch1: true,

      filters: [
        {
          parameter: '',
          operator: '',
          value: null,
          approachingValue: null,
          isRunning: true
        }
      ],

      tab: null,

      conditionValid: true,

      runningStatus: [{
        name: 'Running',
        value: true
      }, {
        name: 'Not Running',
        value: false
      }]
    }
  },
  computed: {
    ...mapState({
      isLocationLoading: (state) => state.locations.tableLoading,
      isZoneLoading: (state) => state.machines.loadingZonesTable,
      isProductLoading: (state) => state.machines.isReportLoading,
      isLoadingMachineTags: (state) => state.thresholds.isLoadingMachineTags,
      locations: (state) => state.locations ? state.locations.data : [],
      products: (state) => state.machines.reportMachines,
      isAddingThreshold: (state) => state.thresholds.loading
    }),
    machineTags: {
      get() {
        return this.$store.state.thresholds.machineTags
      },
      set (value) {
        this.$store.commit('thresholds/SET_MACHINE_TAGS', value)
      }
    },
    zones: {
      get() {
        return this.$store.state.zones.data
      },
      set (value) {
        this.$store.commit('zones/SET_DATA', value)
      }
    },
    products: {
      get() {
        return this.$store.state.machines.reportMachines
      },
      set (value) {
        this.$store.commit('machines/SET_REPORT_MACHINES',value)
      }
    }
  },
  async mounted() {
    await this.getLocations()
  },
  methods: {
    ...mapActions({
      getLocations: 'locations/getLocations',
      initZonesTable: 'machines/initZonesTable',
      getMachines: 'machines/getMachines',
      getMachineTags: 'thresholds/getMachineTags',
      addThreshold: 'thresholds/addThreshold'
    }),
    addFilter() {
      if (this.filters.length < 3) {
        this.filters.push({
          parameter: '',
          operator: '',
          value: null,
          approachingValue: null,
          isRunning: true
        })
      }
    },
    handleLocationChange() {
      this.selectedZone = false
      this.selectedProduct = false
      this.initZonesTable(this.selectedLocation)
    },
    handleZoneChange() {
      this.selectedProduct = false
      this.getMachines({
        location: this.selectedLocation,
        zone: this.selectedZone
      })
    },
    handleProductChange() {
      this.filters = [
        {
          parameter: '',
          operator: '',
          value: null,
          approachingValue: null,
          isRunning: true
        }
      ]
      this.getMachineTags({
        deviceIds: [this.selectedProduct]
      })
    },
    async handleSubmit() {
      await this.addThreshold({
        deviceId: this.selectedProduct,
        conditions: this.filters
      })

      this.selectedLocation = ''
      this.selectedZone = ''
      this.selectedProduct = ''
      this.filters = [{
        parameter: '',
        operator: '',
        value: null,
        approachingValue: null,
        isRunning: true
      }]
    }
  }
}
</script>

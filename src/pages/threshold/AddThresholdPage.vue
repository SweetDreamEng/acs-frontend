<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="text-h4">Threshold</div>
      </div>
    </div>
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
          <div class="">Conditions define when your rule is triggered. Aggregation is optional - use it to cluster your data and trigger rules based on a time window.</div>
          <br>
          <v-form ref="conditionForm" v-model="conditionValid" :disabled="!selectedProduct || isLoadingMachineTags">
            <v-row
              v-for="(filter, i) in filters"
              :key="i"
            >
              <v-col
                cols="12"
                sm="4"
                class="py-0"
              >
                <v-select
                  v-model="filter.telemetry"
                  :items="machineTags"
                  item-text="name"
                  item-value="tag_id"
                  label="Select a telemetry"
                  :rules="conditionRules"
                  required
                >
                </v-select>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="py-0"
              >
                <v-select
                  v-model="filter.operator"
                  :items="operators"
                  label="Select an operator"
                  required
                  :rules="conditionRules"
                >
                </v-select>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="py-0"
              >
                <v-text-field
                  v-model="filter.value"
                  type="number"
                  label="Select or enter a value"
                  required
                  :rules="conditionRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <br>
          <br>
          <v-btn
            @click="addFilter"
          >
            <v-icon left>$mdi-plus</v-icon>Condition
          </v-btn>
        </div>
        <div>
          <h2 class="mt-4 mb-2">Actions</h2>
          <div class="">Send an email when your rule is triggered. Emails will only be sent to users who have been added to this application and have signed-in at least once.</div>
          <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
            <v-tab to="#tabs-sms">SMS</v-tab>
            <v-tab to="#tabs-email">Email</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tabs-sms">
              <v-form
                ref="sms"
                v-model="smsValid"
                lazy-validation
              >
                <v-text-field
                  v-model="smsForm.name"
                  label="Display name"
                  :rules="nameRules"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="smsForm.to"
                  label="To"
                  placeholder="123-456-7890"
                  :rules="phoneRules"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="smsForm.note"
                  label="Note"
                  required
                  :rules="noteRules"
                  placeholder="Add a note to include in the sms."
                ></v-textarea>
              </v-form>
            </v-tab-item>

            <v-tab-item value="tabs-email">
              <v-form
                ref="email"
                v-model="emailValid"
                lazy-validation
              >
                <v-text-field
                  v-model="emailForm.name"
                  label="Display name"
                  :rules="nameRules"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="emailForm.to"
                  label="To"
                  placeholder="ex: msft@microsoft.com"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="emailForm.note"
                  label="Note"
                  required
                  :rules="noteRules"
                  placeholder="Add a note to include in the email."
                ></v-textarea>
              </v-form>
            </v-tab-item>
          </v-tabs-items>

          <v-btn
            color="primary mt-2"
            :disabled="!selectedLocation || !selectedZone || !selectedProduct || !conditionValid"
            :loading="isAddingThreshold"
            @click="handleSubmit"
          >
            Submit
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
          telemetry: '',
          operator: '',
          value: null
        }
      ],

      emailForm: {
        name: null,
        to: null,
        note: null
      },
      smsForm: {
        name: null,
        to: null,
        note: null
      },

      tab: null,

      emailValid: false,
      smsValid: false,
      conditionValid: true,

      nameRules: [
        (v) => !!v || 'Name is required'
      ],
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        (v) => /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/.test(v) || 'Phone number must be valid'
      ],
      noteRules: [
        (v) => !!v || 'Note is required'
      ],
      conditionRules: [
        (v) => !!v || 'This field is required'
      ]
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
          telemetry: '',
          operator: '',
          value: null
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
          telemetry: '',
          operator: '',
          value: null
        }
      ]
      this.getMachineTags({
        deviceIds: [this.selectedProduct]
      })
    },
    resetFilters() {
      this.filters = this.initFilter
    },
    handleSubmit() {
      if ((this.$refs.sms && this.$refs.sms.validate()) || (this.$refs.email && this.$refs.email.validate())) {
        this.addThreshold({
          deviceId: this.selectedProduct,
          conditions: this.filters,
          smsForm: this.smsForm,
          emailForm: this.emailForm
        })
      }
    }
  }
}
</script>

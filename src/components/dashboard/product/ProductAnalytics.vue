<template>
  <div>
    <div>
      <v-combobox
        v-model="selectedParameters"
        :items="parameters.filter((item) => item.machine_id === configId)"
        solo
        label="Add/Remove parameters"
        multiple
        item-text="name"
        item-value="id"
        class="flex-grow-0 ml-auto"
        @input="onEnabledPropertiesChanged()"
      >
        <template v-slot:selection="{ attrs, item }">
          <v-chip
            v-bind="attrs"
            close
            small
            @click:close="remove(item)"
          >
            {{ item.name }}
          </v-chip>
        </template>
      </v-combobox>
    </div>

    <component 
      :is="propertiesComponent()" 
      :product-id="$route.params.productId"
      :parameters="selectedParameters.map((item) => item.id)"
    >
    </component>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Product Parameters Card Component
|---------------------------------------------------------------------
|
| Product parameters component
| where update parameters of a certain product
|
*/
import { mapActions } from 'vuex'

import BdBatchBlender from './product-analytics/bd-batch-blender/BDBatchProperties'
import AccumeterOvationBlender from './product-analytics/accumeter-ovation-continuous-blender/AccumeterOvationBlenderProperties'
import GhGravimetricExtrusionControlHopper from './product-analytics/gh-gravimetric-extrusion-control-hopper/GhGravimetricProperties'
import VtcPlusConveyingSystem from './product-analytics/vtc-plus-conveying-system/VtcPlusConveyingProperties'
import NgxDryer from './product-analytics/ngx-dryer/NgxDryerProperties'
import TruetempTcu from './product-analytics/truetemp-tcu/TruetempTcuProperties'

export default {
  components: {
    BdBatchBlender,
    AccumeterOvationBlender,
    GhGravimetricExtrusionControlHopper,
    VtcPlusConveyingSystem,
    NgxDryer,
    TruetempTcu
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Array,
      default: () => []
    },
    deviceConfiguration: {
      type: Object,
      default: () => {}
    },
    enabledProperties: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      parameters: [
        { id: 101, machine_id: 1, name: 'process rate' },
        { id: 102, machine_id: 1, name: 'calibration factor' },
        { id: 103, machine_id: 1, name: 'hopper stable' },
        { id: 104, machine_id: 1, name: 'station conveying' },

        { id: 101, machine_id: 2, name: 'blender capability' },
        { id: 102, machine_id: 2, name: 'target rate' },
        { id: 103, machine_id: 2, name: 'feeder calibration' },
        { id: 104, machine_id: 2, name: 'feeder speed' }
      ],
      selectedParameters: []
    }
  },
  computed: {
    selectedParametersForMachine() {
      const item = this.enabledProperties.find((property) => property.machine_id === parseInt(this.configId))

      return item ? JSON.parse(item.property_ids) : []
    },
    configId() {
      return this.deviceConfiguration && this.deviceConfiguration.tcu_added ? 11 : parseInt(this.$route.params.configurationId)
    }
  },
  watch: {
    enabledProperties(properties) {
      this.selectedParameters = this.parameters.filter((parameter) => parameter.machine_id === parseInt(this.configId) && this.selectedParametersForMachine.includes(parameter.id) )

      if (!this.selectedParameters.length) {
        this.selectedParameters = this.parameters.filter((item) => item.machine_id === this.configId)
      }
    }
  },
  methods: {
    ...mapActions('machines', ['updateEnabledProperties']),

    propertiesComponent() {
      switch (this.configId) {
      case 1: return 'BdBatchBlender'
      case 2: return 'AccumeterOvationBlender'
      case 3: return 'GhGravimetricExtrusionControlHopper'
      // case 4: return 'GhFGravimetricAdditiveFeeder'
      case 5: return 'VtcPlusConveyingSystem'
      case 6: return 'NgxDryer'
      // case 7: return 'NgxNomadDryer'
      // case 8: return 'T50CentralGranulator'
      // case 9: return 'GpPortableChiller'
      case 11: return 'TruetempTcu'
      default: return ''
      }
    },
    remove (item) {
      this.selectedParameters.splice(this.selectedParameters.indexOf(item), 1)
      this.onEnabledPropertiesChanged()
    },
    onEnabledPropertiesChanged() {
      this.updateEnabledProperties({ id: this.configId, isImportant: false, enabledProperties: this.selectedParameters.map((item) => item.id) })
    }
  }
}
</script>

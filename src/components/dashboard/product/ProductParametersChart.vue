<template>
  <div>
    <div>
      <v-combobox
        v-model="selectedGraphs"
        :items="graphs"
        solo
        label="Add/Remove parameters"
        multiple
        item-text="graph_name"
        item-value="graph_id"
        class="flex-grow-0 ml-auto mb-1"
        hide-details
        @input="onEnabledPropertiesChanged()"
      >
        <template v-slot:selection="{ attrs, item }">
          <v-chip
            v-bind="attrs"
            close
            small
            color="primary lighten-2"
            outlined
            @click:close="remove(item)"
          >
            {{ item.graph_name }}
          </v-chip>
        </template>
      </v-combobox>
    </div>

    <component
      :is="propertiesComponent()" 
      :machine-id="machineId"
      :serial-number="serialNumber"
      :parameters="selectedGraphs.map((item) => item.graph_id)"
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
import NgxNomadDryer from './product-analytics/ngx-nomad-dryer/NgxNomadDryerProperties'
import TruetempTcu from './product-analytics/truetemp-tcu/TruetempTcuProperties'

export default {
  components: {
    BdBatchBlender,
    AccumeterOvationBlender,
    GhGravimetricExtrusionControlHopper,
    VtcPlusConveyingSystem,
    NgxDryer,
    NgxNomadDryer,
    TruetempTcu
  },
  props: {
    machineId: {
      type: Number,
      default: 0
    },
    serialNumber: {
      type: Number,
      default: 0
    },
    graphs: {
      type: Array,
      default: () => []
    },
    enabledGraphs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedGraphs: this.enabledGraphs
    }
  },
  methods: {
    ...mapActions('devices', ['updateEnabledProperties']),

    propertiesComponent() {
      switch (this.machineId) {
      case 1: return 'BdBatchBlender'
      case 2: return 'AccumeterOvationBlender'
      case 3: return 'GhGravimetricExtrusionControlHopper'
      // case 4: return 'GhFGravimetricAdditiveFeeder'
      case 5: return 'VtcPlusConveyingSystem'
      case 6: return 'NgxDryer'
      case 7: return 'NgxNomadDryer'
      // case 8: return 'T50CentralGranulator'
      // case 9: return 'GpPortableChiller'
      case 11: return 'TruetempTcu'
      default: return ''
      }
    },
    remove (item) {
      this.selectedGraphs.splice(this.selectedGraphs.indexOf(item), 1)
      this.onEnabledPropertiesChanged()
    },
    onEnabledPropertiesChanged() {
      this.updateEnabledProperties({ serial_number: this.serialNumber, isImportant: false, enabled_properties: this.selectedGraphs.map((item) => item.graph_id) })
    }
  }
}
</script>

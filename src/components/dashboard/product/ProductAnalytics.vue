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
        class="flex-grow-0 ml-auto"
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
      :is="analyticsComponent()" 
      :product-id="$route.params.productId"
      :parameters="selectedGraphs.map((graph) => graph.graph_id)"
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
import { mapState, mapActions } from 'vuex'

import BdBatchBlender from './product-analytics/bd-batch-blender/BDBatchAnalytics'
import AccumeterOvationContinuousBlender from './product-analytics/accumeter-ovation-continuous-blender/AccumeterOvationBlenderAnalytics'
import GhGravimetricExtrusionControlHopper from './product-analytics/gh-gravimetric-extrusion-control-hopper/GhGravimetricAnalytics'
import GhFGravimetricAdditiveFeeder from './product-analytics/gh-f-gravimetric-additive-feeder'
import VtcPlusConveyingSystem from './product-analytics/vtc-plus-conveying-system/VtcPlusConveyingAnalytics'
import NgxDryer from './product-analytics/ngx-dryer/NgxDryer'
import NgxNomadDryer from './product-analytics/ngx-nomad-dryer'
import T50CentralGranulator from './product-analytics/t50-central-granulator'
import GpPortableChiller from './product-analytics/gp-portable-chiller/PortableChillerAnalytics'
import TruetempTcu from './product-analytics/truetemp-tcu/TruetempTcuAnalytics.vue'

export default {
  components: {
    BdBatchBlender,
    AccumeterOvationContinuousBlender,
    GhGravimetricExtrusionControlHopper,
    GhFGravimetricAdditiveFeeder,
    VtcPlusConveyingSystem,
    NgxDryer,
    NgxNomadDryer,
    GpPortableChiller,
    T50CentralGranulator,
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
  computed: {
  },
  methods: {
    ...mapActions('devices', ['updateEnabledProperties']),

    analyticsComponent() {
      switch (this.machineId) {
      case 1: return 'BdBatchBlender'
      case 2: return 'AccumeterOvationContinuousBlender'
      case 3: return 'GhGravimetricExtrusionControlHopper'
      case 4: return 'GhFGravimetricAdditiveFeeder'
      case 5: return 'VtcPlusConveyingSystem'
      case 6: return 'NgxDryer'
      case 7: return 'NgxNomadDryer'
      case 8: return 'T50CentralGranulator'
      case 9: return 'GpPortableChiller'
      case 11: return 'TruetempTcu'
      default: return null
      }
    },
    remove (item) {
      this.selectedGraphs.splice(this.selectedGraphs.indexOf(item), 1)
      this.onEnabledPropertiesChanged()
    },
    onEnabledPropertiesChanged() {
      this.updateEnabledProperties({ serial_number: this.serialNumber, isImportant: true, enabled_properties: this.selectedGraphs.map((item) => item.graph_id) })
    }
  }
}
</script>

<template>
  <div>
    <v-row dense>
      <v-col cols="12">
        <component 
          :is="propertiesComponent($route.params.configurationId)" 
          :product-id="$route.params.productId"
        >
        </component>
        <!-- <bd-batch-blender v-if="parseInt($route.params.configurationId) === 1" :product-id="$route.params.productId"></bd-batch-blender> -->
      </v-col>
    </v-row>
    <!--     <v-card class="d-flex flex-column flex-grow-1">
      <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else class="d-flex flex-column flex-grow-1">
        <v-card-title class="primary--text">
          <v-combobox
            v-model="parameters"
            :items="tags"
            chips
            solo
            label="Add/Remove parameters"
            multiple
            class="flex-grow-0 ml-auto"
          >
            <template v-slot:selection="{ attrs, item }">
              <v-chip
                v-bind="attrs"
                close
                small
                @click:close="remove(item)"
              >
                {{ item }}
              </v-chip>
            </template>
          </v-combobox>
        </v-card-title>

        <v-card-text>
          <div class="px-2 pb-2">
            <v-divider></v-divider>
            <div class="mt-2">
              <v-icon color="secondary">mdi-magnify</v-icon><span class="mx-1">Zoom</span>
              <v-icon color="secondary">mdi-flag</v-icon><span class="mx-1">Marker</span>
              <v-icon color="secondary">mdi-chart-areaspline</v-icon><span class="mx-1">Lines</span>
            </div>
            <apexchart
              type="area"
              height="450"
              :options="chartOptions"
              :series="computedParameters"
            >
            </apexchart>
          </div>
        </v-card-text>
      </div>
    </v-card> -->
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
    }
  },
  data() {
    return {
      parameters: [],
      chartOptions: {
        chart: {
          type: 'area',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ['2020-10-16T13:00', '2020-10-16T14:00', '2020-10-16T15:00', '2020-10-16T16:00', '2020-10-16T17:00']
        },
        yaxis: {
          type: 'datetime'
        },
        tooltip: {
          x: {
            format: 'yyyy-mm-dd HH:mm'
          }
        }
      }
    }
  },
  computed: {
    computedParameters() {
      return this.parameterSeries.filter( (param) => {
        return this.parameters.includes(param.name) 
      })
    },
    parameterSeries() {
      return this.tags.map((tag) => {
        return {
          name: tag,
          data: [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]
        }
      })
    }
  },
  methods: {
    propertiesComponent() {
      const configId = parseInt(this.$route.params.configurationId)

      switch (configId) {
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
      this.parameters.splice(this.parameters.indexOf(item), 1)
    }
  }
}
</script>

<template>
  <v-card class="d-flex flex-column flex-grow-1">
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
  </v-card>
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
export default {
  components: {
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
    remove (item) {
      this.parameters.splice(this.parameters.indexOf(item), 1)
    }
  }
}
</script>

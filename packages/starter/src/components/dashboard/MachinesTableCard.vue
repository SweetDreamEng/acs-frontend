<template>
  <div class="test-machine">
    <v-card>
      <v-card-title>
        {{ label }}
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle class="d-flex flex-wrap">
        <v-slider
          v-model="hours"
          max="24"
          min="8"
          step="1"
          thumb-label
          ticks
          prepend-icon="mdi-clock"
          class=""
        ></v-slider>
        <span style="margin-top: 4px">Use slider to adjust time period for 8-24 hours</span>
      </v-card-subtitle>
      <v-card-text>
        <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <!-- <v-data-table
          v-else
          :headers="headers"
          :items="items"
          :item-class="itemRowBackground"
          hide-default-footer
          @click:row="productView"
        > -->
        <v-data-table
          v-else
          :headers="headers"
          :items="items"
          :item-class="itemRowBackground"
          hide-default-footer
          @click:row="productView"
        >
          <template v-slot:header.machinename="{ header }">
            <v-icon small>mdi-wrench</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.capacity="{ header }">
            <v-icon>mdi-trending-up</v-icon>
            {{ header.text | formatPercentage }}
          </template>
          <template v-slot:header.consumption="{ header }">
            <v-icon class="mdi-rotate-90">mdi-battery-30</v-icon>
            {{ header.text }}
          </template>
<!--           <template v-slot:header.factory="{ header }">
            <v-icon>mdi-map-marker</v-icon>
            {{ header.text }}
          </template> -->
          <template v-slot:header.department="{ header }">
            <v-icon>mdi-factory</v-icon>
            {{ header.text }}
          </template>

          <template v-slot:item.status="{ item }">
            <v-icon :color="getColor(item)">{{ getIcon(item) }}</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
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
    loading: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => {
        []
      }
    }
  },
  data () {
    return {
      headers: [
        { text: 'Running', align: 'center', value: 'status' },
        { text: 'Machine Name', align: 'start', value: 'machinename' },
        { text: 'Capacity Utilization', align: 'center', value: 'capacity' },
        { text: 'Consumption', align: 'center', value: 'consumption' },
        // { text: 'Factory', align: 'start', value: 'factory' },
        { text: 'Department', align: 'center', value: 'department' }
      ],

      hours: 8
    }
  },
  methods: {
    ...mapActions([
      'selectMachine'
    ]),
    open(item) { },
    getColor (item) {
      if (item.status === 'Warning') return 'orange'
      else if (item.status === 'Alarm') return 'green'
      else if (item.status === 'Not') return 'red'
      else return 'green'
    },
    getIcon(item) {
      if (item.status === 'Warning') return 'mdi-alert'
      else if (item.status === 'Alarm') return 'mdi-check-circle-outline'
      else if (item.status === 'Not') return 'mdi-bell-circle'
      else return 'mdi-check-circle-outline'
    },
    itemRowBackground(item) {
      return item.status === 'Not' ? 'background-alert' : ''
    },
    invalidItem(item) {
      return item.status === 'Not' ? true : false
    },
    productView(item) {
      this.$router.push({
        name: 'dashboard-product',
        params: {
          id: item.id
        }
      })
    }
  }
}
</script>
<style>
  /*table tbody tr.background-alert {
    background: #f98787 !important;
  }*/
</style>
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
      <v-card-text>
        <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
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
            {{ header.text }}
          </template>
          <template v-slot:header.consumption="{ header }">
            <v-icon class="mdi-rotate-90">mdi-battery-30</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.factory="{ header }">
            <v-icon>mdi-map-marker</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.department="{ header }">
            <v-icon>mdi-factory</v-icon>
            {{ header.text }}
          </template>

          <template v-slot:item.status="{ item }">
            <v-icon v-if="invalidItem(item)">mdi-close</v-icon>
            <v-chip
              v-else
              label
              :color="getColor(item.status)"
              dark
              class="justify-center font-weight-bold"
              style="width: 80px;">
              {{ item.status }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
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
        { text: 'Status', align: 'center', value: 'status' },
        { text: 'Machine Name', align: 'start', value: 'machinename' },
        { text: 'Capacity Utilization', align: 'center', value: 'capacity' },
        { text: 'Consumption', align: 'center', value: 'consumption' },
        { text: 'Factory', align: 'start', value: 'factory' },
        { text: 'Department', align: 'center', value: 'department' }
      ]
    }
  },
  methods: {
    open(item) { },
    getColor (status) {
      if (status === 'Warning') return 'orange'
      else if (status === 'Alarm') return 'red'
      else if (status === 'Not') return 'red'
      else return 'green'
    },
    itemRowBackground(item) {
      return item.status === 'Not' ? 'background-alert' : ''
    },
    invalidItem(item) {
      return item.status === 'Not' ? true : false
    },
    productView(item) {
      this.$router.push({
        name: 'dashboard-product'
      })
    }
  }
}
</script>
<style>
  table tbody tr.background-alert {
    background: #f98787 !important;
  }
</style>
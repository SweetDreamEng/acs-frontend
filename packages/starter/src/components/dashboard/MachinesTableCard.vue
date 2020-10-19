<template>
  <div>
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
          hide-default-footer
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
            <v-chip
              label
              :color="getColor(item.status)"
              dark
              class="justify-center font-weight-bold"
              style="width: 80px;">
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.department="{ item }">
            {{ item.department }}
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
    }
  },
  data () {
    return {
      headers: [
        { text: 'Status', align: 'start', value: 'status' },
        { text: 'Machine Name', align: 'start', value: 'machinename' },
        { text: 'Capacity Utilization', align: 'center', value: 'capacity' },
        { text: 'Consumption', align: 'center', value: 'consumption' },
        { text: 'Factory', align: 'start', value: 'factory' },
        { text: 'Department', align: 'center', value: 'department' }
      ],
      items: [
        {
          status: 'Warning',
          machinename: 'BD Batch Blender',
          capacity: '89%',
          consumption: '80 Watts',
          factory: '30 Elm Street, NY',
          department: 'Division 1'
        },
        {
          status: 'Normal',
          machinename: 'Accumeter Ovation Continuous',
          capacity: '30%',
          consumption: '30 Watts',
          factory: '45 Main street, FL',
          department: 'Division 2'
        },
        {
          status: 'Normal',
          machinename: 'GH Gravimetric Extrusion Control',
          capacity: '57%',
          consumption: '20 Watts',
          factory: '50 Gracy Street, TX',
          department: 'Division 3'
        },
        {
          status: 'Alarm',
          machinename: 'GH-F Gravimetric Additive',
          capacity: '99%',
          consumption: '90 Watts',
          factory: '44 Main Street, GA',
          department: 'Division 4'
        },
        {
          status: 'Normal',
          machinename: 'VTC Plus Conveying',
          capacity: '32%',
          consumption: '10 Watts',
          factory: '33 One Drive, MA',
          department: 'Division 1'
        },
        {
          status: 'Normal',
          machinename: 'NGX',
          capacity: '27%',
          consumption: '10 Watts',
          factory: '29 Georgia Ave, CA',
          department: 'Division 4'
        },
        {
          status: 'Normal',
          machinename: 'NGX Nomad',
          capacity: '38%',
          consumption: '40 Watts',
          factory: '746 Macon, CO',
          department: 'Division 5'
        },
        {
          status: 'Warning',
          machinename: 'Truetemp',
          capacity: '74%',
          consumption: '20 Watts',
          factory: '1 Cantance Street, UT',
          department: 'Division 1'
        },
        {
          status: 'Not',
          machinename: 'GP & HE Central',
          capacity: '',
          consumption: 'OFF',
          factory: '45 Spring Street, NY',
          department: 'Division 5'
        },
        {
          status: 'Normal',
          machinename: 'T50 Central',
          capacity: '52%',
          consumption: '30 Watts',
          factory: '69 Borden Rd, IL',
          department: 'Division 3'
        }
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
    }
  }
}
</script>

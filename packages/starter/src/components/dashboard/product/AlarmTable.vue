<template>
  <div>
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-card v-else>
      <v-card-title color="primary">
        {{ label }}
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="alarms"
          hide-default-footer
        >
          <!-- custom table header -->
          <template v-slot:header.alarm="{ header }">
            <v-icon color="primary">mdi-message-alert</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.status="{ header }">
            <v-icon color="primary">mdi-information</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.value="{ header }">
            <v-icon color="primary">mdi-chart-bar</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.createdAt="{ header }">
            <v-icon color="primary">mdi-clock</v-icon>
            <span v-text="header.text"></span>
            
          </template>

          <!-- custom table row -->
          <template v-slot:item.createdAt="{ item }">
            <span v-if="item.status === 'Alarm'">
              {{ item.createdAt }}
            </span>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="item.status === 'Normal' ? 'green' : 'red'"
              dark
              small
            >
              <b>{{ item.status }}</b>
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
| Product Alarm Card Component
|---------------------------------------------------------------------
|
| Table that lists alarms of a certain product
|
*/
import moment from 'moment'
import store from '../../../store'
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
        { text: 'Alarm', align: 'start', value: 'alarm' },
        { text: 'Status', align: 'start', value: 'status' },
        { text: 'Value', align: 'start', value: 'value' },
        { text: 'Alarm activated at', align: 'start', value: 'createdAt' }
      ],
      alarms: [
        {
          id: 1,
          alarm: 'Power Loss',
          status: 'Normal',
          value: 0,
          createdAt: 'October 23rd, 2020 6:0 AM EST'
        },{
          id: 2,
          alarm: 'Out of Material',
          status: 'Normal',
          value: 0,
          createdAt: 'October 23rd, 2020 6:0 AM EST'
        },
        {
          id: 3,
          alarm: 'Hopper Unstable',
          status: 'Alarm',
          value: 1,
          createdAt: 'October 23rd, 2020 6:0 AM EST'
        },
        {
          id: 4,
          alarm: 'Hopper Overfeed',
          status: 'Normal',
          value: 1,
          createdAt: 'October 23rd, 2020 6:0 AM EST'
        },
        {
          id: 5,
          alarm: 'Hopper Over Max',
          status: 'Normal',
          value: 55,
          createdAt: 'October 23rd, 2020 6:0 AM EST'
        },
        {
          id: 6,
          alarm: 'Max Empty Weight',
          status: 'Normal',
          value: 233,
          createdAt: 'October 23rd, 2020 6:0 AM EST'
        },
        {
          id: 7,
          alarm: 'Mixer Failure',
          status: 'Alarm',
          value: 1,
          createdAt: 'October 23rd, 2020 6:0 AM EST'
        },{
          id: 8,
          alarm: 'Unable to make rate',
          status: 'Alarm',
          value: 1,
          createdAt: 'October 23rd, 2020 6:0 AM EST'
        },
        {
          id: 9,
          alarm: 'Pump Starter Fault',
          status: 'Normal',
          value: 885,
          createdAt: 'October 23rd, 2020 6:0 AM EST'
        }
      ]
    }
  },
  methods: {
    open(item) { }
  }
}
</script>

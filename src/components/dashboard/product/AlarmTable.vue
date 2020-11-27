<template>
  <div>
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-card v-else>
      <v-card-title color="primary">
        {{ label }}
      </v-card-title>
      <v-card-subtitle>
        <TimeRangeChooser />
      </v-card-subtitle>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="alarms"
          :expanded.sync="expanded"
          show-expand
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
          <!--           <template v-slot:header.value="{ header }">
            <v-icon color="primary">mdi-chart-bar</v-icon>
            {{ header.text }}
          </template> -->
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
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length" class="px-4">
              <div class="pa-1">Alarm generated at {{ item.createdAt }} time</div>
              <div class="pa-1">Alarm cleared at {{ item.createdAt }} time</div>
            </td>
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
import TimeRangeChooser from '../TimeRangeChooser'

export default {
  components: {
    TimeRangeChooser
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
        // { text: 'Value', align: 'start', value: 'value' },
        { text: 'Alarm activated at', align: 'start', value: 'createdAt' },
        { text: '', value: 'data-table-expand' }
      ],
      alarms: [
        {
          id: 1,
          alarm: 'Power Loss',
          status: 'Alarm',
          value: 76,
          createdAt: 'October 23rd, 2020 6:0 AM EST'
        },{
          id: 2,
          alarm: 'Out of Material',
          status: 'Alarm',
          value: 27,
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
        }
      ],
      expanded: []
    }
  },
  methods: {
    open(item) { }
  }
}
</script>

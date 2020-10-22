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

          <!-- custom table row -->
          <template v-slot:item.status="{ item }">
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
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
        { text: 'Alarm', align: 'start', value: 'alarm' },
        { text: 'Status', align: 'start', value: 'status' },
        { text: 'Value', align: 'start', value: 'value' }
      ],

      alarms: [
        {
          id: 1,
          alarm: 'Power Loss',
          icon: 'mdi-check-circle-outline',
          value: 0,
          color: 'green'
        },{
          id: 2,
          alarm: 'Out of Material',
          icon: 'mdi-alert',
          value: 0,
          color: 'red'
        },
        {
          id: 3,
          alarm: 'Hopper Unstable',
          icon: 'mdi-check-circle-outline',
          value: 1,
          color: 'green'
        },
        {
          id: 4,
          alarm: 'Hopper Overfeed',
          icon: 'mdi-check-circle-outline',
          value: 1,
          color: 'green'
        },
        {
          id: 5,
          alarm: 'Hopper Over Max',
          icon: 'mdi-check-circle-outline',
          value: 55,
          color: 'green'
        },
        {
          id: 6,
          alarm: 'Max Empty Weight',
          icon: 'mdi-check-circle-outline',
          value: 233,
          color: 'green'
        },
        {
          id: 7,
          alarm: 'Mixer Failure',
          icon: 'mdi-check-circle-outline',
          value: 1,
          color: 'green'
        },{
          id: 8,
          alarm: 'Unable to make rate',
          icon: 'mdi-check-circle-outline',
          value: 1,
          color: 'green'
        },
        {
          id: 9,
          alarm: 'Pump Starter Fault',
          icon: 'mdi-check-circle-outline',
          value: 885,
          color: 'green'
        }
      ]
    }
  },
  methods: {
    open(item) { }
  }
}
</script>

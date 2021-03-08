<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    height="100%"
  >
    <v-card-title>Machine States</v-card-title>
    <v-card-text>
      <v-alert
        :color="machine.pump_status === 0 ? 'grey lighten-4' : 'green lighten-4'"
        :style="`color: ${textColor(machine.pump_status)}`"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              class="font-weight-bold"
            >Pump Status</span>
          </v-col>
          <v-col class="d-flex text-body-2">
            <v-icon
              small
              left
              :color="machine.pump_status === 0 ? 'grey' : 'green'"
            >$mdi-checkbox-blank-circle</v-icon>
            {{ machine.pump_status === 0 ? 'Off' : 'On' }}
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :color="backgroundColor(machine.heater_status)"
        :style="`color: ${textColor(machine.heater_status)}`"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              class="font-weight-bold"
            >Heater Status</span>
          </v-col>
          <v-col class="d-flex text-body-2">
            <v-icon
              small
              left
              :color="circleColor(machine.heater_status)"
            >$mdi-checkbox-blank-circle</v-icon>
            {{ valueText(machine.heater_status) }}
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :color="machine.vent_status === 0 ? 'grey lighten-4' : 'green lighten-4'"
        :style="`color: ${textColor(machine.vent_status)}`"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              class="font-weight-bold"
            >Vent Status</span>
          </v-col>
          <v-col class="d-flex text-body-2">
            <v-icon
              small
              left
              :color="machine.vent_status === 0 ? 'grey' : 'green'"
            >$mdi-checkbox-blank-circle</v-icon>
            {{ machine.vent_status === 0 ? 'Off' : 'On' }}
          </v-col>
        </v-row>
      </v-alert>
    </v-card-text>
  </v-card>
</template>
<script>
// Pump Status 0=off 1=on
// Heater Status 0=off 1=low 2=high 3=auto heat
// Vent Status 0=off 1=on

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    machine: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    backgroundColor(value) {
      if (value === 0) return 'grey lighten-4'
      else if (value === 1) return 'blue lighten-4'
      else if (value === 2) return 'yellow lighten-4'
      else if (value === 3) return 'green lighten-4'

      return ''
    },
    circleColor(value) {
      if (value === 0) return 'grey'
      else if (value === 1) return 'blue'
      else if (value === 2) return 'yellow'
      else if (value === 3) return 'green'

      return ''
    },
    textColor(value) {
      if (value === 0) return '#9e9e9e'
      else return '#193d66'
    },
    valueText(value) {
      switch (value) {
      case 0:
        return 'Off'
      case 1:
        return 'Low'
      case 2:
        return 'High'
      case 3:
        return 'Auto heat'
      default:
        return ''
      }
    }
  }
}
</script>

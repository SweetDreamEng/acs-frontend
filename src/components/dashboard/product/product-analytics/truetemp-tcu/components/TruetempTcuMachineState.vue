<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    height="100%"
    justify="center"
  >
    <v-card-title>Pump Status</v-card-title>
    <v-card-text>
      <v-alert
        :color="machine.pump_status === 0 ? 'acs-offline lighten-4' : 'acs-online lighten-4'"
        :style="`color: ${textColor(machine.pump_status)}`"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              :class="`font-weight-bold ${machine.vent_status === 0 ? 'red--text' : 'primary--text'}`"
            >Pump Status</span>
          </v-col>
          <v-col :class="`d-flex text-body-2 ${machine.vent_status === 0 ? 'red--text' : 'primary--text'}`">
            <v-icon
              small
              left
              :color="machine.pump_status === 0 ? 'acs-offline' : 'acs-online'"
            >$mdi-checkbox-blank-circle</v-icon>
            {{ machine.pump_status === 0 ? 'Off' : 'On' }}
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

const HEATER_STATES = {
  OFF: {
    backgroundColor: 'grey lighten-4',
    circleColor: 'grey',
    value: 'Off'
  },
  LOW: {
    backgroundColor: 'blue lighten-4',
    circleColor: 'blue',
    value: 'Low'
  },
  HIGH: {
    backgroundColor: 'yellow lighten-4',
    circleColor: 'yellow',
    value: 'High'
  },
  AUTO_HEAT: {
    backgroundColor: 'green lighten-4',
    circleColor: 'green',
    value: 'Auto heat'
  }
}

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
    getHeaterState(value) {
      if (value === 0) return HEATER_STATES['OFF']
      else if (value === 1) return HEATER_STATES['LOW']
      else if (value === 2) return HEATER_STATES['HIGH']
      else if (value === 3) return HEATER_STATES['AUTO_HEAT']
      
      return ''
    },
    backgroundColor(value) {
      const state = this.getHeaterState(value)

      return state ? state.backgroundColor : ''
    },
    circleColor(value) {
      const state = this.getHeaterState(value)

      return state ? state.circleColor : ''
    },
    textColor(value) {
      if (value === 0) return '#9e9e9e'
      else return '#193d66'
    },
    valueText(value) {
      const state = this.getHeaterState(value)

      return state ? state.value : ''
    }
  }
}
</script>

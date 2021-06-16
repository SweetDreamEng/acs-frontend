<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    height="100%"
  >
    <v-card-title>Drying Hopper States</v-card-title>
    <v-card-text>
      <div
        v-for="(num, index) in 3"
        :key="index"
      >
        <v-alert
          v-if="dryingHoppers[`hopper${num}`] !== 0"
          :color="backgroundColor(dryingHoppers[`hopper${num}`])"
          :style="`color: ${textColor(dryingHoppers[`hopper${num}`])}`"
        >
          <v-row
            align="center"
            no-gutters
          >
            <v-col cols="7">
              <span
                class="font-weight-bold"
              >Drying Hopper {{ num }}</span>
            </v-col>
            <v-col class="d-flex text-body-2">
              <v-icon
                small
                left
                :color="circleColor(dryingHoppers[`hopper${num}`])"
              >$mdi-checkbox-blank-circle</v-icon>
              {{ valueText(dryingHoppers[`hopper${num}`]) }}
            </v-col>
          </v-row>
        </v-alert>
      </div>
      
    </v-card-text>
  </v-card>
</template>
<script>
// value meaning hopper color
// 0 DISABLED GREY
// 1 ENABLED WHITE
// 2 ONLINE GREEN
// 3 SETBACK BLUE
// 4 AUTOTUNE YELLOW
// 5 ALARMED RED

const DRYING_HOPPER_STATES = {
  DISABLED: {
    backgroundColor: 'acs-hopper-disabled lighten-4',
    circleColor: 'acs-hopper-disabled',
    valueText: 'Disabled'
  },
  ENABLED: {
    backgroundColor: 'white lighten-4',
    circleColor: 'acs-hopper-enabled',
    valueText: 'Enabled'
  },
  ONLINE: {
    backgroundColor: 'acs-online lighten-4',  
    circleColor: 'acs-online',
    valueText: 'Online'
  },
  SETBACK: {
    backgroundColor: 'acs-hopper-setback lighten-4',
    circleColor: 'acs-hopper-setback',
    valueText: 'Setback'
  },
  AUTOTUNE: {
    backgroundColor: 'acs-hopper-autotune lighten-4',
    circleColor: 'acs-hopper-autotune',
    valueText: 'Autotune'
  },
  ALARMED: {
    backgroundColor: 'acs-hopper-alarmed lighten-4',
    circleColor: 'acs-hopper-alarmed',
    valueText: 'Alarmed'
  }
}

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    dryingHoppers: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getHopperByIndex(index) {
      const hoppers = {
        0: 'hopper1',
        1: 'hopper2',
        3: 'hopper3'
      }

      return hoppers[index] || ''
    },
    getHopperState(value) {
      if (value === 0) return DRYING_HOPPER_STATES['DISABLED']
      else if (value === 1) return DRYING_HOPPER_STATES['ENABLED']
      else if (value === 2) return DRYING_HOPPER_STATES['ONLINE']
      else if (value === 3) return DRYING_HOPPER_STATES['SETBACK']
      else if (value === 4) return DRYING_HOPPER_STATES['AUTOTUNE']
      else if (value === 5) return DRYING_HOPPER_STATES['ALARMED']

      return ''
    },
    backgroundColor(value) {
      const state = this.getHopperState(value)

      return state ? state.backgroundColor : ''
    },
    circleColor(value) {
      const state = this.getHopperState(value)

      return state ? state.circleColor : ''
    },
    textColor(value) {
      if (value === 0) return '#6c706d'
      else return '#193d66'
    },
    valueText(value) {
      const state = this.getHopperState(value)

      return state ? state.valueText : ''
    }
  }
}
</script>

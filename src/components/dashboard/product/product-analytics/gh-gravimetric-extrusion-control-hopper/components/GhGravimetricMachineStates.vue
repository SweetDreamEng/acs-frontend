<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    height="100%"
  >
    <v-card-title>System States</v-card-title>
    <v-card-text>
      <v-alert
        :color="machineStates.system_steady ? 'green lighten-4' : 'red lighten-4'"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              class="font-weight-bold"
              :class="{ 'red--text': !machineStates.system_steady }"
            >System steady</span>
          </v-col>
          <v-col class="d-flex text-body-2" :class="{ 'red--text': !machineStates.system_steady }">
            <v-icon
              small
              left
              :color="machineStates.system_steady ? 'green' : 'red'"
            >$mdi-checkbox-blank-circle</v-icon>
            {{ machineStates.system_steady ? 'Steady' : 'Not steady' }}
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :color="machineStates.wtp ? 'green lighten-4' : 'red lighten-4'"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              class="font-weight-bold"
              :class="{ 'red--text': !machineStates.wtp }"
            >WTP stable</span>
          </v-col>
          <v-col class="d-flex text-body-2" :class="{ 'red--text': !machineStates.wtp }">
            <v-icon
              small
              left
              :color="machineStates.wtp ? 'green' : 'red'"
            >$mdi-checkbox-blank-circle</v-icon>
            {{ machineStates.wtp ? 'Steady' : 'Not steady' }}
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :color="machineStates.rpm ? 'green lighten-4' : 'red lighten-4'"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              class="font-weight-bold"
              :class="{ 'red--text': !machineStates.rpm }"
            >Extruder RPM stable</span>
          </v-col>
          <v-col class="d-flex text-body-2" :class="{ 'red--text': !machineStates.rpm }">
            <v-icon
              small
              left
              :color="machineStates.rpm ? 'green' : 'red'"
            >$mdi-checkbox-blank-circle</v-icon>
            {{ machineStates.rpm ? 'Steady' : 'Not steady' }}
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :color="machineStates.halloff ? 'green lighten-4' : 'red lighten-4'"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              class="font-weight-bold"
              :class="{ 'red--text': !machineStates.halloff }"
            >Hauloff stable</span>
          </v-col>
          <v-col class="d-flex text-body-2" :class="{ 'red--text': !machineStates.halloff }">
            <v-icon
              small
              left
              :color="machineStates.halloff ? 'green' : 'red'"
            >$mdi-checkbox-blank-circle</v-icon>
            {{ machineStates.halloff ? 'Steady' : 'Not steady' }}
          </v-col>
        </v-row>
      </v-alert>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    machineStates: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

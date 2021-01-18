<template>
  <v-card
    height="100%"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title>{{ machine.customer_assigned_name }}</v-card-title>
    <v-card-subtitle>
      <div>{{ machine.name }}</div>
      <div v-if="machine.configuration">{{ machine.configuration.name }}</div>
    </v-card-subtitle>
    <v-img
      height="150"
      contain
      :src="machineImage"
    ></v-img>
    <v-card-text>
      <div class="ml-2">
        <div>PLC Software Version: <small>{{ machine.version }}</small></div>
        <div>PLC Software Build: <small>{{ machine.software_build }}</small></div>
        <div>Serial Number: <small>{{ machine.serial }}</small></div>
      </div>
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
    machine: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    machineImage() {
      if (this.machine.configuration)
        return require(`../../../../../../assets/imgs/${this.machine.configuration.id}.png`)
      else
        return ''
    }
  }
}
</script>

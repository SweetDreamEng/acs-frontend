<template>
  <v-card
    height="100%"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title>{{ overview.customer_assigned_name }}</v-card-title>
    <v-card-subtitle>
      <div>{{ overview.name }}</div>
      <div v-if="overview.configuration">{{ overview.configuration.name }}</div>
    </v-card-subtitle>
    <v-img
      height="150"
      contain
      :src="machineImage"
    ></v-img>
    <v-card-text>
      <div class="ml-2">
        <div>PLC Software Version: <small>{{ overview.version }}</small></div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Overview',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    overview: {
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
      if (this.overview.configuration)
        return require(`@/assets/imgs/${this.overview.configuration.id}.png`)
      else
        return ''
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
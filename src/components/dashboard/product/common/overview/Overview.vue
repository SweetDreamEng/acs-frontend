<template>
  <v-card
    height="100%"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <template v-if="overview.machineId !== 11">
      <v-card-title>{{ overview.customer_assigned_name }}</v-card-title>
      <v-card-subtitle>
        <div>{{ overview.name }}</div>
        <div>{{ overview.machineName }}</div>
      </v-card-subtitle>
      <v-img
        height="150"
        contain
        :src="machineImage"
      ></v-img>
      <v-card-text>
        <div class="ml-2">
          <div>PLC Software Version: <small>{{ overview.version }}</small></div>
          <div>PLC Software Build: <small>{{ overview.software_build }}</small></div>
          <div>Serial Number: <small>{{ overview.serial }}</small></div>
        </div>
      </v-card-text>
    </template>
    <template v-else>
      <v-card-title>{{ overview.machineName }}</v-card-title>
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
    </template>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import overviewStore from './store'

export default {
  name: 'Overview',
  props: {
    namespace: {
      type: String,
      default: ''
    },
    fetch: {
      type: Function,
      default: () => {}
    },
    machineId: {
      type: Number,
      default: 0
    },
    serialNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  computed: {
    isLoading() {
      return this.$store.state[this.namespace]['isLoading']
    },
    overview() {
      return this.$store.state[this.namespace]['overview']
    },
    machineImage() {
      return this.overview.machineId ? require(`@/assets/imgs/${this.overview.machineId}.png`) : ''
    }
  },
  created() {
    if (!this.isModuleCreated([this.namespace])) {
      this.registerModule()
    }
  },
  mounted() {
    this.getOverview({
      machineId: this.machineId,
      serialNumber: this.serialNumber
    })
  },
  methods: {
    ...mapActions({
      getOverview(dispatch, payload) {
        return dispatch(this.namespace + '/getOverview', payload)
      }
    }),
    isModuleCreated(path) {
      let m = this.$store._modules.root

      return path.every((p) => {
        m = m._children[p]

        return m
      })
    },
    registerModule() {
      this.$store.registerModule(this.namespace, {
        namespaced: true,
        state: overviewStore.overviewState(),
        actions: overviewStore.overviewActions(this.fetch),
        mutations: overviewStore.overviewMutations()
      })
    }
  }
}
</script>
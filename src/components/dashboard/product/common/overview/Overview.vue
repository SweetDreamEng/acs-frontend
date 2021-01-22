<template>
  <v-card
    height="100%"
    :loading="isLoading"
    :disabled="isLoading"
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
        <div>PLC Software Build: <small>{{ overview.software_build }}</small></div>
        <div>Serial Number: <small>{{ overview.serial }}</small></div>
      </div>
    </v-card-text>
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
    productId: {
      type: Number,
      default: 0
    },
    machineId: {
      type: Number,
      default: 0
    },
    isAdditional: {
      type: Boolean,
      default: false
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
      if (this.overview.configuration)
        return require(`../../../../../assets/imgs/${this.overview.configuration.id}.png`)
      else
        return ''
    }
  },
  created() {
    if (!this.isModuleCreated([this.namespace])) {
      this.registerModule()
    }
  },
  mounted() {
    this.getOverview({
      id: this.productId,
      machineId: this.machineId,
      isAdditional: this.isAdditional
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
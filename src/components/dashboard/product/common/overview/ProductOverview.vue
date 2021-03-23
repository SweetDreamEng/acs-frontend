<template>
  <div>
    <v-card
      height="100%"
      :loading="isLoading"
      :disabled="isLoading"
    >
      <template v-if="overview.machineId !== 11">
        <v-card-title v-if="overview.teltonikaDevice">{{ overview.teltonikaDevice.customer_assigned_name }}</v-card-title>
        <v-card-subtitle>
          <div v-if="overview.teltonikaDevice">{{ overview.teltonikaDevice.name }}</div>
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
            <div>{{ overview.running ? 'Running' : 'Not Running' }}</div>
          </div>
          <div class="ml-2 mt-2">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="requestDialog = true">
                Request Service
              </v-btn>
              <v-btn icon @click="saveMachine({ deviceId: overview.teltonikaDevice.id })">
                <v-icon :color="isSavedMachine ? 'green' : 'grey'">$mdi-star</v-icon>
              </v-btn>
            </v-card-actions>
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
    <v-dialog v-model="requestDialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5">Request Service</v-card-title>
        <v-card-text>Are you sure you want to place a service request?</v-card-text>
        <v-text-field
          v-model="sendEmail"
          label="Email"
          placeholder="email"
          outlined
          dense
        >
        </v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="requestDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="handleRequestService">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
      requestDialog: false,
      sendEmail: ''
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user
    }),
    isLoading() {
      return this.$store.state[this.namespace]['isLoading']
    },
    overview() {
      return this.$store.state[this.namespace]['overview']
    },
    machineImage() {
      return this.overview.machineId ? require(`@/assets/imgs/${this.overview.machineId}.png`) : ''
    },
    isSavedMachine() {
      return this.$store.state[this.namespace]['isSavedMachine']
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
      },
      requestService: 'machines/requestService',
      saveMachine(dispatch, payload) {
        return dispatch(this.namespace + '/saveMachine', payload)
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
    },
    handleRequestService() {
      this.requestDialog = false
      const data = {
        email: this.sendEmail,
        user: this.user,
        overview: this.overview
      }

      this.requestService(data)
    }
  }
}
</script>
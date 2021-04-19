<template>
  <div>
    <v-card
      height="100%"
      :loading="isLoading"
      :disabled="isLoading"
    >
      <template v-if="overview.machineId !== 11">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ overview.teltonikaDevice && overview.teltonikaDevice.customer_assigned_name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar class="mt-3" color="grey lighten-3">
            <v-btn icon :loading="isSaveMachineLoading" @click="saveMachine({ deviceId: overview.teltonikaDevice.id })">
              <v-icon :color="isSavedMachine ? 'primary' : 'grey'">$mdi-star</v-icon>
            </v-btn>
          </v-list-item-avatar>
        </v-list-item>
        
        <v-card-subtitle>
          <div v-if="overview.teltonikaDevice">{{ overview.teltonikaDevice.name }}</div>
          <div>{{ overview.machineName }}</div>
          <v-chip :color="`${getColor(overview.status)} lighten-4`">
            <v-list-item-avatar class="mr-1" :color="getColor(overview.status)">
              <v-icon small>
                {{ getIcon(overview.status) }}
              </v-icon>
            </v-list-item-avatar>
            {{ getText(overview.status) }}
          </v-chip>
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
          <div class="mt-2">
            <v-card-actions>
              <v-btn color="primary" block @click="requestDialog = true">
                Request Service
              </v-btn>
            </v-card-actions>
          </div>
        </v-card-text>
      </template>
      <template v-else>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ overview.teltonikaDevice && overview.teltonikaDevice.customer_assigned_name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar class="mt-3" color="grey lighten-3">
            <v-btn icon :loading="isSaveMachineLoading" @click="saveMachine({ deviceId: overview.teltonikaDevice.id })">
              <v-icon :color="isSavedMachine ? 'primary' : 'grey'">$mdi-star</v-icon>
            </v-btn>
          </v-list-item-avatar>
        </v-list-item>
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
          <div class="mt-2">
            <v-card-actions>
              <v-btn color="primary" disabled block @click="requestDialog = true">
                Request Service
              </v-btn>
            </v-card-actions>
          </div>
        </v-card-text>
      </template>
    </v-card>
    <v-dialog v-model="requestDialog" max-width="500">
      <v-card>
        <v-card-text class="text-center">
          <v-avatar class="text-center mt-5" color="grey lighten-2" size="100">
            <v-icon color="primary" x-large>$mdi-cog</v-icon>
          </v-avatar>
        </v-card-text>
        <v-card-title class="mt-1 headline justify-center">You just requested a service request.</v-card-title>
        <v-card-text class="pb-0 text-center">Are you sure you want to place a service request?</v-card-text>
        <div class="mt-2 pb-3 text-center">
          <v-btn color="grey lighten-2" depressed @click="requestDialog = false">Cancel</v-btn>
          <v-btn class="ml-2" depressed color="primary" @click="handleRequestService">Confirm</v-btn>
        </div>
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
      deviceStatus: {
        running: {
          color: 'green',
          text: 'Running',
          icon: '$mdi-check-circle-outline'
        },
        routerNotConnected: {
          color: 'yellow',
          text: 'Router Not Connected',
          icon: '$mdi-wifi-off'
        },
        shutOff: {
          color: 'red',
          text: 'Shut Off',
          icon: '$mdi-block-helper'
        },
        plcNotConnected: {
          color: 'orange',
          text: 'PLC Not Connected',
          icon: '$mdi-database-remove'
        }
      }
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
    },
    isSaveMachineLoading() {
      return this.$store.state[this.namespace]['isSaveMachineLoading']
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
      const sendEmail = process.env.VUE_APP_SERVICE_REQUEST_SEND_EMAIL

      this.requestDialog = false
      const data = {
        email: sendEmail,
        user: this.user,
        overview: this.overview
      }

      this.requestService(data)
    },
    getIcon(item) {
      return this.deviceStatus[item] ? this.deviceStatus[item].icon : ''
    },
    getText(item) {
      return this.deviceStatus[item] ? this.deviceStatus[item].text : ''
    },
    getColor(item) {
      return this.deviceStatus[item] ? this.deviceStatus[item].color : ''
    }
  }
}
</script>
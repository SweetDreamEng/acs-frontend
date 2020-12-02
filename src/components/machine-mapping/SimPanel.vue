<template>
  <div>
    <div class="mb-2">
      SIM Status: 
      <strong v-if="item.sim_status === 'Scrapped'" class="grey--text">Scrapped</strong>
      <strong v-if="item.sim_status === 'Active'" class="green--text">Active</strong>
      <strong v-if="item.sim_status === 'Suspended'" class="red--text">Suspended</strong>

      <span class="ml-2">Public Static IP: <span class="font-weight-bold">{{ item.public_ip_sim }}</span></span>
    </div>
    <div>
      <v-btn
        small
        color="primary"
        class="mr-2"
        :loading="refresh_btn_loading"
        :disabled="refresh_btn_loading"
        @click="querySIM(item)"
      >
        <v-icon left>mdi-refresh</v-icon>
        Refresh SIM Status
      </v-btn>
      <v-btn
        small
        color="primary"
        class="mr-2"
        :loading="activate_btn_loading"
        :disabled="activate_btn_loading"
        @click="activateSIM(item)"
      >Activate SIM</v-btn>
      <v-btn
        small
        color="primary"
        class="mr-2"
        :loading="suspend_btn_loading"
        :disabled="suspend_btn_loading"
        @click="suspendSIM(item)"
        >Suspend SIM</v-btn
      >
      <v-btn
        small
        color="primary"
        class="mr-2"
        :loading="remote_web_btn_loading"
        :disabled="remote_web_btn_loading"
        @click="() => onRemoteWeb(item)"
        >Remote WebUI</v-btn
      >
      <v-btn
        small
        color="primary"
        class="mr-2"
        :loading="remote_cli_btn_loading"
        :disabled="remote_cli_btn_loading"
        @click="() => onRemoteCli(item)"
        >Remote Control</v-btn
      >
    </div>
    <v-bottom-sheet v-model="isRemote">
      <v-sheet class="text-center" height="200px">
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="isRemote = !isRemote"
        >close</v-btn>
        <div class="py-3">
          <a :href="link" target="_blank">{{ link }} </a>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
/*
*/
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isLoading: false,
      isRemote: false,
      link: []
    }
  },
  computed: {
    ...mapState({
      sim_statuses: (state) => state.devices.sim_statuses,

      activate_btn_loading: (state) => state.devices.activate_btn_loading,
      suspend_btn_loading: (state) => state.devices.suspend_btn_loading,
      refresh_btn_loading: (state) => state.devices.refresh_btn_loading,
      remote_web_btn_loading: (state) => state.devices.remote_web_btn_loading,
      remote_cli_btn_loading: (state) => state.devices.remote_cli_btn_loading
    })
  },
  methods: {
    ...mapActions({
      'querySIM': 'devices/querySIM',
      'activateSIM': 'devices/activateSIM',
      'suspendSIM': 'devices/suspendSIM',
      'remoteWeb': 'devices/remoteWeb',
      'remoteCli': 'devices/remoteCli'
    }),
    // save () {
    //   if (this.$refs.editForm.validate()) {
    //     this.deviceAssigned({
    //       device_id: this.devices[this.editedIndex].id,
    //       company_id: this.editedItem.company_id,
    //       machine_id: this.editedItem.machine_id
    //     })
    //       .then((response) => {
    //         this.close()
    //       })
    //   }
    // },
    onRemoteWeb(item) {
      this.remoteWeb(item).then((response) => {
        const arr  = response.data.data

        if ( arr.length > 0 ) {
          this.link = arr.reduce((a, b) => a.ttl > b.ttl ? a : b, arr[0]).url
          this.isRemote = true
        }
      })
    },
    onRemoteCli(item) {
      this.remoteCli(item).then((response) => {
        const arr  = response.data.data

        if ( arr.length > 0 ) {
          this.link = arr.reduce((a, b) => a.ttl > b.ttl ? a : b, arr[0]).url
          this.isRemote = true
        }
      })
    }
  }
}
</script>
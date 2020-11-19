<template>
  <div>
    <div class="mb-2">
      SIM Status: 
      <strong v-if="item.sim_status === 4" class="grey--text">Scrapped</strong>
      <strong v-if="item.sim_status === 2" class="green--text">Active</strong>
      <strong v-if="item.sim_status === 3" class="red--text">Suspended</strong>

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
      >Suspend SIM</v-btn>
    </div>
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
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      sim_statuses: (state) => state.devices.sim_statuses,

      activate_btn_loading: (state) => state.devices.activate_btn_loading,
      suspend_btn_loading: (state) => state.devices.suspend_btn_loading,
      refresh_btn_loading: (state) => state.devices.refresh_btn_loading
    })
  },
  methods: {
    ...mapActions({
      'querySIM': 'devices/querySIM',
      'activateSIM': 'devices/activateSIM',
      'suspendSIM': 'devices/suspendSIM'
    })
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
  }
}
</script>
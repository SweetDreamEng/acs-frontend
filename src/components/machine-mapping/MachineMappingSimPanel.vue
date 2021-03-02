<template>
  <div>
    <div class="mb-2">
      SIM Status: 
      <strong v-if="item.sim_status === 'Scrapped'" class="grey--text">Scrapped</strong>
      <strong v-if="item.sim_status === 'Active'" class="green--text">Active</strong>
      <strong v-if="item.sim_status === 'Suspended'" class="red--text">Suspended</strong>

      <span class="ml-2">Public Static IP: <span class="font-weight-bold">{{ item.public_ip_sim }}</span></span>
      <span class="ml-2">Carrier: <span class="font-weight-bold">{{ item.carrier }}</span></span>
    </div>
    <div>
      <v-btn
        small
        color="primary"
        class="mr-2 mb-1"
        :loading="refresh_btn_loading"
        :disabled="refresh_btn_loading"
        @click="querySIM(item.iccid)"
      >
        <v-icon left>$mdi-refresh</v-icon>
        Refresh SIM Status
      </v-btn>
      <v-btn
        small
        color="primary"
        class="mr-2 mb-1"
        :loading="activate_btn_loading"
        :disabled="activate_btn_loading"
      >Activate SIM</v-btn>
      <v-btn
        small
        color="primary"
        class="mr-2 mb-1"
        :loading="suspend_btn_loading"
        :disabled="suspend_btn_loading"
        @click="suspendSIM(item.iccid)"
      >Suspend SIM</v-btn>
      <v-btn
        small
        color="primary"
        class="mr-2 mb-1"
        :loading="remote_web_btn_loading"
        :disabled="remote_web_btn_loading"
        @click="onRemoteWeb(item.device_id)"
      >Remote WebUI</v-btn>
      <v-btn
        small
        color="primary"
        class="mr-2 mb-1"
        :loading="remote_cli_btn_loading"
        :disabled="remote_cli_btn_loading"
        @click="onRemoteCli(item.device_id)"
      >Remote CLI</v-btn>
      <v-btn
        small
        color="primary"
        class="mr-2 mb-1"
        @click="deviceConfigDialog = true"
      >Device Config</v-btn>
      <v-btn
        small
        :color="item.checkin ? 'green' : 'red'"
        class="mr-2 mb-1"
        outlined
      >
        <v-icon
          :color="item.checkin ? 'green' : 'red'"
          left
        >
          {{ item.checkin ? '$mdi-check-circle-outline' : '$mdi-close-circle-outline' }}
        </v-icon>
        Device Checkin
      </v-btn>
      <v-btn
        small
        :color="item.plc_link ? 'green' : 'red'"
        class="mr-2 mb-1"
        outlined
      >
        <v-icon
          :color="item.plc_link ? 'green' : 'red'"
          left
        >
          {{ item.plc_link ? '$mdi-check-circle-outline' : '$mdi-close-circle-outline' }}
        </v-icon>
        PLC Link
      </v-btn>
      <v-btn
        small
        :dark="item.machine_id !== null"
        :disabled="!item.machine_id"
        :color="item.registered ? 'red' : 'green'"
        class="mr-2 mb-1"
        @click="$emit('click-register', item)"
      >
        {{ item.registered ? 'Revoke' : 'Register' }}
      </v-btn>
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
          <a :href="'https://' + link" target="_blank">{{ link }} </a>
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <v-dialog
      v-model="deviceConfigDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title class="primary white--text">Device Config</v-card-title>
        <v-card-text class="mt-2">
          <v-form ref="editForm" v-model="isDeviceFormValid" lazy-validation @submit.prevent="_submitDeviceConfig">
            <v-row dense>
              <v-col cols="12" md="6">
                <h4 class="mb-1">PLC Config</h4>
                <v-text-field
                  v-model="deviceForm.plc_ip"
                  label="PLC IP"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="deviceForm.plc_modbus_tcp_port"
                  label="Modbus Tcp Port"
                  type="number"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="deviceForm.plc_serial_number"
                  label="Serial Number"
                  type="number"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <h4 class="mb-1">TCU Config</h4>
                <v-text-field
                  v-model="deviceForm.tcu_serial_number"
                  label="Serial Number"
                  type="number"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="deviceForm.tcu_port"
                  label="Port"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="deviceForm.tcu_base_addr"
                  label="Base Address"
                  type="number"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="deviceForm.tcu_baud"
                  label="Baud"
                  type="number"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="deviceForm.tcu_parity"
                  label="Parity"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="deviceForm.tcu_data_bits"
                  label="Data Bits"
                  type="number"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="deviceForm.tcu_stop_bits"
                  label="Stop Bits"
                  type="number"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="deviceForm.tcu_bype_timeout"
                  label="Byte Timeout"
                  type="number"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="deviceForm.tcu_resp_timeout"
                  label="Rest Timeout"
                  type="number"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>
            <div class="d-flex justify-content-center">
              <v-checkbox
                v-model="deviceForm.tcuAdded"
                label="Include TCU Config(Only for PLCs that have a TCU attached)"
                class="mx-auto"
              ></v-checkbox>
            </div>
            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="deviceConfigDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :loading="sendingDeviceConfig"
                :disabled="sendingDeviceConfig"
              >
                Submit
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      isRemote: false,
      link: [],
      deviceConfigDialog: false,
      deviceForm: {
        plc_ip: '192.168.5.5',
        plc_modbus_tcp_port: 502,
        plc_serial_number: 0,
        tcuAdded: false,
        tcu_serial_number: 0,
        tcu_port: '/dev/rs232',
        tcu_base_addr: 1,
        tcu_baud: 9600,
        tcu_parity: 'none',
        tcu_data_bits: 8,
        tcu_stop_bits: 1,
        tcu_bype_timeout: 4,
        tcu_resp_timeout: 100
      },
      isDeviceFormValid: true
    }
  },
  computed: {
    ...mapState('devices', [
      'sim_statuses',
      'activate_btn_loading',
      'suspend_btn_loading',
      'refresh_btn_loading',
      'remote_web_btn_loading',
      'remote_cli_btn_loading',
      'sendingDeviceConfig'
    ])
  },
  methods: {
    ...mapActions('devices', [
      'querySIM',
      'activateSIM',
      'suspendSIM',
      'remoteWeb',
      'remoteCli',
      'submitDeviceConfig'
    ]),
    onRemoteWeb(device_id) {
      this.remoteWeb(device_id).then((response) => {
        const arr  = response.data

        if ( arr.length > 0 ) {
          this.link = arr.reduce((a, b) => a.ttl > b.ttl ? a : b, arr[0]).url
          this.isRemote = true
        }
      })
    },
    onRemoteCli(item) {
      this.remoteCli(item).then((response) => {
        const arr  = response.data

        if ( arr.length > 0 ) {
          this.link = arr.reduce((a, b) => a.ttl > b.ttl ? a : b, arr[0]).url
          this.isRemote = true
        }
      })
    },
    _submitDeviceConfig() {
      this.submitDeviceConfig({
        device_id: this.item.id,
        device_configuration_form: this.deviceForm
      })
    }
  }
}
</script>
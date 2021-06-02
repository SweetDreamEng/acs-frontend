<template>
  <v-card
    class="mt-2"
    :loading="isDowntimeTableLoading"
    :disabled="isDowntimeTableLoading"
  >
    <v-card-title>
      Device Downtimes
      <v-dialog
        v-model="dialog"
        max-width="400px"
      >
        <v-card>
          <v-card-title class="primary white--text">
            <span class="text-h5">Edit Downtime</span>
          </v-card-title>

          <v-card-text class="mt-4">
            <v-form ref="editForm" v-model="isFormValid" lazy-validation @submit.prevent="submit">
              <v-combobox
                v-model="editedItem.type"
                :items="downtimeTypes"
                item-text="name"
                item-value="id"
                label="Type"
                placeholder="Type of downtime plan"
                :rules="[$rules.required]"
                outlined
                dense
              ></v-combobox>

              <v-combobox
                v-model="editedItem.reason "
                :items="downtimeReasons"
                item-text="name"
                item-value="id"
                label="Reason"
                placeholder="Type in reason or choose from existing for ex: No Demand"
                :rules="[$rules.required]"
                outlined
                dense
              ></v-combobox>

              <v-textarea
                v-model="editedItem.comment"
                label="Comment"
                outlined
              ></v-textarea>

              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="closeDialog"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="isUpdatingDowntime"
                >
                  Save
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="downtimeTableData"
        class="flex-grow-1"
      >
        <template v-slot:item.device_id="{ item }">
          <span>{{ machineName(item) }}</span>
        </template>

        <template v-slot:item.location="{ item }">
          <span>{{ getLocation(item) }}</span>
        </template>

        <template v-slot:item.zone="{ item }">
          <span>{{ getZone(item) }}</span>
        </template>

        <template v-slot:item.start_time="{ item }">
          <span>{{ getTimeFromTimestamp(item.start_time) }}</span>
        </template>

        <template v-slot:item.end_time="{ item }">
          <span>{{ getTimeFromTimestamp(item.end_time) }}</span>
        </template>

        <template v-slot:item.type="{ item }">
          <span>{{ getDowntimeType(item) }}</span>
        </template>

        <template v-slot:item.reason_id="{ item }">
          <span>{{ getDowntimeReason(item) }}</span>
        </template>

        <template v-slot:item.comment="{ item }">
          <span>{{ printComment(item) }}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="editPlan(item)">
            <v-icon small>$mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
/*
|---------------------------------------------------------------------
| Location Component
|---------------------------------------------------------------------
|
*/
import states from '../../services/data/states'

import { mapState, mapActions } from 'vuex'

const dateTimeIsoString = new Date().toISOString().substr(0, 10)

export default {
  components: {
  },
  data() {
    return {
      headers: [
        { text: 'Machine', value: 'device_id' },
        { text: 'Location', value: 'location' },
        { text: 'Zone', value: 'zone' },
        { text: 'Start Time', value: 'start_time', align: 'center' },
        { text: 'End Time', value: 'end_time', align: 'center' },
        { text: 'Type', value: 'type', align: 'center' },
        { text: 'Reason', value: 'reason_id', align: 'center' },
        { text: 'Comment', value: 'comment', align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      dialog: false,

      editedItem: {},
      defaultItem: {},
      isFormValid: true
    }
  },
  computed: {
    ...mapState({
      downtimeTableData: (state) => state.devices.downtimeTableData,
      isDowntimeTableLoading: (state) => state.devices.isDowntimeTableLoading,
      deviceInfo: (state) => state.devices.deviceInfo,
      downtimeTypes: (state) => state.devices.downtimeTypes,
      locations: (state) => state.devices.locations,
      zones: (state) => state.devices.zones,
      downtimeReasons: (state) => state.devices.downtimeReasons,
      isUpdatingDowntime: (state) => state.devices.isUpdatingDowntime
    })
  },
  mounted() {
    this.getDowntimeTableData()
  },
  methods: {
    ...mapActions({
      getDowntimeTableData: 'devices/getDowntimeTableData',
      updateDowntime: 'devices/updateDowntime'
    }),
    editPlan(item) {
      const editType = this.downtimeTypes.find((type) => {
        return type.id === item.type
      })

      const editReason = this.downtimeReasons.find((reason) => {
        return reason.id === item.reason_id
      })

      Object.assign(this.editedItem, {
        'reason': editReason,
        'type': editType,
        'comment': item.comment,
        'id': item.id
      })

      this.dialog = true
      this.$nextTick(() => {
        this.$refs.editForm.resetValidation()
      })
    },
    closeDialog () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    submit() {
      if (this.$refs.editForm.validate()) {
        this.updateDowntime(this.editedItem)
          .then(() => {
            this.dialog = false
            this.getDowntimeTableData()
          })
      }
    },
    machineName(item) {
      const _machine = this.deviceInfo.find((device) => {
        return Number(device.serial_number) === item.device_id
      })

      return _machine.configuration.name || ''
    },
    getLocation(item) {
      const _device = this.deviceInfo.find((device) => {
        return Number(device.serial_number) === item.device_id
      })

      const _location = this.locations.find((location) => {
        return location.id === _device.location_id
      })

      return _location ? _location.name : ''
    },
    getZone(item) {
      const _device = this.deviceInfo.find((device) => {
        return Number(device.serial_number) === item.device_id
      })

      const _zone = this.zones.find((zone) => {
        return zone.id === _device.zone_id
      })

      return _zone ? _zone.name : ''
    },
    getTimeFromTimestamp(timestamp) {
      const date = timestamp !== -1 ? new Date(timestamp * 1000) : ''

      return date !== '' ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` : ''
    },
    getDowntimeType(item) {
      const _type = this.downtimeTypes.find((type) => {
        return type.id === item.type
      })

      return _type ? _type.name : ''
    },
    getDowntimeReason(item) {
      const _reason = this.downtimeReasons.find((reason) => {
        return reason.id === item.reason_id
      })

      return _reason ? _reason.name : ''
    },
    printComment(item) {
      return item.comment ? item.comment : '?'
    }
  }
}
</script>

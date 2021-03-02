<template>
  <v-card class="mt-2">
    <v-card-title>
      Device Downtime Plans
      <v-dialog
        v-model="dialog"
        max-width="400px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            class="ml-auto"
            v-bind="attrs"
            v-on="on"
          >
            Add
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="primary white--text">
            <span class="text-h5">{{ editTitle }}</span>
          </v-card-title>

          <v-card-text class="mt-4">
            <v-form ref="editForm" v-model="isFormValid" lazy-validation @submit.prevent="submit">
              <v-select
                v-model="editedItem.machine"
                label="Machine"
                :items="machines"
                item-text="name"
                item-value="id"
                :rules="[$rules.required]"
                outlined
                dense
              >
              </v-select>

              <div class="d-flex">
                <v-menu
                  ref="dateFrom"
                  v-model="dateFromMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  width="250px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.dateFrom"
                      label="From Date"
                      prepend-icon="$mdi-calendar"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.dateFrom"
                    no-title
                    scrollable
                    @input="dateFromMenu = false"
                  >
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="timeFrom"
                  v-model="timeFromMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="editedItem.timeFrom"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.timeFrom"
                      label="From Time"
                      prepend-icon="$mdi-clock-time-four-outline"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      class="ml-2"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timeFromMenu"
                    v-model="editedItem.timeFrom"
                    @click:minute="$refs.timeFrom.save(editedItem.timeFrom)"
                  ></v-time-picker>
                </v-menu>
              </div>

              <div class="d-flex">
                <v-menu
                  ref="dateTo"
                  v-model="dateToMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  width="250px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.dateTo"
                      label="To Date"
                      prepend-icon="$mdi-calendar"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.dateTo"
                    no-title
                    scrollable
                    @input="dateToMenu = false"
                  >
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="timeTo"
                  v-model="timeToMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="editedItem.timeTo"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.timeTo"
                      label="To Time"
                      prepend-icon="$mdi-clock-time-four-outline"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      class="ml-2"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timeToMenu"
                    v-model="editedItem.timeTo"
                    @click:minute="$refs.timeTo.save(editedItem.timeTo)"
                  ></v-time-picker>
                </v-menu>
              </div>

              <v-combobox
                v-model="editedItem.reason"
                :items="reasons"
                label="Reason"
                placeholder="Type in reason or choose from existing for ex: No Demand"
                :rules="[$rules.required]"
                outlined
                dense
              ></v-combobox>

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
                  :loading="btnLoading"
                  :disabled="btnLoading"
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
        :items="downtimePlans"
        class="flex-grow-1"
        :loading="tableLoading"
        hide-default-footer
      >
        <template v-slot:item.machine_id="{ item }">
          <span>{{ machineName(item) }}</span>
        </template>

        <template v-slot:item.from="{ item }">
          <span>{{ item.date_from + ' ' + item.time_from }}</span>
        </template>

        <template v-slot:item.to="{ item }">
          <span>{{ item.date_to + ' ' + item.time_to }}</span>
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

export default {
  components: {
  },
  data() {
    return {
      headers: [
        { text: 'Machine', value: 'machine_id' },
        { text: 'Start Time', value: 'from', align: 'center' },
        { text: 'End Time', value: 'to', align: 'center' },
        { text: 'Reason', value: 'reason', align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      reasons: [
        'No Demand',
        'Preventative Maintenance',
        'Machine Failure',
        'Power Outage',
        'Idle'
      ],

      editedIndex: -1,

      dialog: false,

      timeFromMenu: false,
      timeToMenu: false,
      dateFromMenu: false,
      dateToMenu: false,

      editedItem: {
        machine: 0,
        dateFrom: new Date().toISOString().substr(0, 10),
        dateTo: new Date().toISOString().substr(0, 10),
        timeFrom: '00:00',
        timeTo: '00:00',
        reason: ''
      },
      defaultItem: {
        machine: 0,
        dateFrom: new Date().toISOString().substr(0, 10),
        dateTo: new Date().toISOString().substr(0, 10),
        timeFrom: '00:00',
        timeTo: '00:00',
        reason: ''
      },
      isFormValid: true
    }
  },
  computed: {
    ...mapState({
      btnLoading: (state) => state.devices.downtimePlanBtnLoading,
      tableLoading: (state) => state.devices.downtimePlansTableLoading,
      machines: (state) => state.machines.machines,
      downtimePlans: (state) => state.devices.downtimePlans
    }),
    editTitle() {
      return this.editedIndex === -1 ? 'Add' : 'Edit'
    }
  },
  created() {
    this.getDowntimePlans()
  },
  methods: {
    ...mapActions({
      getDowntimePlans: 'devices/getDowntimePlans',
      addDowntimePlan: 'devices/addDowntimePlan',
      updateDowntimePlan: 'devices/updateDowntimePlan'
    }),
    editPlan(item) {
      this.editedIndex = item.id
      Object.assign(this.editedItem, {
        'dateFrom': item.date_from,
        'dateTo': item.date_to,
        'timeFrom': item.time_from,
        'timeTo': item.time_to,
        'reason': item.reason,
        'machine': item.machine_id
      })

      console.log(this.editedItem)

      this.dialog = true
      this.$nextTick(() => {
        this.$refs.editForm.resetValidation()
      })
    },
    closeDialog () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    submit() {
      if (this.$refs.editForm.validate()) {
        if (this.editedIndex > -1) {
          this.updateDowntimePlan({
            'data': this.editedItem,
            'id': this.editedIndex
          }).then(() => {
            this.getDowntimePlans()
            this.closeDialog()
          })
        } else {
          this.addDowntimePlan(this.editedItem).then(() => {
            this.getDowntimePlans()
            this.closeDialog()
          })
        }
      }
    },
    machineName(item) {
      const _machine = this.machines.find((machine) => {
        return machine.id === item.machine_id
      })

      return _machine.name
    }
  }
}
</script>

<template>
  <div class="d-flex flex-column flex-grow-1">
    <!-- import devices from excel file -->
    <device-import v-if="canImportDevices"></device-import>

    <div class="pt-1"></div>

    <!-- customer assignment table -->
    <v-card>
      <v-card-title>Customer Device Assignment</v-card-title>
      <v-data-table
        v-model="selectedUsers"
        :headers="tableHeaders"
        :items="devices"
        class="flex-grow-1"
        show-expand
        hide-default-footer
        :expanded.sync="expanded"
        :single-expand="true"
        :search="searchQuery"
        :loading="table_loading"
      >
        <template v-slot:top>
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            solo
            hide-details
            dense
            clearable
            placeholder="Search"
            class="mx-1"
          ></v-text-field>
        </template>
        <!-- custom table header -->

        <!-- custom table rows -->
        <template v-slot:item.company_id="{ item }">
          <span>{{ companyName(item.company_id) }}</span>
        </template>

        <template v-slot:item.machine_id="{ item }">
          <span>{{ machineName(item.machine_id) }}</span>
        </template>

        <template v-slot:item.registered_view="{ item }">
          <div class="font-weight-bold d-flex align-center text-no-wrap">
            <v-icon
              left
              :color="item.registered ? 'green' : 'red'"
            >
              mdi-checkbox-blank-circle
            </v-icon>
          </div>
        </template>

        <template v-slot:item.registered_action="{ item }">
          <div class="font-weight-bold d-flex align-center text-no-wrap">
            <v-btn
              dark
              :color="item.registered ? 'red' : 'green'"
              @click="onRegisterChange(item)"
            >
              {{ item.registered ? 'Revoke' : 'Register' }}
            </v-btn>
          </div>
        </template>

        <template v-slot:item.sim_status="{ item }">
          <v-icon
            :color="item.sim_status === 'Active' ? 'green' : 'red'"
          >
            mdi-checkbox-blank-circle
          </v-icon>
        </template>

        <template v-slot:item.checkin="{ item }">
          <v-icon
            :color="item.checkin === 1 ? 'green' : 'red'"
          >
            {{ item.checkin === 1 ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}
          </v-icon>
        </template>

        <template v-slot:item.data-table-expand="{ expand, isExpanded }">
          <div class="d-flex align-center">
            <span class="text-no-wrap">Actions</span><v-icon class="ml-1" @click="expand(!isExpanded)" v-text="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
          </div>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="px-4 py-2">
            <sim-panel :item="item"></sim-panel>
          </td>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
      <div class="text-center py-2">
        <v-pagination
          v-model="loc_page"
          :length="pageCount"
          :total-visible="7"
          @input="onPageChange"
        ></v-pagination>
      </div>
    </v-card>

    <v-dialog
      v-model="editDialog"
      max-width="400px"
    >
      <v-card>
        <v-card-title class="primary white--text">Register</v-card-title>
        <v-card-text class="mt-2">
          <v-form ref="editForm" v-model="isEditFormValid" lazy-validation @submit.prevent="save">
            <v-select
              v-model="editedItem.company_id"
              :items="companies"
              label="Choose Customer"
              item-text="name"
              item-value="id"
              outlined
              dense
            >
            </v-select>
            <v-select
              v-model="editedItem.machine_id"
              :items="machines"
              label="Choose Configuration"
              item-text="name"
              item-value="id"
              outlined
              dense
            >
            </v-select>

            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :loading="assign_loading"
                :disabled="assign_loading"
              >
                Save
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirmDialog"
      max-width="400px"
      persistent
    >
      <v-card>
        <v-card-title class="primary white--text">
          Confirm
        </v-card-title>
        <v-card-text class="mt-2">
          <v-alert
            border="top"
            outlined
            type="info"
            elevation="2"
            color="primary"
          >
            <small v-html="confirmationMessage()"></small>
          </v-alert>
          <div class="d-flex justify-end">
            <v-btn color="primary" text @click="confirmDialog = false">Cancel</v-btn>
            <v-btn
              :color="confirmBtnColor()"
              dark
              :loading="register_button_loading"
              @click="onConfirmClicked()"
            >
              {{ confirmBtnText() }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Customer Assignment Page Component
| url: /customer-assign
|---------------------------------------------------------------------
|
| List all customers and machines assigned
*/

import { mapState, mapGetters, mapActions } from 'vuex'
import DeviceImport from '../../components/machine-mapping/DeviceImport'
import SimPanel from '../../components/machine-mapping/SimPanel'

export default {
  components: {
    DeviceImport,
    SimPanel
  },
  data() {
    return {
      isLoading: false,
      breadcrumbs: [{
        text: 'Customer Assign',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],

      searchQuery: '',
      selectedUsers: [],
      tableHeaders: [
        { text: 'Serial Number', value: 'serial_number' },
        { text: 'Device Name', value: 'name' },
        { text: 'Company Name', value: 'company_id' },
        { text: 'Machine Configuration', value: 'machine_id' },
        { text: 'REG Status', align: 'center', value: 'registered_view' },
        { text: 'Device Registration', align: 'center', value: 'registered_action', sortable: false },
        { text: 'SIM Status', align: 'center', value: 'sim_status' },
        { text: 'Device checkin', align: 'center', value: 'checkin' },
        { text: 'Administration', value: 'data-table-expand', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],
      expanded: [],

      editedIndex: -1,
      editedItem: {
        company_id: '',
        machine_id: ''
      },
      defaultItem: {
        company_id: '',
        machine_id: ''
      },
      editDialog: false,

      isEditFormValid: true,

      confirmDialog: false,
      selectedItem: null,
      
      loc_page: this.page
    }
  },
  computed: {
    ...mapState({
      table_loading: (state) => state.devices.table_loading,
      assign_loading: (state) => state.devices.assign_loading,
      activate_button_loading: (state) => state.devices.activate_button_loading,
      deactivate_button_loading: (state) => state.devices.deactivate_button_loading,
      register_button_loading: (state) => state.devices.register_button_loading,

      devices: (state) => state.devices.data,

      pageCount: (state) => state.devices.pageCount,
      page: (state) => state.devices.page
    }),
    ...mapGetters({
      companies: 'customers/extendedCompanies',
      machines: 'machines/extendedMachines',
      canImportDevices: 'auth/canImportDevices'
    })
  },
  mounted() {
    this.loc_page = this.page
    this.getDevices(this.page)
  },
  methods: {
    ...mapActions({
      'getDevices': 'devices/getDevices',
      'deviceAssigned': 'devices/deviceAssigned',
      'updateRegistered': 'devices/updateRegistered',
      'getDevicesStatus': 'devices/getDevicesStatus',
      'activateSIM': 'devices/activateSIM',
      'deactivateSIM': 'devices/deactivateSIM'
    }),
    editItem (item) {
      this.editedIndex = this.devices.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
      this.$nextTick(() => {
        this.$refs.editForm.resetValidation()
      })
    },
    close () {
      this.editDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.$refs.editForm.validate()) {
        this.deviceAssigned({
          device_id: this.devices[this.editedIndex].id,
          company_id: this.editedItem.company_id,
          machine_id: this.editedItem.machine_id
        })
          .then((response) => {
            this.close()
          })
      }
    },
    confirmBtnText() {
      if (this.selectedItem) {
        if (!this.selectedItem.registered)
          return 'Confirm Registration'
        else
          return 'Confirm Revocation'
      } else {
        return ''
      }
    },
    confirmBtnColor() {
      if (this.selectedItem) {
        if (!this.selectedItem.registered)
          return 'green'
        else
          return 'red'
      } else {
        return ''
      }
    },
    confirmationMessage() {
      if (this.selectedItem) {
        if (!this.selectedItem.registered)
          return `Device ${this.selectedItem.serial_number} assigned to company <strong><i>${this.companyName(this.selectedItem.company_id)}</i></strong> will be configured with product <strong><i>${this.machineName(this.selectedItem.machine_id)}</i></strong>. Please confirm registration`
        else
          return `Device ${this.selectedItem.id} assigned to company <strong><i>${this.companyName(this.selectedItem.company_id)}</i></strong> will be reset and product <strong><i>${this.machineName(this.selectedItem.machine_id)}</i></strong> configuration will be removed. The device will no longer send PLC data. Please confirm revocation`
      } else {
        return ''
      }
    },
    onRegisterChange(item) {
      this.selectedItem = item
      this.confirmDialog = true
    },
    onConfirmClicked() {
      this.updateRegistered({
        device_id: this.selectedItem.id,
        register: !this.selectedItem.registered
      })
        .then((response) => {
          this.confirmDialog = false
        })
    },
    onPageChange() {
      this.getDevices(this.loc_page)
    },
    companyName(company_id) {
      const _company = this.companies.find((company) => company.id === company_id)

      return _company ? _company.name : 'Not Assigned'
    },
    machineName(machine_id) {
      const _machine = this.machines.find((machine) => machine.id === machine_id)

      return _machine ? _machine.name : 'Not Configured'
    }
  }
}
</script>

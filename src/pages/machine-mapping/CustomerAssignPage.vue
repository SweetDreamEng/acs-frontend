<template>
  <div class="d-flex flex-column flex-grow-1">
    <!-- import devices from excel file -->
    <device-import v-if="canImportDevices"></device-import>

    <br>

    <!-- customer assignment table -->
    <v-card>
      <v-card-title>Customer Device Assignment</v-card-title>
      <v-data-table
        :headers="tableHeaders"
        :items="devices"
        class="flex-grow-1"
        show-expand
        hide-default-footer
        :expanded.sync="expanded"
        :single-expand="true"
        :loading="tableLoading"
      >
        <template v-slot:top>
          <div v-if="!tableLoading" class="px-2 text-right">
            <v-btn
              color="primary"
              :loading="loadingToggleActiveDevices"
              :disabled="loadingToggleActiveDevices"
              @click="activeDevicesToggled()"
            >{{ isVisibleOnly ? 'Show All Devices' : 'Hide Inactive Devices' }}</v-btn>
            <span v-if="isVisibleOnly" class="ml-2">{{ hiddenDevices }} Devices are hidden</span>
          </div>
          <div class="d-flex align-center">
            <v-row dense class="pa-2 flex-grow-1">
              <v-col cols="12" md="6">
                <v-chip-group
                  v-model="filterForm.filters"
                  column
                  multiple
                >
                  <v-chip
                    filter
                    outlined
                    value="active"
                    color="primary lighten-2"
                    @click="filterDevices"
                  >
                    Active
                  </v-chip>
                  <v-chip
                    filter
                    outlined
                    value="PLCLink"
                    color="primary lighten-2"
                    @click="filterDevices"
                  >
                    PLC Link
                  </v-chip>
                  <v-chip
                    filter
                    outlined
                    value="registered"
                    color="primary lighten-2"
                    @click="filterDevices"
                  >
                    Registered
                  </v-chip>
                </v-chip-group>
              </v-col>
              <v-col cols="12" md="6">
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="filterForm.searchQuery"
                    append-icon="$mdi-magnify"
                    class="flex-grow-1 mr-md-2 elevation-4 rounded-xl"
                    solo
                    hide-details
                    dense
                    clearable
                    placeholder="e.g. filter for serial number, device name, customer assigned name"
                    @keyup.enter="filterDevices"
                    @click:append="filterDevices"
                  ></v-text-field>
                  <v-btn
                    icon
                    small
                    class="mr-2"
                    @click="filterDevices"
                  >
                    <v-icon>$mdi-refresh</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </template>
        <!-- custom table header -->

        <!-- custom table rows -->
        <template v-slot:item.company_id="{ item }">
          <span>{{ companyName(item.company_id) }}</span>
        </template>

        <template v-slot:item.machine_id="{ item }">
          <span>{{ configurationName(item.machine_id) }}</span>
        </template>

        <template v-slot:item.registered_view="{ item }">
          <div class="font-weight-bold d-flex align-center">
            <v-icon
              left
              :color="item.registered ? 'green' : 'red'"
            >
              $mdi-checkbox-blank-circle
            </v-icon>
          </div>
        </template>

        <template v-slot:item.plc_serial_number="{ item }">
          <div v-if="item.teltonikaConfiguration">{{ item.teltonikaConfiguration.plc_serial_number }}</div>
        </template>

        <template v-slot:item.data-table-expand="{ expand, isExpanded }">
          <div class="d-flex align-center">
            <span class="text-no-wrap">Actions</span><v-icon class="ml-1" @click="expand(!isExpanded)" v-text="isExpanded ? '$mdi-chevron-up' : '$mdi-chevron-down'"></v-icon>
          </div>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="px-4 py-2">
            <sim-panel :item="item" @click-register="onRegisterChange"></sim-panel>
          </td>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="editItem(item)">
            <v-icon small>$mdi-pencil</v-icon>
          </v-btn>
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
              :items="configurations"
              label="Choose Configuration"
              item-text="name"
              item-value="id"
              outlined
              dense
            >
            </v-select>
            <v-text-field
              v-model="editedItem.plc_ip"
              label="PLC IP"
              :rules="[$rules.required]"
              outlined
              dense
            >
            </v-text-field>
            <v-checkbox
              v-model="editedItem.tcu_added"
              label="Include TrueTemp TCU"
            ></v-checkbox>

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
                :loading="assignLoading"
                :disabled="assignLoading"
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
              :loading="registerButtonLoading"
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
import DeviceImport from '../../components/machine-mapping/MachineMappingDeviceImport'
import SimPanel from '../../components/machine-mapping/MachineMappingSimPanel'

export default {
  components: {
    DeviceImport,
    SimPanel
  },
  data() {
    return {
      tableHeaders: [
        { text: 'Teltonika Serial', value: 'serial_number' },
        { text: 'PLC Serial', value: 'plc_serial_number' },
        { text: 'Device Name', value: 'name' },
        { text: 'Edit', value: 'actions', sortable: false, align: 'center' },
        { text: 'Company Name', value: 'company_id' },
        { text: 'Machine Configuration', value: 'machine_id' },
        { text: 'REG Status', align: 'center', value: 'registered_view' },
        { text: 'Administration', value: 'data-table-expand', sortable: false }
      ],
      expanded: [],

      editedIndex: -1,
      editedItem: {
        company_id: '',
        machine_id: '',
        tcu_added: false,
        plc_ip: ''
      },
      defaultItem: {
        company_id: '',
        machine_id: '',
        tcu_added: false,
        plc_ip: ''
      },
      editDialog: false,

      isEditFormValid: true,

      confirmDialog: false,
      selectedItem: null,
      
      loc_page: this.page,

      filterForm: {
        filters: [],
        searchQuery: ''
      }
    }
  },
  computed: {
    ...mapState({
      tableLoading: (state) => state.devices.tableLoading,
      assignLoading: (state) => state.devices.assignLoading,
      activateButtonLoading: (state) => state.devices.activateButtonLoading,
      deactivateButtonLoading: (state) => state.devices.deactivateButtonLoading,
      registerButtonLoading: (state) => state.devices.registerButtonLoading,
      loadingToggleActiveDevices: (state) => state.devices.loadingToggleActiveDevices,

      devices: (state) => state.devices.data,
      isVisibleOnly: (state) => state.devices.isVisibleOnly,
      hiddenDevices: (state) => state.devices.hiddenDevices,

      pageCount: (state) => state.devices.pageCount,
      page: (state) => state.devices.page
    }),
    ...mapGetters({
      companies: 'companies/extendedCompanies',
      configurations: 'configurations/extendedConfigurations',
      canImportDevices: 'auth/canImportDevices',
      configurationName: 'configurations/configurationName'
    })
  },
  mounted() {
    this.loc_page = this.page
    this.getConfigurations()
    this.filterDevices()
  },
  methods: {
    ...mapActions({
      getConfigurations: 'configurations/getConfigurations',
      getDevices: 'devices/getDevices',
      deviceAssigned: 'devices/deviceAssigned',
      updateRegistered: 'devices/updateRegistered',
      getDevicesStatus: 'devices/getDevicesStatus',
      deactivateSIM: 'devices/deactivateSIM',
      toggleActiveDevices: 'devices/toggleActiveDevices'
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
          machine_id: this.editedItem.machine_id,
          tcu_added: this.editedItem.tcu_added,
          plc_ip: this.editedItem.plc_ip
        })
          .then((response) => {
            this.filterDevices()
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
          return `Device ${this.selectedItem.serial_number} assigned to company <strong><i>${this.companyName(this.selectedItem.company_id)}</i></strong> will be configured with product <strong><i>${this.configurationName(this.selectedItem.machine_id)}</i></strong>. Please confirm registration`
        else
          return `Device ${this.selectedItem.id} assigned to company <strong><i>${this.companyName(this.selectedItem.company_id)}</i></strong> will be reset and product <strong><i>${this.configurationName(this.selectedItem.machine_id)}</i></strong> configuration will be removed. The device will no longer send PLC data. Please confirm revocation`
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
      this.filterDevices(this.loc_page)
    },
    companyName(company_id) {
      const _company = this.companies.find((company) => company.id === company_id)

      return _company ? _company.name : 'Not Assigned'
    },
    filterDevices() {
      this.$nextTick(() => {
        this.getDevices({
          filterForm: this.filterForm,
          page: this.loc_page
        })
      })
    },
    async activeDevicesToggled() {
      await this.toggleActiveDevices()

      this.getDevices({
        filterForm: this.filterForm,
        page: this.loc_page
      })
    }
  }
}
</script>

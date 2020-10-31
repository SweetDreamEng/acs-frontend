<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Customer Assign</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
    </div>

    <v-card>
      <v-card-title>Customer Device Assignment</v-card-title>
      <v-data-table
        v-model="selectedUsers"
        :headers="headers"
        :items="customerAssigns"
        class="flex-grow-1"
        show-expand
        :expanded.sync="expanded"
        :single-expand="true"
        :search="searchQuery"
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
        <template v-slot:item.customer_name="{ item }">
          <span v-if="item.customer_name">{{ item.customer_name }}</span>
          <span v-else>Not assigned</span>
        </template>

        <template v-slot:item.product_category="{ item }">
          <span v-if="item.product_category">{{ item.product_category }}</span>
          <span v-else>Not assigned</span>
        </template>

        <template v-slot:item.device_registration="{ item }">
          <div class="font-weight-bold d-flex align-center text-no-wrap">
            <v-btn
              :color="item.device_registration ? 'green' : 'red'"
              dark
              @click="onRegisterChange(item)"
              style="width: 80px;"
            >{{ item.device_registration ? 'Register' : 'Revoke' }}</v-btn>
          </div>
        </template>

        <template v-slot:item.data-table-expand="{ expand, isExpanded }">
          <div class="d-flex align-center">
            <span class="text-no-wrap">Show meta data</span><v-icon class="ml-1" @click="expand(!isExpanded)" v-text="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
          </div>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="px-4">
            {{ `User A registered device to customer ${item.customer_name} on Oct 1st 2020` }}
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
    </v-card>

    <v-dialog
      v-model="editDialog"
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Register</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="editForm" v-model="isEditFormValid" lazy-validation @submit.prevent="save">
            <v-select
              :items="extendedCustomerNames"
              label="Choose Customer"
              v-model="editedItem.customer_name"
              :rules="[rules.required]"
              outlined
              dense
            >
            </v-select>
            <v-select
              :items="extendedMachineNames"
              label="Choose Machine"
              v-model="editedItem.product_category"
              :rules="[rules.required]"
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
    >
      <v-card>
        <v-card-title>
          Confirm
        </v-card-title>
        <v-card-text>
          <v-alert
            border="top"
            outlined
            type="info"
            elevation="2"
            color="primary"
          >
            <small>{{ confirmationMessage() }}</small>
          </v-alert>
          <div class="d-flex justify-end">
            <v-btn color="primary" text @click="confirmDialog = false">Cancel</v-btn>
            <v-btn :color="confirmBtnColor()" dark @click="onConfirmClicked()">{{ confirmBtnText() }}</v-btn>
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

import { mapGetters } from 'vuex'
import customerAssigns from './content/customer-assigns'

export default {
  components: {
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
      headers: [
        { text: 'Serial Number', value: 'id' },
        { text: 'Customer Name', value: 'customer_name' },
        { text: 'Product category', value: 'product_category' },
        { text: 'Device Registration', value: 'device_registration', sortable: false },
        { text: '', value: 'data-table-expand', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],
      expanded: [],

      customerAssigns,

      editedIndex: -1,
      editedItem: {
        customer_name: '',
        product_category: ''
      },
      defaultItem: {
        customer_name: '',
        product_category: ''
      },
      editDialog: false,

      isEditFormValid: true,

      confirmDialog: false,
      selectedItem: null,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required field'
      }
    }
  },
  watch: {
  },
  computed: {
    ...mapGetters('customers', [
      'customerNames'
    ]),
    ...mapGetters('machines', [
      'machineNames'
    ]),
    extendedMachineNames() {
      const _machineNames = this.machineNames

      _machineNames.unshift('Not assigned')

      return _machineNames
    },
    extendedCustomerNames() {
      const _customerNames = this.machineNames

      _customerNames.unshift('Not assigned')

      return _customerNames
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.customerAssigns.indexOf(item)
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
        Object.assign(this.customerAssigns[this.editedIndex], this.editedItem)
        this.close()
      }
    },
    confirmBtnText() {
      if (this.selectedItem) {
        if (this.selectedItem.device_registration)
          return 'Confirm Registration'
        else
          return 'Confirm Revocation'
      } else {
        return ''
      }
    },
    confirmBtnColor() {
      if (this.selectedItem) {
        if (this.selectedItem.device_registration)
          return 'green'
        else
          return 'red'
      } else {
        return ''
      }
    },
    confirmationMessage() {
      if (this.selectedItem) {
        if (this.selectedItem.device_registration)
          return `Device ${this.selectedItem.id} assigned to customer ${this.selectedItem.customer_name} will be configured with product ${this.selectedItem.product_category}. Please confirm registration`
        else
          return `Device ${this.selectedItem.id} assigned to customer ${this.selectedItem.customer_name} will be reset and product ${this.selectedItem.product_category} configuration will be removed. The device will no longer send PLC data. Please confirm revocation`
      } else {
        return ''
      }
    },
    onRegisterChange(item) {
      this.selectedItem = item
      this.confirmDialog = true
    },
    onConfirmClicked() {
      this.selectedItem.device_registration = !this.selectedItem.device_registration
      this.confirmDialog = false
    }
  }
}
</script>

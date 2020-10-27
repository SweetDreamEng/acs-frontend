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
        hide-default-footer
      >
        <!-- custom table header -->

        <!-- custom table rows -->
        <template v-slot:item.customer_name="{ item }">
          <v-select
            :items="userNames"
            label="Choose Customer"
            v-model="item.customer_name"
            outlined
            dense
            hide-details
          >
            <template v-slot:prepend-item>
              <v-list-item
                ripple
                @click="addDivisionDialog = true"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    Add New
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </template>
          </v-select>
        </template>

        <template v-slot:item.product_category="{ item }">
          <v-select
            :items="machineNames"
            label="Choose Product Category"
            v-model="item.product_category"
            outlined
            dense
            hide-details
          >
            <template v-slot:prepend-item>
              <v-list-item
                ripple
                @click="addDepartmentDialog = true"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    Add New
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </template>
          </v-select>
        </template>

        <template v-slot:item.device_registration="{ item }">
          <div class="font-weight-bold d-flex align-center text-no-wrap">
            <div v-if="item.device_registration" class="warning--text">
              <v-btn
                color="warning"
                @click="item.device_registration = !item.device_registration"
              >Registere Device</v-btn>
            </div>
            <div v-else class="success--text">
              <v-btn
                color="success"
                @click="item.device_registration = !item.device_registration"
              >Unregister Device</v-btn>
            </div>
          </div>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="px-4">
            {{ `User A registered device to customer ${item.customer_name} on Oct 1st 2020` }}
          </td>
        </template>
      </v-data-table>
    </v-card>

    <!-- add division modal -->
    <v-dialog v-model="addDivisionDialog" max-width="290">
      <v-card>
        <v-card-title>Add New</v-card-title>
        <v-card-text>
          <v-form
            ref="divisionForm"
            v-model="validDivision"
            lazy-validation
            @submit.prevent="addNewDivision"
          >
            <v-text-field
              v-model="newDivision"
              :rules="[rules.required]"
              label="Customer Name"
              required
            ></v-text-field>
            <v-btn
              :disabled="!validDivision"
              color="success"
              type="submit"
            >
              Ok
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- add department modal -->
    <v-dialog v-model="addDepartmentDialog" max-width="290">
      <v-card>
        <v-card-title>Add New</v-card-title>
        <v-card-text>
          <v-form
            ref="departmentForm"
            v-model="validDepartment"
            lazy-validation
            @submit.prevent="addNewDepartment"
          >
            <v-text-field
              v-model="newDepartment"
              :rules="[rules.required]"
              label="Product Category"
              required
            ></v-text-field>
            <v-btn
              :disabled="!validDepartment"
              color="success"
              type="submit"
            >
              Ok
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
        { text: 'Device Registration', value: 'device_registration' },
        { text: '', value: 'data-table-expand' }
      ],
      expanded: [],

      addDivisionDialog: false,
      addDepartmentDialog: false,

      newDivision: '',
      newDepartment: '',

      validDepartment: true,
      validDivision: true,
      
      customerAssigns,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  watch: {
    selectedUsers(val) {

    }
  },
  computed: {
    ...mapGetters([
      'userNames',
      'machineNames'
    ])
  },
  methods: {
    addNewDepartment() {
      if (this.$refs.departmentForm.validate()) {
        this.machineNames.push(this.newDepartment)
        this.addDepartmentDialog = false
      }
    },
    addNewDivision() {
      if (this.$refs.divisionForm.validate()) {
        this.userNames.push(this.newDivision)
        this.addDivisionDialog = false
      }
    }
  }
}
</script>

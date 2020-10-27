<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Machine Mapping</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
    </div>

    <v-card>
      <p class="pa-2">Please assign machine names to your ACS Digital Solution product and map them to the department and division.</p>
      <!-- maps list -->
      <v-data-table
        v-model="selectedUsers"
        :headers="headers"
        :items="maps"
        class="flex-grow-1"
        hide-default-footer
      >
        <!-- custom table header -->
        <template v-slot:header.department="{ header }">
          <v-icon color="primary">mdi-account-multiple-plus</v-icon>
          {{ header.text }}
        </template>
        <template v-slot:header.division="{ header }">
          <v-icon color="primary">mdi-routes</v-icon>
          {{ header.text }}
        </template>

        <!-- custom table rows -->
        <template v-slot:item.division="{  }">
          <v-select
            :items="divisions"
            label="Choose Division"
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

        <template v-slot:item.department="{  }">
          <v-select
            :items="departments"
            label="Choose Department"
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
      </v-data-table>
    </v-card>

    <!-- add division modal -->
    <v-dialog v-model="addDivisionDialog" max-width="290">
      <v-card>
        <v-card-title>Add New Division</v-card-title>
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
              label="Division"
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
        <v-card-title>Add New Department</v-card-title>
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
              label="Department"
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
import { mapState } from 'vuex'

import maps from './content/maps'

export default {
  components: {
  },
  data() {
    return {
      isLoading: false,
      breadcrumbs: [{
        text: 'Machine Maping',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],

      searchQuery: '',
      selectedUsers: [],
      headers: [
        { text: 'Serial Number', value: 'id' },
        { text: 'Machine Name', value: 'product_name' },
        { text: 'Division', value: 'division' },
        { text: 'Department', value: 'department' }
      ],

      addDivisionDialog: false,
      addDepartmentDialog: false,

      newDivision: '',
      newDepartment: '',

      maps,

      validDepartment: true,
      validDivision: true,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  computed: {
    ...mapState({ departments: (state) => state.departments.data }),
    ...mapState({ divisions: (state) => state.divisions.data })
  },
  watch: {
    selectedUsers(val) {

    }
  },
  methods: {
    searchUser() {},
    open() {},
    addNewDepartment() {
      if (this.$refs.departmentForm.validate()) {
        this.departments.push(this.newDepartment)
        this.addDepartmentDialog = false
      }
    },
    addNewDivision() {
      if (this.$refs.divisionForm.validate()) {
        this.divisions.push(this.newDivision)
        this.addDivisionDialog = false
      }
    }
  }
}
</script>

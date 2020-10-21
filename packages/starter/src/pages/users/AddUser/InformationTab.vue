<template>
  <div>
    <v-card class="my-2">
      <v-card-title>User Information</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field value="" label="Address Line 1"></v-text-field>
              <v-text-field value="" label="Address Line 2"></v-text-field>
              <v-text-field value="" label="Zip Code"></v-text-field>
              <v-text-field value="" label="City"></v-text-field>
              <v-text-field value="" label="State"></v-text-field>
              <v-text-field value="" label="Country"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field value="" label="Phone"></v-text-field>
              <v-select
                :items="departments"
                label="Department"
              >
                <template v-slot:prepend-item>
                  <v-list-item
                    ripple
                    @click="addNewDepartmentDialog()"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        Add New
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
              <v-select
                :items="divisions"
                label="Division"
              >
                <template v-slot:prepend-item>
                  <v-list-item
                    ripple
                    @click="addNewDivisionDialog()"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        Add New
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <div class="d-flex">
            <v-btn>Reset</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary">Save</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    
    <!-- add division modal -->
    <v-dialog v-model="addDivisionDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Add New Division</v-card-title>
        <v-card-text>
          <v-form
            ref="divisionForm"
            v-model="validDivision"
            lazy-validation
          >
            <v-text-field
              v-model="newDivision"
              :rules="divisionRules"
              label="Division"
              required
            ></v-text-field>
            <v-btn
              :disabled="!validDivision"
              color="success"
              @click="addNewDivision"
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
        <v-card-title class="headline">Add New Department</v-card-title>
        <v-card-text>
          <v-form
            ref="departmentForm"
            v-model="validDepartment"
            lazy-validation
          >
            <v-text-field
              v-model="newDepartment"
              :rules="departmentRules"
              label="Department"
              required
            ></v-text-field>
            <v-btn
              :disabled="!validDepartment"
              color="success"
              @click="addNewDepartment"
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
export default {
  data: () => ({
    date: '1990-10-09',
    menu: false,
    gender: 'male',

    validDivision: true,
    validDepartment: true,

    newDepartment: '',
    newDivision: '',

    departments: ['Department1', 'Department2', 'Department3'],
    divisions: ['Division1', 'Division2', 'Division3', 'Division4'],

    addDepartmentDialog: false,
    addDivisionDialog: false,

    divisionRules: [
      (v) => !!v || 'Division is required'
    ],
    departmentRules: [
      (v) => !!v || 'Department is required'
    ]
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    addNewDepartmentDialog() {
      this.addDepartmentDialog = true
    },
    addNewDepartment() {
      if (this.$refs.departmentForm.validate()) {
        this.departments.push(this.newDepartment)
        this.addDepartmentDialog = false
      }
    },
    addNewDivisionDialog() {
      this.addDivisionDialog = true
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

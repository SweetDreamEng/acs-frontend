<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Division/Zones</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
    </div>

    <!--     <v-card>
      <v-card-title>
        Divisions
        <v-dialog
          v-model="editDivisionDialog"
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
            <v-card-title>
              <span class="headline">Edit Division</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="editDivisionForm" v-model="isEditDivisionFormValid" lazy-validation @submit.prevent="saveDivision">
                <v-text-field
                  v-model="editedDivision.divisionName"
                  label="Division"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                </v-text-field>

                <div class="d-flex">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="closeDivision"
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
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="divisionHeader"
          :items="divisions"
          class="flex-grow-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editDivision(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card> -->

    <v-card class="mt-2">
      <v-card-title>
        Zones
        <v-dialog
          v-model="editZoneDialog"
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
            <v-card-title>
              <span class="headline">Edit Zone</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="editZoneForm" v-model="isEditZoneFormValid" lazy-validation @submit.prevent="saveZone">
                <v-text-field
                  v-model="editedZone.zoneName"
                  label="Zone"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-select
                  v-model="editedZone.divisionId"
                  :items="divisions"
                  item-text="divisionName"
                  item-value="id"
                  label="Choose Division"
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
                    @click="closeZone"
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
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="zoneHeader"
          :items="zones"
          class="flex-grow-1"
        >
          <template v-slot:item.divisionId="{ item }">
            {{ divisionNameOfZone(item) }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editZone(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Division/Zones Page Component
| url: /division-zones
|---------------------------------------------------------------------
|
*/

import { mapState } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      isLoading: false,
      breadcrumbs: [{
        text: 'Division/Zones',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],

      divisionHeader: [
        { text: 'Division', value: 'divisionName' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],
      zoneHeader: [
        { text: 'Zone', value: 'zoneName' },
        { text: 'Division', value: 'divisionId' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      editedIndex: -1,
      
      // division
      editDivisionDialog: false,
      editedDivision: {
        divisionName: ''
      },
      defaultDivision: {
        divisionName: ''
      },
      isEditDivisionFormValid: true,

      newItem: {
        department: '',
        division: ''
      },

      // zone
      editZoneDialog: false,
      editedZone: {
        zoneName: '',
        divisionId: 0
      },
      defaultZone: {
        zoneName: '',
        divisionId: 0
      },
      isEditZoneFormValid: true,

      isNewFormValid: true,

      searchQuery: '',

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required field'
      }
    }
  },
  computed: {
    ...mapState({
      divisions: (state) => state.divisions.data,
      zones: (state) => state.departments.data
    })
  },
  methods: {
    open() {},
    editDivision(item) {
      this.editedIndex = this.divisions.indexOf(item)
      this.editedDivision = Object.assign({}, item)
      this.editDivisionDialog = true
      this.$nextTick(() => {
        this.$refs.editDivisionForm.resetValidation()
      })
    },
    closeDivision () {
      this.editDivisionDialog = false
      this.$nextTick(() => {
        this.editedDivision = Object.assign({}, this.defaultDivision)
        this.editedIndex = -1
      })
    },
    saveDivision() {
      if (this.$refs.editDivisionForm.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.divisions[this.editedIndex], this.editedDivision)
        } else {
          this.divisions.push(this.editedDivision)
        }
        this.closeDivision()
      }
    },

    editZone(item) {
      this.editedIndex = this.zones.indexOf(item)
      this.editedZone = Object.assign({}, item)
      this.editZoneDialog = true
      this.$nextTick(() => {
        this.$refs.editZoneForm.resetValidation()
      })
    },
    closeZone () {
      this.editZoneDialog = false
      this.$nextTick(() => {
        this.editedZone = Object.assign({}, this.defaultZone)
        this.editedIndex = -1
      })
    },
    saveZone() {
      if (this.$refs.editZoneForm.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.zones[this.editedIndex], this.editedZone)
        } else {
          this.zones.push(this.editedZone)
        }
        this.closeZone()
      }
    },
    divisionNameOfZone(item) {
      if (item.divisionId === 0) return 'Not Assinged'
      const _division = this.divisions.find((division) => {
        return division.id === item.divisionId
      })

      return _division ? _division.divisionName : 'Not Assigned'
      // return this.divisions.find((x) => x.id === item.divisionId).divisionName
    }
  }
}
</script>

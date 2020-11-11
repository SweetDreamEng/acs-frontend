<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center">
      <div>
        <div class="display-1">Machine Mapping</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
    </div>

    <v-card>
      <p class="pa-2">Please assign machine names to your ACS Digital Solution product and map them to the zones and division.</p>
      <!-- maps list -->
      <v-data-table
        :headers="headers"
        :items="maps"
        class="flex-grow-1"
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
        <template v-slot:header.department="{ header }">
          <v-icon color="primary">mdi-account-multiple-plus</v-icon>
          {{ header.text }}
        </template>
        <template v-slot:header.division="{ header }">
          <v-icon color="primary">mdi-routes</v-icon>
          {{ header.text }}
        </template>

        <!-- custom table rows -->
        <template v-slot:item.division="{ item }">
          <span>{{ item.division ? item.division : 'Not assigned' }}</span>
        </template>

        <template v-slot:item.department="{ item }">
          <span>{{ item.department ? item.department : 'Not assigned' }}</span>
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
          <span class="headline">Edit</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="editForm" v-model="isEditFormValid" lazy-validation @submit.prevent="save">
            <v-select
              v-model="editedItem.division"
              :items="exDivisionNames"
              label="Choose Division"
              :rules="[rules.required]"
              outlined
              dense
            >
            </v-select>
            <v-select
              v-model="editedItem.department"
              :items="exZoneNames"
              label="Choose Zones"
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
                :disabled="newMode"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :disabled="newMode"
              >
                Save
              </v-btn>
            </div>
          </v-form>

          <!--           <div class="d-flex my-2">
            <div>
              Please add department and/or division if not found above
            </div>
            <v-spacer></v-spacer>
            <v-btn
              icon
              class="ml-2"
              @click="newMode = !newMode"
            >
              <v-icon>{{ newMode ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </div>
          <v-expand-transition>
            <div v-show="newMode">
              <v-form ref="newForm" v-model="isNewFormValid" lazy-validation @submit.prevent="addNewOptions">
                <v-text-field
                  label="New Division Name"
                  v-model="newItem.division"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  label="New Department Name"
                  v-model="newItem.department"
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
                    @click="newMode = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="primary"
                    type="submit"
                  >
                    Add
                  </v-btn>
                </div>
              </v-form>
            </div>
          </v-expand-transition> -->
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Machine mapping Page Component
| url: /machine-mapping
|---------------------------------------------------------------------
|
| List all mappings between machines and division/department
*/

import { mapState, mapGetters } from 'vuex'

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

      headers: [
        { text: 'Serial Number', value: 'id' },
        { text: 'Machine Name', value: 'product_name' },
        { text: 'Division', value: 'division' },
        { text: 'Zones', value: 'department' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      maps,

      newMode: false,
      editedIndex: -1,
      editedItem: {
        department: '',
        division: ''
      },
      defaultItem: {
        department: 'Not assigned',
        division: 'Not assigned'
      },
      editDialog: false,
      newItem: {
        department: '',
        division: ''
      },

      isEditFormValid: true,
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
      departments: (state) => {
        const _departments = state.departments.data

        _departments.unshift('Not assigned')

        return _departments
      }
    }),
    ...mapGetters('divisions', [
      'exDivisionNames'
    ]),
    ...mapGetters('departments', [
      'exZoneNames'
    ])
  },
  watch: {
    editDialog (val) {
      val || this.close()
    }
  },
  methods: {
    open() {},
    editItem (item) {
      this.editedIndex = this.maps.indexOf(item)
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
        Object.assign(this.maps[this.editedIndex], this.editedItem)
        this.close()
      }
    }
  }
}
</script>

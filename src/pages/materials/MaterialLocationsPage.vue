<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-card :disabled="loadingMaterials">
      <v-card-title>Materials</v-card-title>
      <v-data-table
        :headers="tableHeaders"
        :items="materials"
        class="flex-grow-1"
        :search="searchText"
        :loading="loadingMaterials"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchText"
              label="ex; Material"
              class="mx-4"
              solo
              dense
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="editDialog"
              persistent
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>$mdi-plus</v-icon>
                  Add Material
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="primary white--text">{{ dialogText }}</v-card-title>
                <v-card-text class="mt-2">
                  <v-form ref="editForm" v-model="isEditFormValid" lazy-validation @submit.prevent="submit">
                    <v-text-field
                      v-model="editedItem.material"
                      label="Material"
                      :rules="[$rules.required]"
                      outlined
                      dense
                    >
                    </v-text-field>

                    <div class="d-flex">
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        :disabled="savingMaterial"
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="primary"
                        type="submit"
                        :loading="savingMaterial"
                        :disabled="savingMaterial"
                      >
                        Submit
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <!-- custom table header -->

        <!-- custom table rows -->
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            <v-icon small>$mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            icon
            small
            @click="deleteItem(item)"
          >
            <v-icon small>$mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
<!--       <div class="text-center py-2">
        <v-pagination
          v-model="loc_page"
          :length="pageCount"
          :total-visible="7"
          @input="onPageChange"
        ></v-pagination>
      </div> -->
    </v-card>

    <br>

    <v-card :disabled="loadingMaterialLocations">
      <v-card-title>Locations</v-card-title>
      <v-data-table
        :headers="locationsTableHeaders"
        :items="materialLocations"
        class="flex-grow-1"
        :search="searchLocationText"
        :loading="loadingMaterialLocations"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchLocationText"
              label="ex; Location"
              class="mx-4"
              solo
              dense
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="editLocationDialog"
              persistent
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>$mdi-plus</v-icon>
                  Add Location
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="primary white--text">{{ dialogLocationText }}</v-card-title>
                <v-card-text class="mt-2">
                  <v-form ref="editLocationForm" v-model="isEditLocationFormValid" lazy-validation @submit.prevent="submitLocation">
                    <v-text-field
                      v-model="editedLocationItem.location"
                      label="Location"
                      :rules="[$rules.required]"
                      outlined
                      dense
                    >
                    </v-text-field>

                    <div class="d-flex">
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        :disabled="savingMaterialLocation"
                        @click="closeLocation"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="primary"
                        type="submit"
                        :loading="savingMaterialLocation"
                        :disabled="savingMaterialLocation"
                      >
                        Submit
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <!-- custom table header -->

        <!-- custom table rows -->
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            small
            class="mr-2"
            @click="editLocationItem(item)"
          >
            <v-icon small>$mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            icon
            small
            @click="deleteLocationItem(item)"
          >
            <v-icon small>$mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
<!--       <div class="text-center py-2">
        <v-pagination
          v-model="loc_page"
          :length="pageCount"
          :total-visible="7"
          @input="onPageChange"
        ></v-pagination>
      </div> -->
    </v-card>
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

export default {
  components: {
  },
  data() {
    return {
      searchText: '',

      tableHeaders: [
        { text: 'Material', value: 'material' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      editedIndex: -1,
      editedItem: {
        material: '',
        location: ''
      },
      defaultItem: {
        material: '',
        location: ''
      },

      editDialog: false,

      isEditFormValid: true,

      searchLocationText: '',

      locationsTableHeaders: [
        { text: 'Location', value: 'location' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      editedLocationIndex: -1,
      editedLocationItem: {
        location: ''
      },
      defaultLocationItem: {
        location: ''
      },

      editLocationDialog: false,

      isEditLocationFormValid: true
    }
  },
  computed: {
    ...mapState({
      loadingMaterials: (state) => state.materials.loadingMaterials,
      savingMaterial: (state) => state.materials.savingMaterial,
      materials: (state) => state.materials.data,

      loadingMaterialLocations: (state) => state.materials.loadingMaterialLocations,
      savingMaterialLocation: (state) => state.materials.savingMaterialLocation,
      materialLocations: (state) => state.materials.materialLocations
      // pageCount: (state) => state.devices.pageCount,
      // page: (state) => state.devices.page
    }),
    dialogText() {
      return this.editedIndex === -1 ? 'Add Material' : 'Edit Material'
    },
    dialogLocationText() {
      return this.editedLocationIndex === -1 ? 'Add Location' : 'Edit Location'
    }
  },
  mounted() {
    // this.loc_page = this.page
    this.getMaterials()
    this.getMaterialLocations()
  },
  methods: {
    ...mapActions({
      getMaterials: 'materials/getMaterials',
      addMaterial: 'materials/addMaterial',
      updateMaterial: 'materials/updateMaterial',
      deleteMaterial: 'materials/deleteMaterial',

      getMaterialLocations: 'materials/getMaterialLocations',
      addMaterialLocation: 'materials/addMaterialLocation',
      updateMaterialLocation: 'materials/updateMaterialLocation',
      deleteMaterialLocation: 'materials/deleteMaterialLocation'
    }),

    editItem (item) {
      this.editedIndex = this.materials.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
      this.$nextTick(() => {
        this.$refs.editForm.resetValidation()
      })
    },

    async deleteItem(item) {
      try {
        await this.deleteMaterial(item)

        this.getMaterials()
      } catch (err) {
        console.log(err)
      }
    },

    close () {
      this.editDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async submit () {
      if (this.$refs.editForm.validate()) {
        try {
          if (this.editedIndex > -1) {
            await this.updateMaterial({
              id: this.editedItem.id,
              material: this.editedItem.material,
              location: this.editedItem.location
            })
          } else {
            await this.addMaterial({
              material: this.editedItem.material,
              location: this.editedItem.location
            })
          }

          this.getMaterials()
          this.close()
        } catch (err) {
          console.log(err)
        }
      }
    },

    editLocationItem (item) {
      this.editedLocationIndex = this.materialLocations.indexOf(item)
      this.editedLocationItem = Object.assign({}, item)
      this.editLocationDialog = true
      this.$nextTick(() => {
        this.$refs.editLocationForm.resetValidation()
      })
    },

    async deleteLocationItem(item) {
      try {
        await this.deleteMaterialLocation(item)

        this.getMaterialLocations()
      } catch (err) {
        console.log(err)
      }
    },

    closeLocation () {
      this.editLocationDialog = false
      this.$nextTick(() => {
        this.editedLocationItem = Object.assign({}, this.defaultLocationItem)
        this.editedLocationIndex = -1
      })
    },

    async submitLocation () {
      if (this.$refs.editLocationForm.validate()) {
        try {
          if (this.editedLocationIndex > -1) {
            await this.updateMaterialLocation({
              id: this.editedLocationItem.id,
              location: this.editedLocationItem.location
            })
          } else {
            await this.addMaterialLocation({
              location: this.editedLocationItem.location
            })
          }

          this.getMaterialLocations()
          this.closeLocation()
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>

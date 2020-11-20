<template>
  <v-card class="mt-2">
    <v-card-title>
      Locations
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
            <span class="headline">{{ editTitle }}</span>
          </v-card-title>

          <v-card-text class="mt-4">
            <v-form ref="editForm" v-model="isFormValid" lazy-validation @submit.prevent="submit">
              <v-text-field
                v-model="editedItem.location"
                label="Location"
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
                  @click="closeDialog"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="btn_loading"
                  :disabled="btn_loading"
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
        :items="locations"
        class="flex-grow-1"
        :loading="table_loading"
        hide-default-footer
      >
        <template v-slot:item.location_id="{ item }">
          <span>{{ locationName(item.location_id) }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editLocation(item)"
          >
            mdi-pencil
          </v-icon>
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

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    locations: {
      type: Array,
      default: () => []
    }
  },
  components: {
  },
  data() {
    return {
      headers: [
        { text: 'Location', value: 'location' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      editedIndex: -1,

      // zone
      dialog: false,
      editedItem: {
        location: ''
      },
      defaultItem: {
        location: ''
      },
      isFormValid: true,

      searchQuery: '',

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required field'
      }
    }
  },
  computed: {
    ...mapState({
      btn_loading: (state) => state.locations.btn_loading,
      table_loading: (state) => state.locations.table_loading
    }),
    ...mapGetters({
      extendedLocations: 'locations/extendedLocations'
    }),
    editTitle() {
      return this.editedIndex === -1 ? 'Add Location' : 'Edit Location'
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      getLocations: 'locations/getLocations',
      addLocation: 'locations/addLocation',
      updateLocation: 'locations/updateLocation'
    }),

    open() {
    },
    editLocation(item) {
      this.editedIndex = this.locations.indexOf(item)
      this.editedItem = Object.assign({}, item)
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
          this.updateLocation(this.editedItem).then(() => {
            this.getLocations()
            this.closeDialog()
          })
        } else {
          this.addLocation(this.editedItem).then(() => {
            this.getLocations()
            this.closeDialog()
          })
        }
      }
    }
  }
}
</script>

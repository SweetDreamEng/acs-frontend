<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Location/Zones</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
    </div>
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
            <v-card-title class="primary white--text">
              <span class="headline">{{ editTitle }}</span>
            </v-card-title>

            <v-card-text class="mt-4">
              <v-form ref="editZoneForm" v-model="isEditZoneFormValid" lazy-validation @submit.prevent="saveZone">
                <v-text-field
                  v-model="editedZone.name"
                  label="Zone"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-select
                  v-model="editedZone.locationId"
                  :items="extendedLocations"
                  label="Choose Location"
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
                    @click="closeZone"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="primary"
                    type="submit"
                    :loading="btn_loading"
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

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      isLoading: false,
      breadcrumbs: [{
        text: 'Location/Zones',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],

      zoneHeader: [
        { text: 'Zone', value: 'name' },
        { text: 'Location', value: 'location_id' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      editedIndex: -1,

      // zone
      editZoneDialog: false,
      editedZone: {
        name: '',
        locationId: 0
      },
      defaultZone: {
        name: '',
        locationId: 0
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
      btn_loading: (state) => state.zones.btn_loading,
      table_loading: (state) => state.zones.table_loading,
      locations: (state) => state.locations.data,
      zones: (state) => state.zones.data
    }),
    ...mapGetters({
      extendedLocations: 'locations/extendedLocations'
    }),
    editTitle() {
      return this.editedIndex === -1 ? 'Add Zone' : 'Edit Zone'
    }
  },
  mounted() {
    this.open()
  },
  methods: {
    ...mapActions({
      getZones: 'zones/getZones',
      addZone: 'zones/addZone',
      updateZone: 'zones/updateZone'
    }),

    open() {
      this.getZones()
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
    locationName(location_id) {
      const _location = this.locations.find((location) => location.id === location_id)

      return _location ? _location.name : 'Not Assinged'
    },
    saveZone() {
      if (this.$refs.editZoneForm.validate()) {
        if (this.editedIndex > -1) {
          this.updateZone(this.editedZone).then(() => {
            this.getZones()
          })
        } else {
          this.addZone(this.editedZone).then(() => {
            this.getZones()
          })
        }
        this.closeZone()
      }
    }
  }
}
</script>

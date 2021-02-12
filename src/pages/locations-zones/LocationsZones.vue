<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="text-h4 mt-2">Location/Zones</div>
    <locations :locations="locations"></locations>

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
              <span class="text-h5">{{ editTitle }}</span>
            </v-card-title>

            <v-card-text class="mt-4">
              <v-form ref="editZoneForm" v-model="isEditZoneFormValid" lazy-validation @submit.prevent="saveZone">
                <v-text-field
                  v-model="editedZone.name"
                  label="Zone"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-select
                  v-model="editedZone.location_id"
                  :items="locations"
                  label="Choose Location"
                  :rules="[$rules.required]"
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
          :headers="zonesHeader"
          :items="zones"
          class="flex-grow-1"
          :loading="table_loading"
          hide-default-footer
        >
          <template v-slot:item.location_id="{ item }">
            <span>{{ locationName(item.location_id) }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="editZone(item)">
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <downtime-plans></downtime-plans>
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
import Locations from '../../components/locations-zones/Locations.vue'
import DowntimePlans from '../../components/locations-zones/DowntimePlans.vue'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Locations, DowntimePlans
  },
  data() {
    return {
      zonesHeader: [
        { text: 'Zone', value: 'name' },
        { text: 'Location', value: 'location_id' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      editedIndex: -1,

      // zone
      editZoneDialog: false,
      editedZone: {
        name: '',
        location_id: 0
      },
      defaultZone: {
        name: '',
        location_id: 0
      },
      isEditZoneFormValid: true,

      searchQuery: ''
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
      locationName: 'locations/locationName'
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
      getLocations: 'locations/getLocations',
      addZone: 'zones/addZone',
      updateZone: 'zones/updateZone'
    }),

    open() {
      this.getLocations()
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
    async saveZone() {
      if (this.$refs.editZoneForm.validate()) {
        if (this.editedIndex > -1) {
          await this.updateZone(this.editedZone)
          this.getZones()
          this.closeZone()
        } else {
          await this.addZone(this.editedZone)
          this.getZones()
          this.closeZone()
        }
      }
    }
  }
}
</script>

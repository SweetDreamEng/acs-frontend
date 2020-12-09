<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="display-1 mt-2">Machine Mapping</div>
    <p class="py-1">Please assign machine names to your ACS Digital Solution product and map them to the zones and division.</p>

    <v-card>
      <v-card-text>
        <!-- maps list -->
        <v-data-table
          :headers="headers"
          :items="devices"
          class="flex-grow-1"
          :search="searchQuery"
          :loading="loadingTableMachineMapping"
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

          <template v-slot:item.machine_id="{ item }">
            <span>{{ configurationName(item) }}</span>
          </template>

          <template v-slot:item.zone_id="{ item }">
            <span>{{ zoneName(item) }}</span>
          </template>
          <template v-slot:item.location_id="{ item }">
            <span>{{ locationName(item) }}</span>
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
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="editDialog"
      max-width="400px"
    >
      <v-card>
        <v-card-title class="primary white--text">Edit</v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="editForm" v-model="isEditFormValid" lazy-validation @submit.prevent="save">
<!--             <v-select
              v-model="editedItem.division"
              :items="exDivisionNames"
              label="Choose Division"
              :rules="[$rules.required]"
              outlined
              dense
            >
            </v-select> -->
            <v-select
              v-model="editedItem.zone_id"
              :items="extendedZones"
              label="Choose Zones"
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
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :disabled="loadingBtnAssginZoneToMachine"
                :loading="loadingBtnAssginZoneToMachine"
              >
                Save
              </v-btn>
            </div>
          </v-form>
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

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      isLoading: false,

      headers: [
        { text: 'Serial Number', value: 'serial_number' },
        { text: 'Configuration', value: 'machine_id' },
        { text: 'Zones', value: 'zone_id' },
        { text: 'Locations', value: 'location_id' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      newMode: false,
      editedIndex: -1,
      editedItem: {
        serial_number: 0,
        zone_id: 0
      },
      defaultItem: {
        serial_number: 0,
        zone_id: 0
      },
      editDialog: false,

      isEditFormValid: true,

      searchQuery: ''
    }
  },
  computed: {
    ...mapState({
      loadingTableMachineMapping: (state) => state.devices.loadingTableMachineMapping,
      loadingBtnAssginZoneToMachine: (state) => state.devices.loadingBtnAssginZoneToMachine,
      devices: (state) => state.devices.data,
      configurations: (state) => state.machines.machines,
      zones: (state) => state.zones.data,
      locations: (state) => state.locations.data
    }),
    ...mapGetters({
      extendedZones: 'zones/extendedZones'
    })
  },
  watch: {
    editDialog (val) {
      val || this.close()
    }
  },
  mounted() {
    this.open()
  },
  methods: {
    ...mapActions({
      getCustomerDevices: 'devices/getCustomerDevices',
      getAllConfigurations: 'machines/getAllConfigurations',
      getZones: 'zones/getZones',
      assignZoneToDevice: 'devices/assignZoneToDevice',
      getLocations: 'locations/getLocations'
    }),
    open() {
      this.getCustomerDevices()
      this.getAllConfigurations()
      this.getZones()
      this.getLocations()
    },
    editItem (item) {
      this.editedIndex = item.machine_id
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
    async save () {
      if (this.$refs.editForm.validate()) {
        await this.assignZoneToDevice(this.editedItem)
        this.close()
        await this.getCustomerDevices()
      }
    },
    configurationName(device) {
      const configuration = this.configurations.find((item) => {
        return item.id === device.machine_id
      })

      if (configuration) return configuration.name
      else return ''
    },
    locationName(item) {
      const _location = this.locations.find((location) => location.id === item.location_id)

      return _location ? _location.name : 'Not Assinged'
    },
    zoneName(item) {
      const _zone = this.zones.find((zone) => zone.id === item.zone_id)

      return _zone ? _zone.name : 'Not Assinged'
    }
  }
}
</script>

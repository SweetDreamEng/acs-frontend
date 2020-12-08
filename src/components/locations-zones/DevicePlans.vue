<template>
  <v-card class="mt-2">
    <v-card-title>
      Device Downtime Plans
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
        <v-card
          :loading="isLocationCardLoading"
          :disabled="isLocationCardLoading"
        >
          <v-card-title class="primary white--text">
            <span class="headline">{{ editTitle }}</span>
          </v-card-title>

          <v-card-text class="mt-4">
            <v-form ref="editForm" v-model="isFormValid" lazy-validation @submit.prevent="submit">
              <v-text-field
                v-model="editedItem.name"
                label="Location name"
                :rules="[$rules.required]"
                outlined
                dense
              >
              </v-text-field>
              <v-select
                v-model="editedItem.state"
                label="State"
                :items="states"
                :rules="[$rules.required]"
                outlined
                dense
                @change="onStateChange"
              >
              </v-select>
              <v-combobox
                v-model="editedItem.city"
                :items="cities"
                label="City"
                item-text="city"
                :return-object="false"
                :rules="[$rules.required]"
                :disabled="!editedItem.state"
                outlined
                dense
              ></v-combobox>
              <v-text-field
                :value="zipCode"
                label="Zip Code"
                :rules="[$rules.required]"
                :disabled="!editedItem.state || !editedItem.city"
                outlined
                dense
                readonly
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
        :items="downtimePlans"
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
            @click="editPlan(item)"
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
import states from '../../services/data/states'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },
  props: {
    downtimePlans: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: 'Device Number', value: 'device_id' },
        { text: 'From', value: 'from', align: 'center' },
        { text: 'To', value: 'to', align: 'center' },
        { text: 'Reason', value: 'zip', align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      isLocationCardLoading: false,

      editedIndex: -1,

      dialog: false,

      editedItem: {
        device_id: 0,
        from: '',
        to: '',
        reason: ''
      },
      defaultItem: {
        device_id: 0,
        from: '',
        to: '',
        reason: ''
      },
      isFormValid: true,
    }
  },
  computed: {
    ...mapState({
      btnLoading: (state) => state.devices.downtimePlanBtnLoading,
      tableLoading: (state) => state.devices.downtimePlansTableLoading
    }),
    editTitle() {
      return this.editedIndex === -1 ? 'Add' : 'Edit'
    }
  },
  methods: {
    ...mapActions({
      getDowntimePlans: 'devices/getDowntimePlans',
      addDowntimePlan: 'devices/addDowntimePlan',
      updateDowntimePlan: 'devices/updateDowntimePlan'
    }),
    editPlan(item) {
      this.editedIndex = this.downtimePlans.indexOf(item)
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
        // const data = Object.assign(this.editedItem, {
        //   zip: this.zipCode
        // })

        // if (this.editedIndex > -1) {
        //   this.updateLocation(data).then(() => {
        //     this.getLocations()
        //     this.closeDialog()
        //   })
        // } else {
        //   this.addLocation(data).then(() => {
        //     this.getLocations()
        //     this.closeDialog()
        //   })
        // }
      }
    }
  }
}
</script>

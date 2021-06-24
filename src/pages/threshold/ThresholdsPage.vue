<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-card :disabled="loading">
      <v-data-table
        :headers="headers"
        :items="thresholds"
        :loading="loading"
      >
        <template v-slot:item.condition="{ item }">
          {{ item.option }}
        </template>

        <template v-slot:item.date="{ item }">
          <div>{{ item.updated_at.split('T')[0] }}</div>
        </template>

        <template v-slot:item.status="{ item }">
          <div class="font-weight-bold d-flex align-center text-no-wrap">
            <div class="warning--text">
              <v-switch
                v-model="item.status"
                class="custom-red"
                color="success"
                @click="handleChangeStatus(item.id)"
              ></v-switch>
            </div>
          </div>
        </template>

        <template v-slot:item.is_running="{ item }">
          {{ getMachinesStatus(item.is_running) }}
        </template>

        <template v-slot:item.action="{ item }">
          <div class="actions">
            <v-btn icon @click="handleEdit(item)">
              <v-icon small>$mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="handleRemove(item.id)">
              <v-icon small>$mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="isDeleteThreshold" max-width="500">
      <v-card>
        <v-card-text class="text-center">
          <v-avatar class="text-center mt-5" color="grey lighten-2" size="100">
            <v-icon color="white" x-large>$mdi-trash-can-outline</v-icon>
          </v-avatar>
        </v-card-text>
        <v-card-title class="mt-1 headline justify-center">Are you sure to delete threshold?</v-card-title>
        <v-card-text class="pb-0 text-center">Click on Confirm to delete threshold.</v-card-text>
        <div class="mt-2 pb-3 text-center">
          <v-btn color="grey lighten-2" depressed @click="isDeleteThreshold = false">Cancel</v-btn>
          <v-btn
            class="ml-2 white--text"
            depressed
            color="red"
            :loading="isThresholdDeleting"
            @click="confirmDelete"
          >Confirm</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="editDialog"
      max-width="400px"
    >
      <v-card>
        <v-card-title class="primary white--text">Edit Threshold</v-card-title>
        <v-card-text class="mt-2">
          <v-form ref="editForm" v-model="isEditFormValid" lazy-validation @submit.prevent="save">
            <v-text-field
              v-model="editedItem.tag_name"
              :items="editedItem.tag_name"
              label="Parameter"
              outlined
              readonly
              dense
            >
            </v-text-field>
            <v-select
              v-model="editedItem.operator"
              :items="operators"
              label="Select an operator"
              outlined
              dense
            >
            </v-select>
            <v-text-field
              v-model="editedItem.value"
              type="number"
              label="Select or enter a value"
              outlined
              dense
            >
            </v-text-field>
            <v-text-field
              v-model="editedItem.approaching"
              type="number"
              label="Enter a approaching value"
              outlined
              dense
            >
            </v-text-field>
            <v-select
              v-model="editedItem.is_running"
              :items="runningStatus"
              item-text="name"
              item-value="value"
              label="Select a parameter"
              outlined
              dense
            >
            </v-select>
          </v-form>
        </v-card-text>
        <v-card-text>
          <div align="right">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!isEditFormValid"
              :loading="isThresholdUpdating"
              @click="handleSubmit"
            >
              Submit
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

/*
|---------------------------------------------------------------------
| Threshold List Page Component
| url: /threshold
|---------------------------------------------------------------------
|
| List thresholds
*/
import { mapActions, mapState } from 'vuex'

import operators from './content/operators'

export default {
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headers: [
        { text: 'Condition', sortable: false, value: 'tag_name' },
        { text: 'Operator', value: 'operator' },
        { text: 'Value', value: 'value' },
        { text: 'Approaching Value', value: 'approaching' },
        { text: 'Date', value: 'date' },
        { text: 'Enabled', value: 'status' },
        { text: 'Parameter', align: 'center', value: 'is_running' },
        { text: 'Actions', sortable: false, align: 'center', value: 'action' }
      ],
      isDeleteThreshold: false,
      selectedThresholdId: 0,
      editedItem: {
      },
      editDialog: false,
      isEditFormValid: false,
      operators,
      tab: null,
      runningStatus: [{
        name: 'True',
        value: true
      }, {
        name: 'False',
        value: false
      }]
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.thresholds.loading,
      thresholds: (state) => state.thresholds.thresholds,
      buttonLoading: (state) => state.thresholds.buttonLoading,
      isThresholdDeleting: (state) => state.thresholds.isThresholdDeleting,
      isThresholdUpdating: (state) => state.thresholds.isThresholdUpdating
    })
  },
  mounted() {
    this.getThresholds()
  },
  methods: {
    ...mapActions({
      getThresholds: 'thresholds/getThresholds',
      changeThresholdStatus: 'thresholds/changeThresholdStatus',
      deleteThreshold: 'thresholds/deleteThreshold',
      updateThreshold: 'thresholds/updateThreshold'
    }),
    async handleChangeStatus(id) {
      try {
        await this.changeThresholdStatus(id)
      } catch (error) {
        console.log(error)
      }
      this.getThresholds()
    },
    handleRemove(id) {
      this.selectedThresholdId = id
      this.isDeleteThreshold = true
    },
    getMachinesStatus(status) {
      return status ? 'True' : 'False'
    },
    async confirmDelete() {
      try {
        await this.deleteThreshold(this.selectedThresholdId)
        this.isDeleteThreshold = false
      } catch (error) {
        console.log(error)
      }
      this.getThresholds()
    },
    handleEdit(item) {
      this.selectedThresholdId = item.id
      this.editedItem = Object.assign({}, this.editedItem, item)
      this.editDialog = true
    },
    async handleSubmit() {
      try {
        await this.updateThreshold({
          id: this.selectedThresholdId,
          condition: this.editedItem
        })

        this.editDialog = false

        this.getThresholds()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.custom-red .v-input__control .v-input__slot .v-input--selection-controls__input div {
  color: red;
}
</style>

<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="text-h4">Thresholds</div>
        <!-- <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs> -->
      </div>
    </div>
    <v-card :disabled="loading">
      <v-data-table
        :headers="headers"
        :items="thresholds"
        :loading="loading"
        hide-default-footer
      >
        <template v-slot:item.condition="{ item }">
          {{ item.option }}
        </template>

        <template v-slot:item.date="{ item }">
          <div>{{ item.updated_at.split('T')[0] }}</div>
        </template>

        <template v-slot:item.companyMail="{ item }">
          {{ item.email }}
        </template>

        <template v-slot:item.sms="{ item }">
          {{ item.sms }}
        </template>

        <template v-slot:item.status="{ item }">
          <div class="font-weight-bold d-flex align-center text-no-wrap">
            <div class="warning--text">
              <v-btn
                :color="item.status ? 'success' : 'warning'"
                :loading="buttonLoading"
                @click="handleChangeStatus(item.id)"
              >{{ item.status ? 'Enabled' : 'Disabled' }}</v-btn>
            </div>
          </div>
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
              label="Telemetry"
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
              required
              :rules="conditionRules"
              outlined
              dense
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-text>
          <div>
            <h2 class="mb-2">Actions</h2>
            <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
              <v-tab to="#tabs-sms">SMS</v-tab>
              <v-tab to="#tabs-email">Email</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item value="tabs-sms">
                <v-form
                  ref="sms"
                  v-model="smsValid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="smsForm.name"
                    label="Display name"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="smsForm.to"
                    label="To"
                    placeholder="123-456-7890"
                    :rules="phoneRules"
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="smsForm.note"
                    label="Note"
                    required
                    :rules="noteRules"
                    placeholder="Add a note to include in the sms."
                  ></v-textarea>
                </v-form>
              </v-tab-item>

              <v-tab-item value="tabs-email">
                <v-form
                  ref="email"
                  v-model="emailValid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="emailForm.name"
                    label="Display name"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="emailForm.to"
                    label="To"
                    placeholder="ex: msft@microsoft.com"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="emailForm.note"
                    label="Note"
                    required
                    :rules="noteRules"
                    placeholder="Add a note to include in the email."
                  ></v-textarea>
                </v-form>
              </v-tab-item>
            </v-tabs-items>
            <div>
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
| url: /threshold/list
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
        { text: 'Condition', sortable: false, value: 'condition' },
        { text: 'Email', value: 'companyMail' },
        { text: 'Date', value: 'date' },
        { text: 'SMS', value: 'sms' },
        { text: 'Status', value: 'status' },
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
      emailValid: false,
      smsValid: false,
      emailForm: {
        name: null,
        to: null,
        note: null
      },
      smsForm: {
        name: null,
        to: null,
        note: null
      },
      nameRules: [
        (v) => !!v || 'Name is required'
      ],
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        (v) => /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/.test(v) || 'Phone number must be valid'
      ],
      noteRules: [
        (v) => !!v || 'Note is required'
      ],
      conditionRules: [
        (v) => !!v || 'This field is required'
      ]
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
      this.editedItem = item
      this.smsForm = JSON.parse(item.sms_info)
      this.emailForm = JSON.parse(item.email_info)
      this.editDialog = true
    },
    async handleSubmit() {
      if (this.$refs.sms.validate() || this.$refs.email.validate()) {
        try {
          await this.updateThreshold({
            id: this.selectedThresholdId,
            condition: this.editedItem,
            smsInfo: this.smsForm,
            emailInfo: this.emailForm
          })

          this.$refs.sms.resetValidation()
          this.$refs.email.resetValidation()

          this.editDialog = false

          this.getThresholds()
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

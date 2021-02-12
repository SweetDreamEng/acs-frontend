<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="text-h4">Threshold</div>
      </div>
    </div>
    <v-card>
      <v-card-text>
        <div>
          <h2 class="my-2">Target Devices</h2>
          <div class="">Select the target device template your rule will use. If you need to narrow the rule's scope, add filters.</div>
          <v-select
            :items="products"
            label="Product"
          >
          </v-select>
        </div>
        <div>
          <h2 class="my-3">Conditions</h2>
          <div class="">Conditions define when you rule is triggered. Aggregation is optional - use it to cluster your data and trigger rules based on a time window.</div>
          <br>
          <v-form>
            <v-row
              v-for="(filter, i) in filters"
              :key="i"
            >
              <v-col
                cols="12"
                sm="4"
                class="py-0"
              >
                <v-select
                  v-model="filter.telemetry"
                  :items="telemetries"
                  label="Select a telemetry"
                  required
                >
                </v-select>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="py-0"
              >
                <v-select
                  v-model="filter.operator"
                  :items="operators"
                  label="Select an operator"
                  required
                >
                </v-select>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="py-0"
              >
                <v-text-field
                  v-model="filter.value"
                  type="number"
                  label="Select or enter a value"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-btn
            @click="addFilter"
          >
            <v-icon left>mdi-plus</v-icon>Condition
          </v-btn>
        </div>
        <div>
          <h2 class="mt-4 mb-2">Actions</h2>
          <div class="">Send an email when your rule is triggered. Emails will only be sent to users who have been added to this application and have signed-in at least once.</div>
          <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
            <v-tab to="#tabs-sms">SMS</v-tab>
            <v-tab to="#tabs-email">Email</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tabs-sms">
              <v-form
                ref="smsForm"
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
              </v-form>
            </v-tab-item>

            <v-tab-item value="tabs-email">
              <v-form
                ref="emailForm"
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
                  placeholder="Add a note to include in the email."
                ></v-textarea>
              </v-form>
            </v-tab-item>
          </v-tabs-items>

          <v-btn color="primary mt-2">
            Submit
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Threshold Add Page Component
| url: /threshold/add
|---------------------------------------------------------------------
|
| Add a new threshold
*/

import products from './content/products'
import telemetries from './content/telemetries'
import operators from './content/operators'

export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    roles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      products,
      telemetries,
      operators,

      switch1: true,

      defaultFilter: {
        telemetry: '',
        operator: '',
        value: ''
      },
      filters: [
        {
          telemetry: '',
          operator: '',
          value: ''
        }
      ],

      emailForm: {
        name: '',
        to: '',
        note: ''
      },
      smsForm: {
        name: '',
        to: ''
      },

      tab: null,

      emailValid: true,
      smsValid: true,

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
      ]
    }
  },
  methods: {
    addFilter() {
      this.filters.push(this.defaultFilter)
    }
  }
}
</script>

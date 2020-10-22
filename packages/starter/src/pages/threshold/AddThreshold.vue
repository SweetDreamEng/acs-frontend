<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Threshold</div>
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
          <h2 class="my-2">Conditions</h2>
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
                  :items="telemetries"
                  v-model="filter.telemetry"
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
                  :items="operators"
                  v-model="filter.operator"
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
                  type="number"
                  v-model="filter.value"
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
          <h2 class="my-2">Actions</h2>
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
                  placeholder="1234567890"
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
            Done
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
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
      products: [
        'BD Batch Blender',
        'Accumeter Ovation Continuous',
        'GH Gravimetric Extrusion Control',
        'GH-F Gravimetric Additive',
        'VTC Plus Conveying',
        'NGX',
        'NGX Nomad',
        'Truetemp',
        'GP & HE Central',
        'T50 Central'
      ],
      telemetries: [
        'Power Loss',
        'Out of Material',
        'Hopper Unstable',
        'Hopper Overfeed',
        'Hopper Over Max',
        'Max Empty Weight',
        'Mixer Failure',
        'Unable to make rate',
        'Pump Starter Fault'
      ],
      operators: [
        'Equals',
        'Does not equal',
        'Is greater than',
        'Is greater than or equal to',
        'Is less than',
        'Is less than or equal to',
        'Is in',
        'Is not in'
      ],
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
        (v) => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) || 'Phone number must be valid'
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
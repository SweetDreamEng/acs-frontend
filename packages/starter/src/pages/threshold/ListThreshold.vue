<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Threshold</div>
      </div>
    </div>
    <v-card>
      <v-card-text>
        <v-expansion-panels v-model="panel" multiple class="mt-3">
          <v-expansion-panel>
            <v-expansion-panel-header class="title">Target Devices</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <div class="">Select the target device template your rule will use. If you need to narrow the rule's scope, add filters.</div>
                <v-select
                  :items="products"
                  label="Product"
                >
                </v-select>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="title">Conditions</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
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
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="title">Actions</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <div class="">Send an email when your rule is triggered. Emails will only be sent to users who have been added to this application and have signed-in at least once.</div>
                <v-form>
                  <v-text-field
                    v-model="emailForm.name"
                    label="Display name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="emailForm.to"
                    label="To"
                    placeholder="ex: msft@microsoft.com"
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="emailForm.note"
                    label="Note"
                    required
                    placeholder="Add a note to include in the email."
                  ></v-textarea>
                  <div class="d-flex">
                    <v-checkbox
                      v-model="emailForm.media"
                      label="SMS"
                      value="sms"
                      class="mr-2"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="emailForm.media"
                      label="Email"
                      value="email"
                    ></v-checkbox>
                  </div>
                </v-form>
                <v-btn color="primary">
                  Done
                </v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
        note: '',
        media: []
      },
      panel: [0, 1, 2]
    }
  },
  methods: {
    addFilter() {
      this.filters.push(this.defaultFilter)
    }
  }
}
</script>

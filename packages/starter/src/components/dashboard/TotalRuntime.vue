<template>
  <div>
    <v-card>
      <v-card-title>
        {{ label }}
        <v-spacer></v-spacer>
          <div>
            <v-btn icon class="ml-auto" @click="dialog = true">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <div v-if="showChart">
          <apexchart type="radialBar" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </v-card-text>
    </v-card>

    <!-- modal -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Uptime Percentage</v-card-title>
        <v-card-text>
          <v-alert
            border="top"
            outlined
            type="info"
            elevation="2"
          >
            <small>Total Runtime Hours are based on 168 hours. Please enter a different value to customize this</small><br>
            <small>[Fro ex: If Machines run 8 hours for 5 days a week, 40 hours would be the baseline]</small>
          </v-alert>
          <v-form ref="form" v-model="isFormValid" lazy-validation>
            <v-text-field
              v-model="hours"
              type="number"
              :rules="[rules.required]"
              :validate-on-blur="false"
              :error="error"
              label="Hours"
              name="hours"
              outlined
              dense
              @keyup.enter="submit"
              @change="resetErrors"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: {
        type: Boolean,
        default: false
      },
      
      showChart: false,

      series: [49.8],

      chartOptions: {
        labels: ['Percent']
      },

      dialog: false,
      
      // form
      hours: '',
      isFormValid: true,

      // form error
      error: false,
      errorMessages: '',

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  mounted() {
    this.showChart = true
  },
  methods: {
    submit() {
      this.dialog = false
    },
    resetErrors() {
      // this.error = false
      // this.errorMessages = ''

      // this.errorProvider = false
      // this.errorProviderMessages = ''
    }
  }
}
</script>

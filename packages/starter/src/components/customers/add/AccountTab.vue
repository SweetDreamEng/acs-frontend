<template>
  <div>
    <v-card class="my-2">
      <v-card-title>Basic Information</v-card-title>
      <v-card-text>
        <div class="d-flex flex-column flex-sm-row">
          <div class="flex-grow-1 pt-2 pa-sm-2">
            <v-form ref="accountForm" v-model="isAccountFormValid" lazy-validation @submit.prevent="submit">
              <v-text-field
                v-model="customer.name"
                :rules="[rules.required]"
                :validate-on-blur="false"
                label="Customer/Company Name"
              ></v-text-field>
              <v-text-field
                v-model="customer.administratorName"
                :rules="[rules.required]"
                :validate-on-blur="false"
                label="Administrator Name"
              ></v-text-field>
              <v-text-field
                v-model="customer.administratorEmail"
                :rules="[rules.required]"
                :validate-on-blur="false"
                label="Administrator Email"
              ></v-text-field>
              <div class="mt-2">
                <v-btn type="submit" color="primary">Save</v-btn>
              </div>
            </v-form>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      customer: {
        'name': '',
        'administratorName': '',
        'administratorEmail': ''
      },
      isAccountFormValid: true,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  methods: {
    submit() {

    }
  }
}
</script>
